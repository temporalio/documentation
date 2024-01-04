---
id: what-is-a-workflow-execution-timeout
title: What is a Workflow Execution Timeout?
sidebar_label: Workflow Execution Timeout
description: A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.
tags:
  - term
  - explanation
  - timeouts
---

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

- [How to set a Workflow Execution Timeout using the Go SDK](/go/workflow-timeouts)
- [How to set a Workflow Execution Timeout using the Java SDK](/java/workflow-timeouts)
- [How to set a Workflow Execution Timeout using the PHP SDK](/php/workflow-timeouts)
- [How to set a Workflow Execution Timeout using the Python SDK](/python/workflow-timeouts)
- [How to set a Workflow Execution Timeout using the TypeScript SDK](/typescript/workflow-timeouts)

![Workflow Execution Timeout period](/diagrams/workflow-execution-timeout.svg)

**The default value is ∞ (infinite).**
If this timeout is reached, the Workflow Execution changes to a Timed Out status.
This timeout is different from the [Workflow Run Timeout](/concepts/what-is-a-workflow-run-timeout).
This timeout is most commonly used for stopping the execution of a [Temporal Cron Job](/concepts/what-is-a-temporal-cron-job) after a certain amount of time has passed.
