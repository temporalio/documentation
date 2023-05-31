---
id: how-to-mark-a-workflow-definition-as-deprecated-in-python
title: How to mark a Workflow Definition as deprecated in Python
sidebar_label: Mark a Workflow Definition as deprecated
description: Set the deprecated_patch() function on the Workflow.
---

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/version_your_workflows/workflow_3_patch_deprecated_dacx.py">View source code</a>

```python
from temporalio import workflow
# ...
@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self) -> None:
        workflow.deprecate_patch("my-patch")
        self._result = await workflow.execute_activity(
            post_patch_activity,
            schedule_to_close_timeout=timedelta(minutes=5),
        )
```
