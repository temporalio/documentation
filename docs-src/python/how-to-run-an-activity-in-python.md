---
id: how-to-run-an-activity-in-python
title: How to run an Activity in a test in Python
sidebar_label: Run an Activity in a test
description: To run an Activity in a test for Python, use the `ActivityEnvironment` class.
tags:
  - developer-guide
  - sdk
  - python
  - testing
---

To run an Activity in a test, you can use the [`ActivityEnvironment`](https://python.temporal.io/temporalio.testing.ActivityEnvironment.html) class.

This class allows you to run any callable inside an activity context, and you can use it to test the behavior of your code under different conditions.
