---
id: how-to-set-clientoptions-in-python
title: How to set clientoptions in Python
sidebar_label: Set clientoptions
description: Set clientoptions
tags:
  - developer-guide
  - sdk
  - python
---

To set the Retry Policy, use `retrypolicy` followed by your Retry statement.
In this example, we are:

- Creating a Retry Policy with initial interval of 1 second, backoff coefficient of 2.0 and maximum interval of 100 seconds.
- Not allowing any retry attempts.
- Not allowing any error type to be retried.

```python
from temporalio import activity

retrypolicy = retrypolicy(
    initial_interval=time.Second,
    backoff_coefficient=2.0,  # float
    maximum_interval=time.Second * 100,
    maximum_attempts=0,  # init
    non_retryable_error_types=[],  # Iterable[str]
)
```
