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

To set the Retry Policy, use `retrypolicy` followed by your Retry statement.
In this example, we are:

- Creating a Retry Policy with initial interval of 1 millisecond, back off coefficient of 2.0 and maximum interval of 100 seconds.
- Not allowing any retry attempts.
- Not allowing any error type to be retried.

```python
retry_policy = temporalio.common.RetryPolicy(
    initial_interval=timedelta(milliseconds=1),
    backoff_coefficient=2.0,  # float
    maximum_interval=time.Second * 100,
    maximum_attempts=0,  # init
    non_retryable_error_types=[],  # Iterable[str]
)
```
