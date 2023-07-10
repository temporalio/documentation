---
id: how-to-set-an-activity-retry-policy-in-python
title: How to set an Activity Retry Policy in Python
sidebar_label: Retry Policy
description: Create an instance of an Activity Retry Policy in Python.
---

To create an Activity Retry Policy in Python, set the [RetryPolicy](https://python.temporal.io/temporalio.common.RetryPolicy.html) class within the [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) or [`execute_activity()`](https://python.temporal.io/temporalio.workflow.html#execute_activity) function.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/activity_timeouts_retires/your_workflows_dacx.py">View source code</a>

```python

from temporalio.common import RetryPolicy
# ...
        activity_result = await workflow.execute_activity(
            your_activity,
            YourParams(greeting, "Retry Policy options"),
            start_to_close_timeout=timedelta(seconds=10),
            # Retry Policy
            retry_policy=RetryPolicy(
                backoff_coefficient=2.0,
                maximum_attempts=5,
                initial_interval=timedelta(seconds=1),
                maximum_interval=timedelta(seconds=2),
                # non_retryable_error_types=["ValueError"],
            ),
        )
```

