---
id: how-to-replay-a-workflow-execution-in-python
title: How to replay a Workflow Execution in Python
sidebar_label: Replay a Workflow Execution
description: To replay a Workflow Execution, use the `replay_workflow()` method and pass a Workflow History as an argument.
tags:
  - developer-guide
  - sdk
  - python
---

To replay Workflow Executions, use the [`replay_workflows`](https://python.temporal.io/temporalio.worker.Replayer.html#replay_workflows) or [`replay_workflow`](https://python.temporal.io/temporalio.worker.Replayer.html#replay_workflow) methods, passing one or more Event Histories as arguments.

In the following example (which, as of server v1.18, requires Advanced Visibility to be enabled), Event Histories are downloaded from the server and then replayed.
If any replay fails, the code raises an exception.

```python
workflows = client.list_workflows(f"TaskQueue=foo and StartTime > '2022-01-01T12:00:00'")
histories = workflows.map_histories()
replayer = Replayer(
    workflows=[MyWorkflowA, MyWorkflowB, MyWorkflowC]
)
await replayer.replay_workflows(histories)
```

In the next example, a single history is loaded from a JSON string:

```python
replayer = Replayer(workflows=[YourWorkflow])
await replayer.replay_workflow(WorkflowHistory.from_json(history_json_str))
```

In both examples, if Event History is non-deterministic, an error is thrown.
You can choose to wait until all histories have been replayed with `replay_workflows` by setting the `fail_fast` option to `false`.

:::note

If the Workflow History is exported by [Temporal Web UI](/web-ui) or through [tctl](/tctl-v1), you can pass the JSON file history object as a JSON string or as a Python dictionary through the `json.load()` function, which takes a file object and returns the JSON object.

:::
