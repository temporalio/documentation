const { describe, it, before, after } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const {
  chooseWheel,
  requirements,
  missingSubpackages,
  companionOf,
  bracketPairs,
  enclosingCall,
  callAt,
  callArguments,
  imports,
  definedNames,
  ownerClass,
  dedentBlock,
  checkSamples,
} = require('./check-python-samples.js');

describe('requirements', () => {
  it('keeps what a plain install pulls in, honoring an exact pin', () => {
    assert.deepStrictEqual(
      requirements([
        'nexus-rpc==1.4.0',
        'protobuf<7,>=3.20',
        'python-dateutil<3,>=2.8.2; python_version < "3.11"',
        'grpcio<2,>=1.48.2; extra == "grpc"',
        'opentelemetry-api[sdk]<2; extra == "opentelemetry"',
      ]),
      [
        { name: 'nexus-rpc', version: '1.4.0' },
        { name: 'protobuf', version: 'latest' },
        { name: 'python-dateutil', version: 'latest' },
      ]
    );
  });
});

describe('chooseWheel', () => {
  const wheel = (filename, size) => ({ packagetype: 'bdist_wheel', filename, size, url: filename });
  const files = [
    { packagetype: 'sdist', filename: 'temporalio-1.0.0.tar.gz', size: 1 },
    wheel('temporalio-1.0.0-cp310-abi3-manylinux_2_17_x86_64.whl', 30),
    wheel('temporalio-1.0.0-cp310-abi3-macosx_11_0_arm64.whl', 20),
  ];

  it('takes the smallest wheel when none is pure Python', () => {
    assert.strictEqual(chooseWheel(files).filename, 'temporalio-1.0.0-cp310-abi3-macosx_11_0_arm64.whl');
  });

  it('prefers a pure-Python wheel, and can insist on one', () => {
    assert.strictEqual(chooseWheel([...files, wheel('x-1.0-py3-none-any.whl', 50)]).filename, 'x-1.0-py3-none-any.whl');
    assert.strictEqual(chooseWheel(files, { pureOnly: true }), null);
  });
});

describe('reading a sample', () => {
  it('ignores brackets inside strings and comments', () => {
    const code = 'f("(", \'[\', """{""")  # ) ]\ng()';
    assert.deepStrictEqual(
      bracketPairs(code).map((p) => code.slice(p.open, p.close + 1)),
      ['("(", \'[\', """{""")', '()']
    );
  });

  it('finds the innermost call around a position, skipping grouping parentheses', () => {
    const code = 'await client.start_workflow(\n    Wf.run,\n    (1 + 2),\n    id=make_id(x),\n    bogus=True,\n)';
    assert.strictEqual(enclosingCall(code, code.indexOf('bogus')).callee, 'client.start_workflow');
    assert.strictEqual(enclosingCall(code, code.indexOf('x),')).callee, 'make_id');
    assert.strictEqual(enclosingCall(code, code.indexOf('2)')).callee, 'client.start_workflow');
  });

  it('closes a call the fragment leaves open at the end of the code', () => {
    const code = 'Worker(\n    client,\n    task_queue="q",';
    assert.strictEqual(enclosingCall(code, code.indexOf('task_queue')).callee, 'Worker');
  });

  it('reads the call that starts at a position', () => {
    const code = 'handle = await workflow.execute_activity(fn, 1)';
    const call = callAt(code, code.indexOf('workflow'));
    assert.strictEqual(call.callee, 'workflow.execute_activity');
    assert.deepStrictEqual(callArguments(code, call), ['fn', '1']);
  });

  it('splits arguments at top-level commas only, without comments', () => {
    const code = 'f(a, g(b, c), "d, e", [1, 2],\n  # a comment, with a comma\n  key=value,\n  ...)';
    assert.deepStrictEqual(callArguments(code, callAt(code, 0)), [
      'a',
      'g(b, c)',
      '"d, e"',
      '[1, 2]',
      'key=value',
      '...',
    ]);
  });

  it('maps imported names to the module they came from', () => {
    const code = [
      'import asyncio',
      'import temporalio.client as tc',
      'from temporalio import activity, workflow as wf',
      'from temporalio.worker import (',
      '    Worker,  # the worker',
      '    UnsandboxedWorkflowRunner,',
      ')',
    ].join('\n');
    assert.deepStrictEqual(Object.fromEntries(imports(code).bindings), {
      activity: 'temporalio',
      wf: 'temporalio',
      Worker: 'temporalio.worker',
      UnsandboxedWorkflowRunner: 'temporalio.worker',
      asyncio: 'asyncio',
      tc: 'temporalio.client',
    });
  });

  it('collects the classes and functions a sample defines', () => {
    const code =
      '@workflow.defn\nclass Greeting:\n    @workflow.run\n    async def run(self):\n        pass\ndef helper(): pass';
    assert.deepStrictEqual([...definedNames(code)].sort(), ['Greeting', 'helper', 'run']);
  });

  it('reads the class out of a Pyright type', () => {
    assert.strictEqual(ownerClass('type[SearchAttributes]'), 'SearchAttributes');
    assert.strictEqual(ownerClass('WorkflowHandle[Any, Any]'), 'WorkflowHandle');
    assert.strictEqual(ownerClass('GreetingWorkflow*'), 'GreetingWorkflow');
  });

  it('removes the indentation a sample shares, so a method excerpt parses', () => {
    assert.strictEqual(
      dedentBlock('    @workflow.run\n    async def run(self):\n        pass'),
      '@workflow.run\nasync def run(self):\n    pass'
    );
  });
});

