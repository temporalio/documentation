const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');
const {
  PAGES,
  parseTable,
  parseSections,
  parseTagList,
  findMalformedHeadings,
  checkPage,
} = require('./check-metrics-reference.js');

// A minimal page with the same shape as the real one. Each test mutates one
// thing so a failure names the rule that broke rather than the whole page.
const VALID_PAGE = `Each metric may have some combination of the following keys attached to them:

- \`task_queue\`: Task Queue that the Worker Entity is polling
- \`poller_type\`: One of the following:
  - \`workflow_task\`
- \`namespace\`: Namespace the Worker is bound to

Some keys may not be available in every SDK.

| Metric name                                  | Emitted by | Metric type | Availability   |
| -------------------------------------------- | ---------- | ----------- | -------------- |
| [temporal_worker_start](#worker_start)       | Worker     | Counter     | Core, Go, Java |
| [temporal_num_pollers](#num_pollers)         | Worker     | Gauge       | Core, Go, Java |

### \`num_pollers\`

Current number of Worker Entities that are polling.

- Type: Gauge
- Available in: Core, Go, Java
- Tags: \`namespace\`, \`poller_type\`

### \`worker_start\`

A Worker Entity has been registered.

- Type: Counter
- Available in: Core, Go, Java
- Tags: \`namespace\`, \`task_queue\`
`;

const problemsFor = (page) => checkPage(page);

describe('parseTable', () => {
  it('extracts a row per metric', () => {
    const rows = parseTable(VALID_PAGE);
    assert.strictEqual(rows.length, 2);
    assert.deepStrictEqual(
      rows.map((r) => r.name),
      ['worker_start', 'num_pollers'],
    );
  });

  it('captures the anchor separately from the metric name', () => {
    const [row] = parseTable(VALID_PAGE);
    assert.strictEqual(row.name, 'worker_start');
    assert.strictEqual(row.anchor, 'worker_start');
  });

  it('returns nothing when there is no table', () => {
    assert.deepStrictEqual(parseTable('# Just a heading\n'), []);
  });
});

describe('parseSections', () => {
  it('extracts type, availability, and tags', () => {
    const sections = parseSections(VALID_PAGE);
    assert.strictEqual(sections.length, 2);
    assert.deepStrictEqual(sections[0], {
      name: 'num_pollers',
      type: 'Gauge',
      availability: 'Core, Go, Java',
      tags: '`namespace`, `poller_type`',
      description: '\n\nCurrent number of Worker Entities that are polling.\n',
    });
  });

  it('reports missing fields as null', () => {
    const page = VALID_PAGE.replace('- Type: Gauge\n', '');
    assert.strictEqual(parseSections(page)[0].type, null);
  });
});

describe('parseTagList', () => {
  it('reads tag names from the shared key list', () => {
    assert.deepStrictEqual(parseTagList(VALID_PAGE), [
      'task_queue',
      'poller_type',
      'namespace',
    ]);
  });

  it('ignores nested tag values', () => {
    assert.ok(!parseTagList(VALID_PAGE).includes('workflow_task'));
  });
});

describe('findMalformedHeadings', () => {
  it('accepts backticked metric names', () => {
    assert.deepStrictEqual(findMalformedHeadings(VALID_PAGE), []);
  });

  it('rejects a bare heading', () => {
    const page = VALID_PAGE.replace('### `num_pollers`', '### num_pollers');
    assert.strictEqual(findMalformedHeadings(page).length, 1);
  });
});

describe('checkPage', () => {
  it('passes a well-formed page', () => {
    assert.deepStrictEqual(problemsFor(VALID_PAGE), []);
  });

  // Each case below is a bug that actually shipped on the SDK metrics page.

  it('catches a table row linking to another metric anchor', () => {
    const page = VALID_PAGE.replace(
      '[temporal_num_pollers](#num_pollers)',
      '[temporal_num_pollers](#worker_start)',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('table links to #worker_start')));
  });

  it('catches the table and section disagreeing on availability', () => {
    const page = VALID_PAGE.replace(
      '| [temporal_num_pollers](#num_pollers)         | Worker     | Gauge       | Core, Go, Java |',
      '| [temporal_num_pollers](#num_pollers)         | Worker     | Gauge       | Core, Go       |',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('availability disagrees')));
  });

  it('catches the table and section disagreeing on type', () => {
    const page = VALID_PAGE.replace('- Type: Gauge', '- Type: Counter');
    assert.ok(problemsFor(page).some((p) => p.includes('type disagrees')));
  });

  it('catches a trailing comma in an availability list', () => {
    const page = VALID_PAGE.replace(
      '- Available in: Core, Go, Java\n- Tags: `namespace`, `poller_type`',
      '- Available in: Go,\n- Tags: `namespace`, `poller_type`',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('unknown SDK ""')));
  });

  it('catches a hyphenated tag name in the shared key list', () => {
    const page = VALID_PAGE.replace('- `task_queue`:', '- `task-queue`:');
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('unknown tag `task-queue`')));
  });

  it('catches a hyphenated tag name on a metric', () => {
    const page = VALID_PAGE.replace(
      '- Tags: `namespace`, `task_queue`',
      '- Tags: `namespace`, `task-queue`',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('unknown tag `task-queue`')));
  });

  it('catches a unit claim that contradicts the units admonition', () => {
    const page = VALID_PAGE.replace(
      'Current number of Worker Entities that are polling.',
      'The Schedule-To-Start time of an Activity Task in seconds.',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('contradicts the units')));
  });

  it('catches a section with no table row', () => {
    const page = `${VALID_PAGE}\n### \`orphan_metric\`\n\nText.\n\n- Type: Counter\n- Available in: Go\n`;
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('no summary table row')));
  });

  it('catches a table row with no section', () => {
    const page = VALID_PAGE.replace(
      '### `worker_start`',
      '### `worker_started`',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('no such section exists')));
  });

  it('catches a section missing its Available in line', () => {
    const page = VALID_PAGE.replace('- Available in: Core, Go, Java\n- Tags: `namespace`, `poller_type`', '- Tags: `namespace`, `poller_type`');
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('missing an "Available in" line')));
  });

  it('catches an unknown SDK name', () => {
    const page = VALID_PAGE.replace(
      '- Available in: Core, Go, Java\n- Tags: `namespace`, `poller_type`',
      '- Available in: Core, Rust\n- Tags: `namespace`, `poller_type`',
    );
    const problems = problemsFor(page);
    assert.ok(problems.some((p) => p.includes('unknown SDK "Rust"')));
  });
});

describe('the real reference pages', () => {
  for (const page of PAGES) {
    it(`${page} is internally consistent`, () => {
      const content = fs.readFileSync(
        path.join(__dirname, '..', page),
        'utf8',
      );
      assert.deepStrictEqual(checkPage(content), []);
    });
  }
});
