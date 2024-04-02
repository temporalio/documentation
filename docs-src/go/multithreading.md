---
id: multithreading
title: Multithreading in Go
description: How the Temporal Go SDK safely implements multithreading
sidebar_label: Multithreading
tags:
  - multithreading
  - guide-context
---

The Temporal Go SDK allows you to create additional goroutines (threads) in your Workflows by calling `workflow.Go()`. Native Go threading is never allowed in Workflow code, as it would create determinism errors.

You might sometimes need to submit multiple Activities or Child Workflows in parallel and then await the result of all of them.

Normally, this would require a lock or [mutex](https://en.wikipedia.org/wiki/Lock_(computer_science)) around some shared data structure to avoid race conditions that could occur when multiple asynchronous operations try to modify the data structure.

Although Temporal Workflows run async in Go, there is a control in place that ensures only one thread can access at the time.

## How Multithreading works

Temporal's Go SDKs contains a deterministic runner to control the thread execution. This deterministic runner will decide which Workflow thread to run in the right order, and one at a time. Each task will execute in a loop until all threads are blocked.

`workflow.Go()` creates a new thread and add it to this runner.

This significantly minimizes the likelihood of race conditions, and eliminates the need to use a mutex.

For a complex example, refer to the [Go Particle Swarm Operation Sample](https://github.com/temporalio/samples-go/tree/main/pso).

For an example using Signals, refer to the [Go Await Signal Sample](https://github.com/temporalio/samples-go/tree/main/await-signals)