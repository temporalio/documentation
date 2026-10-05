#!/usr/bin/env node

// Type-checks the hand-written TypeScript and JavaScript samples in docs/
// against the published @temporalio packages, and reports SDK methods,
// properties, and exports that the samples use but the packages don't have.
//
// Samples synced by Snipsync come from sample repositories that compile in CI.
// Most TypeScript samples on the site are written inline instead, and nothing
// compiles them: the Docusaurus build treats code fences as opaque strings and
// Vale skips code. A sample calling Connection.create(), which no release of
// @temporalio/client has had, stayed on the site for years.
//
// Every hand-written sample goes into one TypeScript program alongside the
// declaration files from the latest @temporalio packages. Samples are
// fragments, so most of what the compiler reports is noise: undeclared
// variables, missing imports, placeholder arguments. Only diagnostics about a
// type or module declared in an @temporalio package are kept, which is the
// class of mistake a reader copying the sample would hit.
//
// The same pass checks docs links written in code comments, which the link
// checker doesn't see.
//
// This is advisory rather than a merge gate. The packages are fetched at
// their latest version, so a sample can start failing when an SDK release
// removes something, and a page may deliberately show an older API.
//
//   node bin/check-typescript-samples.js                       # report
//   node bin/check-typescript-samples.js docs/develop/typescript/client
//   node bin/check-typescript-samples.js --json                # machine-readable
//   node bin/check-typescript-samples.js --github              # also print Actions annotations
//   node bin/check-typescript-samples.js --update-baseline     # accept current findings
//   node bin/check-typescript-samples.js --sdk-version 1.24.0  # instead of latest
//   node bin/check-typescript-samples.js --cache-dir /tmp/ts-sdk
//
// Exit codes: 0 clean, 2 findings (or stale baseline entries), 1 the check
// could not run at all, for example because npm was unreachable.

const { execFile } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const ts = require('typescript');

const execFileAsync = promisify(execFile);

const DOCS_DIR = 'docs';
const BASELINE = path.join('bin', 'typescript-samples-baseline.json');

const DEFAULT_COMMENT =
  'Findings from bin/check-typescript-samples.js that we have decided to leave as they are, for ' +
  'example a sample that deliberately shows an older API. Each entry is a page, a kind, and a subject; ' +
  'line numbers are left out so an entry survives edits elsewhere on the page. An empty note means the ' +
  'entry has not been reviewed yet; either fix the sample or fill in the note explaining why it stays. ' +
  'Regenerate with: node bin/check-typescript-samples.js --update-baseline';

const LANGUAGES = new Set(['ts', 'typescript', 'js', 'javascript']);

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

