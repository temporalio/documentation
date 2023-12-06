---
id: workflow-patching-initial-logic
title: Initial Workflow Logic Before Patching
sidebar_label: Initial Workflow Logic
description: Describes the initial logic of Temporal workflows before applying patches, setting the stage for updates.
tags:
  - guide-python-temporal
  - initial-workflow-logic
---

Imagine your initial Workflow includes a sleep function, but now you need to add more logic:

```python
@workflow.defn
class BackgroundCheck:
    @workflow.run
    async def run(self, ssn: str) -> str:
        results = await workflow.execute_activity(
            ssn_trace_activity,
            SsnTraceInput(ssn=ssn),
            schedule_to_close_timeout=timedelta(seconds=5),
        )
        await asyncio.sleep(360)
        return results
```
