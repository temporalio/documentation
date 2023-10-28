---
id: php-dev-guide-structure
title: PHP SDK developer's guide structure
description: Explore the Temporal php SDK's developer's guide structure.
sidebar_label: php SDK guide
tags:
    - dev guide
    - php
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Foundations

The Foundations section of the Temporal Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application – that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [How to install a Temporal SDK](/php/add-sdk) - A Temporal SDK provides a framework for Temporal Application development.
- [How to connect a Temporal Client to a Temporal Cluster](/php/connect-to-a-dev-cluster) - When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
- [How to develop a basic Workflow](/php/developing-workflows) - Workflows are the fundamental unit of a Temporal Application, and it all starts with the development of a Workflow Definition.
- [How to develop a basic Activity](/php/developing-activities) - One of the primary things that Workflows do is orchestrate the execution of Activities.
- [How to start an Activity Execution](/php/spawning-activities) - Calls to spawn Activity Executions are written within a Workflow Definition.
- [How to run Worker Processes](/php/run-a-dev-worker) - The Worker Process is where Workflow Functions and Activity Functions are executed.
- [How to start a Workflow Execution](/php/spawning-workflows) - Workflow Execution semantics rely on several parameters—that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language-specific contextual data, and Workflow Function parameters.

## Features

The Features section of the Temporal Developer's guide provides basic implementation guidance on how to use many of the development features available to Workflows and Activities in the Temporal Platform.

- [Signals in PHP](/php/signals) -
- [Queries in PHP](/php/queries) -
- [Workflow timeouts](/php/workflow-timeouts) - Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
- [How to set Activity timeouts](/php/activity-timeouts) - Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.
- [How to Heartbeat an Activity](/php/activity-heartbeats) - An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
- [How to asynchronously complete an Activity](/php/async-activity-completion) - Asynchronous Activity Completion enables the Activity Function to return without the Activity Execution completing.
- [Cancel an Activity from a Workflow](/php/cancel-activity) - An Activity can be canceled from within a Workflow if the Activity sends Heartbeats.
- [How to start a Child Workflow Execution](/php/child-workflows) - A Child Workflow Execution is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.
- [How to Continue-As-New](/php/continue-as-new) - Continue-As-New enables a Workflow Execution to close successfully and create a new Workflow Execution in a single atomic operation if the number of Events in the Event History is becoming too large.
- [What is a Timer?](/php/timers) - A Timer lets a Workflow sleep for a fixed time period.
- [How to use Temporal Cron Jobs](/php/cron-jobs) - A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

## Observability

Improve observability in your PHP-based Temporal Workflows. View which Workflow Executions are tracked by the Temporal Platform and the state of any Workflow Execution.

- [How to use Visibility APIs](/php/visibility) - The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

## Testing

The Testing section of the Temporal Developer's guide covers the many ways to test the state of your Temporal Application; that is, ways to view which Workflow Executions are tracked by the Platform and the state of any given Workflow Execution, either currently or at points of an execution.

- [Testing Activities](/php/testing-activities) - Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Workflows](/php/testing-workflows) - Testing provides a framework to facilitate Workflow and integration testing.
- [How to Replay a Workflow Execution](/php/replays) - Replay recreates the exact state of a Workflow Execution.

## Debugging

The Debugging section of the Temporal Developer's guide covers the many ways to debug your application.

- [Debugging](/php/debugging) - Testing provides a framework to facilitate Workflow and integration testing.
