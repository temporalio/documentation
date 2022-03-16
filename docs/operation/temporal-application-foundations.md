---
id: temporal-application-foundations
title: Temporal Application foundations
sidebar_label: Application foundations
description: This is a Temporal Application developer guide.
tags:
  - developer-guide
---

This guide covers the minimum set of concepts and implementation details needed to build and run a simple [Temporal Application](/docs/concepts/what-is-a-temporal-application).

## Run a Temporal Cluster

**Core concept: [Temporal Cluster](/docs/concepts/what-is-a-temporal-cluster)**

The very first thing that you need to do is make sure you have a Temporal Cluster running so that you can interact with it via Temporal Client APIs and tctl commands.

- [How to run a local Temporal Cluster using Docker Compose](/docs/cluster/how-to-quickly-install-the-temporal-cluster-using-docker-compose)
- [How to deploy a Temporal Cluster to Kubernetes for testing and development](/docs/cluster/how-to-deploy-temporal-to-kubernetes-for-testing-and-development)

## Develop Workflow Definitions

**Core concept: [Workflow Definition](/docs/concepts/what-is-a-workflow-definition)**

Workflows are the fundamental unit of a Temporal Application.
Develop a Workflow Definition in the language of your choice.

- [How to develop a Workflow Definition in Go](/docs/go/how-to-develop-a-workflow-definition-in-go)
- [How to develop a Workflow Definition in Java](/docs/java/how-to-develop-a-workflow-definition-in-java)
- [How to develop a Workflow Definition in PHP](/docs/php/workflows)
- [How to develop a Workflow Definition in TypeScript](/docs/typescript/workflows/#how-to-write-a-workflow-function)

## Develop Activity Definitions

**Core concept: [Activity Definition](/docs/concepts/what-is-an-activity-definition)**

Activities are the functions that contain the logic that can communicate with the outside world.
Orchestrating Activities is one of the primary things that Workflows can do.

- [How to develop an Activity Definition in Go](/docs/go/how-to-develop-an-activity-definition-in-go)

## Spawn Activity Executions

**Core concept: [Activity Execution](/docs/concepts/what-is-an-activity-execution)**

Calls to spawn Activity Executions are written within a Workflow Definition.

- [How to spawn an Activity Execution in Go](/docs/go/how-to-spawn-an-activity-execution-in-go)

Activity Execution semantics rely on several parameters.
The only required custom value that needs to be set is either a [Schedule-To-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout) or a [Start-To-Close Timeout](/docs/concepts/what-is-a-start-to-close-timeout).
These parameters are set in the Activity Options.

**Schedule-To-Close:**

- [How to set a Schedule-To-Close Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#scheduletoclosetimeout)

**Start-To-Close:**

- [How to set a Start-To-Close Timeout in Go](/docs/go/how-to-set-activityoptions-in-go/#starttoclosetimeout)

## Get Activity Execution results

**Core concept: [Activity Execution](/docs/concepts/what-is-an-activity-execution)**

The call to spawn an Activity Execution generates the [ScheduleActivityTask Command](/docs/concepts/what-is-a-command/#scheduleactivitytask) and provides the Workflow Execution a Future.
Workflow Executions can either progress until the result is available via the Future or continue progressing, making use of the result when it becomes available.

- [How to get the results of an Activity Execution in Go](/docs/go/how-to-get-the-result-of-an-activity-execution-in-go)

## Run Worker Processes

**Core concept: [Worker](/docs/concepts/what-is-a-worker)**

The [Worker Process](/docs/concepts/what-is-a-worker-process) is where Workflow Functions and Activity Functions are executed.
Each [Worker Entity](/docs/concepts/what-is-a-worker-entity) in the Worker Process must register the exact Workflow Types and Activity Types it may execute.
Each Worker Entity must also associate itself with exactly one [Task Queue](/docs/concepts/what-is-a-task-queue).
Each Worker Entity polling the same Task Queue must be registered with the same Workflow Types and Activity Types.

- [How to develop a Worker Program in Go](/docs/go/how-to-develop-a-worker-program-in-go)
- [How to develop a Worker Program in Java](/docs/java/how-to-develop-a-worker-program-in-java)
- [How to develop a Worker Program in PHP](/docs/php/how-to-develop-a-worker-program-in-php)
- [How to develop a Worker Program in TypeScript](/docs/typescript/how-to-develop-a-worker-program-in-typescript)

Each Worker Entity is created with the use of a Temporal Client.
There are many customizations that can be set on the Client.

- [How to set `ClientOptions` in Go](/docs/go/how-to-set-clientoptions-in-go)

There are some customizations that can be set when registering Workflow Types and Activity Types.

- [How to set `RegisterOptions` for Workflows in Go](/docs/go/how-to-set-registerworkflowoptions-in-go)
- [How to set `RegisterOptions` for Activities in Go](/docs/go/how-to-set-registeractivityoptions-in-go)

## Spawn Workflow Executions

**Core concept: [Workflow Execution](/docs/concepts/what-is-a-workflow-execution)**

Workflow Execution semantics rely on several parameters – that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language specific contextual data, and Workflow Function parameters.

- [How to spawn a Workflow Execution using tctl](/docs/tctl/workflow/start)
- [How to spawn a Workflow Execution in Go](/docs/go/how-to-spawn-a-workflow-execution-in-go)
- [How to spawn a Workflow Execution in Java](/docs/java/how-to-spawn-a-workflow-execution-in-java)

A request to spawn a Workflow Execution causes the Temporal Cluster to create the first Event ([WorkflowExecutionStarted](/docs/concepts/what-is-an-event#workflowexecutionstarted)) in the Workflow Execution Event History.
The Temporal Cluster then creates the first Workflow Task resulting the first [WorkflowTaskScheduled](/docs/concepts/what-is-an-event/#workflowtaskscheduled) Event.

## Get Workflow Execution results

**Core concept: [Workflow Execution](/docs/concepts/what-is-a-workflow-execution)**

- [How to get the result of a Workflow Execution in Go](/docs/go/how-to-get-the-result-of-a-workflow-execution-in-go)
