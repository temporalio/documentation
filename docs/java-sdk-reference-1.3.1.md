---
id: java-sdk-quick-reference-1.3.1
title: Java SDK reference 1.3.1
sidebar_label: 1.3.1
---

---

## io.temporal.activity

### `ActivityOptions`

**Class** | **Options to configure how an Activity is invoked.**

ActivityOptions can be used to configure many aspects of how an Activity is executed, such as when to time out, how frequently to retry, context propagation, and more.

#### `ActivityOptions.Builder`

**Class** | **Builder is used to build the ActivityOptions**

Builder is the subclass where options are set.

#### `ActivityOptions.Builder.setScheduleToCloseTimeout`

**Method** | **Sets the schedule to close timeout**

Overall timeout workflow is willing to wait for activity to complete. It includes time in a Task Queue (use [ActivityOptions.Builder.setScheduleToStartTimeout](#activityoptionsbuildersetscheduletostarttimeout) to limit it) plus activity execution time (use [ActivityOptions.Builder.setStartToCloseTimeout](#activityoptionsbuildersetstarttoclosetimeout) to limit it). Either this option or both schedule to start and start to close are required.

**Params**

- **Duration:**

#### `ActivityOptions.Builder.setScheduleToStartTimeout`

**Method** | **Sets the schedule to start timeout**

Time Activity can stay in task queue before it is picked up by a Worker. If schedule to close is not provided then both this and start to close are required.

**Params**

- **Duration:**

#### `ActivityOptions.newBuilder`

**Method** | **newBuilder returns an [ActivityOptions.Builder](#activityoptionsbuilder)**

This method returns an ActivityOptions Builder that can be used to chain together ActivityOption setter methods.

**Params**

- **Optional:** [ActivityOptions](#activityoptions)

---

## io.temporal.client

### `WorkflowOptions`

**Class** |
