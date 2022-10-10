---
id: how-to-send-a-signal-from-a-client-in-python
title: How to send a Signal from a Client in Python
sidebar_label: Send a Signal from a Client
description: To send a Signal to a Workflow Execution from Client code, use the signal() method on the Workflow handle.
tags:
  - developer-guide
  - sdk
  - python
---

To send a Signal to a Workflow Execution from Client code, use the [`signal()`](https://python.temporal.io/temporalio.workflow.html#signal) method on the Workflow handle.

```python
await my_workflow_handle.signal(MyWorkflow.my_signal, "my signal arg")
```
