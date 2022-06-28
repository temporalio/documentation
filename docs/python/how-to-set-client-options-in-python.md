---
id: how-to-set-client-options-in-python
title: How to set Client options in Python
sidebar_label: Set Client options
description: Set Client options
tags:
  - developer-guide
  - sdk
  - python
---

To set the Retry Policy, set the `retry_policy` in [`start_workflow()`](https://python.temporal.io/temporalio.client.client#start_workflow) or [`execute_workflow()`](https://python.temporal.io/temporalio.client.client#execute_workflow) as a [`RetryPolicy`](https://python.temporal.io/temporalio.common.retrypolicy).
The following is an example of a Retry Policy.

```python
retry_policy = temporalio.common.RetryPolicy(
    initial_interval=timedelta(seconds=3),
    backoff_coefficient=4.0,
    maximum_interval=timedelta(seconds=5),
    maximum_attempts=6,
)
```

The previous code example does the following:

- Creates a Retry Policy with initial interval of 1 millisecond.
- Sets the back off coefficient to 2.0.
- Sets the maximum interval of 100 seconds.
- Prevents any retry attempts.

The following is an example of a Retry Policy in a Workflow Execution.

```python
@workflow.defn
class ActivityTimeoutWorkflow:
    @workflow.run
    async def run(self) -> None:
        await workflow.execute_activity(
            wait_cancel,
            start_to_close_timeout=timedelta(milliseconds=10),
            retry_policy=RetryPolicy(maximum_attempts=1),
        )
```
