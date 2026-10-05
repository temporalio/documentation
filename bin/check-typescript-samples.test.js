const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const { compileRedirects } = require('./redirect-utils');
const {
  BASELINE,
  extractCodeBlocks,
  extractSamples,
  importedPackages,
  checkSamples,
  commentsIn,
  findCommentLinks,
  anchorsOf,
  checkLink,
  applyBaseline,
  updatedBaseline,
  annotations,
} = require('./check-typescript-samples.js');

const fence = '```';

describe('extractCodeBlocks', () => {
  it('reports the line of the first line of code', () => {
    const page = ['# Title', '', `${fence}ts`, 'const a = 1;', 'const b = 2;', fence].join('\n');
    const [block] = extractCodeBlocks(page);
    assert.strictEqual(block.lang, 'ts');
    assert.strictEqual(block.line, 4);
    assert.strictEqual(block.code, 'const a = 1;\nconst b = 2;');
  });

  it('reads the language out of an info string with a title or highlighted lines', () => {
    const page = [`${fence}typescript title="client.ts" {1,3}`, 'x', fence, `${fence}ts{2}`, 'y', fence].join('\n');
    assert.deepStrictEqual(
      extractCodeBlocks(page).map((b) => b.lang),
      ['typescript', 'ts']
    );
  });

  it('removes the indentation of a fence inside a list item or component', () => {
    const page = ['- Step one:', '', `  ${fence}ts`, '  if (a) {', '    b();', '  }', `  ${fence}`].join('\n');
    assert.strictEqual(extractCodeBlocks(page)[0].code, 'if (a) {\n  b();\n}');
  });

  it('keeps a shorter fence inside a longer one as code', () => {
    const page = ['````md', `${fence}ts`, 'nested();', fence, '````'].join('\n');
    const blocks = extractCodeBlocks(page);
    assert.strictEqual(blocks.length, 1);
    assert.strictEqual(blocks[0].lang, 'md');
  });

  it('accepts tilde fences', () => {
    const page = ['~~~js', 'run();', '~~~'].join('\n');
    assert.strictEqual(extractCodeBlocks(page)[0].code, 'run();');
  });

  it('marks blocks inside either form of Snipsync wrapper', () => {
    const page = [
      '<!--SNIPSTART typescript-hello-client-->',
      `${fence}ts`,
      'synced();',
      fence,
      '<!--SNIPEND-->',
      `${fence}ts`,
      'handWritten();',
      fence,
      '{/* SNIPSTART typescript-env-config {"highlightedLines": "1-2"} */}',
      `${fence}ts`,
      'alsoSynced();',
      fence,
      '{/* SNIPEND */}',
    ].join('\n');
    assert.deepStrictEqual(
      extractCodeBlocks(page).map((b) => [b.code, b.snipsync]),
      [
        ['synced();', true],
        ['handWritten();', false],
        ['alsoSynced();', true],
      ]
    );
  });

  it('skips code inside a comment, which is never rendered', () => {
    const page = [
      '<!--',
      `${fence}ts`,
      'hiddenHtml();',
      fence,
      '-->',
      '{/*',
      `${fence}ts`,
      'hiddenMdx();',
      fence,
      '*/}',
      '<!-- a one-line comment -->',
      `${fence}ts`,
      'shown();',
      fence,
    ].join('\n');
    assert.deepStrictEqual(
      extractCodeBlocks(page).map((b) => b.code),
      ['shown();']
    );
  });
});

describe('extractSamples', () => {
  it('keeps hand-written TypeScript and JavaScript only', () => {
    const page = [
      `${fence}ts`,
      'a();',
      fence,
      `${fence}javascript`,
      'b();',
      fence,
      `${fence}python`,
      'c()',
      fence,
      '<!--SNIPSTART x-->',
      `${fence}typescript`,
      'd();',
      fence,
      '<!--SNIPEND-->',
    ].join('\n');
    assert.deepStrictEqual(
      extractSamples(page).map((s) => s.code),
      ['a();', 'b();']
    );
  });
});

