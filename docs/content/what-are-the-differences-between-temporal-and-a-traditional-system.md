---
id: what-are-the-differences-between-temporal-and-a-traditional-system
title: What are the differences between Temporal and a traditional system?
description: Compare a function execution in a traditional system to a Workflow Execution in Temporal.
tags:
  - explanation
---

import DetermineHeader from '../components/DetermineHeader.js'

export const headingText = 'What are the differences between Temporal and a traditional system?'

<DetermineHeader
hLevel={props.heading}
hText={headingText}
/>

The Temporal platform exists to facilitate Workflow Executions.
Compare a function execution in a traditional system to a Workflow Execution in Temporal.

![Diagram that shows traditional function execution and Temporal Workflow Execution](/img/docs/function-execution-vs-reentrant-process.png)

:::note Legend

λ = traditional function execution
π = Temporal Workflow Execution
𝝈 = state

:::

Although the two systems seem similar at first glance, they differ in several significant ways.

## Failure

In a traditional system, a service function execution (λ) is both volatile and short-lived.

- If a function execution fails, it's not resumable because all execution state is lost. The longer a function execution awaits, the higher the change of failure.
- A traditional function execution typically has a limited lifespan, often measured in minutes.

In Temporal, a Workflow Execution (π) is resumable.

- A Workflow Execution is fully resumable after a failure of any kind.
- Temporal imposes no deadline on a Workflow Execution.

## State

In a traditional system, stoppage or failure means that all execution state is lost.
Your application (or a supporting component) must monitor the service's response to initiate a retry of the service execution.
A retry starts from its _initial_ state.

In Temporal, computation resumes from its _latest_ state. All progress is retained.

## Communication

In a traditional system, you can't "communicate" with a function execution.

In Temporal, you can use Signals to "communicate" with a Workflow Execution.
You can also query the state of a Workflow Execution.

## Scope

In a traditional system, a service function execution can at best represent a business process.
Typically, it represents only a part of a business process.

A Temporal Workflow Execution can represent a business process or an entire business object.
