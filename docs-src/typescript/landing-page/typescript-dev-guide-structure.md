---
id: typescript-dev-guide-structure
title: Typescript SDK developer's guide structure
description: Explore the Temporal Typescript SDK's developer's guide structure.
sidebar_label: Typescript SDK guide
tags:
  - dev guide
  - typescript
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Project-setup

The project setup section of the Temporal TypeScript SDK Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application in TypeScript—that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [Install the Temporal CLI](/typescript/chapter-project-setup/install-cli): Download and install the Temporal CLI for Mac, Linux, or Windows.
- [Choose a development Cluster](/typescript/chapter-project-setup/choose-dev-cluster): Discover which development Cluster you should choose
- [Boilerplate Temporal Application project code](/typescript/chapter-project-setup/project-structure): Discover the minimum code you need to create a boilerplate Temporal Application with TypeScript
- [Start Workflow using the CLI](/typescript/chapter-project-setup/backgroundcheck-boilerplate-start-workflow): Learn how to start a Temporal Workflow using the CLI
- [Add a testing framework](/typescript/generated/backgroundcheck-boilerplate-add-test-framework): How to add a testing framework to your Temporal Application.
- [Conclusion](/typescript/chapter-project-setup/conclusion): Wrap up and review of concepts

## Durable-execution

The Durable Execution section of the Temporal Developer's guide covers advanced beginner concepts for working with Temporal, including testing your code, reviewing workflow event history, adding timers, and understanding determinism. Developing for durable execution is a core aspect of Temporal.

