---
id: java-dev-guide-structure
title: JAVA SDK developer's guide structure
description: Explore the Temporal java SDK's developer's guide structure.
sidebar_label: java SDK guide
tags:
    - dev guide
    - java
---

This guide is meant to provide a comprehensive overview of the structures, primitives, and features used in [Temporal Application](/temporal#temporal-application) development.

## Project-setup

The project setup section of the Temporal Java SDK Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application in java—that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [Install the Temporal CLI](/java/install-cli) - Download and install the Temporal CLI for Mac, Linux, or Windows.
- [Choose a development Cluster](/java/choose-dev-cluster) - Discover which development Cluster you should choose
- [Boilerplate Temporal Application project code](/java/project-structure) - Discover the minimum code I need to create a boilerplate Temporal Application.
- [Start Workflow using the CLI](/java/backgroundcheck-boilerplate-start-workflow) - Learn how to start a Temporal Workflow using the CLI
- [Add a testing framework](/java/backgroundcheck-boilerplate-testing-temporal) - Testing provides a framework to facilitate Workflow and integration testing.

## Foundations

The Foundations section of the Temporal Developer's guide covers the minimum set of concepts and implementation details needed to build and run a Temporal Application – that is, all the relevant steps to start a Workflow Execution that executes an Activity.

- [How to install a Temporal SDK](/java/add-sdk) - A Temporal SDK provides a framework for Temporal Application development.
- [How to create a Temporal Client in Java](/java/how-to-create-a-temporal-client-in-java) - To initialize a Workflow Client, create an instance of a `WorkflowClient`, create a client-side `WorkflowStub`, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).
- [How to develop a Workflow Definition in Java](/java/how-to-develop-a-workflow-definition-in-java) - In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface.
- [How to develop a basic Activity](/java/developing-activities) - One of the primary things that Workflows do is orchestrate the execution of Activities.
- [How to start an Activity Execution](/java/spawning-activities) - Calls to spawn Activity Executions are written within a Workflow Definition.
- [How to develop a Worker Program in Java](/java/how-to-develop-a-worker-program-in-java) - Use the `newWorker` method on an instance of a `WorkerFactory` to create a new Worker in Java.
- [How to spawn a Workflow Execution in Java](/java/how-to-spawn-a-workflow-execution-in-java) - Use `WorkflowStub` to start a Workflow Execution from within a Client, and `ExternalWorkflowStub` to start a different Workflow Execution from within a Workflow.

## Features

The Features section of the Temporal Developer's guide provides basic implementation guidance on how to use many of the development features available to Workflows and Activities in the Temporal Platform.

## Observability

Improve observability in your Java-based Temporal Workflows. View which Workflow Executions are tracked by the Temporal Platform and the state of any Workflow Execution.

- [How to emit metrics](/java/metrics) - Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
- [How to setup Tracing](/java/tracing) - Tracing allows you to view the call graph of a Workflow along with its Activities and any Child Workflows.
- [How to log from a Workflow](/java/logging) - Send logs and errors to a logging service, so that when things go wrong, you can see what happened.
- [How to use Visibility APIs](/java/visibility) - The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

## Testing

The Testing section of the Temporal Developer's guide covers the many ways to test the state of your Temporal Application; that is, ways to view which Workflow Executions are tracked by the Platform and the state of any given Workflow Execution, either currently or at points of an execution.

- [Test frameworks](/java/testing-frameworks) - Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Activities](/java/testing-activities) - Testing provides a framework to facilitate Workflow and integration testing.
- [Testing Workflows](/java/testing-workflows) - Testing provides a framework to facilitate Workflow and integration testing.
- [How to Replay a Workflow Execution](/java/replays) - Replay recreates the exact state of a Workflow Execution.

## Debugging

The Debugging section of the Temporal Developer's guide covers the many ways to debug your application.

- [How to debug in a development environment](/java/debug-environment-development) - In addition to the normal development tools of logging and a debugger, you can also see what’s happening in your Workflow by using the Web UI and tctl.
- [How to debug in a production environment](/java/debug-environment-production) - Debug production Workflows using the Web UI, tctl, Replays, Tracing, or Logging.

## Versioning

The Versioning section of the Temporal Developer's guide covers how to update Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.

- [How to patch Workflows in Java](/java/patching) - Use Patching APIs to update Workflow code in Java
- [How to use Worker Versioning in Java](/java/how-to-use-worker-versioning-in-java) - Version your Java Workers by using build ID-based versioning
