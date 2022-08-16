---
id: how-to-set-an-activity-retry-policy-in-python
title: How to set an Activity Retry Policy in Python
sidebar_label: Retry Policy
description: Create an instance of an Activity Retry Policy in Python.
tags:
  - python
  - how-to
---

To create an Activity Retry Policy in Python, set the [RetryPolicy](https://python.temporal.io/temporalio.common.retrypolicy) class within the [`start_activity()`](https://python.temporal.io/temporalio.workflow.html#start_activity) or [`execute_activity()`](https://python.temporal.io/temporalio.workflow.html#execute_activity).

The following example sets the maximum interval to 2 seconds.

<!--SNIPSTART python-activity-retry-->
<!--SNIPEND-->
