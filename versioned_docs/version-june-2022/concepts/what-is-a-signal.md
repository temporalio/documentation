---
id: what-is-a-signal
title: What is a Signal?
sidebar_label: Signal
description: A Signal is an external asynchronous request to a Workflow Execution.
tags:
  - signals
  - explanation
---

A Signal is an external asynchronous request to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

A Signal is meant to deliver data to a running Workflow Execution which can be used to change variable values and the state of Workflow Execution.
A Signal can not return data to the caller, use [Queries](/concepts/what-is-a-query) for that.
A Signal can be sent using a Temporal Client or from within a Workflow.
When a Signal is sent, it is received by the Cluster and recorded as an Event to the Workflow Execution Event History.
The Cluster will deduplicate Signals and use the first Signal with a particular Id.
The next scheduled Workflow Task contains the Signal Event.

A Signal is a message with a unique Id.
A Signal must include a destination (Namespace + Workflow Id).

A Signal Header includes the following:

- Recipient: Workflow Execution (Namespace + Workflow Id)
- Id: The unique Id of the Signal.
- Name: The queue in which the Signal will be added.

A Signal Body includes the following:

- Any encodable data.

Workflow functions listen for Signals by the Signal name.
Signals are delivered in the order they are received.
Workflow Execution can optionally await on a single Signal name or multiple Signal names.

If you are using Signals with the Go SDK, you should make sure to do an asynchronous drain on the Signal channel or the Signals will be lost.

- [How to use Signals in Go](/go/how-to-use-signals-in-go)
- [How to use Signals in Java](/java/signals)
- [How to use Signals in PHP](/php/signals)
