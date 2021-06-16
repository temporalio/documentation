---
id: introduction
title: Concepts introduction
sidebar_label: Introduction
description: This guide will help you build your own resilient applications using Temporal Workflow as Code™
---

import { ResponsivePlayer } from '../../src/components'

## Modern problems

Have you ever developed an application that needed to respond to multiple asynchronous events, communicate with unreliable external resources, or track the state of something very complex?

If so, you are likely familiar with the mixture of stateless services, databases, cron jobs, and queuing systems that is the modern approach to building such applications.

However, these types of systems often come with a number of problems.
It can be quite difficult to maintain the health of each individual component.
Moreover, there is usually a large investment that has to be made in infrastructure to visualize the health of the overall system, define timeouts, and orchestrate retries.
Scaling and maintaining these systems is challenging and costly effort.

## Modern solution

The Temporal solution is a fault-oblivious stateful programming model that hides or abstracts most of the complexities mentioned above.

Watch this 2-minute video to get a better sense of what that means:

<ResponsivePlayer url='https://www.youtube.com/watch?v=f-18XztyN6c'/>

<br/>

The Temporal solution consists of a programming framework (Temporal SDK) and a backend service (Temporal Server).

The [Temporal Server](/docs/server/introduction) provides a durable virtual memory that is not linked to any specific process.
It preserves the full application state (including function stacks with local variables) across all kinds of hosting and software related failures.

A [Temporal SDK](/application-development) then enables you to write your application code using the full power of the programming language, while the Temporal Server handles the durability, availability, and scalability of the application.

:::note Temporal as a Distributed System
In terms of CAP theorem, each Temporal cluster is eventually available and highly consistent.

- Because Temporal makes it easy to retry Activities and horizontally scale resources, availability loss doesn't result in a fault, but in increased latency.
- Network failures are prevented from reaching the application level.
  If persistence nodes are lost or unreachable, your Workflows will not progress, but the data will still be highly consistent.
- The optional [multi-cluster replication feature](/docs/server/multi-cluster) greatly increases system availability.

:::

## Core concepts

Temporal SDKs enable you to build applications around a set of key concepts.

- [Workflows](/docs/concepts/workflows) - Functions or object methods that are the entry point and base of your application.
- [Activities](/docs/concepts/activities) - Functions or object methods that handle non-deterministic business logic.
- [Workers](/docs/concepts/workers) - Processes running on physical or virtual machines that execute Workflow and Activity code.
- [Signals](/docs/concepts/signals) - Write-only calls to Workflows that can update the variable values and Workflow state.
- [Queries](/docs/concepts/queries) - Read-only calls to Workflows that can retrieve function return values and Workflow state.
- [Task Queues](/docs/concepts/task-queues) - A routing mechanism that enables load balancing.

Each of the language-specific SDKs may present these concepts to the developer in a slightly different way, but the idea behind them remains the same.
Select from the list above, or read on to learn more about each of these developer-facing concepts and what they mean.
