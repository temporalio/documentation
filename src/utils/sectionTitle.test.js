const { describe, it } = require('node:test');
const assert = require('node:assert');
const { titleWithSection } = require('./sectionTitle');

describe('titleWithSection', () => {
  it('appends the section title with a dash separator', () => {
    assert.strictEqual(titleWithSection('Workflow basics', 'Java SDK'), 'Workflow basics - Java SDK');
  });

  it('returns the title unchanged when there is no section title', () => {
    assert.strictEqual(titleWithSection('Workflow basics', undefined), 'Workflow basics');
    assert.strictEqual(titleWithSection('Workflow basics', ''), 'Workflow basics');
    assert.strictEqual(titleWithSection('Workflow basics', '   '), 'Workflow basics');
    assert.strictEqual(titleWithSection('Workflow basics', 42), 'Workflow basics');
  });

  it('trims the section title', () => {
    assert.strictEqual(titleWithSection('Workflow basics', ' Java SDK '), 'Workflow basics - Java SDK');
  });

  it('does not repeat a section title the title already contains', () => {
    assert.strictEqual(titleWithSection('Workflow basics - Java SDK', 'Java SDK'), 'Workflow basics - Java SDK');
    assert.strictEqual(
      titleWithSection('Set up your local with the Java SDK', 'Java SDK'),
      'Set up your local with the Java SDK',
    );
    assert.strictEqual(titleWithSection('Java SDK developer guide', 'java sdk'), 'Java SDK developer guide');
  });

  it('returns a missing title as is', () => {
    assert.strictEqual(titleWithSection(undefined, 'Java SDK'), undefined);
  });
});
