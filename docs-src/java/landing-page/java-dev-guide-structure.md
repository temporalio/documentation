---
id: java-dev-guide-structure
title: Java SDK developer's guide structure
description: Explore the Temporal Java SDK's developer's guide structure.
sidebar_label: Java SDK guide
tags:
  - dev guide
  - java
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Project-setup

The project setup section of the Temporal Java SDK Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application in java—that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [Install the Temporal CLI](/java/chapter-project-setup/install-cli): Download and install the Temporal CLI for Mac, Linux, or Windows.
- [Choose a development Cluster](/java/chapter-project-setup/choose-dev-cluster): Discover which development Cluster you should choose
- [Boilerplate Temporal Application project code](/java/chapter-project-setup/project-structure): Discover the minimum code I need to create a boilerplate Temporal Application.
- [Start Workflow using the CLI](/java/chapter-project-setup/backgroundcheck-boilerplate-start-workflow): Learn how to start a Temporal Workflow using the CLI
- [Add a testing framework](/java/chapter-project-setup/backgroundcheck-boilerplate-testing-temporal): Testing provides a framework to facilitate Workflow and integration testing.

## Durable-execution

The Durable Execution section of the Temporal Developer's guide covers advanced beginner concepts for working with Temporal, including testing your code, reviewing workflow event history, adding timers, and understanding determinism. Developing for durable execution is a core aspect of Temporal.

- [Retrieve a Workflow Execution's Event History](/java/chapter-durable-execution/retrieve-event-history): Learn how to retrieve your Workflow Execution's Event History
- [Add a Replay test](/java/generated/add-replay-test-to-background-check-workflow): Define the code needed to run a Worker Process in Go.
- [Intrinsic non-deterministic logic](/java/generated/backgroundcheck-replay-intrinsic-non-determinism): This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
- [Non-deterministic code changes](/java/chapter-durable-execution/non-deterministic-code-changes): History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.
- [Workflow Reset](/java/chapter-durable-execution/workflow-reset): One option when handling an non-deterministic error is to reset the Workflow to a point prior to the Event where the non-deterministic error occurred, allowing for the Workflow to continue.

## Foundations

The Foundations section of the Temporal Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application – that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [How to install Temporal CLI and run a development server](/self-hosted/how-to-install-temporal-cli): How to install Temporal CLI and run a development Cluster.
- [How to install a Temporal SDK](/java/add-sdk): A Temporal SDK provides a framework for Temporal Application development.
- [How to create a Temporal Client in Java](/java/how-to-create-a-temporal-client-in-java): To initialize a Workflow Client, create an instance of a `WorkflowClient`, create a client-side `WorkflowStub`, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).
- [How to develop a Workflow Definition in Java](/java/how-to-develop-a-workflow-definition-in-java): In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface.
- [How to develop a basic Activity](/java/developing-activities): One of the primary things that Workflows do is orchestrate the execution of Activities.
- [How to start an Activity Execution](/java/spawning-activities): Calls to spawn Activity Executions are written within a Workflow Definition.
- [How to develop a Worker Program in Java](/java/how-to-develop-a-worker-program-in-java): Use the `newWorker` method on an instance of a `WorkerFactory` to create a new Worker in Java.
- [How to spawn a Workflow Execution in Java](/java/how-to-spawn-a-workflow-execution-in-java): Use `WorkflowStub` to start a Workflow Execution from within a Client, and `ExternalWorkflowStub` to start a different Workflow Execution from within a Workflow.

## Features

The Features section of the Temporal Developer's guide provides basic implementation guidance on how to use many of the development features available to Workflows and Activities in the Temporal Platform.

- [Signals in Java](/java/signals):
- [Queries in Java](/java/queries):
- [What is a Dynamic Handler?](/java/what-is-a-dynamic-handler): Dynamic Handlers are Workflows, Activities, Signals, or Queries that are unnamed and invoked when no other named handler matches the call from the Server at runtime.
- [How to develop with Updates](/java/updates): An Update is an operation that can mutate the state of a Workflow Execution and return a response.
- [Workflow timeouts](/java/workflow-timeouts): Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
- [How to set Activity timeouts](/java/activity-timeouts): Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.
- [How to Heartbeat an Activity](/java/activity-heartbeats): An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
- [How to asynchronously complete an Activity](/java/async-activity-completion): Asynchronous Activity Completion enables the Activity Function to return without the Activity Execution completing.
- [How to start a Child Workflow Execution](/java/child-workflows): A Child Workflow Execution is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.
- [How to Continue-As-New](/java/continue-as-new): Continue-As-New enables a Workflow Execution to close successfully and create a new Workflow Execution in a single atomic operation if the number of Events in the Event History is becoming too large.
- [What is a Timer?](/java/timers): A Timer lets a Workflow sleep for a fixed time period.
- [How to Schedule a Workflow](/java/schedules): Schedule a Workflow.
- [How to set a Cron Schedule in Java](/java/how-to-set-a-cron-schedule-in-java): Set the Cron Schedule with the `WorkflowStub` instance in the Client code using [`WorkflowOptions.Builder.setCronSchedule`
- [Side Effects](/java/side-effects): A Side Effect is used to produce non-deterministic code, such as generating a UUID or a random number.
- [How to create and manage Namespaces](/java/namespaces): You can create, update, deprecate or delete your Namespaces using either tctl or SDK APIs..
- [How to use custom payload conversion](/java/custom-payload-conversion): Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.

## Observability

Improve observability in your Java-based Temporal Workflows. View which Workflow Executions are tracked by the Temporal Platform and the state of any Workflow Execution.

- [How to emit metrics](/java/metrics): Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
- [How to setup Tracing](/java/tracing): Tracing allows you to view the call graph of a Workflow along with its Activities and any Child Workflows.
- [How to log from a Workflow](/java/logging): Send logs and errors to a logging service, so that when things go wrong, you can see what happened.
- [How to use Visibility APIs](/java/visibility): The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

## Testing

The Testing section of the Temporal Developer's guide covers the many ways to test the state of your Temporal Application; that is, ways to view which Workflow Executions are tracked by the Platform and the state of any given Workflow Execution, either currently or at points of an execution.

- [Test frameworks](/java/testing-frameworks): Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Activities](/java/testing-activities): Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Workflows](/java/testing-workflows): Testing provides a framework to facilitate Workflow and integration testing.
- [How to Replay a Workflow Execution](/java/replays): Replay recreates the exact state of a Workflow Execution.

## Debugging

The Debugging section of the Temporal Developer's guide covers the many ways to debug your application.

- [How to debug in a development environment](/java/debug-environment-development): In addition to the normal development tools of logging and a debugger, you can also see what’s happening in your Workflow by using the Web UI and tctl.
- [How to debug in a production environment](/java/debug-environment-production): Debug production Workflows using the Web UI, tctl, Replays, Tracing, or Logging.

## Versioning

The Versioning section of the Temporal Developer's guide covers how to update Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.

- [How to patch Workflows in Java](/java/patching): Use Patching APIs to update Workflow code in Java
- [How to use Worker Versioning in Java](/java/how-to-use-worker-versioning-in-java): Version your Java Workers by using build ID-based versioning
