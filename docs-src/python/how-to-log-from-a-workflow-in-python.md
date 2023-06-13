---
id: how-to-log-from-a-workflow-in-python
title: How to log from a Workflow in Python
sidebar_label: Log from a Workflow
description: Log from a Workflow
tags:
  - developer-guide
  - sdk
  - python
---

You can log from a Workflow using Python's standard library, by importing the logging module `import logging`.

Set your logging configuration to a level you want to expose logs to.
The following example sets the logging information level to `INFO`.

```python
logging.basicConfig(level=logging.INFO)
```

Then in your Workflow, set your [`logger`](https://python.temporal.io/temporalio.workflow.html#logger) and level on the Workflow. The following example logs the Workflow.

```python
@workflow.defn
class SayHelloWorkflow:
    @workflow.run
    async def run(self, name: str) -> str:
        workflow.logger.info(f"Running workflow with parameter {name}")
        return await workflow.execute_activity(
            your_activity, name, start_to_close_timeout=timedelta(seconds=10)
        )
```

The following is an example output:

```
INFO:temporalio.workflow:Running workflow with parameter Temporal ({'attempt': 1, 'your-custom-namespace': 'default', 'run_id': 'your-run-id', 'task_queue': 'your-task-queue', 'workflow_id': 'your-workflow-id', 'workflow_type': 'SayHelloWorkflow'})
```

:::note

Logs are skipped during replay by default.

:::
