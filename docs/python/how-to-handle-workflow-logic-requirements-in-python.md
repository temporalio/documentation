---
id: how-to-handle-workflow-logic-requirements-in-python
title: How to handle Workflow logic requirements in Python
sidebar_label: Handle Workflow logic requirements
description: Handle Workflow logic requirements
tags:
  - developer-guide
  - sdk
  - python
---

Workflow code must be deterministic. This means:

- no threading
- no randomness
- no external calls to processes
- no network I/O
- no global state mutation
- no system date or time

All API safe for Workflows used in the [`temporalio.workflow`](https://python.temporal.io/temporalio.workflow.html) must run in the implicit [`asyncio` event loop](https://docs.python.org/3/library/asyncio-eventloop.html) and be _deterministic_.
