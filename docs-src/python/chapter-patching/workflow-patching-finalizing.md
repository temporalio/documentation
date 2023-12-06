---
id: workflow-patching-finalizing
title: Finalizing Workflow Updates
sidebar_label: Finalizing Updates
description: Describes the final steps in the workflow patching process in Temporal, focusing on the removal of old code and adoption of new logic.
tags:
  - guide-python-temporal
  - finalizing-updates
---

After deprecating the patch, the final step is to remove the conditional checks for the patch in your Workflow and deploy the updated logic as the new standard.

```python
@workflow.defn
class BackgroundCheck:
    @workflow.run
    async def run(self) -> None:
        # Updated logic, post-patch deprecation
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

By following these steps, you can effectively manage updates to your Workflow, ensuring compatibility and determinism throughout its lifecycle.

Patching and deprecating patches in Temporal allow for dynamic updates to Workflows while maintaining deterministic behavior.
This process ensures that Workflows can evolve without disrupting ongoing operations or violating the principles of determinism.
