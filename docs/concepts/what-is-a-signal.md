---
id: what-is-a-signal
title: What is a Signal?
sidebar_label: Signal
description: A Signal is an asynchronous request to a Workflow Execution.
tags:
  - signals
  - explanation
---

A Signal is an asynchronous request to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

- [How to develop, send, and handle Signals in code](/application-development/features#signals)
- [How to send a Signal using tctl](/tctl/workflow/signal)

A Signal is meant to deliver data to a running Workflow Execution which can be used to change variable values and the state of Workflow Execution.
A Signal can not return data to the caller, use [Queries](/concepts/what-is-a-query) for that.
A Signal can be sent with [tctl workflow signal](/tctl/workflow/signal#signals-with-tctl) commands, from a Temporal Client, or from within a Workflow.
When a Signal is sent, it is received by the Cluster and recorded as an Event to the Workflow Execution Event History.
The Cluster will deduplicate Signals and use the first Signal with a particular Id.
The next scheduled Workflow Task contains the Signal Event.

A Signal must include a destination (Namespace and Workflow Id) and name.
It can include a list of arguments.

Signal handlers are Workflow functions that listen for Signals by the Signal name.
Signals are delivered in the order they are received by the Cluster.
If multiple deliveries of a Signal would be a problem for your Workflow, add idempotency logic to your Signal handler that checks for duplicates.

[^1]: The Cluster usually deduplicates Signals, but does not guarantee deduplication: During shard migration, two Signal Events (and therefore two deliveries to the Workflow Execution) can be recorded for a single Signal because the deduping info is stored only in memory.
