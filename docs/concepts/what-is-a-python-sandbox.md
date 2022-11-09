---
id: what-is-a-python-sandbox
title: What is the Python Sandbox?
sidebar_label: Python Sandbox
description: The Temporal Python SDK allows you to run Workflow code in a sandboxed-environment to help prevent non-determinism errors in your application.
  - term
  - explanation
  - python
---

The Temporal Python SDK allows you to run Workflow code in a sandboxed-environment to help prevent non-determinism errors in your application. The Temporal Workflow Sandbox for Python is not completely isolated, and some libraries can internally mutate state, which can result in breaking determinism.

By default, Workflows run in a sandboxed-environment. If a Workflow Execution performs a non-deterministic event, an exception is thrown, which results in failing the Task Worker. The Workflow will not progress until the code is fixed.

For more information, see the Knowledge Base article on [Python Sandboxed-environments](/kb/python-sandbox-environment)
