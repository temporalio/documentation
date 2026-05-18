---
id: workflow-message-passing
title: Temporal Workflow message passing - Signals, Queries, & Updates
sidebar_label: Workflow message passing
description: Signals, Queries, and Updates facilitate interactions with Workflow Executions.
tags:
  - Concepts
  - Signals
  - Queries
  - Updates
  - Messages
keywords:
  - temporal workflow signals
  - temporal workflow queries
  - temporal workflow updates
  - temporal workflow execution
  - message passing temporal
  - signal-with-start temporal
  - temporal query handler
  - temporal signal handler
  - temporal update handler
  - temporal update validator
  - temporal message passing
  - workflow state temporal
  - synchronous operation temporal
  - asynchronous request temporal
  - temporal service events
  - temporal client methods
  - temporal sdk message passing
---

import * as Components from '@site/src/components';

Workflows can be thought of as stateful web services that can receive messages. The Workflow can have powerful message
handlers akin to endpoints that react to the incoming messages in combination with the current state of the Workflow.
Temporal supports three types of messages: Signals, Queries, and Updates:

- Queries are read requests. They can read the current state of the Workflow but cannot block in doing so.
- Signals are asynchronous write requests. They cause changes in the running Workflow, but you cannot await any response
  or error.
- Updates are synchronous, tracked write requests. The sender of the Update can wait for a response on completion or an
  error on failure.

## How to choose between Signals, Updates, and Queries as a Workflow author? {#choosing-messages}

This section will help you write Workflows that receive messages.

### For write requests

Unlike Signals, Updates must be synchronous and must wait for the Worker running the Workflow to acknowledge the
request.

The following table compares when to use **Signals** versus **Updates**.

| **Requirement type**           | **Use Signals when...**                                                                     | **Use Updates when...**                                                                                                                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Asynchronous communication** | Clients want to quickly move on after sending an asynchronous message.                      | Clients want to track the completion of the message.                                                                                                                                       |
| **Result handling**            | Clients are okay with “fire and forget” — no result or exception needed.                    | Clients need a result or exception without performing a query.                                                                                                                             |
| **Worker availability**        | Clients don't depend on the Worker being available.                                         | You want to validate the Update before accepting it into the Workflow and its history.                                                                                                     |
| **Concurrency and throughput** | You don’t want to limit the number of messages processed concurrently by a single Workflow. | You don’t need more concurrent Updates per Workflow than the allowed limits for [Cloud](/cloud/limits#per-workflow-execution-update-limits) or [Self-Hosted](/self-hosted-guide/defaults). |
| **Latency sensitivity**        | Since clients don’t expect a result, latency is often not relevant when using Signals.      | Clients want a low-latency end-to-end operation and are willing to wait for completion or validation.                                                                                      |

### For read requests

You normally want to do a Query, because:

- Queries are efficient–they never add entries to the [Workflow Event History](/workflow-execution/event#event-history),
  whereas an Update would (if accepted).
- Queries can operate on completed Workflows.

However, because Queries cannot block, sometimes Updates are best. When your goal is to do a read once the Workflow
achieves a certain desired state, you have two options:

- You could poll periodically with Queries until the Workflow is ready.
- You could write your read operation as an Update, which will give you better efficiency and latency, though it will
  write an entry to the [Workflow Event History](/workflow-execution/event#event-history).

### For read/write requests

Use an Update for synchronous read/write requests. If your request must be asynchronous, consider sending a Signal
followed by polling with a Query.
