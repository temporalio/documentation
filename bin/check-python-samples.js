#!/usr/bin/env node

// Type-checks the hand-written Python samples in docs/ against the published
// temporalio package, and reports SDK classes, functions, and modules that the
// samples use but the package doesn't have, and calls that pass the SDK an
// argument it doesn't take.
//
// The Python counterpart of bin/check-typescript-samples.js. Nothing compiles
// these samples otherwise, and more than 80 percent of the Python code on the
// site is hand-written rather than synced by Snipsync.
//
// Every hand-written sample is checked by Pyright, alongside the source of the
// latest temporalio release from PyPI, plus any companion distribution a
// sample imports from, such as temporalio-openai-agents. Pyright installs from
// npm, so this runs without a Python interpreter. Samples are fragments, so most of what Pyright
// reports is noise: undefined names, missing imports, placeholder arguments.
// Only diagnostics about something the temporalio package defines are kept.
// Pyright names a class or module in its messages but not where it's defined,
// so "defined by temporalio" means the name is in an index built from the
// package source and the sample doesn't define it itself.
//
// Missing required arguments are never reported, because samples routinely
// leave out arguments that aren't the point of the example. Argument count
// problems are skipped for a call that uses `...` as a placeholder argument.
//
// This is advisory rather than a merge gate, for the same reasons as the
// TypeScript checker. The command line, baseline, and reporting are shared
// with it; see bin/code-samples.js.
//
//   node bin/check-python-samples.js                        # report
//   node bin/check-python-samples.js docs/develop/python/workflows
//   node bin/check-python-samples.js --sdk-version 1.34.0   # instead of latest

const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { main } = require('./code-samples');

const execFileAsync = promisify(execFile);

const BASELINE = path.join('bin', 'python-samples-baseline.json');

const LANGUAGES = new Set(['python', 'py']);

const SDK = 'temporalio';

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

const MAX_ATTEMPTS = 4;
const FIRST_RETRY_MS = 1000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetches from PyPI, retrying transient failures. Resolves to null on a 404.
async function fetchWithRetry(url) {
  let lastError;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (res.ok) return res;
      lastError = new Error(`${url} returned ${res.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < MAX_ATTEMPTS) await sleep(FIRST_RETRY_MS * 2 ** (attempt - 1));
  }
  throw new Error(`Could not fetch ${url}: ${lastError.message}`);
}

async function release(name, version) {
  const url = `https://pypi.org/pypi/${name}/${version === 'latest' ? '' : `${version}/`}json`;
  const res = await fetchWithRetry(url);
  return res ? res.json() : null;
}

// Any wheel has the same Python source, so a pure-Python wheel is taken when
// there is one and the smallest platform wheel otherwise. The temporalio
// wheels are platform wheels because they carry the native bridge, which is
// left out when unpacking.
function chooseWheel(files, { pureOnly = false } = {}) {
  const wheels = files.filter((f) => f.packagetype === 'bdist_wheel' && !f.yanked);
  const pure = wheels.find((f) => /-py[23.]*-none-any\.whl$/.test(f.filename));
  if (pure || pureOnly) return pure ?? null;
  return wheels.sort((a, b) => a.size - b.size)[0] ?? null;
}

async function unpackWheel(file, cacheDir) {
  const wheels = path.join(cacheDir, 'wheels');
  fs.mkdirSync(wheels, { recursive: true });
  const target = path.join(wheels, file.filename);
  const res = await fetchWithRetry(file.url);
  if (!res) throw new Error(`${file.url} returned 404`);
  fs.writeFileSync(target, Buffer.from(await res.arrayBuffer()));
  await execFileAsync('unzip', [
    '-q',
    '-o',
    target,
    '-d',
    path.join(cacheDir, 'site-packages'),
    '-x',
    '*.so',
    '*.pyd',
    '*.dylib',
  ]);
}

// The dependencies a plain install pulls in, skipping extras. An exact pin is
// honored; anything else takes the latest release.
function requirements(requiresDist) {
  return (requiresDist ?? [])
    .filter((r) => !/extra\s*==/.test(r))
    .map((r) => {
      const m = r.match(/^([A-Za-z0-9._-]+)\s*(?:\[[^\]]*\])?\s*(?:\(?\s*==\s*([^,;)\s]+))?/);
      return { name: m[1], version: m[2] ?? 'latest' };
    });
}

