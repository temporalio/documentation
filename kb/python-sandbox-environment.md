---
slug: python-sandbox-environment
title: Python sandbox environment
tags:
  - kb-article
date: 2022-11-18T00:00:00Z
---

![Python sandbox](/static/img/python-sandbox.svg)

The Temporal Python SDK enables you to run Workflow code in a sandbox environment to help prevent non-determinism errors in your application.
The Temporal Workflow Sandbox for Python is not completely isolated, and some libraries can internally mutate state, which can result in breaking determinism.

<!-- truncate -->

## Benefits

Temporal's Python SDK uses a sandbox environment for Workflow runs to make developing Workflow code safer.

If a Workflow Execution performs a non-deterministic event, an exception is thrown, which results in failing the Task Worker.
The Workflow will not progress until the code is fixed.

## How it works

The Sandbox environment consists of two main components.

- [Global state isolation](#global-state-isolation)
- [Restrictions](#restrictions)

### Global state isolation

The first component of the Sandbox is a global state isolation.
Global state isolation uses `exec` to compile and evaluate statements.

Upon the start of a Workflow, the file in which the Workflow is defined is imported into a newly created sandbox.

If a module is imported by the file, a known set, which includes all of Python's standard library, is _passed through_ from outside the sandbox.

These modules are expected to be free of [Side Effects][(/workflows#side-effect) and have their non-deterministic aspects restricted.

For a full list of modules imported, see [Customize the Sandbox](#customize-the-sandbox).

### Restrictions

Restrictions prevent known non-deterministic library calls.
This is achieved by using proxy objects on modules wrapped around the custom importer set in the sandbox.

Restrictions apply at both the Workflow import level and the Workflow run time.

A default set of restrictions that prevents most dangerous standard library calls.

## Skip Workflow Sandboxing

The following techniques aren't recommended, but they allow you to avoid, skip, or break through the sandbox environment.

### Skip Sandboxing for a block of code

To skip a sandbox environment for a specific block of code in a Workflow, use [`sandbox_unrestricted()`](https://python.temporal.io/temporalio.workflow.unsafe.html#sandbox_unrestricted). The Workflow will run without sandbox restrictions.

```python
with temporalio.workflow.unsafe.sandbox_unrestricted():
    # Your code
```

### Skip Sandboxing for an entire Workflow

To skip a sandbox environment for a Workflow, set the `sandboxed` argument in the [`@workflow.defn`](https://python.temporal.io/temporalio.workflow.html#defn) decorator to false.
The entire Workflow will run without sandbox restrictions.

```python
@workflow.def(sandboxed=False)
```

### Skip Sandboxing for a Worker

To skip a sandbox environment for a Worker, set the `workflow_runner` keyword argument of the `Worker` init to [`UnsandboxedWorkflowRunner()`](https://python.temporal.io/temporalio.worker.UnsandboxedWorkflowRunner.html).

## Customize the sandbox

When creating the Worker, the `workflow_runner` defaults to [`SandboxedWorkflowRunner()`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxedWorkflowRunner.html).
The `SandboxedWorkflowRunner` init accepts a `restrictions` keyword argument that defines a set of restrictions to apply to this sandbox.

The `SandboxRestrictions` dataclass is immutable and contains three fields that can be customized, but only two have notable values.

- [`passthrough_modules`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxRestrictions.html#passthrough_modules)
- [`invalid_modules_members`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxRestrictions.html#invalid_module_members)

### Passthrough modules

To make the Sandbox quicker and more memory efficient when importing known third-party libraries, use [`passthrough_modules`](https://python.temporal.io/temporalio.worker.workflow_sandbox.SandboxRestrictions.html#passthrough_modules).

```python
my_restrictions = dataclasses.replace(
    SandboxRestrictions.default,
    passthrough_modules=SandboxRestrictions.passthrough_modules_default | SandboxMatcher(access={"pydantic"}),
)
my_worker = Worker(..., runner=SandboxedWorkflowRunner(restrictions=my_restrictions))
```

### Invalid module members

`invalid_module_members` includes modules that cannot be accessed.

Checks are compared against the fully qualified path to the item.

For example, to remove a restriction on `datetime.date.today()`, see the following example.

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

For more information on the Python sandbox, see the following resources.

- [Python SDK README](https://github.com/temporalio/sdk-python)
- [Python API docs](https://python.temporal.io/index.html)
