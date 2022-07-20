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

A Signal delivers data to a running Workflow Execution.
It cannot return data to the caller (use [Queries](/concepts/what-is-a-query) for that).
The Workflow code that handles a Signal may mutate Workflow state.
A Signal can be sent from a Temporal Client or a Workflow.
When a Signal is sent, it is received by the Cluster and recorded as an Event to the Workflow Execution [Event History](/concepts/what-is-an-event-history).
A successful response from the Cluster means that the Signal has been persisted and will be delivered at least once to the Workflow Execution.[^1]
The next scheduled Workflow Task will contain the Signal Event.

A Signal must include a destination (Namespace and Workflow Id) and name.
It can include a list of arguments.

Signal handlers are Workflow functions that listen for Signals by the Signal name.
Signals are delivered in the order they are received by the Cluster.
If multiple deliveries of a Signal would be a problem for your Workflow, add idempotency logic to your Signal handler that checks for duplicates.

- [How to use Signals](/application-development-guide/#signals)

[^1]: The Cluster usually deduplicates Signals, but does not guarantee deduplication: During shard migration, two Signal Events (and therefore two deliveries to the Workflow Execution) can occur for a single Signal because the deduping info is stored only in memory.