describe('importedPackages', () => {
  it('names the package behind an import, a subpath import, and a require', () => {
    const code = [
      "import { proxyActivities } from '@temporalio/workflow';",
      "import { WorkflowStream } from '@temporalio/workflow-streams/workflow';",
      "const { Client } = require('@temporalio/client');",
      "import { openai } from '@ai-sdk/openai';",
      "import * as activities from './activities';",
    ].join('\n');
    assert.deepStrictEqual([...importedPackages(code)].sort(), [
      '@temporalio/client',
      '@temporalio/workflow',
      '@temporalio/workflow-streams',
    ]);
  });
});

// Fake packages, trimmed to the shapes the matching has to get right. The
// real ones are fetched from npm, which a unit test shouldn't depend on.
const ROOT = '/virtual';
const fakePackage = (name, declarations) => [
  [`${ROOT}/node_modules/${name}/package.json`, JSON.stringify({ name, version: '9.9.9', types: 'index.d.ts' })],
  [`${ROOT}/node_modules/${name}/index.d.ts`, declarations],
];
const FILES = new Map([
  ...fakePackage(
    '@temporalio/client',
    `
export declare class Connection {
  static connect(): Promise<Connection>;
  static lazy(): Connection;
  protected static createCtorOptions(): unknown;
  close(): Promise<void>;
}
export declare class WorkflowClient {
  start(workflow: unknown, options: unknown): Promise<unknown>;
  getHandle(workflowId: string): unknown;
}
export declare class Client {
  constructor(options?: unknown);
  readonly workflow: WorkflowClient;
}
`
  ),
  [
    `${ROOT}/node_modules/@temporalio/client/lib/errors.d.ts`,
    'export declare class WorkflowFailedError extends Error {}',
  ],
  ...fakePackage(
    '@temporalio/workflow',
    `
export declare function proxyActivities<A>(options?: unknown): A;
export declare function sleep(ms: number): Promise<void>;
`
  ),
  ...fakePackage(
    '@temporalio/testing',
    `
import { EventEmitter } from 'a-package-that-was-not-fetched';
export declare class MockActivityEnvironment extends EventEmitter {
  run(fn: unknown): Promise<unknown>;
}
`
  ),
]);
const PACKAGES = new Map(
  ['@temporalio/client', '@temporalio/workflow', '@temporalio/testing'].map((name) => [
    name,
    { name, version: '9.9.9' },
  ])
);

// Samples are checked together, the way the real run checks them.
const check = (...codes) =>
  checkSamples(
    codes.map((code, i) => ({ file: `docs/page-${i}.mdx`, line: 10, code })),
    { root: ROOT, files: FILES, packages: PACKAGES }
  );

