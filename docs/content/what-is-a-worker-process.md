---
id: what-is-a-worker-process
title: What is a Worker Process?
description: A Worker Process is any operating system process that hosts a non-empty set of Worker Objects.
tags:
  - explanation
---

import RelatedRead from '../components/RelatedRead.js'
import CenteredImage from "../components/CenteredImage.js"
import DetermineHeader from '../components/DetermineHeader.js'

<DetermineHeader
hLevel={props.hLevel}
hText={props.hText}
/>

A Worker Process (P) is any operating system process that hosts a non-empty set of Worker Objects (W₁).
Workflow Functions and Activity Functions execute in the context of a Worker Process P.

<CenteredImage
imagePath="/diagrams/worker-process-and-worker-object.svg"
imageSize="50"
/>

<br/>

Temporal application developers are responsible for developing and operating Worker Processes.
An application can have as many Worker Processes as needed to meet scalability and reliability requirements.

<RelatedRead
text="When to scale to Workers Processes"
goTo="#"
tagChar="g"
/>

A process is a Worker Process if that process speaks the [Task Queue Protocol](#) and the [Task Processing Protocol](#).

- A process can act as a Workflow Worker Process if that process speaks the [Workflow Task Queue Protocol](#) and the [Workflow Task Processing Protocol](#).
  - Whenever a Worker gets a Workflow Task, it makes progress with a Workflow Execution.
- A process can act as an Activity Worker Process if that process speaks the [Activity Task Queue Protocol](#) and the [Activity Task Processing Protocol](#).
  - Whenever a worker gets an Activity Task, it makes progress with an Activity Execution.
- A process can act as both a Workflow Worker Process and an Activity Worker Process.

The easiest way to do this is to use one of the Temporal SDKs.
The current official SDKs are structured around the abstraction/concept of a Worker Object.
The following section describes Worker Objects.
