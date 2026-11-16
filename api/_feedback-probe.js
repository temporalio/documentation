// Recognizes security scanner probes sent to /api/feedback, so they're dropped
// before they're stored and left out of the digest. No I/O, so it can be unit
// tested. The leading underscore keeps Vercel from deploying this file as its
// own function.
//
// The rules come from real probes: XSS payloads that call back to an
// out-of-band host, template and SQL injection markers, header injection, and
// SSRF targets in page_url. Each rule is narrow enough that a real report about
// Temporal is unlikely to match it. Helm templates use {{ }}, CLI flags start
// with --, and Kubernetes has liveness probes, so none of those alone counts.

// Every free-text and label field a sender controls.
const FIELDS = ['title', 'message', 'expected', 'context', 'comment', 'page_url', 'product_version', 'agent', 'src'];

const RULES = [
  {
    name: 'markup',
    test: (text) =>
      /<\s*\/?\s*(script|iframe|svg|img|style|math|object|embed|frame|frameset|base|meta|link|form|input|details|video|audio|marquee|body)\b/i.test(
        text
      ) ||
      /\bon(error|load|focus|blur|click|mouseover|toggle|begin|animationstart|pageshow)\s*=/i.test(text) ||
      /\b(javascript|vbscript)\s*:/i.test(text) ||
      /\bdata\s*:\s*text\/html/i.test(text),
  },
  {
    // Hosts that exist to record a callback, so a scanner can tell a payload
    // ran somewhere downstream.
    name: 'callback-host',
    test: (text) =>
      /\b(oast\.(pro|online|fun|me|site|live)|oastify\.com|interact\.sh|burpcollaborator\.net|dnslog\.(cn|link)|ceye\.io|requestbin\.(net|com)|pipedream\.net|webhook\.site|canarytokens\.(com|org))\b/i.test(
        text
      ),
  },
  {
    name: 'template-injection',
    test: (text) =>
      /\{\{\s*\d+\s*[*+]\s*\d+\s*\}\}|\$\{\s*\d+\s*[*+]\s*\d+\s*\}|<%=?\s*\d+\s*[*+]\s*\d+\s*%>|#\{\s*\d+\s*[*+]\s*\d+\s*\}/.test(
        text
      ),
  },
  {
    name: 'sql-injection',
    test: (text) =>
      /'\s*(or|and)\s+'?\d+'?\s*=\s*'?\d+|\w'--\s*$|\bunion\s+(all\s+)?select\b|;\s*drop\s+table\b|\bsleep\s*\(\s*\d+\s*\)|\bwaitfor\s+delay\b/i.test(
        text
      ),
  },
  {
    // A header line smuggled into a one-line field, as in
    // "title\r\nX-Injected: yes".
    name: 'header-injection',
    test: (text) => /[\r\n]\s*[A-Za-z][\w-]*\s*:/.test(text),
    fields: ['title', 'agent', 'src', 'product_version', 'page_url'],
  },
  {
    name: 'scanner-marker',
    test: (text) => /(^|[^a-z])(xss|ssrf|sqli|ssti|lfi|rce)([^a-z]|$)/i.test(text),
    fields: ['title', 'message', 'agent', 'src'],
  },
  {
    name: 'path-traversal',
    test: (text) => /(\.\.[/\\]){2,}|\/etc\/passwd\b|\bwin\.ini\b/i.test(text),
  },
];

// A page_url that points at the server itself, a private network, or a cloud
// metadata service: an SSRF probe. The endpoint never fetches page_url, but
// these aren't docs pages either.
function isPrivateAddress(pageUrl) {
  let host;
  try {
    host = new URL(pageUrl).hostname.toLowerCase().replace(/^\[|\]$/g, '');
  } catch {
    return false;
  }
  if (host === 'localhost' || host.endsWith('.localhost') || host === 'metadata.google.internal') return true;
  if (host.includes(':')) return host === '::1' || host === '::' || /^(fc|fd|fe80)/.test(host);
  const m = /^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/.exec(host);
  if (!m) return false;
  const [a, b] = [Number(m[1]), Number(m[2])];
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168)
  );
}

// The name of the first rule a submission or stored record matches, or null.
function probeReason(fields) {
  if (!fields || typeof fields !== 'object') return null;
  if (typeof fields.page_url === 'string' && isPrivateAddress(fields.page_url)) return 'private-address';
  for (const rule of RULES) {
    for (const name of rule.fields || FIELDS) {
      const value = fields[name];
      if (typeof value === 'string' && value && rule.test(value)) return rule.name;
    }
  }
  return null;
}

module.exports = { isPrivateAddress, probeReason };
