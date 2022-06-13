---
id: how-to-set-a-workflow-retry-policy-in-python
title: How to set an Workflow Retry Policy in Python
sidebar_label: Retry Policy
description: To set a [RetryPolicy()](https://python.temporal.io/temporalio.common.retrypolicy), create a Retry Policy inside the Workflow function
tags:
  - python
  - how-to
---

To set a [RetryPolicy()](https://python.temporal.io/temporalio.common.retrypolicy), create a Retry Policy inside the Workflow function. In this example, we create a new Worker for the Workflow and set a Retry Policy parameters. Valid parameters for `RetryPolicy` are:

- `backoff_coefficient`: Coefficient to multiply previous back off interval by to get new interval. Defaults to 2.0 if not specified.
- `initial_interval`: Back off interval for the first retry. Default to 1 second if not specified.
- `maximum_attempts`: The maximum number of attempts.
- `maximum_interval`: The maximum back off interval between retries. Default to 100x `initial_interval` if not specified.
- `non_retryable_error_types`: List of error types that are not retryable.

```python
async def your_workflow(client: Client):
    async with new_worker(client, InfoWorkflow) as worker:
        workflow_id = f"workflow-{uuid.uuid4()}"
        retry_policy = RetryPolicy(
            initial_interval=timedelta(seconds=3),
            backoff_coefficient=4.0,
            maximum_interval=timedelta(seconds=5),
            maximum_attempts=6,
        )
```
