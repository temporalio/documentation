---
id: workflow-timers-and-determinism
title: Workflow Timers and Determinism
description: 
sidebar_label: Workflow Timers and Determinism
tags:
  - go sdk
  - developer-guide-doc-type
  - event history
  - timers
  - determinism
---



Deploying an incompatible change to a Workflow Definition can also lead to non-deterministic errors for open Workflow Executions that were started with the original code.

Add `"math/rand"` to the list of imported packages at the start of `your_workflow_definition_dacx.go`, and add `time.Sleep(time.Duration(rand.Intn(10)) * time.Second)` to line 68, just after `ctx = workflow.WithActivityOptions(ctx, activityOptions)`. Then, re-run both the Worker Process and the HTTP server as before:

```shell
go run worker/main_dacx.go
go run gateway/main_dacx.go
```

Once both the Worker process and the HTTP server are running, access `http://localhost:8091/start` using either your browser or `curl`. It will not return any output to the browser or cURL command. Reload the page or re-run cURL at least twice to ensure that the Temporal Cluster catches the non-deterministic behavior that you've added to the Workflow.

Next, you can reopen the Temporal [Web UI](http://localhost:8233/) to find a problem with your Workflow:

![Web UI view of a non-determinism error](/img/deterministic-failure.png)

Use the `temporal workflow show` command again to retrieve the Workflow Event History:

```shell
temporal workflow show --workflow-id your-workflow-id --output json  > your_workflow_history.json
```

### Examples of Changes That May Lead to Non-Deterministic Errors

* Adding or removing an Activity
* Switching the Activity Type used in a call to `ExecuteActivity`
* Adding or removing a Timer
* Altering the execution order of Activities or Timers relative to one another


### Examples of Changes That Do Not Lead to Non-Deterministic Errors

* Modifying statements in a Workflow Definition, such as logging statements, 
  that do not affect the Commands generated during Workflow Execution
* Changing attributes in a `ActivityOptions` or `RetryPolicy`
* Modifying code inside of an Activity Definition

Some other [Common Sources of Non-Determinism](https://github.com/temporalio/edu-102-go-content/blob/main/understanding-workflow-determinism/common-sources-non-determinism.md).

You can also watch [Deployment Leads to Non-Deterministic Error](https://www.youtube.com/embed/8DkMdaUu0vQ?rel=0&iv_load_policy=3&modestbranding=1&showse) from our [Temporal 102](https://learn.temporal.io/courses/temporal_102/go) course.


You can also watch [Using Workflow Reset to Recover from a Bad Deployment](https://www.youtube.com/embed/wKnGbukEppI?rel=0&iv_load_policy=3&modestbranding=1&showsearch=0&showinfo=0&wmode=transparent) from our [Temporal 102](https://learn.temporal.io/courses/temporal_102/go) course.

Wrapped language primitives: [https://github.com/temporalio/sdk-go/blob/v1.24.0/workflow/deterministic_wrappers.go#L173, ](https://pkg.go.dev/go.temporal.io/sdk@v1.24.0/workflow#Sleep), https://pkg.go.dev/go.temporal.io/sdk@v1.24.0/workflow#Now