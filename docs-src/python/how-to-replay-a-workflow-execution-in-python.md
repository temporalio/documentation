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

To replay a Workflow Execution, use the [`replay_workflow()`](https://python.temporal.io/temporalio.worker.Replayer.html#replay_workflow) method and pass a Workflow History as an argument.

In the following example, `history_json_str` references the Workflow History as a JSON string.

```python
async def run_replayer(history_json_str: str):
    replayer = Replayer(workflows=[YourWorkflow])
    await replayer.replay_workflow(history_json_str)
```

If the Workflow History is non-deterministic, `run_replayer()` raises an error.

:::note

If the Workflow History is exported by [Temporal Web UI](/web-ui) or through [tctl](/tctl-v1), you can pass the JSON file history object as a JSON string or as a Python dictionary through the `json.load()` function, which takes a file object and returns the JSON object.

:::
