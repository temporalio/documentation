---
id: signals
title: Signals
sidebar_label: Signals
description: Discover Signal implementation guides
tags:
  - temporal sdk
  - signal
  - sdk feature
---

**What is a Signal?**

A Signal is an asynchronous request to a [Workflow Execution](/workflows#workflow-execution).

A Signal is a great way to send new data into an Open Workflow Execution.
You can use the new data to change the state of the Workflow.

<LanguageLinks>
- Go SDK
- [Feature guide](/go/features/signals/introduction)
- Java SDK
- [Feature guide](/java/signals)
- PHP SDK
- [Feature guide](/php/signals)
- Python SDK
- [Feature guide](/python/signals)
- TypeScript SDK
- [Feature guide](/typescript/signals)
</LanguageLinks>

A Signal transmits data to an active Workflow Execution but does not return data to the caller.
For returning data, use a [Query](/dev-guide/sdk-features/queries).

The Workflow code processing a Signal can alter the Workflow state.

Temporal Clients or other Workflows can send Signals.
Each Signal must specify a destination (Namespace and Workflow ID) and a name, and may carry a list of arguments.
Upon sending a Signal, the Cluster receives it and logs it as an Event in the Workflow Execution's Event History. Receiving a successful response from the Cluster indicates that the Signal is stored and will be delivered to the Workflow Execution at least once.[^1] The upcoming Workflow Task will include this Signal Event.

[^1] Signal handlers, which are effectively functions inside the Workflow, await Signals identified by their names.
The Cluster delivers these Signals in the order it receives them, recording them in the History.
To prevent issues with multiple Signal deliveries, integrate idempotency logic into your Signal handler to detect and handle duplicates.
