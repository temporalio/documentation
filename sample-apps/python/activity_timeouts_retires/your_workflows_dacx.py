from datetime import timedelta

from temporalio import workflow
from temporalio.common import RetryPolicy

with workflow.unsafe.imports_passed_through():
    from activities import your_activity, YourParams

"""dacx
Activity options are set as keyword arguments after the Activity arguments.

Available timeouts are:

- schedule_to_close_timeout
- schedule_to_start_timeout
- start_to_close_timeout
dacx"""

"""dacx
To create an Activity Retry Policy in Python, set the [RetryPolicy](https://python.temporal.io/temporalio.common.RetryPolicy.html) class within the [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) or [`execute_activity()`](https://python.temporal.io/temporalio.workflow.html#execute_activity) function.
dacx"""


@workflow.defn
class YourWorkflow:
    @workflow.run
    async def run(self, greeting: str) -> list[str]:
        activity_timeout_result = await workflow.execute_activity(
            your_activity,
            YourParams(greeting, "Activity Timeout option"),
            # Activity Execution Timeout
            start_to_close_timeout=timedelta(seconds=10),
            # schedule_to_start_timeout=timedelta(seconds=10),
            # schedule_to_close_timeout=timedelta(seconds=10),
        )
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
        return activity_timeout_result, activity_result


""" @dacx
id: how-to-set-activity-timeouts-in-python
title: How to set Activity Timeouts in Python
label: Set Activity Timeouts
description: Set Activity timeouts from within your Workflow Definition.
tags:
 - activity
 - timeout
 - python sdk
 - code sample
lines: 9-17, 28-35
@dacx """

""" @dacx
id: how-to-set-an-activity-retry-policy-in-python
title: How to set an Activity Retry Policy in Python
label: Retry Policy
description: Create an instance of an Activity Retry Policy in Python.
tags:
 - activity
 - retry policy
 - python sdk
 - code sample
lines: 19-21, 4, 36-48
@dacx """
