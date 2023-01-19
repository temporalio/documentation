---
id: what-is-the-temporal-platform
title: What is the Temporal Platform?
sidebar_label: Temporal Platform
description: The Temporal Platform consists of a Temporal Cluster and Worker Processes.
tags:
  - term
  - explanation
---

The Temporal Platform consists of a [Temporal Cluster](/concepts/what-is-a-temporal-cluster) and [Worker Processes](/concepts/what-is-a-worker-process).
Together these components create a runtime for Workflow Executions; that is-they create a runtime for your application.

![The Temporal Platform](/diagrams/temporal-platform-simple.svg)

The Temporal Cluster is open source and can be operated by you.
[Temporal Cloud](/concepts/what-is-temporal-cloud) is a set of Clusters operated by us.

Worker Processes are hosted and operated by you and execute your code.
They communicate with a Temporal Cluster via gRPC.

![Basic component topology of the Temporal Platform](/diagrams/temporal-platform-component-topology.svg)

### Temporal vs traditional

In a traditional system, the service exists to spawn function executions.
The Temporal Platform exists to facilitate [Workflow Executions](/workflows#workflow-execution).

![Temporal vs Traditional system](/diagrams/temporal-vs-traditional.svg)

Although the two systems seem similar at first glance, they differ in several significant ways.

**Failure**

With a traditional system, a service function execution is both volatile and short-lived.

- If a function execution fails, it's not resumable because all execution state is lost. The longer a function execution awaits, the higher the chance of failure.
- A traditional function execution typically has a limited lifespan, often measured in minutes.

With Temporal, a Workflow Execution is resumable.

- A Workflow Execution is fully resumable after a failure.
- Temporal imposes no deadlines on Workflow Executions.

**State**

With a traditional system, stoppage or failure means that all execution state is lost.
Your application (or a supporting component) must monitor the service's response to initiate a retry of the service execution.
A retry starts from its _initial_ state.

With Temporal, computation resumes from its _latest_ state. All progress is retained.

**Communication**

With a traditional system, you can't communicate with a function execution.

With Temporal, [Signals](/concepts/what-is-a-signal) and [Queries](/concepts/what-is-a-query) enable data to be sent to or extracted from a Workflow Execution.

**Scope**

With a traditional system, a service function execution can at best represent a business process.
Typically, it represents only a part of a business process.

A Temporal Workflow Execution can represent a business process or an entire business object.

### Failure mitigation

The Temporal Platform addresses both platform-level failures and application-level failures.

#### Platform-level failure

A platform-level failure refers to a failure that occurs within the underlying platform or infrastructure that supports an application or system.
This type of failure can often be transparent to the application, meaning it is not directly visible to the user or application and can be detected and mitigated at a platform level.
Temporal is made to insulate your application from platform-level failures.
In Temporal, platform-level failures include network issues, process crashes, hardware failures, and transient errors in downstream services or third-party APIs.

#### Application-level failure

Conversely, an application-level failure refers to a failure that occurs within the application itself.
This type of failure is directly visible to the user or application and must be detected and mitigated at the application level.
Temporal cannot mitigate application-level failures for you, but Temporal greatly simplifies handling failures and debugging your application.
An example of an application-level failure could be an error in the application's code or a problem with the input data being used by the application.

#### Failure handling

Failure handling is an essential part of an application.
[Temporal Failures](/kb/failures) is a list of the types of errors that occur in the system.

For languages that throw (or raise) errors (or exceptions), throwing an error that is not a Temporal Failure from a Workflow fails the [Workflow Task](/concepts/what-is-a-workflow-task) (and the Task will be retried until it succeeds), whereas throwing a Temporal Failure (or letting a Temporal Failure propagate from Temporal calls, like an [Activity Failure](/kb/failures#activity-failure) from an Activity call) fails the [Workflow Execution](/concepts/what-is-a-workflow-execution).
For more information, see [Application Failure](/kb/failures#application-failure).

:::note Related blog posts

- [Handling Failure From First Principles](https://dominik-tornow.medium.com/handling-failures-from-first-principles-1ed976b1b869)
- [Failure Handling in Practice](https://temporal.io/blog/failure-handling-in-practice)

:::