// A fake temporalio, trimmed to the shapes the matching has to get right. The
// real one is fetched from PyPI, which a unit test shouldn't depend on.
const FAKE_SDK = {
  '__init__.py': '',
  'activity.py': '',
  'nexus.py': '',
  'common.py': 'class RetryPolicy:\n    maximum_attempts: int\n',
  'exceptions.py': 'class ApplicationError(Exception): ...\n',
  'client.py': `
from typing import Any, overload

class Client:
    @staticmethod
    async def connect(target_host: str, *, namespace: str = "default") -> "Client": ...

    @overload
    async def start_workflow(self, workflow: str, arg: Any = None, *, id: str, task_queue: str) -> None: ...
    @overload
    async def start_workflow(self, workflow: Any, arg: Any = None, *, id: str, task_queue: str, start_delay: Any = None) -> None: ...
    async def start_workflow(self, workflow: Any, arg: Any = None, *, id: str, task_queue: str, start_delay: Any = None) -> None: ...
`,
  'worker.py': `
from typing import Any

class Worker:
    def __init__(self, client: Any, *, task_queue: str, workflows: Any = None) -> None: ...
    # Shares its name with asyncio.run, which the samples also call.
    async def run(self) -> None: ...
`,
  'workflow.py': `
from typing import Any

class Info:
    workflow_id: str

def info() -> Info: ...

def execute_activity(activity: Any, arg: Any = None, *, start_to_close_timeout: Any = None) -> Any: ...
`,
};

