from temporalio import workflow

"""dacx
You can log from a Workflow using Python's standard library, by importing the logging module `logging`.

Set your logging configuration to a level you want to expose logs to.
The following example sets the logging information level to `INFO`.

```python
logging.basicConfig(level=logging.INFO)
```

Then in your Workflow, set your [`logger`](https://python.temporal.io/temporalio.workflow.html#logger) and level on the Workflow. The following example logs the Workflow.
dacx"""


@workflow.defn
class GreetingWorkflow:
    def __init__(self) -> None:
        self._greeting = "<no greeting>"

    @workflow.run
    async def run(self, name: str) -> None:
        workflow.logger.info("Workflow input parameter: %s" % name)
        self._greeting = f"Hello, {name}!"

    @workflow.query
    def greeting(self) -> str:
        return self._greeting


""" @dacx
id: how-to-log-from-a-workflow-in-python
title: How to log from a Workflow in Python
label: Log from a Workflow
description: To log from a Workflow in Python, import the logging module `logging` and set your logging configuration to a level you want to expose logs to. Then in your Workflow, set your [`logger`](https://python.temporal.io/temporalio.workflow.html#logger) and level on the Workflow.
tags:
 - python
 - workflow
 - logging
 - python sdk
 - code sample
lines: 3-14, 24
@dacx """
