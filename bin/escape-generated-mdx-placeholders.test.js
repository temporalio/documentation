const { describe, it } = require('node:test');
const assert = require('node:assert');
const {
  escapeGeneratedMdxPlaceholders,
  stripKeywordsFromFrontmatter,
} = require('./escape-generated-mdx-placeholders.js');

describe('stripKeywordsFromFrontmatter', () => {
  it('removes populated and empty keyword lists', () => {
    assert.strictEqual(
      stripKeywordsFromFrontmatter(`---
title: Command
keywords:
  - connectivity
  - connectivity-rule
tags:
  - Temporal CLI
---

Body.`),
      `---
title: Command
tags:
  - Temporal CLI
---

Body.`,
    );
    assert.strictEqual(
      stripKeywordsFromFrontmatter(`---
keywords:
tags:
  - Temporal CLI
---`),
      `---
tags:
  - Temporal CLI
---`,
    );
  });

  it('leaves body text and files without frontmatter unchanged', () => {
    assert.strictEqual(stripKeywordsFromFrontmatter('keywords: stay'), 'keywords: stay');
    assert.strictEqual(
      stripKeywordsFromFrontmatter(`---
title: Command
---

keywords: stay`),
      `---
title: Command
---

keywords: stay`,
    );
  });
});

describe('escapeGeneratedMdxPlaceholders', () => {
  it('escapes placeholders in generated prose and tables', () => {
    const content = `Use /projects/{project-id}.

| Flag | Description |
| --- | --- |
| \`--resource\` | Example: /subscriptions/{sub}/resourceGroups/{rg}. |`;

    assert.strictEqual(
      escapeGeneratedMdxPlaceholders(content),
      `Use /projects/\\{project-id\\}.

| Flag | Description |
| --- | --- |
| \`--resource\` | Example: /subscriptions/\\{sub\\}/resourceGroups/\\{rg\\}. |`,
    );
  });

  it('leaves MDX constructs and code samples unchanged', () => {
    const content = `---
description: A {placeholder} value
---

{/* {comment} */}
<ReleaseNoteHeader featureName="{feature}" />

Use \`/projects/{project-id}\`.

\`\`\`shell
temporal command --resource /projects/{project-id}
\`\`\``;

    assert.strictEqual(escapeGeneratedMdxPlaceholders(content), content);
  });
});
