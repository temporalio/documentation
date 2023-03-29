---
id: how-to-update-scheduled-workflow-execution-in-python
title: How to update a Scheduled Workflow Execution in Python
sidebar_label: Update a Scheduled Workflow Execution
description: Create a function that takes `ScheduleUpdateInput` and returns `ScheduleUpdate`.
---

Create a function that takes `ScheduleUpdateInput` and returns `ScheduleUpdate`.
To update a Schedule, use a callback to build the update from the description.
The following example updates the Schedule to use a new argument.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/schedule_your_workflow/update_schedule_dacx.py">View source code</a>

```py
// ...
    async def update_schedule_simple(input: ScheduleUpdateInput) -> ScheduleUpdate:
        schedule_action = input.description.schedule.action

        if isinstance(schedule_action, ScheduleActionStartWorkflow):
            schedule_action.args = ["my new schedule arg"]
        return ScheduleUpdate(schedule=input.description.schedule)
```
