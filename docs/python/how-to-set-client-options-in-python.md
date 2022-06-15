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

To set the Retry Policy, use [`retry_policy`](https://python.temporal.io/temporalio.common.retrypolicy) followed by your Retry statement.
The following is an example of a Retry Policy.

```python
retry_policy = temporalio.common.RetryPolicy(
    initial_interval=timedelta(milliseconds=1),
    backoff_coefficient=2.0,  # float
    maximum_interval=time.Second * 100,
    maximum_attempts=0,  # init
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
