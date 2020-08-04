---
id: activities
title: Activities
sidebar_label: Activities
---

## Overview

Activities are like [Workflow](docs/workflows) subroutines that execute nondeterministic business logic. They are units of code that execute ashychronously to a Workflow, and return their results back to the Temporal service (which then notifies the Workflow).

A very common use case for Activities, for example, is making a request to an external API. API requests carry the potential for any number of uknown outcomes. From a high level, the Workflow uses the Activity to make a request to the API. If successful, the result of the API request can then be used by the Workflow.

![Activity diagram - API request](/static/img/docs/activity-diagram-01.png)

## Activity options

Activity code is just the execution of business logic. In other application frameworks business logic is mixed with timeout, retry, and other error handling logic. With Temporal it is not necessary to do that, at least not in the traditional sense. Instead, each Activity can be configured to automatically timeout, retry, or cancel with the help of Activity Options. Activity Options are configured within the Workflow code and passed to the Activity execution call.

### Task Queue

Activities are executed by [Workers](workers) and Workers listen to [Task Queues](task-queues) to pick up their Tasks. The Task Queue option enables you to specify which Task Queue the Activity Task will be sent to. It is optional to specify, as it will default to the Workflow's Task Queue. For practical implementation guidance, read [How to route tasks](route-tasks).

### Schedule-to-close timeout

When an Activity Task is sent to a Task Queue the Activity is then considered to be "scheduled". This timeout sets a maxium duration from the time the Activity is scheduled to when it is fully complete. If this expires it prevents retries from occurring. This must be set if the [Schedule-to-start](#schedule-to-start-timeout) and [Start-to-close](#start-to-close-timeout) timeouts are not set, as its default value is the sum of [Schedule-to-start](#schedule-to-start-timeout) and [Start-to-close](#start-to-close-timeout). For practical implementation guidance, read [How to timeout Activities and Workflows](timeout-activities-and-workflows).

### Schedule-to-start timeout

An Activity Task should be picked up from a Task Queue and executed as soon as a Worker has the capacity to do so. This timeout sets a maxium duration from the time the Activity is scheduled (Activity Task is sent to the Task Queue) to when a Worker picks up the Task and begins executing it. This timeout is used primarily to identify situations where a Worker has stopped responding and an Activity must be rescheduled. This must be set in conjunction with the [Start-to-close timeout](#start-to-close-timeout) if the [Schedule-to-close timeout](#schedule-to-close-timeout) is not set. For practical implementation guidance, read [How to timeout Activities and Workflows](timeout-activities-and-workflows).

### Start-to-close timeout

This sets a maximum duration from the time the Activity starts executing to the time it is complete. If this expires it prevents retries from occurring. This must be set in conjunction with the [Schedule-to-start timeout](#schedule-to-start) if the [Schedule-to-close timeout](#schedule-to-close-timeout) is not set. For practical implementation guidance, read [How to timeout Activities and Workflows](timeout-activities-and-workflows).

### Heartbeat timeout

Within Activity code, [Heartbeats](heartbeats) can be recorded. To record a Heartbeat is to ping the Temporal server letting it know that the Activity is still executing. This timeout sets a maximum duration between Heartbeats, effectively enabling manual timeout implementations for Activity executions. This timeout is optional and should only be used if Heartbeats are recorded within the Activity. For practical implementation guidance, read [How to timeout Activities and Workflows](timeout-activities-and-workflows).

### Wait for cancellation

When an Activity is cancelled it may be necessary for the Activity to revert actions that it has already taken. This option specifies to the Workflow whether to wait for the clean up to occur after an Activity has been cancelled.

### Activity Id

Use this to give your Activity a name or unique identifier that correlates to your business logic. This is optional and is not used by the Temporal server.

### Retry policy 

Unlike Workflows, Temporal does not recover the state of an Activity. Activity failures are expected to occur and when they do the Activity can be automatically retried per its Retry policy. For practical implementation guidance, read [How to retry Activities and Workflows](retry-activities-and-workflows).

## Local Activities

For Activities that have perfunctory requirements, Temporal supports a stripped down version of Activity implementations called "local Activities". A local Activity is executed by the same Worker that is executing the Workflow that invoked it. A function can be executed as a local Activity if it:

- takes no more than a few seconds to complete.
- does not require global rate limiting.
- does not require routing to specific Workers or pools of Workers.
- can be implemented in the same binary as the Workflow that invokes it.

The main benefit of local Activities is that they are much more efficient in utilizing Temporal service resources and have much lower latency overhead in comparison to the usual Activity invocation.

### Local Activity options

Local activities support a small subset of options:

- [Schedule-to-close timeout](#schedule-to-close-timeout)
- [Start-to-close timeout](#start-to-close-timeout)
- [Retry policy](#retry-policy)

