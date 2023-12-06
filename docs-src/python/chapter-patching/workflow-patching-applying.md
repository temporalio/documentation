---
id: workflow-patching-applying
title: Applying Patches to Workflows
sidebar_label: Applying Patches
description: Provides insights into the process of applying patches to Temporal workflows, highlighting changes and transitions.
tags:
  - guide-python-temporal
  - applying-patches
---

To update your Workflow, use the `workflow.patched()` API. Introduce a patch name as a string identifier for the update. This allows the Workflow to execute new logic if the patch is applied, while retaining the original logic otherwise:

```python
@workflow.defn
class BackgroundCheck:
    @workflow.run
    async def run(self) -> None:
        # New logic after patch is applied
        if workflow.patched("my-patch")
            results = await workflow.execute_activity(
                ssn_trace_activity,
                SsnTraceInput(ssn=ssn),
                schedule_to_close_timeout=timedelta(seconds=5),
            )
            if results == "pass":
                return await workflow.execute_activity(
                    federal_background_check_activity,
                    SsnTraceInput(ssn=ssn),
                    schedule_to_close_timeout=timedelta(seconds=5),
                )
            else:
                return results
        else:
            # Existing logic before patch
            results = await workflow.execute_activity(
                    ssn_trace_activity,
                    SsnTraceInput(ssn=ssn),
                    schedule_to_close_timeout=timedelta(seconds=5),
                )
                await asyncio.sleep(360)
                return results
```

In this implementation, the Workflow checks if "my-patch" has been applied. If it has, the Workflow executes the new logic; otherwise, it continues with the original logic.

This structure enables your patched Workflows to seamlessly transition between the new and old logic based on the patch's application status.
