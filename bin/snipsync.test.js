const { test } = require('node:test');
const assert = require('node:assert/strict');
const { mkdtemp, writeFile, rm } = require('node:fs/promises');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const { Sync } = require('snipsync/src/Sync');
const { SourceFilteredSync } = require('./snipsync');

test('extracts source snippets without parsing Markdown marker examples', async (t) => {
  const directory = await mkdtemp(join(tmpdir(), 'snipsync-source-filter-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  const files = {
    'AGENTS.md': 'markers: `// @@@SNIPSTART <name>` ... `// @@@SNIPEND`\nNames must be unique.\n',
    'CONTRIBUTING.md': '// @@@SNIPSTART java-example\nexample, not source\n// @@@SNIPEND\n',
    'Example.java': '// @@@SNIPSTART java-example\nclass Example {}\n// @@@SNIPEND\n',
    'example.py': '# @@@SNIPSTART python-example\nprint("hello")\n# @@@SNIPEND\n',
    'example.ts': '// @@@SNIPSTART typescript-example\nconsole.log("hello");\n// @@@SNIPEND\n',
    'config.yaml': '# @@@SNIPSTART yaml-example\nkey: value\n# @@@SNIPEND\n',
  };
  await Promise.all(Object.entries(files).map(([name, content]) =>
    writeFile(join(directory, name), content)));

  const filteredOrigin = {
    owner: 'temporalio', repo: 'documentation-sdk-code-examples',
    allowed_source_extensions: ['.java', '.py', '.ts'],
  };
  const otherOrigin = { owner: 'temporalio', repo: 'samples-go' };
  const localRepo = (origin, names) => ({
    rtype: 'local', owner: origin.owner, repo: origin.repo,
    filePaths: names.map((name) => ({ directory, name })),
  });
  const unfilteredRepository = localRepo(otherOrigin, ['config.yaml']);
  t.mock.method(Sync.prototype, 'getRepos', async () => [
    localRepo(filteredOrigin, Object.keys(files)), unfilteredRepository,
  ]);
  const sync = new SourceFilteredSync({ origins: [filteredOrigin, otherOrigin] }, console);
  sync.progress = { updateTotal() {}, updateOperation() {}, increment() {} };
  const repositories = await sync.getRepos();
  assert.strictEqual(repositories[1], unfilteredRepository);
  const snippets = await sync.extractSnippets(repositories, []);
  assert.deepEqual(snippets.map(({ id, lines }) => ({ id, lines }))
    .sort((a, b) => a.id.localeCompare(b.id)), [
    { id: 'java-example', lines: ['class Example {}'] },
    { id: 'python-example', lines: ['print("hello")'] },
    { id: 'typescript-example', lines: ['console.log("hello");'] },
    { id: 'yaml-example', lines: ['key: value'] },
  ]);
});
