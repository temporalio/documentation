---
id: what-is-a-signal
title: What is a Signal?
description: A Signal is an external asynchronous request to a Workflow Execution.
tags:
  - signals
  - explanation
---

A Signal is an external asynchronous request to a [Workflow Execution](/docs/content/what-is-a-workflow-execution).

A Signal is meant to deliver data to a running Workflow Execution which can be used to change variable values and the state of Workflow Execution.
A Signal can not return data to the caller, use [Queries](/docs/content/what-is-a-query) for that.
A Signal can be sent using a Temporal Client or from within a Workflow.
When a Signal is sent, it is received by the Cluster and recorded as an Event to the Workflow Execution Event History.
The Cluster will deduplicate Signals and use the first Signal with a particular Id.
The next scheduled Workflow Task contains the Signal Event.

A Signal is a message with a unique Id.
A Signal must include a destination (Namespace + Workflow Id).

A Signal Header includes the following:

- Recipient: Workflow Execution (Namespace + Workflow Id)
- Id: The unique id of the Signal.
- Name: The queue in which the Signal will be added.

A Signal Body includes the following:

- Any encodable data.

Workflow functions listen for Signals by the Signal name.
Signals are delivered in the order they are received.
Workflow Execution can optionally await on a single Signal name or multiple Signal names.

[How to use Signals in Go](/docs/go/signals)
[How to use Signals in Java](/docs/java/signals)
[How to use Signals in PHP](/docs/php/signals)
