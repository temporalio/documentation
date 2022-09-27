---
id: how-to-spawn-a-child-workflow-execution-in-python
title: How to spawn a Child Workflow Execution in Python
sidebar_label: Child Workflow Execution
tags:
  - developer-guide
  - python
---

To spawn a Child Workflow Execution in Python, use the [`execute_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#execute_child_workflow) function. `execute_child_workflow()` starts the Child Workflow and waits for completion.

```python
await workflow.execute_child_workflow(MyWorkflow.run, "my child arg", "my-child-id")
```

Alternatively, use [`start_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#start_child_workflow) function, to start a Child Workflow and return its handle. `start_child_workflow()` is a helper function for `execute_child_workflow()`.

```python
await workflow.start_child_workflow(MyWorkflow.run, "my child arg", "my-child-id")
```
