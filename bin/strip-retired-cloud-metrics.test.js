const { test } = require('node:test');
const assert = require('node:assert/strict');
const { stripRetiredCloudMetrics } = require('./strip-retired-cloud-metrics');

const legacy = [
  '## audit-log',
  'Audit log commands.',
  '',
  '## metrics',
  '',
  'Commands for managing the Temporal Cloud account metrics configuration.',
  '',
  '### metrics cert-ca',
  '',
  'Certificate-authenticated endpoint commands.',
  '',
  '## Global Flags',
  '',
  'Options shared by commands.',
].join('\n');

test('removes only the retired Cloud metrics commands', () => {
  const result = stripRetiredCloudMetrics(legacy);
  assert.match(result, /## audit-log/);
  assert.match(result, /## Global Flags/);
  assert.doesNotMatch(result, /## metrics|cert-ca|Certificate-authenticated/);
});

test('leaves a reference without the retired command group unchanged', () => {
  const current = '## audit-log\n\n## Global Flags\n';
  assert.equal(stripRetiredCloudMetrics(current), current);
});

test('requires review if the CLI adds another metrics command', () => {
  const changed = legacy.replace('## Global Flags', '### metrics list\n\n## Global Flags');
  assert.throws(() => stripRetiredCloudMetrics(changed), /commands changed/);
});
