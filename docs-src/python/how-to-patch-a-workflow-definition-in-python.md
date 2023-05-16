---
id: how-to-patch-a-workflow-definition-in-python
title: How to Patch a Workflow Definition in Python
sidebar_label: Patch a Workflow Definition
description: Set the patched() function on the Workflow.
---

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/version_your_workflows/workflow_2_patched_dacx.py">View source code</a>

```python
from temporalio import workflow
# . . .
@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self) -> None:
        if workflow.patched("my-patch"):
            self._result = await workflow.execute_activity(
                post_patch_activity,
                schedule_to_close_timeout=timedelta(minutes=5),
            )
```