// Downloads temporalio and its pure-Python dependencies into
// <cacheDir>/site-packages. Dependencies only sharpen the types; one that
// can't be found is skipped rather than failing the run.
async function fetchPackages(version, cacheDir) {
  fs.rmSync(path.join(cacheDir, 'site-packages'), { recursive: true, force: true });

  const sdk = await release(SDK, version);
  if (!sdk) throw new Error(`Could not find ${SDK} ${version} on PyPI.`);
  const wheel = chooseWheel(sdk.urls);
  if (!wheel) throw new Error(`${SDK} ${sdk.info.version} has no wheel on PyPI.`);
  await unpackWheel(wheel, cacheDir);

  const packages = [{ name: SDK, version: sdk.info.version }];
  await Promise.all(
    requirements(sdk.info.requires_dist).map(async (req) => {
      const dep = await release(req.name, req.version);
      const depWheel = dep && chooseWheel(dep.urls, { pureOnly: true });
      if (!depWheel) return;
      await unpackWheel(depWheel, cacheDir);
      packages.push({ name: req.name, version: dep.info.version });
    })
  );
  return packages.sort((a, b) => (a.name === SDK ? -1 : b.name === SDK ? 1 : a.name.localeCompare(b.name)));
}

// Subpackages of temporalio that the samples import but the temporalio
// wheel doesn't have. Some integrations ship as their own distribution that
// adds a subpackage: temporalio-openai-agents adds temporalio.openai_agents.
function missingSubpackages(codes, sitePackages) {
  const names = new Set();
  for (const code of codes) {
    for (const m of code.matchAll(/^[ \t]*(?:from|import)[ \t]+temporalio\.(\w+)/gm)) names.add(m[1]);
  }
  const present = (name) =>
    fs.existsSync(path.join(sitePackages, SDK, name)) || fs.existsSync(path.join(sitePackages, SDK, `${name}.py`));
  return [...names].filter((name) => !present(name)).sort();
}

// The distribution that would add a subpackage, by the naming those
// distributions follow.
const companionOf = (subpackage) => `${SDK}-${subpackage.replace(/_/g, '-')}`;

// Fetches the companion distribution for each missing subpackage, at its
// latest release: companions are versioned separately from temporalio. A
// subpackage with no companion is left missing, and reported as such.
async function fetchCompanions(samples, cacheDir) {
  const companions = [];
  for (const subpackage of missingSubpackages(
    samples.map((s) => s.code),
    path.join(cacheDir, 'site-packages')
  )) {
    const name = companionOf(subpackage);
    const dist = await release(name, 'latest');
    const wheel = dist && chooseWheel(dist.urls);
    if (!wheel) continue;
    await unpackWheel(wheel, cacheDir);
    companions.push({ name, version: dist.info.version, companion: true });
  }
  return companions;
}

// ---------------------------------------------------------------------------
// The SDK index
// ---------------------------------------------------------------------------

function walkPython(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkPython(full);
    return /\.pyi?$/.test(entry.name) ? [full] : [];
  });
}

