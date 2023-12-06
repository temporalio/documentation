---
id: workflow-patching-deprecating
title: Deprecating Patches in Workflows
sidebar_label: Deprecating Patches
description: Discusses the significance and methodology of deprecating patches in Temporal workflows.
tags:
  - guide-python-temporal
  - deprecating-patches
---

Once all instances of the Workflow that would run the old code have completed, and there is certainty that they will never be queried again, it’s time to use deprecate_patch(). This method marks the patch as deprecated, signifying the complete transition to the new logic and the removal of the old code path.

```python
@workflow.defn
class BackgroundCheck:
    @workflow.run
    async def run(self) -> None:
        # Updated logic after patch deprecation
        workflow.deprecate_patch("my-patch")
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
```

The `deprecate_patch()` function marks a Workflow as having moved beyond the patch. It signifies that the old code path is now obsolete and can be safely removed.

In this stage, the Workflow indicates that the patch "my-patch" is no longer applicable. All Workflows relying on the old code path are completed, and the Workflow permanently transitions to the updated logic.