describe('checkSamples', () => {
  it('flags a static method the class does not have, at the line it is on in the page', () => {
    const findings = check(
      [
        "import { Client, Connection } from '@temporalio/client';",
        'const connection = await Connection.create();',
        'const client = new Client({ connection });',
      ].join('\n')
    );
    assert.strictEqual(findings.length, 1);
    assert.deepStrictEqual(
      { file: findings[0].file, line: findings[0].line, kind: findings[0].kind, subject: findings[0].subject },
      { file: 'docs/page-0.mdx', line: 11, kind: 'missing-member', subject: 'Connection.create' }
    );
    assert.match(findings[0].message, /^Connection\.create: Property 'create' does not exist/);
    assert.match(findings[0].message, /@temporalio\/client@9\.9\.9/);
  });

  it('accepts the methods the class does have', () => {
    const findings = check(
      [
        "import { Connection } from '@temporalio/client';",
        'const a = await Connection.connect();',
        'const b = Connection.lazy();',
        'await a.close();',
      ].join('\n')
    );
    assert.deepStrictEqual(findings, []);
  });

  it('follows the type through an instance and a property', () => {
    const findings = check(
      [
        "import { Client } from '@temporalio/client';",
        'const client = new Client();',
        "await client.workflow.start(example, { taskQueue: 'q' });",
        "await client.workflow.execute(example, { taskQueue: 'q' });",
      ].join('\n')
    );
    assert.deepStrictEqual(
      findings.map((f) => f.subject),
      ['WorkflowClient.execute']
    );
  });

  it('treats an undeclared client as a Client and an undeclared Connection as the SDK class', () => {
    const findings = check("const handle = client.getHandle('id');", 'await Connection.create();');
    assert.deepStrictEqual(
      findings.map((f) => f.subject),
      ['Client.getHandle', 'Connection.create']
    );
  });

  it("lets a sample's own declaration shadow the ambient one", () => {
    const findings = check('const client = { getHandle(id: string) {} };\nclient.getHandle("id");');
    assert.deepStrictEqual(findings, []);
  });

  it('keeps each sample in its own scope', () => {
    // Neither sample imports anything. If the first one's declaration leaked
    // into the second, `connection` there would be a Connection and
    // `connection.missing` a finding.
    const findings = check('const connection = Connection.lazy();', 'connection.missing();');
    assert.deepStrictEqual(findings, []);
  });

  it('ignores the noise a fragment produces', () => {
    const findings = check(
      [
        "import { thing } from './activities';",
        "import { openai } from '@ai-sdk/openai';",
        'const result = await undeclaredHandle.result();',
        'const local = {};',
        'local.missing;',
        'openai.anything();',
      ].join('\n')
    );
    assert.deepStrictEqual(findings, []);
  });

  it('flags a named import the package does not export', () => {
    const findings = check("import { executeActivity, sleep } from '@temporalio/workflow';");
    assert.deepStrictEqual(
      findings.map((f) => [f.kind, f.subject]),
      [['missing-export', '@temporalio/workflow:executeActivity']]
    );
  });

  it('flags a missing export reached through a namespace import, declared or not', () => {
    const findings = check(
      "import * as workflow from '@temporalio/workflow';\nworkflow.RetryState.TIMEOUT;",
      'wf.TimeoutType.START_TO_CLOSE;'
    );
    assert.deepStrictEqual(
      findings.map((f) => [f.kind, f.subject]),
      [
        ['missing-export', '@temporalio/workflow:RetryState'],
        ['missing-export', '@temporalio/workflow:TimeoutType'],
      ]
    );
    assert.match(findings[0].message, /^workflow\.RetryState: @temporalio\/workflow has no export named 'RetryState'/);
  });

  it('flags a subpath the package does not have, and accepts one it does', () => {
    const findings = check(
      "import { WorkflowFailedError } from '@temporalio/client/lib/errors';\nimport { x } from '@temporalio/client/lib/moved';"
    );
    assert.deepStrictEqual(
      findings.map((f) => [f.kind, f.subject]),
      [['missing-module', '@temporalio/client/lib/moved']]
    );
  });

  it('flags a package that is not published, but not one that was skipped', () => {
    const packages = new Map([
      ...PACKAGES,
      ['@temporalio/renamed', { name: '@temporalio/renamed', missing: true }],
      ['@temporalio/too-new', { name: '@temporalio/too-new', noSuchVersion: true }],
    ]);
    const findings = checkSamples(
      [
        {
          file: 'docs/page.mdx',
          line: 1,
          code: [
            "import { a } from '@temporalio/renamed';",
            "import { b } from '@temporalio/too-new';",
            "import { c } from '@temporalio/core-bridge';",
          ].join('\n'),
        },
      ],
      { root: ROOT, files: FILES, packages }
    );
    assert.deepStrictEqual(
      findings.map((f) => [f.subject, f.message]),
      [['@temporalio/renamed', '@temporalio/renamed is not published on npm.']]
    );
  });

  it('does not guess about a class whose base class could not be resolved', () => {
    // MockActivityEnvironment really does extend EventEmitter, so `on` exists
    // even though the compiler can't see it here.
    const findings = check(
      "import { MockActivityEnvironment } from '@temporalio/testing';\nconst env = new MockActivityEnvironment();\nenv.on('heartbeat', () => {});"
    );
    assert.deepStrictEqual(findings, []);
  });
});

