---
id: what-is-an-event-history
title: What is an Event History?
sidebar_label: Event History
description: An append log of Events that represents the full state a Workflow Execution.
tags:
  - term
  - explanation
---

An append-log of [Events](/concepts/what-is-an-event) for your application.

- Event History is durably persisted by the Temporal service, enabling seamless recovery of your application state from crashes or failures.
- It also serves as an audit log for debugging.

**Event History limits**

The Temporal Cluster stores the complete Event History for the entire lifecycle of a Workflow Execution.

[There is a hard limit of 50,000 Events](/concepts/what-is-a-workflow-execution/#limits) in a Workflow Execution Event History, as well as a hard limit of 50 MB in terms of size.
The Temporal Cluster logs a warning at every 10,000 Events.

When the Event History reaches 50,000 Events or the size limit of 50 MB, the Workflow Execution is forcefully terminated.