- [Retrieve a Workflow Execution's Event History](/typescript/chapter-durable-execution/retrieve-event-history): Learn how to retrieve your Workflow Execution's Event History
- [How to replay a Workflow Execution in TypeScript](/typescript/chapter-durable-execution/how-to-replay-a-workflow-execution-in-typescript): Replay a Workflow Execution
- [Non-deterministic code changes](/typescript/chapter-durable-execution/non-deterministic-code-changes): History Replay, sometimes also called Workflow Replay, is the mechanism that Temporal uses to reconstruct the state of a Workflow Execution. Temporal provides Durable Execution via this Replay Functionality.

## Features

The Features section of the Temporal Developer's guide provides basic implementation guidance on how to use many of the development features available to Workflows and Activities in the Temporal Platform.

- [How to develop with Signals](/typescript/signals): A Signal is a message sent to a running Workflow Execution
- [How to develop with Queries](/typescript/queries): A Query is a synchronous operation that is used to get the state of a Workflow Execution.
- [How to define Signals and Queries statically or dynamically](/typescript/how-to-define-signals-and-queries-statically-or-dynamically): Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
- [Workflow timeouts](/typescript/workflow-timeouts): Each Workflow timeout controls the maximum duration of a different aspect of a Workflow Execution.
- [How to set Activity timeouts](/typescript/activity-timeouts): Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.
- [How to Heartbeat an Activity](/typescript/activity-heartbeats): An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Cluster.
- [How to asynchronously complete an Activity](/typescript/async-activity-completion): Asynchronous Activity Completion enables the Activity Function to return without the Activity Execution completing.
- [Local Activities](/typescript/local-activities): To call Local Activities in TypeScript, use proxyLocalActivities.
- [Cancel an Activity from a Workflow](/typescript/cancel-activity): An Activity can be canceled from within a Workflow if the Activity sends Heartbeats.
- [How to start a Child Workflow Execution](/typescript/child-workflows): A Child Workflow Execution is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.
- [How to Continue-As-New](/typescript/continue-as-new): Continue-As-New enables a Workflow Execution to close successfully and create a new Workflow Execution in a single atomic operation if the number of Events in the Event History is becoming too large.
- [How to Schedule a Workflow](/typescript/schedules): Schedule a Workflow.
- [What is a Timer?](/typescript/timers): A Timer lets a Workflow sleep for a fixed time period.
- [Asynchronous design patterns in TypeScript](/typescript/async-design-patterns): Examples that demonstrate how to use `sleep` and `condition` to model asynchronous business logic.
- [How to use Temporal Cron Jobs](/typescript/cron-jobs): A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.
- [How to create and manage Namespaces](/typescript/namespaces): You can create, update, deprecate or delete your Namespaces using either tctl or SDK APIs..
- [How to use a custom payload converter in TypeScript](/typescript/how-to-use-a-custom-payload-converter-in-typescript): Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.
- [How to implement interceptors in TypeScript](/typescript/how-to-implement-interceptors-in-typescript): Interceptors are a mechanism for modifying inbound and outbound SDK calls, commonly used to add tracing and authorization.

## Foundations

The Foundations section of the Temporal Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application – that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [How to install Temporal CLI and run a development server](/self-hosted/how-to-install-temporal-cli): How to install Temporal CLI and run a development Cluster.
- [How to install a Temporal SDK](/typescript/add-sdk): A Temporal SDK provides a framework for Temporal Application development.
- [Linting and types in TypeScript](/typescript/linting-and-types): Set up linting and types in your TypeScript project.
- [How to connect a Temporal Client to a Temporal Cluster](/typescript/connect-to-a-dev-cluster): When connecting a Temporal Client to a Temporal Cluster, you must provide the address and port number of the Temporal Cluster.
- [How to connect to Temporal Cloud](/typescript/connect-to-temporal-cloud): Use a compatible mTLS CA certificate and mTLS private key and your Cloud Namespace to connect to Temporal Cloud.
- [How to develop a basic Workflow](/typescript/developing-workflows): Workflows are the fundamental unit of a Temporal Application, and it all starts with the development of a Workflow Definition.
- [How to develop a basic Activity](/typescript/developing-activities): One of the primary things that Workflows do is orchestrate the execution of Activities.
- [How to start an Activity Execution](/typescript/spawning-activities): Calls to spawn Activity Executions are written within a Workflow Definition.
- [How to run Worker Processes](/typescript/run-a-dev-worker): The Worker Process is where Workflow Functions and Activity Functions are executed.
- [How to run a Worker on Docker in TypeScript](/typescript/how-to-run-a-worker-on-docker): Workers based on the TypeScript SDK can be deployed and run as Docker containers.
- [How to run a Temporal Cloud Worker](/typescript/run-a-temporal-cloud-worker): The Worker Process is where Workflow Functions and Activity Functions are executed.
- [How to use a prebuilt Workflow bundle in TypeScript](/typescript/how-to-use-a-prebuilt-workflow-bundle-in-typescript): Pass a prebuilt bundle instead of `workflowsPath`. or use the `bundleWorkflowCode` helper.
- [How to shut down a Worker and track its state](/typescript/how-to-shut-down-a-worker): To shut down a Worker, send a shutdown Signal to the Worker or call `Worker.shutdown()`.
- [How to start a Workflow Execution](/typescript/spawning-workflows): Workflow Execution semantics rely on several parameters—that is, to start a Workflow Execution you must supply a Task Queue that will be used for the Tasks (one that a Worker is polling), the Workflow Type, language-specific contextual data, and Workflow Function parameters.
- [Cancellation scopes in Typescript](/typescript/cancellation-scopes):

## Observability

Improve observability in your TypeScript-based Temporal Workflows. View which Workflow Executions are tracked by the Temporal Platform and the state of any Workflow Execution.

- [How to emit metrics](/typescript/metrics): Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
- [How to setup Tracing](/typescript/tracing): Tracing allows you to view the call graph of a Workflow along with its Activities and any Child Workflows.
- [How to log from a Workflow in TypeScript](/typescript/how-to-log-from-a-workflow-in-typescript): Send logs and errors to a logging service, so that when things go wrong, you can see what happened.
- [How to use Visibility APIs](/typescript/visibility): The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

## Testing

The Testing section of the Temporal Developer's guide covers the many ways to test the state of your Temporal Application; that is, ways to view which Workflow Executions are tracked by the Platform and the state of any given Workflow Execution, either currently or at points of an execution.

- [Test frameworks](/typescript/testing-frameworks): Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Activities](/typescript/testing-activities): Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Workflows](/typescript/testing-workflows): Testing provides a framework to facilitate Workflow and integration testing.
- [How to Replay a Workflow Execution](/typescript/replays): Replay recreates the exact state of a Workflow Execution.

## Debugging

The Debugging section of the Temporal Developer's guide covers the many ways to debug your application.

- [How to debug in a development environment](/typescript/debug-environment-development): In addition to the normal development tools of logging and a debugger, you can also see what’s happening in your Workflow by using the Web UI and tctl.
- [How to debug in a production environment](/typescript/debug-environment-production): Debug production Workflows using the Web UI, tctl, Replays, Tracing, or Logging.
- [How to troubleshoot common issues in the TypeScript SDK](/typescript/troubleshoot-issues): This guide helps you troubleshoot various common issues with code that uses the TypeScript SDK.

## Versioning

The Versioning section of the Temporal TypeScript SDK developer's guide explains how to update Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.

- [How to patch Workflow code in TypeScript](/typescript/patching): The TypeScript SDK Patching API lets you change Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.
- [How to use Worker Versioning in TypeScript](/typescript/how-to-use-worker-versioning-in-typescript): Version your TypeScript Workers by using build ID-based versioning
