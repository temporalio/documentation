---
id: how-to-set-activity-timeouts-in-python
title: How to set Activity Timeouts in Python
sidebar_label: Set Activity Timeouts
description: Set Activity timeouts from within your Workflow Definition.
tags:
  - activity
  
  - python
---

Activity options are set as keyword arguments after the Activity arguments.

Available timeouts are:

- schedule_to_close_timeout
- schedule_to_start_timeout
- start_to_close_timeout

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/activity_timeouts_retires/your_workflows_dacx.py">View source code</a>

```python
# ...
        activity_timeout_result = await workflow.execute_activity(
            your_activity,
            YourParams(greeting, "Activity Timeout option"),
            # Activity Execution Timeout
            start_to_close_timeout=timedelta(seconds=10),
            # schedule_to_start_timeout=timedelta(seconds=10),
            # schedule_to_close_timeout=timedelta(seconds=10),
        )
```
