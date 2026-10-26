const { compileRedirects } = require('../bin/redirect-utils');
const { redirects } = require('../vercel.json');
const { header, ipHash, putRecord } = require('./_log');
const { USAGE, amendToken, checkAmendment, entryPath, newId, parseSubmission } = require('./_feedback-lib');

// Public, no-auth feedback intake for agents and for the page feedback widget.
// Each accepted submission is stored as one private Blob, and a daily digest
// reads them. See readme/FEEDBACK.md.

// Compiled once per function instance.
const compiledRedirects = compileRedirects(redirects);

const MAX_BODY_BYTES = 8 * 1024;

// No CORS headers: agents call this from a server or a tool, and the widget
// posts from the same origin. Nothing here is cacheable, since a GET writes a
// record too.
const HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

function send(response, status, body) {
  for (const [key, value] of Object.entries(HEADERS)) response.setHeader(key, value);
  response.status(status).send(body === undefined ? undefined : JSON.stringify(body));
}

// The submission as a plain object: the query parameters of a GET, or the
// body of a POST. Vercel parses JSON and form bodies by their Content-Type,
// and leaves anything else as a string or Buffer, which is tried as JSON so an
// agent that leaves out the header still gets through. Returns { input } or
// { status, error }.
function readInput(request, searchParams) {
  if (request.method === 'GET') return { input: Object.fromEntries(searchParams) };

  const length = Number(header(request, 'content-length'));
  if (length > MAX_BODY_BYTES) return { status: 413, error: `The body is over ${MAX_BODY_BYTES} bytes.` };

  let body;
  try {
    body = request.body;
  } catch {
    return { status: 400, error: 'The body is not valid JSON.' };
  }
  if (Buffer.isBuffer(body)) body = body.toString('utf8');
  if (typeof body === 'string') {
    if (body.length > MAX_BODY_BYTES) return { status: 413, error: `The body is over ${MAX_BODY_BYTES} bytes.` };
    try {
      body = JSON.parse(body);
    } catch {
      return { status: 400, error: 'The body is not valid JSON.' };
    }
  }
  return { input: body };
}

module.exports = async (request, response) => {
  if (request.method === 'OPTIONS') {
    send(response, 204);
    return;
  }

  const started = new Date();
  // The runtime log line holds metadata only. Free text from the public goes
  // to the private Blob store and nowhere else.
  const line = { event: 'feedback', ts: started.toISOString(), method: request.method, status: null };
  const finish = (status, body) => {
    line.status = status;
    if (status >= 400) line.error = body.error;
    send(response, status, body);
    console.log(JSON.stringify(line));
  };

  if (request.method !== 'GET' && request.method !== 'POST') {
    response.setHeader('Allow', 'GET, POST, OPTIONS');
    finish(405, { error: 'Use GET or POST.', usage: USAGE });
    return;
  }

  const salt = process.env.FEEDBACK_LOG_SALT;
  if (!salt || !process.env.BLOB_READ_WRITE_TOKEN) {
    finish(500, { error: 'Feedback is not configured.' });
    return;
  }

  const { searchParams } = new URL(request.url, 'https://docs.temporal.io');
  const read = readInput(request, searchParams);
  if (read.error) {
    finish(read.status, { error: read.error, usage: USAGE });
    return;
  }

  const parsed = parseSubmission(read.input, { method: request.method, compiledRedirects });
  if (parsed.error) {
    finish(400, { error: parsed.error, usage: USAGE });
    return;
  }

  const { kind, fields } = parsed;
  line.kind = kind;
  const meta = {
    ua: header(request, 'user-agent'),
    country: header(request, 'x-vercel-ip-country'),
    ip_hash: ipHash(request, salt),
    deployment: process.env.VERCEL_ENV || 'development',
  };

  let id;
  let pathname;
  let record;
  if (kind === 'amendment') {
    const denied = checkAmendment(fields.id, fields.amend_token, salt, started.getTime());
    if (denied) {
      finish(denied.status, { error: denied.error });
      return;
    }
    id = fields.id;
    pathname = entryPath(id, started);
    const { amend_token: _token, ...rest } = fields;
    record = { kind, channel: 'widget', amended_at: line.ts, ...rest, ...meta };
  } else {
    id = newId(started);
    pathname = entryPath(id);
    const channel = kind === 'rating' ? 'widget' : 'agent';
    // Vercel BotID isn't wired up yet, so widget entries aren't bot-checked.
    const bot = channel === 'widget' ? { bot_verdict: 'unchecked' } : {};
    record = { id, ts: line.ts, kind, channel, ...fields, ...meta, ...bot };
    line.channel = channel;
    if (kind === 'report')
      Object.assign(line, {
        category: fields.category,
        severity: fields.severity,
        agent: fields.agent,
        src: fields.src,
      });
  }
  line.id = id;

  // Feedback that isn't stored is lost, so the write finishes before the
  // response, and a failure is reported to the sender.
  try {
    await putRecord(pathname, record);
  } catch (error) {
    console.error(`feedback: Blob write failed: ${error.message}`);
    finish(503, { error: "Feedback couldn't be saved. Try again later." });
    return;
  }

  if (kind === 'report') {
    finish(202, { id, message: `Thanks. Your report is recorded as ${id}. You don't need to send it again.` });
  } else if (kind === 'rating') {
    finish(202, { id, amend_token: amendToken(id, salt) });
  } else {
    finish(202, { id });
  }
};
