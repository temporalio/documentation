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

To replay Workflow Executions, use the
[`replay_workflows`](https://python.temporal.io/temporalio.worker.Replayer.html#replay_workflows)
or
[`replay_workflow`](https://python.temporal.io/temporalio.worker.Replayer.html#replay_workflow)
methods, passing multiple or one Workflow Histories as arguments.

In the following example (which requires advanced visibility to be enabled), histories are
downloaded from the server, then replayed. The code will raise an exception if any replay fails.
```python
workflows = client.list_workflows(f"TaskQueue=foo")
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

In both examples if Workflow History is non-deterministic, an error will be thrown. You can choose
to wait until all histories have been replayed with `replay_workflows` by setting the `fail_fast`
option to `false`.

:::note

If the Workflow History is exported by [Temporal Web UI](/web-ui) or through [tctl](/tctl-v1), you can pass the JSON file history object as a JSON string or as a Python dictionary through the `json.load()` function, which takes a file object and returns the JSON object.

:::
