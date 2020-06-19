---
id: use-cases-orchestration
title: Microservice Orchestration
sidebar_label: Microservice Orchestration
---

## Motivation

It is common to break a large application into **microservices** structured around the application's distinct business capabilities. Services are owned by unrelated teams with individual technology choices and release processes.

Each microservice typically has its own storage and interacts with other services via a well-defined API. At the same time, business processes (workflows) may need to call multiple microservices to achieve the desired outcome.

The implementation must **guarantee** that all of the calls eventually succeed even in the case of prolonged failures of individual microservices, preserving business rules across multiple independent sub-domains.

The service interdependency graph can be remarkably complicated. Processes can run asynchronously, in parallel, some tasks need information from other systems, and the next steps depend on the outcome of previous activities.

## Benefits of Temporal

Temporal is a perfect fit for microservice orchestration scenarios. It guarantees that workflow code eventually completes, has built-in support for exponential activity **retries**, and simplifies the coding of the **compensation** logic. 

You can define retries, rollbacks, or even a human intervention in case of failure. Workflows are defined in general-purpose programming languages that bring the ultimate **flexibility** in contrast with text-based DSL engines.

Temporal provides full **visibility** into each workflow's state, in contrast to an ad-hoc orchestration based on queues where getting a current status of each request is virtually impossible.

Temporal seamlessly scales to a large number of workflows running in parallel and has native [Saga pattern support](./use-cases-distributed-transactions).

## Next Steps

Here are two real-world examples of Temporal-powered service orchestration scenarios:

 * [Using Temporal workflows to spin up Kubernetes](https://banzaicloud.com/blog/introduction-to-cadence/) by Banzai Cloud
 * Improving the User Experience with Uber’s [Customer Obsession Ticket Routing Workflow and Orchestration Engine](https://eng.uber.com/customer-obsession-ticket-routing-workflow-and-orchestration-engine/)
