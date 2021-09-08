---
id: what-is-an-activity-heartbeat
title: What is an Activity Heartbeat?
description: todo
---


Provides to the Temporal server the status of an [Activity Task](#activity-task) that is being executed.

- Activity Heartbeats help ensure that [Activity](#activity) execution failures and timeouts are identified quickly.
- Activity Heartbeats are implemented in code and are recorded at the discretion of the [Workflow](#workflow) implementation.
- Custom [Activity](#activity) progress information can be included in an Activity Heartbeat and can be used when the [Activity](#activity) is retried.
