#!/usr/bin/env node

// Checks the internal consistency of the SDK metrics reference.
//
// The page states the same facts twice: once in the summary table and once in
// the per-metric section below it. Nothing kept the two in sync, which is how
// the table came to link two metrics to each other's anchors and to disagree
// with five sections about which SDKs emit a metric.
//
// This check is deliberately self-contained. It reads no SDK source and cannot
// tell you that a documented metric name is wrong, only that the page
// contradicts itself or uses a value outside the vocabularies below.
//
//   node bin/check-metrics-reference.js

const fs = require('fs');
const path = require('path');

const PAGES = [path.join('docs', 'references', 'sdk-metrics.mdx')];

const METRIC_TYPES = ['Counter', 'Gauge', 'Histogram'];
const EMITTERS = ['Worker', 'Service Client'];
const SDKS = ['Core', 'Go', 'Java'];

// Every tag any metric on the page is allowed to carry. Both the shared key
// list near the top of the page and each metric's own "Tags" line are checked
// against this, so a hyphen/underscore slip in either place is a failure.
const TAGS = [
  'activity_type',
  'cause',
  'failure_reason',
  'namespace',
  'nexus_operation',
  'nexus_service',
  'operation',
  'poller_type',
  'status_code',
  'task_queue',
  'worker_type',
  'workflow_type',
];

// The units admonition explains that histograms are milliseconds in Core-based
// SDKs and seconds in Go and Java, so an individual metric must not claim one.
const UNIT_CLAIM = /\bin (seconds|milliseconds)\b/i;

const METRIC_NAME = '[a-z0-9_]+';

function parseTable(content) {
  const lines = content.split('\n');
  const start = lines.findIndex((l) => l.startsWith('| Metric name'));
  if (start === -1) return [];

  const rows = [];
  for (let i = start + 2; i < lines.length; i++) {
    const line = lines[i];
    if (!line.startsWith('|')) break;

    const cells = line
      .slice(1, line.lastIndexOf('|'))
      .split('|')
      .map((c) => c.trim());

    const link = cells[0].match(
      new RegExp(`^\\[temporal_(${METRIC_NAME})\\]\\(#(${METRIC_NAME})\\)$`),
    );

    rows.push({
      line: i + 1,
      raw: cells[0],
      name: link ? link[1] : null,
      anchor: link ? link[2] : null,
      emitter: cells[1],
      type: cells[2],
      availability: cells[3],
    });
  }
  return rows;
}

function parseSections(content) {
  const parts = content.split(new RegExp(`^### \`(${METRIC_NAME})\`$`, 'm'));
  const sections = [];

  for (let i = 1; i < parts.length; i += 2) {
    const body = parts[i + 1];
    const field = (label) => {
      const m = body.match(new RegExp(`^- ${label}: (.*)$`, 'm'));
      return m ? m[1].trim() : null;
    };

    sections.push({
      name: parts[i],
      type: field('Type'),
      availability: field('Available in'),
      tags: field('Tags'),
      // Prose above the first bullet, which is where a stray unit claim lands.
      description: body.split('\n- ')[0],
    });
  }
  return sections;
}

// Headings must be a backticked metric name so the anchors stay predictable
// and match the sibling cluster-metrics reference.
function findMalformedHeadings(content) {
  return content
    .split('\n')
    .map((line, i) => ({ line: i + 1, text: line }))
    .filter(
      ({ text }) =>
        text.startsWith('### ') &&
        !new RegExp(`^### \`${METRIC_NAME}\`$`).test(text),
    );
}

// The shared "Each metric may have..." list, whose entries are backticked tag
// names at one indent level. Nested entries are tag *values*, not names.
function parseTagList(content) {
  const start = content.indexOf('Each metric may have');
  if (start === -1) return [];
  const block = content.slice(start).split('\n\n').slice(0, 2).join('\n\n');

  return [...block.matchAll(/^- `([a-z0-9_-]+)`/gm)].map((m) => m[1]);
}