describe('commentsIn', () => {
  it('finds line and block comments, but not a // inside a string', () => {
    const code = [
      "const address = 'http://localhost:7233'; // the dev server",
      '/* first',
      '   second */',
      'run();',
    ].join('\n');
    assert.deepStrictEqual(
      commentsIn(code).map((c) => [c.line, c.text]),
      [
        [0, '// the dev server'],
        [1, '/* first\n   second */'],
      ]
    );
  });

  it('finds a comment just before a closing brace', () => {
    const code = 'function f() {\n  work();\n  // see /develop/typescript\n}';
    assert.deepStrictEqual(
      commentsIn(code).map((c) => c.line),
      [2]
    );
  });
});

describe('findCommentLinks', () => {
  const isSitePath = (p) => ['develop', 'typescript'].includes(p.split(/[/#]/)[1]);

  it('finds docs links in comments, absolute or site-relative', () => {
    const code = [
      'async function run() {',
      '  // https://docs.temporal.io/develop/typescript/client#connect.',
      '  // If you need mTLS, see docs:',
      '  // /typescript/security#encryption-in-transit-with-mtls',
      "  const url = '/develop/not-in-a-comment';",
      '}',
    ].join('\n');
    assert.deepStrictEqual(findCommentLinks(code, isSitePath), [
      { line: 1, href: '/develop/typescript/client#connect' },
      { line: 3, href: '/typescript/security#encryption-in-transit-with-mtls' },
    ]);
  });

  it('leaves alone a path that is not on the site, and links to other sites', () => {
    const code = [
      '// Certificates live in /etc/temporal/certs',
      '// https://typescript.temporal.io/api/classes/client.Connection',
    ].join('\n');
    assert.deepStrictEqual(findCommentLinks(code, isSitePath), []);
  });
});

describe('anchorsOf', () => {
  const utils = require('@docusaurus/utils');

  it('slugs headings the way Docusaurus does', () => {
    const page = [
      '## Connect to a Temporal Service',
      '### How to use `Connection.connect`',
      '## [Linked](/somewhere) heading',
      '## Explicit {#custom-id}',
      '## Repeated',
      '## Repeated',
      `${fence}bash`,
      '# not a heading',
      fence,
      '<a id="manual-anchor" />',
    ].join('\n');
    assert.deepStrictEqual([...anchorsOf(page, utils)].sort(), [
      'connect-to-a-temporal-service',
      'custom-id',
      'how-to-use-connectionconnect',
      'linked-heading',
      'manual-anchor',
      'repeated',
      'repeated-1',
    ]);
  });
});

describe('checkLink', () => {
  const pages = {
    '/develop/typescript': ['set-up'],
    '/develop/typescript/client': ['connect-to-a-temporal-service'],
  };
  const site = {
    has: (p) => p in pages,
    maybe: (p) => p in pages || p.startsWith('/ai/cookbook'),
    redirects: compileRedirects([
      { source: '/typescript/:path*', destination: '/develop/typescript' },
      { source: '/old-client', destination: '/develop/typescript/client' },
      { source: '/gone', destination: '/also-gone' },
      { source: '/elsewhere', destination: 'https://example.com' },
    ]),
    anchors: (p) => (p in pages ? new Set(pages[p]) : null),
  };

  it('accepts a page and an anchor that exist', () => {
    assert.strictEqual(checkLink('/develop/typescript/client#connect-to-a-temporal-service', site), null);
    assert.strictEqual(checkLink('/develop/typescript/client/', site), null);
  });

  it('flags an anchor the page does not have', () => {
    assert.strictEqual(
      checkLink('/develop/typescript/client#nope', site),
      '/develop/typescript/client has no #nope heading.'
    );
  });

  it('accepts a redirect that lands on the page and the anchor', () => {
    assert.strictEqual(checkLink('/old-client#connect-to-a-temporal-service', site), null);
  });

  it('flags a catch-all redirect that drops the anchor', () => {
    assert.strictEqual(
      checkLink('/typescript/security#encryption-in-transit-with-mtls', site),
      '/develop/typescript has no #encryption-in-transit-with-mtls heading (/typescript/security redirects there).'
    );
  });

  it('flags a path that is not served and a redirect to one', () => {
    assert.strictEqual(checkLink('/develop/nope', site), '/develop/nope is not a page on the site.');
    assert.strictEqual(checkLink('/gone', site), '/gone redirects to /also-gone, which is not a page on the site.');
  });

  it('leaves alone what it cannot verify', () => {
    assert.strictEqual(checkLink('/ai/cookbook/some-recipe', site), null);
    assert.strictEqual(checkLink('/elsewhere#x', site), null);
  });
});

describe('applyBaseline', () => {
  const finding = (line, subject) => ({ file: 'docs/a.mdx', line, kind: 'missing-member', subject, message: '' });
  const baseline = {
    comment: '',
    findings: [
      { file: 'docs/a.mdx', kind: 'missing-member', subject: 'Client.getHandle', note: 'Deliberate.' },
      { file: 'docs/a.mdx', kind: 'missing-member', subject: 'Worker.gone', note: '' },
    ],
  };

  it('suppresses every occurrence of an accepted subject, whatever its line', () => {
    const result = applyBaseline(
      [finding(10, 'Client.getHandle'), finding(90, 'Client.getHandle'), finding(12, 'Connection.create')],
      baseline
    );
    assert.deepStrictEqual(
      result.remaining.map((f) => f.subject),
      ['Connection.create']
    );
    assert.strictEqual(result.baselined, 2);
  });

  it('reports an entry that no longer matches anything', () => {
    const result = applyBaseline([finding(10, 'Client.getHandle')], baseline);
    assert.deepStrictEqual(
      result.stale.map((e) => e.subject),
      ['Worker.gone']
    );
  });

  it('does not let an entry for one page suppress the same subject on another', () => {
    const other = { ...finding(10, 'Client.getHandle'), file: 'docs/b.mdx' };
    assert.strictEqual(applyBaseline([other], baseline).remaining.length, 1);
  });
});

describe('updatedBaseline', () => {
  it('records each subject once, sorted, and keeps existing notes', () => {
    const findings = [
      { file: 'docs/b.mdx', line: 3, kind: 'missing-member', subject: 'Client.getHandle' },
      { file: 'docs/a.mdx', line: 9, kind: 'comment-link', subject: '/x#y' },
      { file: 'docs/b.mdx', line: 7, kind: 'missing-member', subject: 'Client.getHandle' },
    ];
    const previous = {
      comment: 'Kept.',
      findings: [{ file: 'docs/b.mdx', kind: 'missing-member', subject: 'Client.getHandle', note: 'Reviewed.' }],
    };
    assert.deepStrictEqual(updatedBaseline(findings, previous), {
      comment: 'Kept.',
      findings: [
        { file: 'docs/a.mdx', kind: 'comment-link', subject: '/x#y', note: '' },
        { file: 'docs/b.mdx', kind: 'missing-member', subject: 'Client.getHandle', note: 'Reviewed.' },
      ],
    });
  });
});

describe('annotations', () => {
  it('writes one warning per finding, escaping what workflow commands require', () => {
    assert.deepStrictEqual(
      annotations([{ file: 'docs/a.mdx', line: 4, kind: 'missing-member', message: '100% wrong\nreally' }]),
      ['::warning file=docs/a.mdx,line=4,title=TypeScript sample (missing-member)::100%25 wrong%0Areally']
    );
  });
});

describe('the checked-in baseline', () => {
  const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, '..', BASELINE), 'utf8'));

  it('stays sorted and free of duplicates, the way --update-baseline writes it', () => {
    assert.deepStrictEqual(baseline, updatedBaseline(baseline.findings, baseline));
  });

  it('explains every accepted finding', () => {
    for (const entry of baseline.findings) {
      assert.ok(entry.note, `${entry.file} ${entry.subject} has no note`);
    }
  });

  it('points at pages that exist', () => {
    for (const entry of baseline.findings) {
      assert.ok(fs.existsSync(path.join(__dirname, '..', entry.file)), `${entry.file} does not exist`);
    }
  });
});
