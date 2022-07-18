---
id: what-is-an-activity-definition
title: What is an Activity Definition?
sidebar_label: Activity Definition
description: An Activity Definition is the code that defines the constraints of an Activity Task Execution.
tags:
  - explanation
---

An Activity Definition is the code that defines the constraints of an [Activity Task Execution](/concepts/what-is-an-activity-task-execution).

- [How to develop an Activity Definition](/application-development-guide/#develop-activities)

The term 'Activity Definition' is used to refer to the full set of primitives in any given language SDK that provides an access point to an Activity Function Definition——the method or function that is invoked for an [Activity Task Execution](/concepts/what-is-an-activity-task-execution).
Therefore, the terms Activity Function and Activity Method refer to the source of an instance of an execution.

Activity Definitions are named and referenced in code by their [Activity Type](/concepts/what-is-an-activity-type).

![Activity Definition](/diagrams/activity-definition.svg)

#### Constraints

Activity Definitions are executed as normal functions.

In the event of failure, the function begins at its initial state when retried (except when Activity Heartbeats are established).

Therefore, an Activity Definition has no restrictions on the code it contains.

#### Parameters

An Activity Definition can support as many parameters as needed.

All values passed through these parameters are recorded in the [Event History](/concepts/what-is-an-event-history) of the Workflow Execution.
Return values are also captured in the Event History for the calling Workflow Execution.

Activity Definitions must contain the following parameters:

- Context: an optional parameter that provides Activity context within multiple APIs.
- Heartbeat: a notification from the Worker to the Temporal Cluster that the Activity Execution is progressing. Cancelations are allowed only if the Activity Definition permits Heartbeating.
- Timeouts: intervals that control the execution and retrying of Activity Task Executions.

Other parameters, such as [Retry Policies](/concepts/what-is-a-retry-policy) and return values, can be seen in the implementation guides, listed in the next section.
