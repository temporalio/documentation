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
- no network IO
- no global state mutation

All code must run in the implicit [`asyncio` event loop](https://docs.python.org/3/library/asyncio-eventloop.html) and be deterministic.
