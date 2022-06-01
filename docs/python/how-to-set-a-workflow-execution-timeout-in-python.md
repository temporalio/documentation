---
id: how-to-set-a-workflow-run-timeout-in-python
title: How to set a Workflow run timeout in Python
sidebar_label: Set a Workflow run timeout
description: Set a Workflow run timeout
tags:
  - developer-guide
  - sdk
  - python
---

A timer is represented by normal `asyncio.sleep()`
Timers are also implicitly started on any `asyncio` calls with timeouts, for example `asyncio.wait_for`.
Timers are Temporal server timers, not local ones, so sub-second resolution rarely has value