describe('checkSamples', () => {
  let dir;
  let findings;

  // Every sample is checked in one Pyright run, the way the real run does it.
  const SAMPLES = {
    staticMethod:
      'from temporalio.client import Client\nclient = await Client.connect("localhost:7233")\nawait Client.create()',
    ambientClass: 'Client.nope()',
    instanceMember: 'from temporalio import workflow\nworkflow.info().workflow_idd',
    moduleAttribute: 'from temporalio import workflow\nworkflow.RetryPolicy(maximum_attempts=3)',
    ambientModule: 'workflow.RetryPolicy()',
    importedName: 'from temporalio.worker import Worker, WorkerDeploymentOptions',
    missingModule: 'import temporalio.openai_agents',
    unknownKeyword:
      'from temporalio.worker import Worker\nWorker(client, task_queue="q", worker_deployment_options=None)',
    missingArgument: 'Worker(client, workflows=[])',
    placeholder: 'Worker(..., workflows=[])',
    overloadKeyword: [
      'from temporalio.client import Client',
      'client = await Client.connect("localhost:7233")',
      'await client.start_workflow(',
      '    Wf.run,',
      '    "a",',
      '    id="x",',
      '    task_queue="q",',
      '    # Not a start_workflow option',
      '    disable_eager_activity_execution=True,',
      ')',
    ].join('\n'),
    overloadMissing:
      'from temporalio.client import Client\nclient = await Client.connect("x")\nawait client.start_workflow(Wf.run, "a", task_queue="q")',
    tooManyPositional: 'workflow.execute_activity(fn, 1, [2], start_to_close_timeout=None)',
    positionalAfterKeyword: 'workflow.execute_activity(activity="fn", name)',
    placeholderAfterKeyword: 'Worker(task_queue="q", ...)',
    ownClass:
      'class Client:\n    pass\nClient.nope()\nclass Greeting:\n    def run(self):\n        return self.greetings',
    submodule: 'import temporalio\ntemporalio.common.RetryPolicy()',
    notTheSdk: 'import asyncio\nasyncio.run(main(), bogus=True)',
    undefinedNames: 'result = await handle.result()\nmy_helper(x=1)',
  };
  const names = Object.keys(SAMPLES);
  const of = (name) => findings.filter((f) => f.file === `docs/${name}.mdx`).map((f) => [f.kind, f.subject]);

  before(async () => {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'check-python-samples-'));
    const sdk = path.join(dir, 'site-packages', 'temporalio');
    fs.mkdirSync(sdk, { recursive: true });
    for (const [file, source] of Object.entries(FAKE_SDK)) fs.writeFileSync(path.join(sdk, file), source);
    findings = await checkSamples(
      names.map((name) => ({ file: `docs/${name}.mdx`, line: 10, code: SAMPLES[name] })),
      { sitePackages: path.join(dir, 'site-packages'), projectDir: path.join(dir, 'project'), version: '9.9.9' }
    );
  });

  after(() => fs.rmSync(dir, { recursive: true, force: true }));

  it('flags a static method the class does not have, at its line on the page', () => {
    const [finding] = findings.filter((f) => f.file === 'docs/staticMethod.mdx');
    assert.deepStrictEqual([finding.kind, finding.subject, finding.line], ['missing-member', 'Client.create', 12]);
    assert.match(
      finding.message,
      /^Client\.create: Cannot access attribute "create" for class "type\[Client\]" \(temporalio 9\.9\.9\)$/
    );
  });

  it('flags a member missing on an instance, and on a class used without importing it', () => {
    assert.deepStrictEqual(of('instanceMember'), [['missing-member', 'Info.workflow_idd']]);
    assert.deepStrictEqual(of('ambientClass'), [['missing-member', 'Client.nope']]);
  });

  it('flags a name a module does not have, through an import or the ambient workflow module', () => {
    assert.deepStrictEqual(of('moduleAttribute'), [['missing-export', 'temporalio.workflow:RetryPolicy']]);
    assert.deepStrictEqual(of('ambientModule'), [['missing-export', 'temporalio.workflow:RetryPolicy']]);
    assert.deepStrictEqual(of('importedName'), [['missing-export', 'temporalio.worker:WorkerDeploymentOptions']]);
  });

  it('flags a module the package does not have', () => {
    assert.deepStrictEqual(of('missingModule'), [['missing-module', 'temporalio.openai_agents']]);
  });

  it('flags a keyword the SDK does not take, even past a comment in an overloaded call', () => {
    assert.deepStrictEqual(of('unknownKeyword'), [['bad-call', 'Worker(worker_deployment_options=)']]);
    assert.deepStrictEqual(of('overloadKeyword'), [
      ['bad-call', 'client.start_workflow(disable_eager_activity_execution=)'],
    ]);
  });

  it('flags more positional arguments than the SDK takes', () => {
    assert.deepStrictEqual(of('tooManyPositional'), [['bad-call', 'workflow.execute_activity']]);
  });

  it('flags a positional argument after a keyword argument, unless it is a placeholder', () => {
    assert.deepStrictEqual(of('positionalAfterKeyword'), [['syntax-error', 'workflow.execute_activity']]);
    assert.deepStrictEqual(of('placeholderAfterKeyword'), []);
  });

  it('does not report arguments a sample leaves out', () => {
    assert.deepStrictEqual(of('missingArgument'), []);
    assert.deepStrictEqual(of('placeholder'), []);
    assert.deepStrictEqual(of('overloadMissing'), []);
  });

  it("ignores the sample's own classes, submodules, other libraries, and undefined names", () => {
    assert.deepStrictEqual(of('ownClass'), []);
    assert.deepStrictEqual(of('submodule'), []);
    assert.deepStrictEqual(of('notTheSdk'), []);
    assert.deepStrictEqual(of('undefinedNames'), []);
  });
});

describe('missingSubpackages', () => {
  it('names the temporalio subpackages a sample imports that the wheel lacks, and their distributions', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'check-python-samples-'));
    try {
      fs.mkdirSync(path.join(dir, 'temporalio', 'contrib'), { recursive: true });
      fs.writeFileSync(path.join(dir, 'temporalio', 'workflow.py'), '');
      const codes = [
        'from temporalio import workflow\nfrom temporalio.workflow import defn',
        'from temporalio.openai_agents import OpenAIAgentsPlugin\nimport temporalio.contrib.pydantic',
        'from temporalio.openai_agents.workflow import activity_as_tool',
      ];
      assert.deepStrictEqual(missingSubpackages(codes, dir), ['openai_agents']);
      assert.strictEqual(companionOf('openai_agents'), 'temporalio-openai-agents');
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
