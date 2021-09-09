---
id: what-is-a-task-queue
title: What is a Task Queue?
description: todo
---

A queue that a [Worker](#worker) subscribes to and polls to pick up tasks to execute.

- Each Task Queue is capable of queuing [Activity Tasks](#activity-task) and [Workflow Tasks](#workflow-task).
- Task Queues rely on the same persistent storage as the rest of the Temporal service. (Task Queues are not based on other technologies such as Kafka.)s
