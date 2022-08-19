---
id: how-to-replay-a-workflow-execution-in-python
title: How to replay a Workflow Execution in Python
sidebar_label: Replay a Workflow Execution
description: Replay a Workflow Execution
tags:
  - developer-guide
  - sdk
  - python
---

To Replay a Workflow Execution use the [`replay_workflow()`](https://python.temporal.io/temporalio.worker.replayer#replay_workflow) function and pass a Workflow History as an argument.

In the following example, `history_json_str` references the Workflow History as a JSON string.

```python
async def run_replayer(history_json_str: str):
    replayer = Replayer(workflows=[YourWorkflow])
    await replayer.replay_workflow(history_json_str)
```

`run_replayer()` will return an error if the Workflow History is non-deterministic.

:::note

If the Workflow History is exported by the Temporal Web UI or through the tctl, you can pass the JSON file history object as a JSON string or as a python dictionary, through the `json.load()` function, which takes a file object and returns the JSON object.

:::
