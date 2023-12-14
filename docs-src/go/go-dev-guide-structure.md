---
id: go-dev-guide-structure
title: GO SDK developer's guide structure
description: Explore the Temporal go SDK's developer's guide structure.
sidebar_label: go SDK guide
tags:
    - dev guide
    - go
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Project-setup

The project setup section of the Temporal Go SDK Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application in Go—that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [Install the Temporal CLI](/go/install-cli) - Download and install the Temporal CLI for Mac, Linux, or Windows.
- [Choose a development Cluster](/go/choose-dev-cluster) - Discover which development Cluster you should choose
- [Boilerplate Temporal Application project code](/go/project-structure) - Discover the minimum code I need to create a boilerplate Temporal Application.
- [Start Workflow using the CLI](/go/backgroundcheck-boilerplate-start-workflow) - Learn how to start a Temporal Workflow using the CLI
- [Add a testing framework](/go/backgroundcheck-boilerplate-add-test-framework) - How to add a testing framework to your Temporal Application.

## Durable-execution

The Durable Execution section of the Temporal Developer's guide covers advanced beginner concepts for working with Temporal, including testing your code, reviewing workflow event history, adding timers, and understanding determinism. Developing for durable execution is a core aspect of Temporal.

- [Retrieve a Workflow Execution's Event History](/go/retrieve-event-history) - Learn how to retrieve your Workflow Execution's Event History
- [Add a Replay test](/go/add-replay-test-to-background-check-workflow) - Define the code needed to run a Worker Process in Go.
- [Intrinsic non-deterministic logic](/go/backgroundcheck-replay-intrinsic-non-determinism) - This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
- [Non-deterministic code changes](/go/non-deterministic-code-changes) - History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.

## Foundations

The Foundations section of the Temporal Go SDK Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application in Go – that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [How to install Temporal CLI and run a development server](/self-hosted/how-to-install-temporal-cli) -
- [How to install a Temporal SDK](/go/add-sdk) - A Temporal SDK provides a framework for Temporal Application development.
- [How to connect a Temporal Client to a Temporal Cluster](/go/connect-to-a-dev-cluster) - When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
- [How to connect to Temporal Cloud](/go/connect-to-temporal-cloud) - Use a compatible mTLS CA certificate and mTLS private key and your Cloud Namespace to connect to Temporal Cloud.
- [How to develop a basic Workflow](/go/developing-workflows) - Workflows are the fundamental unit of a Temporal Application, and it all starts with the development of a Workflow Definition.
- [How to develop an Activity Definition in Go](/go/how-to-develop-an-activity-definition-in-go) - In the Temporal Go SDK programming model, an Activity Definition is an exportable function or a `struct` method.
- [How to start an Activity Execution](/go/spawning-activities) - Calls to spawn Activity Executions are written within a Workflow Definition.
- [How to develop a Worker in Go](/go/how-to-develop-a-worker-in-go) - Develop an instance of a Worker by calling worker.New(), available via the go.temporal.io/sdk/worker package.
- [How to run a Temporal Cloud Worker](/go/run-a-temporal-cloud-worker) - The Worker Process is where Workflow Functions and Activity Functions are executed.
- [How to start a Workflow Execution](/go/spawning-workflows) - Workflow Execution semantics rely on several parameters—that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language-specific contextual data, and Workflow Function parameters.

## Features

The Features section of the Temporal Developer's guide provides basic implementation guidance on how to use many of the development features available to Workflows and Activities in the Temporal Platform.

- [How to develop with Signals](/go/signals) - A Signal is a message sent to a running Workflow Execution
- [How to develop with Queries](/go/queries) - A Query is a synchronous operation that is used to get the state of a Workflow Execution.
- [How to develop with Updates](/go/updates) - An Update is an operation that can mutate the state of a Workflow Execution and return a response.
- [Workflow timeouts](/go/workflow-timeouts) - Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
- [How to set Activity timeouts](/go/activity-timeouts) - Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.
- [How to Heartbeat an Activity](/go/activity-heartbeats) - An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
- [How to asynchronously complete an Activity](/go/async-activity-completion) - Asynchronous Activity Completion enables the Activity Function to return without the Activity Execution completing.
- [How to start a Child Workflow Execution](/go/child-workflows) - A Child Workflow Execution is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.
- [How to Continue-As-New](/go/continue-as-new) - Continue-As-New enables a Workflow Execution to close successfully and create a new Workflow Execution in a single atomic operation if the number of Events in the Event History is becoming too large.
- [What is a Timer?](/go/timers) - A Timer lets a Workflow sleep for a fixed time period.
- [How to Schedule a Workflow](/go/schedules) - Schedule a Workflow.
- [How to use Temporal Cron Jobs](/go/cron-jobs) - A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.
- [Side Effects](/go/side-effects) - A Side Effect is used to produce non-deterministic code, such as generating a UUID or a random number.
- [How to create and manage Namespaces](/go/namespaces) - You can create, update, deprecate or delete your Namespaces using either tctl or SDK APIs..
- [How to use custom payload conversion](/go/custom-payload-conversion) - Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.
- [How to use Worker Session APIs](/go/worker-sessions) - To use Worker Sessions for Activity Executions the Worker must be enabled to use Sessions for the Workflows and Activities it is registered with.
- [Error Handling in Go](/go/error-handling) - Handling Activity or Workflow errors in Go.
- [Go SDK Selectors](/go/selectors) - Implementing Selectors in the Temporal Go SDK.

## Observability

Improve observability in your Go-based Temporal Workflows. View which Workflow Executions are tracked by the Temporal Platform and the state of any Workflow Execution.

- [How to emit metrics](/go/metrics) - Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
- [Tracing and Context Propagation](/go/tracing) - Explains how the Go SDK supports tracing and custom context propogation.
- [How to log from a Workflow](/go/logging) - Send logs and errors to a logging service, so that when things go wrong, you can see what happened.
- [How to use Visibility APIs](/go/visibility) - The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

## Testing

The Testing section of the Temporal Developer's guide covers the many ways to test the state of your Temporal Application; that is, ways to view which Workflow Executions are tracked by the Platform and the state of any given Workflow Execution, either currently or at points of an execution.

- [Test frameworks](/go/testing-frameworks) - Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Activities](/go/testing-activities) - Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Workflows](/go/testing-workflows) - Testing provides a framework to facilitate Workflow and integration testing.
- [How to Replay a Workflow Execution](/go/replays) - Replay recreates the exact state of a Workflow Execution.

## Debugging

The Debugging section of the Temporal Go SDK Developer's guide covers the many ways to debug your application.

- [How to debug in a development environment](/go/debug-environment-development) - In addition to the normal development tools of logging and a debugger, you can also see what’s happening in your Workflow by using the Web UI and tctl.
- [How to debug in a production environment](/go/debug-environment-production) - Debug production Workflows using the Web UI, tctl, Replays, Tracing, or Logging.
- [How to test Workflow Definitions in Go](/go/how-to-test-workflow-definitions-in-go) - How to test Workflow Definitions in Go.

## Versioning

The Versioning section of the Temporal Developer's guide covers how to update Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.

- [Temporal Go SDK Patching APIs](/go/patching) - Patching Workflows in Go
- [How to use Worker Versioning in Go](/go/how-to-use-worker-versioning-in-go) - Version your Go Workers by using build ID–based versioning