// Names the package defines, read from its source. `types` are classes and
// module-level type aliases, `callables` are functions, methods, and classes,
// and `modules` are dotted module names.
function indexPackage(sitePackages, pkg = SDK) {
  const types = new Set();
  const callables = new Set();
  const modules = new Set();
  const definedIn = new Map();
  for (const file of walkPython(path.join(sitePackages, pkg))) {
    const rel = path.relative(sitePackages, file).split(path.sep);
    const last = rel.pop().replace(/\.pyi?$/, '');
    modules.add([...rel, ...(last === '__init__' ? [] : [last])].join('.'));

    const source = fs.readFileSync(file, 'utf8');
    for (const m of source.matchAll(/^[ \t]*class[ \t]+([A-Za-z_]\w*)/gm)) {
      types.add(m[1]);
      callables.add(m[1]);
    }
    for (const m of source.matchAll(/^([A-Z]\w*)[ \t]*(?::[^=\n]*)?=/gm)) types.add(m[1]);
    for (const m of source.matchAll(/^[ \t]*(?:async[ \t]+)?def[ \t]+([A-Za-z_]\w*)/gm)) {
      callables.add(m[1]);
      if (!definedIn.has(m[1])) definedIn.set(m[1], new Set());
      definedIn.get(m[1]).add(file);
    }
  }
  return { types, callables, modules, definedIn };
}

// What every SDK function named `name` accepts, merged across overloads and
// across classes that define a method of that name: the keyword names, and
// the most positional arguments. Merging makes this permissive, which is the
// safe direction: it only decides whether to report, never what to report.
function signatureOf(name, index) {
  const keywords = new Set();
  let positional = 0;
  let anyKeyword = false;
  let found = false;
  for (const file of index.definedIn.get(name) ?? []) {
    const source = fs.readFileSync(file, 'utf8');
    for (const m of source.matchAll(new RegExp(`^[ \\t]*(?:async[ \\t]+)?def[ \\t]+${name}[ \\t]*\\(`, 'gm'))) {
      const open = m.index + m[0].length - 1;
      const pair = bracketPairs(source.slice(open)).find((p) => p.open === 0);
      if (!pair) continue;
      found = true;
      const params = callArguments(source.slice(open, open + pair.close + 1), { open: 0, close: pair.close });
      let count = 0;
      let keywordOnly = false;
      let positionalOnly = params.includes('/');
      params.forEach((param, i) => {
        const p = param.match(/^(\*{0,2})([A-Za-z_]\w*)?/);
        if (param === '/') {
          positionalOnly = false;
          return;
        }
        if (p[1] === '**') {
          anyKeyword = true;
          return;
        }
        if (p[1] === '*') {
          if (p[2]) count = Infinity;
          keywordOnly = true;
          return;
        }
        if (i === 0 && (p[2] === 'self' || p[2] === 'cls')) return;
        if (!positionalOnly) keywords.add(p[2]);
        if (!keywordOnly) count++;
      });
      positional = Math.max(positional, count);
    }
  }
  return found ? { keywords, positional, anyKeyword } : null;
}

// ---------------------------------------------------------------------------
// Reading a sample
// ---------------------------------------------------------------------------

// Calls `visit(index, char)` for every character outside strings and
// comments, and `comment(start, end)` for every comment.
function scan(code, visit, comment = () => {}) {
  let i = 0;
  while (i < code.length) {
    const c = code[i];
    if (c === '#') {
      const end = code.indexOf('\n', i);
      comment(i, end === -1 ? code.length : end);
      i = end === -1 ? code.length : end;
      continue;
    }
    if (c === '"' || c === "'") {
      const quote = code.startsWith(c.repeat(3), i) ? c.repeat(3) : c;
      i += quote.length;
      while (i < code.length && !code.startsWith(quote, i)) {
        if (code[i] === '\\') i++;
        else if (quote.length === 1 && code[i] === '\n') break;
        i++;
      }
      i += quote.length;
      continue;
    }
    visit(i, c);
    i++;
  }
}

