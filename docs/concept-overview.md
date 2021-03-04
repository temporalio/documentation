---
id: concept-overview
title: Conceptual Overview
sidebar_label: Overview
description: This guide will help you build your own resilient applications using Temporal Workflow as Code™
---

import { ResponsivePlayer } from '../src/components'

## The problem

Have you ever developed an application that had to respond to multiple asynchronous events, communicate with unreliable external resources, or track the state of something very complex?

If so, you are likely familiar with the mixture of stateless services, databases, cron jobs, and queuing systems that is the modern approach to building such applications.

But these types of systems often come with a number of problems.
It can be quite difficult to maintain the health of all the individual components.
And there is usually a large investment that has to be made in infrastructure that can visualize the health of the overall system, define timeouts, and orchestrate retries. Scaling and maintaining these systems is challenging and costly.

## The Temporal solution

The Temporal solution is a fault-oblivious stateful programming model that hides or abstracts most of the complexities mentioned above.

Watch this 2 minute video to get a better sense of what that means:

<ResponsivePlayer url='https://www.youtube.com/watch?v=f-18XztyN6c'/>

<br/>

The Temporal solution consists of a programming framework (Temporal SDK) and a backend service (Temporal Server).

The [Temporal Server](/docs/server-introduction) provides a durable virtual memory that is not linked to any specific process.
It preserves the full application state, including function stacks with local variables, across all kinds of hosting and software related failures.

A [Temporal SDK](/docs/sdks-introduction) then enables you to write your application code using the full power of the programming language, while Temporal Server handles the durability, availability, and scalability of the application.

# Core concepts

## some subtitle
