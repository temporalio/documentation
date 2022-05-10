---
tags:
  - Temporal
  - concepts
posted_on_: 2021-08-13T00:00:09Z
slug: long-running
title: 'What does "Long Running" really mean?'
author: swyx
author_title: Head of Developer Experience
author_image_url: https://avatars.githubusercontent.com/u/6764957?v=4
release_version: V1.11.3
---


<!--truncate-->

In most discussions of Temporal use cases, we go straight to talking about "long running" work. In the past, I typically associated that sort of work with "use if I need to do video processing". But I was wrong.

**"Long running" usecases are both shorter *and* longer than you think.**

## Context

If you surveyed most developers for what a "long running job" typically means to them, they would usually point to a range of intervals from 10 minutes to 6 hours, based on their background. 

A common shorthand we've used in the past is "anything beyond request/response". You can use AWS Lambda's default timeout of 3 seconds as a boundary between "request/response" and "long running". But even though you can extend that timeout to 15 minutes, would you really want to?

Perhaps "long running" isn't really about some arbitrary cutoff in time.

## "Long Running" can be really short

[Box uses Temporal](/blog/temporal-a-central-brain-for-box) for orchestrating file update operations. Although this can take hours for large transfer, the vast majority of these feel instantaneous to users. We ideally want one solution to scale from the smallest to largest usecases with no more visible latency than absolutely necessary. Box uses Temporal more for transactional and reliability guarantees around microservice orchestration, and the words "Long Running" were never even mentioned. 

Workflow engines that rely on a centralized scheduler [have a confusing floor to their latency](https://stackoverflow.com/questions/49902599/airflow-latency-between-tasks) and a poor fit for cases where you want the work to be done **as soon as possible** rather than once a day. It *could* be long running, but mostly it's not, and the programming model needs to scale with your users rather than swap out systems based on some arbitrary threshold.

**Under the hood, Temporal accomplishes fast responses with [long polling](https://ably.com/topic/long-polling)**. Workers listen to Task Queues inside Temporal Server, which hold the HTTP connection open until the next [Command](/temporal-explained/introduction/#command) is enqueued. While Temporal is not suited for truly realtime needs like gaming, this lets Temporal workers respond quickly to state changes and is much less resource intensive than using web sockets.

> Note: this is also why we strongly recommend [monitoring ScheduleToStart latency](/server/production-deployment#scaling-and-metrics) for production deployments, as a spike in this latency metric is your first indication of a spike in traffic or problem with your Workers or networking.

## "Long Running" can be infinitely long

[Checkr uses Temporal](/blog/how-temporal-simplified-checkr-workflows) for coordinating background checks. This is a multi-staged process with a *huge* range in processing times, ranging from pinging a database search API, to dispatching a court researcher to a court house, followed by analyzing each record and potentially escalating to manual QA. The whole process could take days.

The problem with hand-rolled orchestration systems built out of queues and databases is that the longer a job runs, **the more moving parts, the more likely you will find which of the [fallacies of distributed computing](https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing) you have forgotten**, whether it is failing to persist some state, instrumenting for observability and debuggability, or even rolling out changes with production infrastructure mid-flight.

Temporal solves this by persisting [event histories](/temporal-explained/introduction/#event-history) as a source of truth, solving for both observability and reliability in one fell swoop. While there is a [soft limit](/server/production-deployment/#server-limits) of 10,000 events in a single Workflow Execution, you can pick a natural cutoff point to snapshot state and start a new Workflow Execution with our [ContinueAsNew](/typescript/workflows/#why-continueasnew-is-needed) API. 

In practice, this means you can write **infinitely long running Workflows.** Since Temporal makes state easy to store and fully auditable, this has the potential to change your programming model completely, by allowing you to model every user as a long lived Entity in your system. 

> For example, you could use this for e-commerce: coordinating actions like loyalty rewards, subscription charges, and reminder emails over the entire history of their relationship with you.

## It's really about Uncertainty

The notion that "Temporal is for long running work" is more subtle than appears at first glance. If your microservices and third party APIs were always reliable and always responded quickly, you wouldn't need Temporal. If you didn't care about modeling and testing full journeys with code, from a multi-stage background check, to the entire history of a customer from signup to churn, then you could keep piecing them together on an ad-hoc basis.

But it's when you're *unsure* about parts of your distributed system that you need Temporal. **When you cross network boundaries, when you need to scale horizontally, or when you need to coordinate migrations**, you start needing a solution that separates these mechanical uncertainties from the business logic. 

Most engineers have learned to deal with uncertainty piecemeal, painful incident after painful incident. We've assembled centuries of distributed systems experience to solve it for you.
