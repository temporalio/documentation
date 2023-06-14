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

The Temporal Cluster logs a [warning after 10Ki (10,240) Events](/workflows#limits) and periodically logs additional warnings as new Events are added.
If the Event History exceeds 50Ki (51,200) Events, the Workflow Execution is terminated.
