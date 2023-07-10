---
id: how-to-continue-as-new-in-python
title: How to Continue-As-New in Python
sidebar_label: Continue-As-New
description: To Continue-As-New in Python, call the continue_as_new() function from inside your Workflow, which will stop the Workflow immediately and Continue-As-New.
---

To Continue-As-New in Python, call the [`continue_as_new()`](https://python.temporal.io/temporalio.workflow.html#continue_as_new) function from inside your Workflow, which will stop the Workflow immediately and Continue-As-New.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/continue_as_new/your_workflows_dacx.py">View source code</a>

```python

# ...
@workflow.defn
class LoopingWorkflow:
    @workflow.run
    async def run(self, iteration: int) -> None:
        if iteration == 5:
            return
        await asyncio.sleep(10)
        workflow.continue_as_new(iteration + 1)
```