// Every bracket pair, as { open, close, char }. A bracket left open at the
// end of a fragment closes at the end of the code.
function bracketPairs(code) {
  const pairs = [];
  const stack = [];
  scan(code, (i, c) => {
    if ('([{'.includes(c)) stack.push({ open: i, char: c });
    else if (')]}'.includes(c) && stack.length) pairs.push({ ...stack.pop(), close: i });
  });
  for (const left of stack) pairs.push({ ...left, close: code.length });
  return pairs;
}

const CALLEE = /([A-Za-z_][\w]*(?:\s*\.\s*[A-Za-z_]\w*)*)\s*$/;

function calleeBefore(code, open) {
  const m = code.slice(Math.max(0, open - 200), open).match(CALLEE);
  return m ? m[1].replace(/\s+/g, '') : null;
}

// The innermost call whose parentheses contain `offset`, as { callee, open,
// close }, or null.
function enclosingCall(code, offset) {
  const calls = bracketPairs(code)
    .filter((p) => p.char === '(' && p.open < offset && offset <= p.close)
    .sort((a, b) => b.open - a.open);
  for (const pair of calls) {
    const callee = calleeBefore(code, pair.open);
    if (callee) return { callee, ...pair };
  }
  return null;
}

// The call whose callee starts at `offset`.
function callAt(code, offset) {
  const m = code.slice(offset).match(/^([A-Za-z_][\w]*(?:\s*\.\s*[A-Za-z_]\w*)*)\s*\(/);
  if (!m) return null;
  const open = offset + m[0].length - 1;
  const pair = bracketPairs(code).find((p) => p.open === open);
  return pair ? { callee: m[1].replace(/\s+/g, ''), ...pair } : null;
}

// The code with every comment blanked out, keeping offsets the same.
function withoutComments(code) {
  // Split by UTF-16 unit, not code point, to match string offsets.
  const chars = code.split('');
  scan(
    code,
    () => {},
    (start, end) => chars.fill(' ', start, end)
  );
  return chars.join('');
}

// The top-level arguments of a call, as trimmed source text without comments.
function callArguments(code, call) {
  const inner = withoutComments(code.slice(call.open + 1, call.close));
  const args = [];
  let depth = 0;
  let start = 0;
  scan(inner, (i, c) => {
    if ('([{'.includes(c)) depth++;
    else if (')]}'.includes(c)) depth--;
    else if (c === ',' && depth === 0) {
      args.push(inner.slice(start, i));
      start = i + 1;
    }
  });
  args.push(inner.slice(start));
  return args.map((a) => a.trim()).filter(Boolean);
}

// `...` standing in for arguments the sample leaves out.
const hasPlaceholder = (code, call) => callArguments(code, call).includes('...');

// The module each imported name came from: `from temporalio import workflow`
// maps workflow to temporalio, `import asyncio` maps asyncio to asyncio.
// Each statement is also returned with its span, to find the module of an
// imported name at a position.
function imports(code) {
  const bindings = new Map();
  const statements = [];
  for (const m of code.matchAll(/^[ \t]*from[ \t]+([\w.]+)[ \t]+import[ \t]+(\([^)]*\)|[^\n]*)/gm)) {
    statements.push({ module: m[1], start: m.index, end: m.index + m[0].length });
    for (const part of m[2]
      .replace(/[()\\]/g, ' ')
      .replace(/#.*$/gm, '')
      .split(',')) {
      const name = part.trim().split(/\s+as\s+/);
      if (name[0]) bindings.set((name[1] ?? name[0]).trim(), m[1]);
    }
  }
  for (const m of code.matchAll(/^[ \t]*import[ \t]+([^\n#]+)/gm)) {
    for (const part of m[1].split(',')) {
      const [module, alias] = part.trim().split(/\s+as\s+/);
      if (module) bindings.set(alias ?? module.split('.')[0], module);
    }
  }
  return { bindings, statements };
}

// Classes and functions the sample defines itself, at any depth.
function definedNames(code) {
  return new Set([...code.matchAll(/^[ \t]*(?:async[ \t]+)?(?:class|def)[ \t]+([A-Za-z_]\w*)/gm)].map((m) => m[1]));
}

const isSdkModule = (module) => module === SDK || module.startsWith(`${SDK}.`);

function offsetOf(code, { line, character }) {
  let offset = 0;
  for (let i = 0; i < line; i++) offset = code.indexOf('\n', offset) + 1;
  return offset + character;
}

// A short form of the expression a diagnostic is about, such as
// workflow.RetryPolicy, from the dotted name just before `offset`.
function expressionBefore(code, offset, name) {
  const before = code.slice(Math.max(0, offset - 200), offset);
  const m = before.match(/([A-Za-z_][\w.]*(?:\([^()]*\))?)\.\s*$/);
  return m ? `${m[1]}.${name}` : name;
}

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

// The class named in "for class ...": type[Client] is Client, and
// WorkflowHandle[Any, Any] is WorkflowHandle. Pyright marks a partially
// inferred class with a trailing *.
function ownerClass(text) {
  const inner = text.replace(/^type\[(.*)\]$/, '$1');
  const m = inner.match(/^[A-Za-z_]\w*/);
  return m ? m[0] : null;
}

// Turns one Pyright diagnostic into a finding, or null when it isn't about
// something temporalio defines. `index` is the SDK index; `sitePackages` is
// where the SDK source is, for telling a submodule from a missing attribute.
function classify(diagnostic, code, { index }) {
  let message = diagnostic.message.split('\n')[0];
  const offset = offsetOf(code, diagnostic.range.start);
  let m;

  if (diagnostic.rule === 'reportAttributeAccessIssue') {
    if ((m = message.match(/^"(\w+)" is not a known attribute of module "([\w.]+)"/))) {
      const [, name, module] = m;
      if (!isSdkModule(module)) return null;
      // `import temporalio` followed by temporalio.common works at runtime
      // whenever something else has imported the submodule, which is almost
      // always. Pyright still reports it; that's not what this check is for.
      if (index.modules.has(`${module}.${name}`)) return null;
      return {
        kind: 'missing-export',
        subject: `${module}:${name}`,
        message: `${expressionBefore(code, offset, name)}: ${module} has no attribute '${name}'.`,
      };
    }

    if ((m = message.match(/^"(\w+)" is unknown import symbol/))) {
      const statement = imports(code).statements.find((s) => s.start <= offset && offset < s.end);
      if (!statement || !isSdkModule(statement.module)) return null;
      return {
        kind: 'missing-export',
        subject: `${statement.module}:${m[1]}`,
        message: `${statement.module} has no export named '${m[1]}'.`,
      };
    }

    if ((m = message.match(/^Cannot access attribute "(\w+)" for class "(.+)"$/))) {
      const owner = ownerClass(m[2]);
      if (!owner || !index.types.has(owner) || definedNames(code).has(owner)) return null;
      return {
        kind: 'missing-member',
        subject: `${owner}.${m[1]}`,
        message: `${expressionBefore(code, offset, m[1])}: ${message}`,
      };
    }
    return null;
  }

  // Most syntax errors in a fragment come from it being a fragment, such as
  // `await` outside a function. This one never does.
  if (!diagnostic.rule && message === 'Positional argument cannot appear after keyword arguments') {
    // Except when the positional argument is a `...` placeholder.
    if (code.slice(offset, offsetOf(code, diagnostic.range.end)).trim() === '...') return null;
    const call = enclosingCall(code, offset);
    return {
      kind: 'syntax-error',
      subject: call?.callee ?? 'call',
      message: `${call?.callee ?? 'A call'}(): ${message}`,
    };
  }

  if (diagnostic.rule === 'reportMissingImports') {
    if (!(m = message.match(/^Import "([\w.]+)" could not be resolved$/)) || !isSdkModule(m[1])) return null;
    return { kind: 'missing-module', subject: m[1], message: `No module named '${m[1]}'.` };
  }

  if (diagnostic.rule === 'reportCallIssue') {
    let call;
    let subject;
    if ((m = message.match(/^No parameter named "(\w+)"/))) {
      call = enclosingCall(code, offset);
      subject = call && `${call.callee}(${m[1]}=)`;
    } else if (/^Expected \d+ positional argument/.test(message)) {
      call = enclosingCall(code, offset);
      if (call && hasPlaceholder(code, call)) return null;
      subject = call?.callee;
    } else if ((m = message.match(/^No overloads for "(\w+)" match/))) {
      // Pyright doesn't say why no overload matched, and the usual reason in
      // a sample is a missing argument. Report only a keyword no overload
      // takes, or more positional arguments than any overload takes.
      call = callAt(code, offset);
      if (!call || hasPlaceholder(code, call)) return null;
      const signature = signatureOf(m[1], index);
      if (!signature) return null;
      const args = callArguments(code, call).filter((a) => !a.startsWith('*'));
      const keywords = args.map((a) => a.match(/^([A-Za-z_]\w*)\s*=(?!=)/)?.[1]).filter(Boolean);
      const unknown = signature.anyKeyword ? undefined : keywords.find((k) => !signature.keywords.has(k));
      const positional = args.length - keywords.length;
      if (unknown) {
        if (!isSdkCallee(call.callee, code, index)) return null;
        return {
          kind: 'bad-call',
          subject: `${call.callee}(${unknown}=)`,
          message: `${call.callee}(): No parameter named "${unknown}"`,
        };
      }
      if (positional <= signature.positional) return null;
      subject = call.callee;
      message = `Expected ${signature.positional} positional argument${signature.positional === 1 ? '' : 's'}`;
    } else {
      // Missing arguments, mostly: samples leave those out on purpose.
      return null;
    }
    if (!call || !isSdkCallee(call.callee, code, index)) return null;
    return { kind: 'bad-call', subject, message: `${call.callee}(): ${message}` };
  }

  return null;
}

// Whether a call like workflow.execute_activity(...) or Worker(...) is a call
// into the SDK. An imported root decides it; otherwise the called name has to
// be one the SDK defines and the sample doesn't.
function isSdkCallee(callee, code, index) {
  const segments = callee.split('.');
  const name = segments[segments.length - 1];
  if (definedNames(code).has(name)) return false;
  const root = imports(code).bindings.get(segments[0]);
  if (root !== undefined) return isSdkModule(root);
  return index.callables.has(name);
}

// ---------------------------------------------------------------------------
// Running Pyright
// ---------------------------------------------------------------------------

// Names a sample often uses without importing, because the import is in an
// earlier sample on the page. Pyright treats a __builtins__.pyi at the project
// root as extra builtins, so a sample's own import or assignment of the same
// name shadows them.
//
// Unlike the TypeScript checker, an undeclared `client` is not assumed to be
// a Client: the Python pages also use that name for the temporalio.client
// module and for other clients, such as a Workflow Streams client. A bare
// `temporalio` can't be declared here either, because Pyright doesn't expose
// modules imported by the builtins file.
const AMBIENT = `from temporalio import activity as activity, nexus as nexus, workflow as workflow
from temporalio.client import Client as Client
from temporalio.common import RetryPolicy as RetryPolicy
from temporalio.exceptions import ApplicationError as ApplicationError
from temporalio.worker import Worker as Worker
`;

function dedentBlock(code) {
  const lines = code.split('\n');
  const indents = lines.filter((l) => l.trim()).map((l) => l.match(/^[ \t]*/)[0].length);
  const common = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(Math.min(common, l.match(/^[ \t]*/)[0].length))).join('\n');
}

// Writes the samples into a Pyright project and returns its diagnostics,
// keyed by sample index. `sitePackages` holds the SDK source.
async function runPyright(samples, { projectDir, sitePackages }) {
  fs.rmSync(projectDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(projectDir, 'samples'), { recursive: true });
  fs.writeFileSync(path.join(projectDir, '__builtins__.pyi'), AMBIENT);
  fs.writeFileSync(
    path.join(projectDir, 'pyrightconfig.json'),
    JSON.stringify({
      include: ['samples'],
      extraPaths: [path.relative(projectDir, sitePackages)],
      pythonVersion: '3.13',
      typeCheckingMode: 'standard',
      reportMissingModuleSource: 'none',
    })
  );
  const codes = samples.map((sample, i) => {
    const code = dedentBlock(sample.code);
    fs.writeFileSync(path.join(projectDir, 'samples', `sample_${i}.py`), code);
    return code;
  });

  const pyright = require.resolve('pyright/index.js');
  let stdout;
  try {
    ({ stdout } = await execFileAsync(
      process.execPath,
      [pyright, '--outputjson', '-p', path.join(projectDir, 'pyrightconfig.json')],
      { maxBuffer: 1024 * 1024 * 256 }
    ));
  } catch (error) {
    // Pyright exits 1 when it reports errors, which is the normal case here.
    if (error.code !== 1 || !error.stdout) throw new Error(`Pyright failed:\n${error.stderr || error.message}`);
    stdout = error.stdout;
  }

  const byIndex = new Map();
  for (const diagnostic of JSON.parse(stdout).generalDiagnostics) {
    const m = diagnostic.file.match(/sample_(\d+)\.py$/);
    if (!m) continue;
    const i = Number(m[1]);
    if (!byIndex.has(i)) byIndex.set(i, []);
    byIndex.get(i).push(diagnostic);
  }
  return { codes, byIndex };
}

// Type-checks the samples against the SDK in `sitePackages` and returns the
// findings. `version` labels the messages.
async function checkSamples(samples, { sitePackages, projectDir, version }) {
  const index = indexPackage(sitePackages);
  const { codes, byIndex } = await runPyright(samples, { projectDir, sitePackages });

  const findings = [];
  for (const [i, diagnostics] of byIndex) {
    for (const diagnostic of diagnostics) {
      const finding = classify(diagnostic, codes[i], { index });
      if (!finding) continue;
      findings.push({
        file: samples[i].file,
        line: samples[i].line + diagnostic.range.start.line,
        ...finding,
        message: version ? `${finding.message} (${SDK} ${version})` : finding.message,
      });
    }
  }
  return findings;
}

async function check(samples, { version, cacheDir }) {
  const [sdk, ...dependencies] = await fetchPackages(version, cacheDir);
  const companions = await fetchCompanions(samples, cacheDir);
  const findings = await checkSamples(samples, {
    sitePackages: path.join(cacheDir, 'site-packages'),
    projectDir: path.join(cacheDir, 'project'),
    version: sdk.version,
  });
  const list = (packages) => packages.map((p) => `${p.name} ${p.version}`).join(', ');
  const sources = [`Checked against ${SDK} ${sdk.version} from PyPI.`];
  if (dependencies.length) sources.push(`  Dependencies: ${list(dependencies)}`);
  if (companions.length) sources.push(`  Companion distributions: ${list(companions)}`);
  return { findings, sources, details: { packages: [sdk, ...dependencies, ...companions] } };
}

const CHECKER = {
  script: 'bin/check-python-samples.js',
  languages: LANGUAGES,
  baseline: BASELINE,
  title: 'Python sample',
  check,
};

module.exports = {
  AMBIENT,
  BASELINE,
  LANGUAGES,
  chooseWheel,
  requirements,
  missingSubpackages,
  companionOf,
  indexPackage,
  bracketPairs,
  enclosingCall,
  callAt,
  callArguments,
  imports,
  definedNames,
  ownerClass,
  signatureOf,
  classify,
  isSdkCallee,
  dedentBlock,
  checkSamples,
};

if (require.main === module) main(CHECKER);