// Snipsync wraps synced code in either an HTML comment or an MDX comment.
const SNIPSTART = /^\s*(?:<!--|\{\/\*)\s*SNIPSTART\b/;
const SNIPEND = /^\s*(?:<!--|\{\/\*)\s*SNIPEND\b/;

const FENCE_OPEN = /^(\s*)(`{3,}|~{3,})\s*([^\s`{]*)/;
const FENCE_CLOSE = /^\s*(`{3,}|~{3,})\s*$/;

// The closing token of a comment that opens on this line and doesn't close,
// or null. Fenced code inside an unclosed comment is never rendered.
function openComment(line) {
  const rest = line.replace(/<!--.*?-->/g, '').replace(/\{\/\*.*?\*\/\}/g, '');
  if (rest.includes('<!--')) return '-->';
  if (rest.includes('{/*')) return '*/}';
  return null;
}

function dedent(line, indent) {
  let i = 0;
  while (i < indent && (line[i] === ' ' || line[i] === '\t')) i++;
  return line.slice(i);
}

// Every fenced code block on a page, with the 1-based line of its first line
// of code and whether Snipsync manages it. Code inside a list item or a JSX
// component is indented to match its fence; that indentation is removed.
function extractCodeBlocks(source) {
  const lines = source.split('\n');
  const blocks = [];
  let fence = null;
  let snipsync = false;
  let comment = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (fence) {
      const close = line.match(FENCE_CLOSE);
      if (close && close[1][0] === fence.marker[0] && close[1].length >= fence.marker.length) {
        blocks.push({
          lang: fence.lang,
          line: fence.line,
          code: fence.body.join('\n'),
          snipsync: fence.snipsync,
        });
        fence = null;
      } else {
        fence.body.push(dedent(line, fence.indent));
      }
      continue;
    }

    if (comment) {
      if (line.includes(comment)) comment = null;
      continue;
    }

    if (SNIPSTART.test(line)) {
      snipsync = true;
      continue;
    }
    if (SNIPEND.test(line)) {
      snipsync = false;
      continue;
    }

    const open = line.match(FENCE_OPEN);
    if (open) {
      fence = {
        marker: open[2],
        indent: open[1].length,
        lang: open[3].toLowerCase(),
        line: i + 2,
        body: [],
        snipsync,
      };
      continue;
    }

    comment = openComment(line);
  }

  return blocks;
}

// The hand-written TypeScript and JavaScript samples on a page.
function extractSamples(source) {
  return extractCodeBlocks(source).filter((b) => LANGUAGES.has(b.lang) && !b.snipsync);
}

function walkMdx(target) {
  const stat = fs.statSync(target);
  if (stat.isFile()) return target.endsWith('.mdx') ? [target] : [];
  return fs
    .readdirSync(target, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => walkMdx(path.join(target, entry.name)));
}

function collectSamples(targets) {
  const samples = [];
  let snipsync = 0;
  for (const file of [...new Set(targets.flatMap(walkMdx))]) {
    const blocks = extractCodeBlocks(fs.readFileSync(file, 'utf8'));
    for (const block of blocks) {
      if (!LANGUAGES.has(block.lang)) continue;
      if (block.snipsync) {
        snipsync++;
        continue;
      }
      samples.push({ file: file.split(path.sep).join('/'), line: block.line, code: block.code });
    }
  }
  return { samples, snipsync };
}

// The @temporalio package names a sample imports or requires.
function importedPackages(code) {
  const names = new Set();
  for (const { fileName } of ts.preProcessFile(code, true, true).importedFiles) {
    const m = fileName.match(/^(@temporalio\/[^/]+)/);
    if (m) names.add(m[1]);
  }
  return names;
}

// ---------------------------------------------------------------------------
// Packages
// ---------------------------------------------------------------------------

// Always fetched, because the ambient declarations below refer to them.
const CORE_PACKAGES = ['client', 'worker', 'workflow', 'activity', 'testing', 'common'].map(
  (name) => `@temporalio/${name}`
);

// Never fetched. The native bridge ships a prebuilt binary for every platform,
// about 150 MB, and declares nothing a sample calls directly.
const SKIP_PACKAGES = new Set(['@temporalio/core-bridge']);

// npm pack downloads one tarball without installing dependencies. Installing
// @temporalio/worker would also pull in webpack, swc, and the native bridge,
// when only the declaration files are needed.
async function packPackage(name, version, cacheDir) {
  const tarballs = path.join(cacheDir, 'tarballs');
  fs.mkdirSync(tarballs, { recursive: true });

  let stdout;
  try {
    ({ stdout } = await execFileAsync('npm', ['pack', `${name}@${version}`, '--json', '--pack-destination', tarballs], {
      maxBuffer: 1024 * 1024 * 64,
    }));
  } catch (error) {
    const detail = `${error.stdout ?? ''}${error.stderr ?? ''}`;
    // A package that doesn't exist is a finding about the samples that import
    // it. Anything else, such as a network failure, stops the check.
    if (/\bE404\b/.test(detail)) return { name, missing: true };
    if (/\bETARGET\b/.test(detail)) return { name, noSuchVersion: true };
    throw new Error(`npm pack ${name}@${version} failed:\n${detail.trim() || error.message}`);
  }

  const [packed] = JSON.parse(stdout);
  const target = path.join(cacheDir, 'node_modules', name);
  fs.mkdirSync(target, { recursive: true });
  await execFileAsync('tar', ['-xzf', path.join(tarballs, packed.filename), '-C', target, '--strip-components=1']);

  const manifest = JSON.parse(fs.readFileSync(path.join(target, 'package.json'), 'utf8'));
  const dependencies = Object.keys({ ...manifest.dependencies, ...manifest.peerDependencies }).filter((d) =>
    d.startsWith('@temporalio/')
  );
  return { name, version: packed.version, dependencies };
}

// Fetches the requested packages and every @temporalio package they depend
// on, so a class that extends one from another package keeps its inherited
// members.
async function fetchPackages(requested, version, cacheDir) {
  fs.rmSync(path.join(cacheDir, 'node_modules'), { recursive: true, force: true });

  const results = new Map();
  let wave = [...new Set(requested)].filter((name) => !SKIP_PACKAGES.has(name));

  while (wave.length > 0) {
    const fetched = await Promise.all(wave.map((name) => packPackage(name, version, cacheDir)));
    for (const result of fetched) results.set(result.name, result);
    wave = [
      ...new Set(
        fetched.flatMap((r) => r.dependencies ?? []).filter((name) => !results.has(name) && !SKIP_PACKAGES.has(name))
      ),
    ];
  }

  return [...results.values()].sort((a, b) => a.name.localeCompare(b.name));
}

// ---------------------------------------------------------------------------
// Type checking
// ---------------------------------------------------------------------------

// Names a sample often uses without importing, because the import is in an
// earlier sample on the page. They're declared as globals, so a sample's own
// import or declaration of the same name shadows them without a conflict.
const AMBIENT = [
  ['Connection', "typeof import('@temporalio/client').Connection"],
  ['Client', "typeof import('@temporalio/client').Client"],
  ['WorkflowClient', "typeof import('@temporalio/client').WorkflowClient"],
  ['ScheduleClient', "typeof import('@temporalio/client').ScheduleClient"],
  ['Worker', "typeof import('@temporalio/worker').Worker"],
  ['NativeConnection', "typeof import('@temporalio/worker').NativeConnection"],
  ['Runtime', "typeof import('@temporalio/worker').Runtime"],
  ['TestWorkflowEnvironment', "typeof import('@temporalio/testing').TestWorkflowEnvironment"],
  ['MockActivityEnvironment', "typeof import('@temporalio/testing').MockActivityEnvironment"],
  ['Context', "typeof import('@temporalio/activity').Context"],
  ['ApplicationFailure', "typeof import('@temporalio/common').ApplicationFailure"],
  // Conventions across the TypeScript pages. `client` being a Client is what
  // makes client.workflow.* and client.schedule.* checkable. `handle` is left
  // out because it's a WorkflowHandle on some pages and a ScheduleHandle on
  // others.
  ['wf', "typeof import('@temporalio/workflow')"],
  ['client', "import('@temporalio/client').Client"],
  ['testEnv', "import('@temporalio/testing').TestWorkflowEnvironment"],
];

function ambientDeclarations() {
  return AMBIENT.map(([name, type]) => `declare const ${name}: ${type};`).join('\n') + '\n';
}

const COMPILER_OPTIONS = {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  // Every sample is its own module, so top-level declarations in one sample
  // don't collide with or leak into another.
  moduleDetection: ts.ModuleDetectionKind.Force,
  lib: ['lib.es2023.d.ts'],
  // Node's types, from this repository's own devDependencies. Some SDK
  // classes extend Node classes, such as MockActivityEnvironment extending
  // EventEmitter, and their inherited members are otherwise unknown.
  typeRoots: [path.join(__dirname, '..', 'node_modules', '@types')],
  types: ['node'],
  strict: false,
  noImplicitAny: false,
  skipLibCheck: true,
  noEmit: true,
  esModuleInterop: true,
  resolveJsonModule: true,
  allowUnreachableCode: true,
  allowUnusedLabels: true,
  experimentalDecorators: true,
};

// A compiler host that serves `files` from memory and everything else from
// disk. Samples are always in memory; tests also put fake packages there.
function createHost(files) {
  const host = ts.createCompilerHost(COMPILER_OPTIONS, true);
  const directories = new Set();
  for (const file of files.keys()) {
    for (let dir = path.posix.dirname(file); !directories.has(dir); dir = path.posix.dirname(dir)) {
      directories.add(dir);
      if (dir === path.posix.dirname(dir)) break;
    }
  }

  const getSourceFile = host.getSourceFile.bind(host);
  host.getSourceFile = (fileName, languageVersion, onError, shouldCreate) =>
    files.has(fileName)
      ? ts.createSourceFile(fileName, files.get(fileName), languageVersion, true)
      : getSourceFile(fileName, languageVersion, onError, shouldCreate);
  host.fileExists = (fileName) => files.has(fileName) || ts.sys.fileExists(fileName);
  host.readFile = (fileName) => (files.has(fileName) ? files.get(fileName) : ts.sys.readFile(fileName));
  host.directoryExists = (dir) => directories.has(dir) || ts.sys.directoryExists(dir);
  host.realpath = (p) => (files.has(p) || directories.has(p) ? p : ts.sys.realpath(p));
  host.writeFile = () => {};
  return host;
}

// The package that declares a file, if it's one of ours.
function packageOfFile(fileName) {
  const m = fileName.match(/\/node_modules\/(@temporalio\/[^/]+)\//);
  return m ? m[1] : null;
}

function packageOfSymbol(symbol) {
  for (const declaration of symbol?.declarations ?? []) {
    const pkg = packageOfFile(declaration.getSourceFile().fileName);
    if (pkg) return pkg;
  }
  return null;
}

// False when a class or interface extends something the compiler couldn't
// resolve, such as a type from a package that wasn't fetched. Its members
// are then only partly known, and a missing one proves nothing.
function membersAreKnown(symbol, checker, seen = new Set()) {
  if (!symbol || seen.has(symbol)) return true;
  seen.add(symbol);
  for (const declaration of symbol.declarations ?? []) {
    for (const clause of declaration.heritageClauses ?? []) {
      if (clause.token !== ts.SyntaxKind.ExtendsKeyword) continue;
      for (const base of clause.types) {
        const type = checker.getTypeAtLocation(base);
        if (type.flags & ts.TypeFlags.Any) return false;
        if (!membersAreKnown(type.aliasSymbol ?? type.getSymbol(), checker, seen)) return false;
      }
    }
  }
  return true;
}

// The @temporalio type a property was looked up on, or null when the type
// isn't ours or its members can't all be known. `module` is set when the
// type is a namespace import (import * as wf), which is the module itself.
function sdkOwner(type, checker) {
  const types = type.isUnionOrIntersection() ? type.types : [type];
  for (const t of types) {
    for (const symbol of [t.aliasSymbol, t.getSymbol()]) {
      const pkg = packageOfSymbol(symbol);
      if (!pkg) continue;
      if (!membersAreKnown(symbol, checker)) return null;
      const isModule = Boolean(symbol.flags & ts.SymbolFlags.ValueModule) && symbol.getName().startsWith('"');
      return { pkg, owner: symbol.getName(), module: isModule };
    }
  }
  return null;
}

// Compiler messages name modules by absolute path inside the download
// directory, and quote module names twice. Name them by package instead.
function tidy(message) {
  return message
    .replace(/import\("[^"]*\/node_modules\/(@temporalio\/[^/"]+)[^"]*"\)/g, "import('$1')")
    .replace(/'"(@temporalio\/[^"]+)"'/g, "'$1'");
}

// The innermost node that starts exactly at `position`.
function nodeAt(sourceFile, position) {
  let found = null;
  const visit = (node) => {
    if (position < node.getFullStart() || position >= node.getEnd()) return;
    if (node.getStart(sourceFile) === position) found = node;
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return found;
}

function moduleSpecifierOf(node) {
  for (let n = node; n; n = n.parent) {
    if ((ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) && n.moduleSpecifier) {
      return ts.isStringLiteral(n.moduleSpecifier) ? n.moduleSpecifier.text : null;
    }
    if (ts.isImportEqualsDeclaration(n)) {
      const ref = n.moduleReference;
      return ts.isExternalModuleReference(ref) && ts.isStringLiteral(ref.expression) ? ref.expression.text : null;
    }
  }
  return null;
}

function squash(text, max = 60) {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

// Property access: 2339 "Property 'x' does not exist on type 'Y'", 2551 the
// same with a spelling suggestion, 2576 an instance access of a static member.
const MISSING_MEMBER = new Set([2339, 2551, 2576]);
// 2305 "Module has no exported member", 2724 the same with a suggestion, 2614
// the same when a default import would work.
const MISSING_EXPORT = new Set([2305, 2724, 2614]);
// 2694 "Namespace 'wf' has no exported member 'X'", in a type position.
const MISSING_NAMESPACE_MEMBER = new Set([2694]);
// 2307 "Cannot find module", 2792 the same with a moduleResolution hint.
const MISSING_MODULE = new Set([2307, 2792]);

// Turns one compiler diagnostic into a finding, or null when it isn't about
// something an @temporalio package declares.
function classify(diagnostic, checker, packages) {
  const { file: sourceFile, start, code } = diagnostic;
  if (!sourceFile || start === undefined) return null;
  const node = nodeAt(sourceFile, start);
  if (!node) return null;
  const message = tidy(ts.flattenDiagnosticMessageText(diagnostic.messageText, ' '));

  if (MISSING_MEMBER.has(code)) {
    const access = node.parent;
    if (!access || !ts.isPropertyAccessExpression(access) || access.name !== node) return null;
    const owner = sdkOwner(checker.getTypeAtLocation(access.expression), checker);
    if (!owner) return null;
    const expression = squash(access.getText(sourceFile));
    if (owner.module) {
      return {
        kind: 'missing-export',
        subject: `${owner.pkg}:${node.text}`,
        pkg: owner.pkg,
        message: `${expression}: ${owner.pkg} has no export named '${node.text}'.`,
      };
    }
    return {
      kind: 'missing-member',
      subject: `${owner.owner}.${node.text}`,
      pkg: owner.pkg,
      message: `${expression}: ${message}`,
    };
  }

  if (MISSING_EXPORT.has(code)) {
    const specifier = moduleSpecifierOf(node);
    if (!specifier?.startsWith('@temporalio/')) return null;
    return {
      kind: 'missing-export',
      subject: `${specifier}:${node.getText(sourceFile)}`,
      pkg: specifier.match(/^@temporalio\/[^/]+/)[0],
      message,
    };
  }

  if (MISSING_NAMESPACE_MEMBER.has(code)) {
    const qualified = node.parent;
    if (!qualified || !ts.isQualifiedName(qualified) || qualified.right !== node) return null;
    let symbol = checker.getSymbolAtLocation(qualified.left);
    if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol);
    const pkg = packageOfSymbol(symbol);
    if (!pkg) return null;
    return {
      kind: 'missing-export',
      subject: `${pkg}:${node.text}`,
      pkg,
      message,
    };
  }

  if (MISSING_MODULE.has(code)) {
    if (!ts.isStringLiteral(node) || !node.text.startsWith('@temporalio/')) return null;
    const pkg = node.text.match(/^@temporalio\/[^/]+/)[0];
    const info = packages.get(pkg);
    // A package that was skipped, or that has no release at the requested
    // version, says nothing about the sample.
    if (!info || info.noSuchVersion) return null;
    return {
      kind: 'missing-module',
      subject: node.text,
      pkg,
      message: info.missing
        ? `${pkg} is not published on npm.`
        : `${pkg}@${info.version} has no module '${node.text}'.`,
    };
  }

  return null;
}

// Builds one program holding every sample. `root` is the directory whose
// node_modules holds the packages; `files` are extra in-memory files, which
// tests use for fake packages.
function createSampleProgram(samples, { root, files = new Map() }) {
  const posixRoot = root.split(path.sep).join('/');
  const virtual = new Map(files);
  const ambient = `${posixRoot}/samples/ambient.d.ts`;
  virtual.set(ambient, ambientDeclarations());

  const byFile = new Map();
  samples.forEach((sample, i) => {
    const fileName = `${posixRoot}/samples/sample-${i}.ts`;
    virtual.set(fileName, sample.code);
    byFile.set(fileName, sample);
  });

  const program = ts.createProgram({
    rootNames: [ambient, ...byFile.keys()],
    options: COMPILER_OPTIONS,
    host: createHost(virtual),
  });
  return { program, byFile };
}

// Type-checks every sample and returns the findings. `packages` maps package
// name to the result of fetching it.
function checkSamples(samples, { root, files, packages = new Map() }) {
  const { program, byFile } = createSampleProgram(samples, { root, files });
  const checker = program.getTypeChecker();

  const findings = [];
  for (const [fileName, sample] of byFile) {
    const sourceFile = program.getSourceFile(fileName);
    for (const diagnostic of program.getSemanticDiagnostics(sourceFile)) {
      const finding = classify(diagnostic, checker, packages);
      if (!finding) continue;
      const { line } = sourceFile.getLineAndCharacterOfPosition(diagnostic.start);
      const version = packages.get(finding.pkg)?.version;
      findings.push({
        file: sample.file,
        line: sample.line + line,
        kind: finding.kind,
        subject: finding.subject,
        message: version ? `${finding.message} (${finding.pkg}@${version})` : finding.message,
      });
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// Links in code comments
// ---------------------------------------------------------------------------

// Every comment in a sample, found from the parse tree so a `//` inside a
// string or URL isn't mistaken for one.
function commentsIn(code) {
  const sourceFile = ts.createSourceFile('sample.ts', code, ts.ScriptTarget.Latest, true);
  const seen = new Set();
  const comments = [];
  const collect = (ranges) => {
    for (const range of ranges ?? []) {
      if (seen.has(range.pos)) continue;
      seen.add(range.pos);
      comments.push({
        text: code.slice(range.pos, range.end),
        line: sourceFile.getLineAndCharacterOfPosition(range.pos).line,
        pos: range.pos,
      });
    }
  };
  const visit = (node) => {
    collect(ts.getLeadingCommentRanges(code, node.getFullStart()));
    collect(ts.getTrailingCommentRanges(code, node.getEnd()));
    for (const child of node.getChildren(sourceFile)) visit(child);
  };
  visit(sourceFile);
  return comments.sort((a, b) => a.pos - b.pos);
}

const ABSOLUTE_DOCS_URL = /https?:\/\/docs\.temporal\.io(\/[^\s'"`<>()[\]]*)?/g;
// A site-relative path, starting at a word boundary rather than inside a URL.
const RELATIVE_PATH = /(?<![\w.:/-])(\/[A-Za-z0-9][\w\-./]*(?:#[\w\-.]+)?)/g;

// Docs links in a sample's comments, as site paths with an optional fragment.
// A relative path counts only if its first segment is one the site serves or
// redirects, so a filesystem path such as /tmp/certs is left alone.
function findCommentLinks(code, isSitePath) {
  const links = [];
  for (const comment of commentsIn(code)) {
    const lines = comment.text.split('\n');
    lines.forEach((text, offset) => {
      const found = new Set();
      for (const m of text.matchAll(ABSOLUTE_DOCS_URL)) {
        found.add(m[1] ?? '/');
        text = text.replace(m[0], ' ');
      }
      for (const m of text.matchAll(RELATIVE_PATH)) {
        if (isSitePath(m[1])) found.add(m[1]);
      }
      for (const href of found) {
        links.push({ line: comment.line + offset, href: href.replace(/[.,;:]+$/, '') });
      }
    });
  }
  return links;
}

// Heading anchors on a page, computed the way Docusaurus does: an explicit
// {#id}, otherwise the heading's text through github-slugger. Plus any id
// attribute written in JSX or HTML.
function anchorsOf(source, { createSlugger, parseMarkdownHeadingId }) {
  const slugger = createSlugger();
  const anchors = new Set();
  let fence = null;
  for (const line of source.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      continue;
    }
    if (fence) continue;

    const heading = line.match(/^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const { text, id } = parseMarkdownHeadingId(heading[1]);
      const plain = text
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, '');
      anchors.add(id ?? slugger.slug(plain));
    }
    for (const m of line.matchAll(/\b(?:id|name)=(?:"([^"]+)"|'([^']+)'|\{['"]([^'"]+)['"]\})/g)) {
      anchors.add(m[1] ?? m[2] ?? m[3]);
    }
  }
  return anchors;
}

// The partials a page renders, which contribute their headings to the page.
function importedMdx(file, source, root) {
  const out = [];
  for (const m of source.matchAll(/^import\s+\w+\s+from\s+['"]([^'"]+\.mdx?)['"]/gm)) {
    const target = m[1].startsWith('@site/')
      ? path.join(root, m[1].slice('@site/'.length))
      : path.resolve(path.dirname(file), m[1]);
    if (fs.existsSync(target)) out.push(target);
  }
  return out;
}

// What the comment-link check needs to know about the site: which paths it
// serves, how vercel.json redirects them, and the anchors on each page.
function loadSite(root = process.cwd()) {
  const matter = require('gray-matter');
  const docusaurusUtils = require('@docusaurus/utils');
  const { buildRouteIndex, docUrl } = require('./redirect-routes');
  const { compileRedirects } = require('./redirect-utils');
  const { walkDir } = require('../plugins/shared/docsRouting');

  const routes = buildRouteIndex(root);
  const redirects = compileRedirects(
    JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8')).redirects ?? []
  );

  const docsDir = path.join(root, DOCS_DIR);
  const pages = new Map();
  for (const file of walkDir(docsDir)) {
    const { data } = matter(fs.readFileSync(file, 'utf8'));
    pages.set(docUrl(docsDir, file, data, '/'), file);
  }

  const firstSegments = new Set(
    [...routes.urls, ...redirects.map((r) => r.source ?? '')].map((p) => p.split('/')[1]).filter(Boolean)
  );

  const anchorCache = new Map();
  const anchors = (urlPath) => {
    const file = pages.get(urlPath);
    if (!file) return null;
    if (!anchorCache.has(file)) {
      const source = fs.readFileSync(file, 'utf8');
      const set = anchorsOf(source, docusaurusUtils);
      for (const partial of importedMdx(file, source, root)) {
        for (const a of anchorsOf(fs.readFileSync(partial, 'utf8'), docusaurusUtils)) set.add(a);
      }
      anchorCache.set(file, set);
    }
    return anchorCache.get(file);
  };

  return {
    has: routes.has,
    maybe: routes.maybe,
    redirects,
    anchors,
    isSitePath: (p) => firstSegments.has(p.split(/[/#]/)[1]),
  };
}

// Why a comment link doesn't resolve, or null when it does. A redirect counts
// as resolving only if the page it lands on has the anchor, because a
// catch-all redirect sends every old path to a section landing page.
function checkLink(href, site) {
  const { followRedirects, normalizePath } = require('./redirect-utils');
  const [rawPath, anchor] = href.split('#');
  const start = normalizePath(rawPath || '/');

  let target = start;
  let via = '';
  if (!site.has(start)) {
    if (site.maybe(start)) return null;
    const result = followRedirects(start, site.redirects);
    if (result.external) return null;
    if (result.chain.length === 0 || !site.maybe(result.final)) {
      return result.chain.length === 0
        ? `${start} is not a page on the site.`
        : `${start} redirects to ${result.final}, which is not a page on the site.`;
    }
    target = result.final;
    via = ` (${start} redirects there)`;
  }

  if (!anchor) return null;
  const anchors = site.anchors(target);
  if (!anchors || anchors.has(anchor)) return null;
  return `${target} has no #${anchor} heading${via}.`;
}

function checkCommentLinks(samples, site) {
  const findings = [];
  for (const sample of samples) {
    for (const link of findCommentLinks(sample.code, site.isSitePath)) {
      const problem = checkLink(link.href, site);
      if (!problem) continue;
      findings.push({
        file: sample.file,
        line: sample.line + link.line,
        kind: 'comment-link',
        subject: link.href,
        message: `${link.href}: ${problem}`,
      });
    }
  }
  return findings;
}

// ---------------------------------------------------------------------------
// Baseline and reporting
// ---------------------------------------------------------------------------

const keyOf = (f) => `${f.file}\u0000${f.kind}\u0000${f.subject}`;

// Accepted findings are recorded without line numbers, so one entry covers
// every occurrence of the same subject on a page.
function applyBaseline(findings, baseline) {
  const known = new Set(baseline.findings.map(keyOf));
  const found = new Set(findings.map(keyOf));
  return {
    remaining: findings.filter((f) => !known.has(keyOf(f))),
    baselined: findings.filter((f) => known.has(keyOf(f))).length,
    stale: baseline.findings.filter((e) => !found.has(keyOf(e))),
  };
}

function updatedBaseline(findings, baseline) {
  const notes = new Map(baseline.findings.map((e) => [keyOf(e), e.note]));
  const entries = new Map();
  for (const f of findings) {
    const key = keyOf(f);
    if (!entries.has(key)) {
      entries.set(key, { file: f.file, kind: f.kind, subject: f.subject, note: notes.get(key) ?? '' });
    }
  }
  return {
    comment: baseline.comment || DEFAULT_COMMENT,
    findings: [...entries.values()].sort((a, b) => keyOf(a).localeCompare(keyOf(b))),
  };
}

function loadBaseline() {
  if (!fs.existsSync(BASELINE)) return { comment: DEFAULT_COMMENT, findings: [] };
  return JSON.parse(fs.readFileSync(BASELINE, 'utf8'));
}

function describeSources(packages) {
  const fetched = packages.filter((p) => p.version);
  const versions = [...new Set(fetched.map((p) => p.version))];
  const lines = [];
  if (versions.length === 1) {
    lines.push(`Checked against @temporalio/* ${versions[0]}: ${fetched.map((p) => p.name.slice(12)).join(', ')}`);
  } else {
    lines.push('Checked against:');
    for (const p of fetched) lines.push(`  ${p.name}@${p.version}`);
  }
  for (const p of packages.filter((p) => p.noSuchVersion))
    lines.push(`  ${p.name}: no release at that version, skipped`);
  return lines;
}

function report({ remaining, baselined, stale }, { packages, sampleCount, snipsync, fullScan }) {
  const lines = [...describeSources(packages)];
  lines.push(`${sampleCount} hand-written samples checked; ${snipsync} Snipsync samples skipped.`, '');

  const byFile = new Map();
  for (const f of remaining) {
    if (!byFile.has(f.file)) byFile.set(f.file, []);
    byFile.get(f.file).push(f);
  }
  for (const [file, list] of byFile) {
    lines.push(file);
    for (const f of list) lines.push(`  ${String(f.line).padStart(5)}  ${f.kind.padEnd(14)}  ${f.message}`);
    lines.push('');
  }

  if (fullScan && stale.length) {
    lines.push('Baseline entries that no longer match anything (remove them):');
    for (const e of stale) lines.push(`  ${e.file}  ${e.kind}  ${e.subject}`);
    lines.push('');
  }

  const accepted = baselined ? ` (${baselined} more accepted in ${BASELINE})` : '';
  lines.push(
    remaining.length === 0
      ? `No findings${accepted}.`
      : `${remaining.length} finding(s) in ${byFile.size} page(s)${accepted}.`
  );
  return lines.join('\n');
}

// GitHub Actions workflow commands, one warning per finding.
function annotations(findings) {
  const escape = (s) => s.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
  return findings.map(
    (f) => `::warning file=${f.file},line=${f.line},title=TypeScript sample (${f.kind})::${escape(f.message)}`
  );
}

function optionValue(args, name) {
  const i = args.indexOf(name);
  if (i === -1) return null;
  const value = args[i + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} needs a value.`);
  args.splice(i, 2);
  return value;
}

async function main() {
  const args = process.argv.slice(2);
  const version = optionValue(args, '--sdk-version') ?? 'latest';
  const cacheDir = path.resolve(
    optionValue(args, '--cache-dir') ?? path.join(os.tmpdir(), 'temporal-typescript-samples')
  );
  const flags = new Set(args.filter((a) => a.startsWith('--')));
  const targets = args.filter((a) => !a.startsWith('--'));
  const fullScan = targets.length === 0;

  for (const flag of flags) {
    if (!['--json', '--github', '--update-baseline'].includes(flag)) throw new Error(`Unknown option ${flag}.`);
  }
  if (!fullScan && flags.has('--update-baseline')) {
    throw new Error('--update-baseline needs a full scan; drop the paths.');
  }

  const missing = targets.filter((t) => !fs.existsSync(t));
  if (missing.length) throw new Error(`No such file or directory: ${missing.join(', ')}`);
  const { samples, snipsync } = collectSamples(fullScan ? [DOCS_DIR] : targets);

  const requested = new Set(CORE_PACKAGES);
  for (const sample of samples) for (const name of importedPackages(sample.code)) requested.add(name);
  const packages = await fetchPackages(requested, version, cacheDir);
  const packageMap = new Map(packages.map((p) => [p.name, p]));

  // Without these there is nothing to check against, and every sample would
  // pass. That's a broken run, not a clean one.
  const absent = CORE_PACKAGES.filter((name) => !packageMap.get(name)?.version);
  if (absent.length) {
    throw new Error(`Could not fetch ${absent.map((name) => `${name}@${version}`).join(', ')} from npm.`);
  }

  const findings = [
    ...checkSamples(samples, { root: cacheDir, packages: packageMap }),
    ...checkCommentLinks(samples, loadSite()),
  ].sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line);

  const baseline = loadBaseline();

  if (flags.has('--update-baseline')) {
    const updated = updatedBaseline(findings, baseline);
    fs.writeFileSync(BASELINE, `${JSON.stringify(updated, null, 2)}\n`);
    console.log(`Wrote ${BASELINE} with ${updated.findings.length} entries. Add a note for any entry that has none.`);
    return 0;
  }

  const result = applyBaseline(findings, baseline);
  if (!fullScan) result.stale = [];

  if (flags.has('--json')) {
    console.log(
      JSON.stringify(
        {
          packages: packages.map(({ dependencies, ...p }) => p),
          samples: samples.length,
          snipsync,
          ...result,
        },
        null,
        2
      )
    );
  } else {
    console.log(report(result, { packages, sampleCount: samples.length, snipsync, fullScan }));
  }
  if (flags.has('--github')) {
    for (const line of annotations(result.remaining)) console.log(line);
  }

  return result.remaining.length + result.stale.length;
}

module.exports = {
  AMBIENT,
  BASELINE,
  extractCodeBlocks,
  extractSamples,
  importedPackages,
  createSampleProgram,
  checkSamples,
  commentsIn,
  findCommentLinks,
  anchorsOf,
  checkLink,
  loadSite,
  applyBaseline,
  updatedBaseline,
  annotations,
};

if (require.main === module) {
  main().then(
    (count) => process.exit(count > 0 ? 2 : 0),
    (error) => {
      console.error(error.message);
      process.exit(1);
    }
  );
}
