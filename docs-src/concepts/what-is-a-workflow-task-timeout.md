---
id: what-is-a-workflow-task-timeout
title: What is a Workflow Task Timeout?
sidebar_label: Workflow Task Timeout
description: A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a Workflow Task after the Task has been pulled from the Task Queue.
tags:
  - term
  - explanation
  - timeouts
---

A Workflow Task Timeout is the maximum amount of time allowed for a [Worker](/concepts/what-is-a-worker) to execute a [Workflow Task](/concepts/what-is-a-workflow-task) after the Worker has pulled that Workflow Task from the [Task Queue](/concepts/what-is-a-task-queue).

- [How to set a Workflow Task Timeout using the Go SDK](/go/workflow-timeouts)
- [How to set a Workflow Task Timeout using the Java SDK](/java/workflow-timeouts)
- [How to set a Workflow Task Timeout using the PHP SDK](/php/workflow-timeouts)
- [How to set a Workflow Task Timeout using the Python SDK](/python/workflow-timeouts)
- [How to set a Workflow Task Timeout using the TypeScript SDK](/typescript/workflow-timeouts)

![Workflow Task Timeout period](/diagrams/workflow-task-timeout.svg)

**The default value is 10 seconds.**
This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value is to accommodate a Workflow Execution that has an extensive Workflow Execution History, requiring more than 10 seconds for the Worker to load.
It's worth mentioning that although you can extend the timeout up to the maximum value of 120 seconds, it's not recommended to move beyond the default value.
