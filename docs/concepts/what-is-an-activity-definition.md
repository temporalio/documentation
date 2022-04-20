---
id: what-is-an-activity-definition
title: What is an Activity Definition?
sidebar_label: Activity Definition
description: An Activity Definition is the code that defines the constraints of an Activity Task Execution.
tags:
  - explanation
---

An Activity Definition is the set of constraints that apply to an [Activity Execution](/docs/concepts/what-is-an-activity-execution). Activity Definitions are referred to by their [Activity Type](/docs/concepts/what-is-an-activity-type.md).

In Temporal documentation, the term 'Activity Definition' will be used to refer to an Activity Function Definition——the method or function that is invoked for an [Activity Task Execution](/docs/concepts/what-is-an-activity-task-execution.md). Some SDKs refer to Activity Definitions as Activity Functions, Activity Interfaces, or Activity Methods. All of these terms refer to the source of an instance of an execution, with an Activity Interface being a collective group of functions.

<!-- TODO: diagram here -->

![Activity Definition](/diagrams/activity-definition.png)

## Constraints

Temporal does not recover Activity state in the event of failure. Therefore, an Activity Definition has no restrictions on the code it contains.

## Parameters

An Activity Definition can support as many parameters as needed. All values passed through these parameters are recorded in the [Event History](/docs/concepts/what-is-an-event-history.md).

Activity Definitions must contain the following parameters:

- Context: an optional parameter that provides Activity context within multiple APIs.
- Heartbeat: a notification from the Worker to the Temporal Cluster that the Activity Execution is progressing. Cancelations are only allowed if the Activity Definition permits Heartbeating.
- Timeouts: intervals that control the execution and retrying of Activity Task Executions.

Other parameters, such as retry policies and return values, can be seen in the implementation guides below.

## Implementing Activity Definitions

We strongly recommend that you develop an Activity Definition in a language with a corresponding Temporal SDK.

**Implementation guides:**

- [How to develop an Activity Definition in Go](/docs/go/how-to-develop-an-activity-definition-in-go)
- [How to develop an Activity Interface in Java](/docs/java/activities.md#activity-interface)
- [How to develop an Activity Interface in PHP](/docs/php/activities.md#activity-interface)
- [How to develop an Activity Interface in TypeScript](/docs/typescript/activities.md#how-to-write-an-activity-function)
