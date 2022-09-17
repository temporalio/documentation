---
id: set-task-queue
title: How to set a Workflow's Task Queue
description: In most SDKs, the only Workflow Option that must be set is the name of the Task Queue.
sidebar_label: Set Task Queue
tags:
  - guide-context
---

In most SDKs, the only Workflow Option that must be set is the name of the [Task Queue](/concepts/what-is-a-task-queue).

For any code to execute, a Worker Process must be running that contains a Worker Entity that is polling the same Task Queue name.
