---
id: how-to-set-an-activity-retry-policy-in-python
title: How to set an Activity Retry Policy in Python
sidebar_label: Retry Policy
description: Create an instance of `ActivityOptions` from the `go.temporal.io/sdk/workflow` package, set the `RetryPolicy` field, and then use the `WithActivityOptions()` API to apply the options to the instance of `workflow.Context`.
tags:
  - python
  - how-to
---

To set a [RetryPolicy()](https://python.temporal.io/temporalio.common.retrypolicy), create a Retry Policy inside the Activity function. Valid parameters for `RetryPolicy` are:

- `backoff_coefficient`: Coefficient to multiply previous back off interval by to get new interval. Defaults to 2.0 if not specified.
- `initial_interval`: Back off interval for the first retry. Default to 1 second if not specified.
- `maximum_attempts`: The maximum number of attempts.
- `maximum_interval`: The maximum back off interval between retries. Default to 100x `initial_interval` if not specified.
- `non_retryable_error_types`: List of error types that are not retryable.

```python
from temporalio.common import RetryPolicy
from datetime import timedelta


async def retry_policy(client: Client, worker: ExternalWorker):
    handle = await client.start_workflow(
        "your_workflow",
        id="your_workflow_id",
        task_queue=worker.task_queue,
        retry_policy=RetryPolicy(
            initial_interval=timedelta(seconds=3),
            backoff_coefficient=4.0,
            maximum_interval=timedelta(seconds=5),
            maximum_attempts=6,
        ),
    )
```

You can also use the qualified class name, `temporalio.common.RetryPolicy` for the Retry Policy.

```python
from datetime import timedelta


async def retry_policy(client: Client, worker: ExternalWorker):
    handle = await client.start_workflow(
        "your_workflow",
        id="your_workflow_id",
        task_queue=worker.task_queue,
        retry_policy=temporalio.common.RetryPolicy(
            initial_interval=timedelta(seconds=3),
            backoff_coefficient=4.0,
            maximum_interval=timedelta(seconds=5),
            maximum_attempts=6,
        ),
    )
```
