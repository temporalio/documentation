const { describe, it } = require('node:test');
const assert = require('node:assert');
const { checkText } = require('./check-snipsync-markers.js');

describe('checkText', () => {
  it('accepts a snippet that opens and closes in the HTML style', () => {
    assert.deepStrictEqual(checkText('<!--SNIPSTART a-->\ncode\n<!--SNIPEND-->\n'), []);
  });

  it('accepts a snippet that opens and closes in the MDX style', () => {
    assert.deepStrictEqual(checkText('{/* SNIPSTART a */}\ncode\n{/* SNIPEND */}\n'), []);
  });

  it('accepts a start marker with a source link and options', () => {
    const text = '<!--SNIPSTART a @https://github.com/o/r/blob/main/x.java {"enable_source_link":false}-->\n<!--SNIPEND-->\n';
    assert.deepStrictEqual(checkText(text), []);
  });

  it('accepts several snippets in one file, in either style', () => {
    const text = '<!--SNIPSTART a-->\n<!--SNIPEND-->\ntext\n{/* SNIPSTART b */}\n{/* SNIPEND */}\n';
    assert.deepStrictEqual(checkText(text), []);
  });

  it('reports an MDX start closed by an HTML end, at the end line', () => {
    const [finding, ...rest] = checkText('{/* SNIPSTART a */}\ncode\n<!--SNIPEND-->\n');
    assert.strictEqual(rest.length, 0);
    assert.strictEqual(finding.line, 3);
    assert.match(finding.message, /Snippet "a" opens with \{\/\* SNIPSTART \*\/\} \(line 1\)/);
    assert.match(finding.fix, /Close it with \{\/\* SNIPEND \*\/\}/);
    assert.match(finding.fix, /<!--SNIPSTART a-->/);
  });

  it('reports an HTML start closed by an MDX end', () => {
    const [finding] = checkText('<!--SNIPSTART a-->\ncode\n{/* SNIPEND */}\n');
    assert.strictEqual(finding.line, 3);
    assert.match(finding.fix, /Close it with <!--SNIPEND-->/);
    assert.match(finding.fix, /\{\/\* SNIPSTART a \*\/\}/);
  });

  it('keeps checking after a mismatch, as Snipsync does', () => {
    const text = '{/* SNIPSTART a */}\n<!--SNIPEND-->\n<!--SNIPSTART b-->\n<!--SNIPEND-->\n{/* SNIPSTART c */}\n<!--SNIPEND-->\n';
    assert.deepStrictEqual(
      checkText(text).map((finding) => finding.line),
      [2, 6]
    );
  });

  it('reports a snippet with no SNIPEND at the end of the file', () => {
    const [finding] = checkText('intro\n<!--SNIPSTART a-->\ncode\n');
    assert.strictEqual(finding.line, 2);
    assert.match(finding.message, /Snippet "a" has no SNIPEND/);
  });

  it('reports a SNIPSTART opened before the previous snippet closed', () => {
    const findings = checkText('<!--SNIPSTART a-->\ncode\n<!--SNIPSTART b-->\ncode\n<!--SNIPEND-->\n');
    assert.strictEqual(findings.length, 1);
    assert.strictEqual(findings[0].line, 1);
    assert.match(findings[0].message, /Snippet "a" has no SNIPEND before the next SNIPSTART \(line 3\)/);
  });

  it('reports a SNIPEND outside any snippet', () => {
    const [finding] = checkText('text\n<!--SNIPEND-->\n');
    assert.strictEqual(finding.line, 2);
    assert.match(finding.message, /SNIPEND with no matching SNIPSTART/);
  });

  it('handles Windows line endings', () => {
    assert.deepStrictEqual(checkText('<!--SNIPSTART a-->\r\ncode\r\n<!--SNIPEND-->\r\n'), []);
  });
});