function splitList(value) {
  return value.split(',').map((v) => v.trim());
}

function backtickedNames(value) {
  return [...value.matchAll(/`([a-z0-9_-]+)`/g)].map((m) => m[1]);
}

function checkPage(content) {
  const problems = [];
  const add = (msg) => problems.push(msg);

  for (const { line, text } of findMalformedHeadings(content)) {
    add(`line ${line}: heading is not a backticked metric name: ${text}`);
  }

  for (const tag of parseTagList(content)) {
    if (!TAGS.includes(tag)) {
      add(`shared tag list: unknown tag \`${tag}\``);
    }
  }

  const rows = parseTable(content);
  const sections = parseSections(content);

  if (rows.length === 0) add('summary table not found or empty');
  if (sections.length === 0) add('no metric sections found');

  const sectionsByName = new Map(sections.map((s) => [s.name, s]));

  for (const row of rows) {
    if (!row.name) {
      add(`line ${row.line}: table row is not a temporal_ metric link: ${row.raw}`);
      continue;
    }

    const label = row.name;

    if (row.anchor !== row.name) {
      add(`${label}: table links to #${row.anchor}`);
    }
    if (!EMITTERS.includes(row.emitter)) {
      add(`${label}: unknown "Emitted by" value "${row.emitter}"`);
    }
    if (!METRIC_TYPES.includes(row.type)) {
      add(`${label}: unknown metric type "${row.type}" in table`);
    }
    for (const sdk of splitList(row.availability)) {
      if (!SDKS.includes(sdk)) {
        add(`${label}: unknown SDK "${sdk}" in table availability`);
      }
    }

    const section = sectionsByName.get(row.anchor);
    if (!section) {
      add(`${label}: table links to #${row.anchor} but no such section exists`);
      continue;
    }

    if (section.type !== row.type) {
      add(
        `${label}: type disagrees (table "${row.type}", section "${section.type}")`,
      );
    }
    if (section.availability !== row.availability) {
      add(
        `${label}: availability disagrees (table "${row.availability}", section "${section.availability}")`,
      );
    }
  }

  const rowsByAnchor = new Set(rows.map((r) => r.anchor));

  for (const section of sections) {
    const label = section.name;

    if (!rowsByAnchor.has(section.name)) {
      add(`${label}: has a section but no summary table row`);
    }

    if (section.type === null) {
      add(`${label}: section is missing a "Type" line`);
    } else if (!METRIC_TYPES.includes(section.type)) {
      add(`${label}: unknown metric type "${section.type}" in section`);
    }

    if (section.availability === null) {
      add(`${label}: section is missing an "Available in" line`);
    } else {
      for (const sdk of splitList(section.availability)) {
        if (!SDKS.includes(sdk)) {
          add(`${label}: unknown SDK "${sdk}" in section availability`);
        }
      }
    }

    if (section.tags !== null) {
      for (const tag of backtickedNames(section.tags)) {
        if (!TAGS.includes(tag)) {
          add(`${label}: unknown tag \`${tag}\``);
        }
      }
    }

    const unit = section.description.match(UNIT_CLAIM);
    if (unit) {
      add(
        `${label}: description says "${unit[0]}", which contradicts the units admonition`,
      );
    }
  }

  return problems;
}

function main() {
  let failed = false;

  for (const page of PAGES) {
    const content = fs.readFileSync(path.join(process.cwd(), page), 'utf8');
    const problems = checkPage(content);

    if (problems.length === 0) {
      const count = parseTable(content).length;
      console.log(`${page}: ${count} metrics consistent.`);
      continue;
    }

    failed = true;
    console.error(`${page}: ${problems.length} problem(s)\n`);
    for (const problem of problems) {
      console.error(`  ${problem}`);
    }
    console.error('');
  }

  process.exit(failed ? 1 : 0);
}

module.exports = {
  PAGES,
  TAGS,
  parseTable,
  parseSections,
  parseTagList,
  findMalformedHeadings,
  checkPage,
};

if (require.main === module) {
  main();
}
