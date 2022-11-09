---
slug: python-sandbox-environment
title: Python sandboxed-environments
tags:
  - kb-article
date: 2022-11-15T00:00:00Z
---

The Temporal Python SDK allows you to run Workflow code in a sandboxed-environment to help prevent non-determinism errors in your application. The Temporal Workflow Sandbox for Python is not completely isolated, and some libraries can internally mutate state, which can result in breaking determinism.

<!-- truncate -->

By default, Workflows run in a sandboxed-environment. If a Workflow Execution performs a non-deterministic event, an exception is thrown, which results in failing the Task Worker. The Workflow will not progress until the code is fixed.

## Benefits

Temporal's Python SDK uses a sandboxed-environment for Worfklow runs to make developing Workflow code safer, easier, and its cost on performance is relatively little.

## How it works

The Sandbox environment is made up of two main components.

- [Global state isolation](#global-state-isolation)
- [Restrictions](#restrictions)

### Global state isolation

The first component of the Sandbox is a global state isolation. Global state isolation uses `exec` to compile and evaluate statements.

Upon the start of a Workflow, the file that the Workflow is defined in, is imported into a newly created sandbox.

A known set of pass-through modules are sent to the sandbox when the Workflow is imported.

These modules are expected to be Side Effect free and have their nondeterministic aspects restricted.

For a full list of modules imported, see [Customizing the Sandbox](#customize-the-sandbox).

### Restrictions

Restrictions prevent known non-deterministic library calls. This is achieved by using proxy objects on modules wrapped around the custom importer set in the sandbox.

Restrictions apply at both the Workflow import level and the Workflow run time.

A default set of restrictions is included that prevents most dangerous standard library calls.

However, it is known in Python that some otherwise-non-deterministic invocations, like reading a file from disk via `open` or using `os.environ`, are done as part of importing modules.

## Skip Workflow Sandboxing

The following techniques aren't recommended, but allow you to avoid, skip, or break through the sandboxed-environment.

### Skip Sandboxing for a block of code

To skip a sandboxed-environment for a specific block of code in a Workflow, use [`sandbox_unrestricted()`](https://python.temporal.io/temporalio.workflow.unsafe.html#sandbox_unrestricted). The Workflow will run without sandbox restrictions.

```python
with temporalio.workflow.unsafe.sandbox_unrestricted():
```

### Skip Sandboxing for an entire Workflow

To skip a sandboxed-environment for a Workflow, set the `sandboxed` argument in the [`@workflow.defn`](https://python.temporal.io/temporalio.workflow.html#defn) decorator to false. The entire Workflow will run without sandbox restrictions.

```python
@workflow.def(sandboxed=false)
```

### Skip Sandboxing for a Worker

To skip a sandboxed-environment for a Worker, set the `Worker` init's `workflow_runner` keyword argument to, [`UnsandboxedWorkflowRunner()`](https://python.temporal.io/temporalio.worker.UnsandboxedWorkflowRunner.html).

## Customize the sandbox

When creating the Worker, the `workflow_runner` is defaulted to [`SandboxedWorkflowRunner()`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxedWorkflowRunner.html). The `SandboxedWorkflowRunner`'s init accepts a `restrictions` keyword argument that defines a set of restrictions to apply to this sandbox.

The `SandboxRestrictions` dataclass is immutable and contains three fields that can be customized, but only two have notable values.

- [`passthrough_modules`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxRestrictions.html#passthrough_modules)
- [`invalid_modules_members`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxRestrictions.html#invalid_module_members)

### Pass through modules

To make the Sandbox quicker and more memory efficient when importing known third-party libraries, use the [passthrough_modules`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxRestrictions.html#passthrough_modules).

```python
my_restrictions = dataclasses.replace(
    SandboxRestrictions.default,
    passthrough_modules=SandboxRestrictions.passthrough_modules_default | SandboxMatcher(access={"pydantic"}),
)
my_worker = Worker(..., runner=SandboxedWorkflowRunner(restrictions=my_restrictions))
```

### Invalid module members

`invalid_module_members` includes modules that cannot be accessed. This includes the following.

- variables
- functions
- class methods (`__init__`)

Checks compare the against the fully qualified path to the item.

To remove this restriction, see the following example.

```python
my_restrictions = dataclasses.replace(
    SandboxRestrictions.default,
    invalid_module_members=SandboxRestrictions.invalid_module_members_default.with_child_unrestricted(
      "datetime", "date", "today",
    ),
)
my_worker = Worker(..., runner=SandboxedWorkflowRunner(restrictions=my_restrictions))
```

Restrictions can also be added by piping (`|`) together matchers.

The following example restricts the `datetime.date` class from being used.

```python
my_restrictions = dataclasses.replace(
    SandboxRestrictions.default,
    invalid_module_members=SandboxRestrictions.invalid_module_members_default | SandboxMatcher(
      children={"datetime": SandboxMatcher(use={"date"})},
    ),
)
my_worker = Worker(..., runner=SandboxedWorkflowRunner(restrictions=my_restrictions))
```

For more information on the Python sandbox, see the following links.

- [Python SDK README](https://github.com/temporalio/sdk-python)
- [Python API docs](https://python.temporal.io/index.html)
