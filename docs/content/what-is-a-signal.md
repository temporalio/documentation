---
id: what-is-a-signal
title: What is a Signal?
description: A Signal is an external asynchronous request to a Workflow Execution.
tags:
  - signals
  - explanation
---

A Signal is an external asynchronous request to a [Workflow Execution](/docs/content/what-is-a-workflow-execution).

import {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'
<!-- prettier-ignore -->
import * as HowToSignalsInGo from '../go/signals.md'
import * as HowToSignalsInJava from '../java/signals.md'
import * as HowToSignalsInPHP from '../php/signals.md'

A Signal is a message.
A Signal has an Id. It has a destination (Namespace + Id of the Workflow Execution).
Signals are received by the Cluster.
The Signal is recorded as an Event to the Workflow Execution Event History.

Signal Header:
- Recipient: Workflow Execution (Namespace + Workflow Id)
- Id: The unique id of the Signal.
- Name: The queue in which the Signal will be added.

Signal Body: any encodable data.

Each Workflow Task contains the full Event History.

The next Workflow Task for that Workflow Execution, and delivered to the Workflow Execution.

Workflow functions listens for the Signal by the Signal name.

Workflow Execution can optionally await on a Signal.

Workflow functions may await on multiple Signal names.






Signals are delivered in the order they are received.

The Cluster will deduplicate Signals.
Signals have Ids, only the first Signal with that Id will be delivered.

Signals are received by the Temporal Cluster and are delivered to the Workflow Execution.


- A Signal is meant to deliver notifications and/or updates to a running Workflow Execution that can change variable values and the state of Workflow Execution.
- Signals can receive data, but cannot return it.
- When a Signal is received by the Temporal Cluster, the Cluster persists the Signal (which includes it payload) as an Event in the Workflow Execution's Event History.
The Workflow can then handle the Signal at any time afterwards without the risk of losing the information.

<RelatedReadContainer>
  <RelatedReadItem page={HowToSignalsInGo} />
  <RelatedReadItem page={HowToSignalsInJava} />
  <RelatedReadItem page={HowToSignalsInPHP} />
</RelatedReadContainer>
