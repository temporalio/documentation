---
id: python-dev-guide-structure
title: Python SDK developer's guide structure
description: Explore the Temporal Python SDK's developer's guide structure.
sidebar_label: Python SDK guide
tags:
  - dev guide
  - python
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Project-setup

The project setup section of the Temporal Python SDK Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application in Python - that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [Install the Temporal CLI](/python/install-cli): Download and install the Temporal CLI for Mac, Linux, or Windows.
- [Choose a development Cluster](/python/choose-dev-cluster): Discover which development Cluster you should choose
- [Boilerplate Temporal Application project code](/python/project-structure): Discover the minimum code I need to create a boilerplate Temporal Application.
- [Start Workflow using the CLI](/python/backgroundcheck-boilerplate-start-workflow): Learn how to start a Temporal Workflow using the CLI
- [Add a testing framework](/python/generated/backgroundcheck-boilerplate-add-test-framework): How to add a testing framework to your Temporal Application.

## Foundations

The Foundations section of the Temporal Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application – that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [How to install Temporal CLI and run a development server](/self-hosted/how-to-install-temporal-cli): How to install Temporal CLI and run a development Cluster.
- [How to install a Temporal SDK](/python/add-sdk): A Temporal SDK provides a framework for Temporal Application development.
- [How to connect a Temporal Client to a Temporal Cluster](/python/connect-to-a-dev-cluster): When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
- [How to connect to Temporal Cloud](/python/connect-to-temporal-cloud): Use a compatible mTLS CA certificate and mTLS private key and your Cloud Namespace to connect to Temporal Cloud.
- [How to develop a basic Workflow](/python/developing-workflows): Workflows are the fundamental unit of a Temporal Application, and it all starts with the development of a Workflow Definition.
- [How to develop a basic Activity](/python/developing-activities): One of the primary things that Workflows do is orchestrate the execution of Activities.
- [How to start an Activity Execution](/python/spawning-activities): Calls to spawn Activity Executions are written within a Workflow Definition.
- [How to run Worker Processes](/python/run-a-dev-worker): The Worker Process is where Workflow Functions and Activity Functions are executed.
- [How to start a Workflow Execution](/python/spawning-workflows): Workflow Execution semantics rely on several parameters—that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language-specific contextual data, and Workflow Function parameters.

## Features

The Features section of the Temporal Developer's guide provides basic implementation guidance on how to use many of the development features available to Workflows and Activities in the Temporal Platform.

- [How to develop with Signals](/python/signals): A Signal is a message sent to a running Workflow Execution
- [How to develop with Queries](/python/queries): A Query is a synchronous operation that is used to get the state of a Workflow Execution.
- [What is a Dynamic Handler](/python/what-is-a-dynamic-handler): Dynamic Handlers are Workflows, Activities, Signals, or Queries that are unnamed and invoked when no other named handler matches the call from the Server at runtime.
- [Workflow timeouts](/python/workflow-timeouts): Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
- [How to set Activity timeouts](/python/activity-timeouts): Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.
- [How to Heartbeat an Activity](/python/activity-heartbeats): An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
- [How to asynchronously complete an Activity](/python/async-activity-completion): Asynchronous Activity Completion enables the Activity Function to return without the Activity Execution completing.
- [Cancel an Activity from a Workflow](/python/cancel-activity): An Activity can be canceled from within a Workflow if the Activity sends Heartbeats.
- [How to interrupt a Workflow Execution](/python/interrupt-a-workflow-execution): You can interrupt a Workflow Execution by canceling it or terminating it.
- [How to start a Child Workflow Execution](/python/child-workflows): A Child Workflow Execution is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.
- [How to Continue-As-New](/python/continue-as-new): Continue-As-New enables a Workflow Execution to close successfully and create a new Workflow Execution in a single atomic operation if the number of Events in the Event History is becoming too large.
- [What is a Timer?](/python/timers): A Timer lets a Workflow sleep for a fixed time period.
- [How to Schedule a Workflow](/python/schedules): Schedule a Workflow.
- [How to use Temporal Cron Jobs](/python/cron-jobs): A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.
- [How to use Start Delay](/python/how-to-start-delay): Set the `start_delay` option in your Workflow Options.

## Debugging

The Debugging section of the Temporal Developer's guide covers the many ways to debug your application.

- [Debugging](/python/debugging): Testing provides a framework to facilitate Workflow and integration testing.

## Testing

The Testing section of the Temporal Developer's guide covers the many ways to test the state of your Temporal Application; that is, ways to view which Workflow Executions are tracked by the Platform and the state of any given Workflow Execution, either currently or at points of an execution.

- [Test frameworks](/python/testing-frameworks): Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Activities](/python/testing-activities): Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Workflows](/python/testing-workflows): Testing provides a framework to facilitate Workflow and integration testing.
- [How to Replay a Workflow Execution](/python/replays): Replay recreates the exact state of a Workflow Execution.

## Observability

Improve observability in your Python-based Temporal Workflows. View which Workflow Executions are tracked by the Temporal Platform and the state of any Workflow Execution.

- [How to emit metrics](/python/metrics): Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
- [How to setup Tracing](/python/tracing): Tracing allows you to view the call graph of a Workflow along with its Activities and any Child Workflows.
- [How to log from a Workflow](/python/logging): Send logs and errors to a logging service, so that when things go wrong, you can see what happened.
- [How to use Visibility APIs](/python/visibility): The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

## Versioning

The Versioning section of the Temporal Developer's guide covers how to update Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.

- [How to use the Python SDK Patching API](/python/generated/how-to-use-the-python-sdk-patching-api-in-python): Heres a sample implementation of patching in new code using the Python SDK's patching API.
- [How to use Worker Versioning in Python](/python/how-to-use-worker-versioning-in-python): Version your Python Workers by using build ID-based versioning
