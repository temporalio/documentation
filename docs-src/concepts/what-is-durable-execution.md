---
id: what-is-durable-execution
title: Durable Execution
sidebar_label: Durable Execution
description: todo
tags:
  - temporal
  - durable execution
  - term
---

Durable Execution in the context of Temporal refers to the ability of a Workflow Execution to maintain its state and progress even in the face of failures, crashes, or server outages.
This is achieved through Temporal's use of an [Event History](/concepts/what-is-an-event-history), which records the state of a Workflow Execution at each step.
If a failure occurs, the Workflow Execution can resume from the last recorded event, ensuring that progress isn't lost.
This durability is a key feature of Temporal Workflow Executions, making them reliable and resilient.
It enables application code to execute effectively once and to completion, regardless of whether it takes seconds or years.
