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
Together these components create a runtime for Workflow Executions.

![The Temporal Platform](/diagrams/temporal-platform-simple.svg)

The Temporal Cluster is open source and can be operated by you.
[Temporal Cloud](/concepts/what-is-temporal-cloud) is a set of Clusters operated by us.

Worker Processes are hosted by you and execute your code.
They communicate with a Temporal Cluster via gRPC.

### Failure mitigation

The Temporal Platform addresses both platform-level failures and application-level failures.

#### Platform-level failure

A platform-level failure refers to a failure that occurs within the underlying platform or infrastructure that supports an application or system.
This type of failure can often be transparent to the application, meaning it is not directly visible to the user or application and can be detected and mitigated at a platform level.
Temporal is made to insulate your application from platform-level failures.
An example of a platform-level failure could be a network connection issue or hardware failure.

#### Application-level failure

Conversely, an application-level failure refers to a failure that occurs within the application itself.
This type of failure is directly visible to the user or application and must be detected and mitigated at the application level.
Temporal cannot mitigate application-level failures for you, but Temporal greatly simplifies handling failures and debugging your application.
An example of an application-level failure could be an error in the application's code or a problem with the input data being used by the application.

#### Failure handling

Failure handling is an essential part of an application.

For languages that throw (or raise) errors (or exceptions), throwing an error that is not a Temporal Failure from a Workflow fails the [Workflow Task](/concepts/what-is-a-workflow-task) (and the Task will be retried until it succeeds), whereas throwing a Temporal Failure (or letting a Temporal Failure propagate from Temporal calls, like an [Activity Failure](/kb/failures#activity-failure) from an Activity call) fails the [Workflow Execution](/concepts/what-is-a-workflow-execution).
For more information, see [Application Failure](/kb/failures#application-failure).

:::note Related blog posts

- [Handling Failure From First Principles](https://dominik-tornow.medium.com/handling-failures-from-first-principles-1ed976b1b869)
- [Failure Handling in Practice](https://temporal.io/blog/failure-handling-in-practice)

:::
