---
id: how-to-handle-workflow-logic-requirements-in-java
title: How to handle Workflow Logic Requirements in Java
sidebar_label: Workflow logic requirements
description: When defining Workflows using the Temporal Java SDK, the Workflow code must be written to execute effectively once and to completion.
tags:
  - developer-guide
  - java
---

When defining Workflows using the Temporal Java SDK, the Workflow code must be written to execute effectively once and to completion.

The following constraints apply when writing Workflow Definitions:

- Do not use mutable global variables in your Workflow implementations.
  This will ensure that multiple Workflow instances are fully isolated.
- Your Workflow code must be deterministic.
  Do not call non-deterministic functions (such as non-seeded random or `UUID.randomUUID()`) directly from the Workflow code.
  The Temporal SDK provides specific API for calling non-deterministic code in your Workflows.
- Do not use programming language constructs that rely on system time.
  For example, only use `Workflow.currentTimeMillis()` to get the current time inside a Workflow.
- Do not use native Java `Thread` or any other multi-threaded classes like `ThreadPoolExecutor`.
  Use `Async.function` or `Async.procedure`, provided by the Temporal SDK, to execute code asynchronously.
- Do not use synchronization, locks, or other standard Java blocking concurrency-related classes besides those provided by the Workflow class.
  There is no need for explicit synchronization because multi-threaded code inside a Workflow is executed one thread at a time and under a global lock.
  - Call `Workflow.sleep` instead of `Thread.sleep`.
  - Use `Promise` and `CompletablePromise` instead of `Future` and `CompletableFuture`.
  - Use `WorkflowQueue` instead of `BlockingQueue`.
- Use `Workflow.getVersion` when making any changes to the Workflow code.
  Without this, any deployment of updated Workflow code might break already running Workflows.
- Do not access configuration APIs directly from a Workflow because changes in the configuration might affect a Workflow Execution path.
  Pass it as an argument to a Workflow function or use an Activity to load it.
- Use `DynamicWorkflow` when you need a default Workflow that can handle all Workflow Types that are not registered with a Worker.
  A single implementation can implement a Workflow Type which by definition is dynamically loaded from some external source.
  All standard `WorkflowOptions` and determinism rules apply to Dynamic Workflow implementations.

Java Workflow reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/package-summary.html>
