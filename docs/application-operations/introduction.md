---
id: introduction
title: What are general Temporal Application operation best practices?
sidebar_label: Introduction
---

## What are general requirements for writing Workflow Defintions?

Consider that [Workflow](/docs/concepts-new/introduction#what-is-a-workflow) logic must be "deterministic".
Therefore any logic that is not deterministic must be called upon by an SDK API.

Practically, this means that Workflow Definition code can only read and manipulate input parameters, local variables, or variables received as return values from Temporal Go SDK APIs.

For example, Workflow Definiton code should never read a config file directly, as the config file may change during a Workflow Execution.

- Workflow Definition code can not affect changes in external systems directly.
- Workflow Definition code must use Go SDK APIs to handle things like time, logging, and goroutines.

## When to return an error from a Workflow?

## When to use Child Workflows

The following is a list of some of the more common reasons why you might want to do this:

- Execute code using different Workers.
- Enable execution from multiple Workflow Executions.
- Workaround Event History size limits.
- Create one-to-one mappings between a Workflow Id and some other resource.
- Execute some periodic logic.

### When not to use Child Workflows

One of the main reasons you would not want to execute a Child Workflow is the lack of a shared state with the Parent Workflow Execution.
Parent Workflow Executions and Child Workflow Executions can communicate only through asynchronous [Signals](/docs/go/signals).
If the executing logic is tightly coupled between Workflow Executions, it may simply be easier to use a single Workflow Definition that can rely on a shared object's state.

Starting a Workflow is not the same as executing a Workflow.
Starting a Workflow means that you are telling the Server to begin tracking the state of the Workflow execution.
In a Temporal application, you do not run Workflow code directly, instead Workflow code is hosted and executed by a [Worker](/docs/go/workers).

## When to care about the size of your Workflow Execution History

A large execution history can adversely impact the performance of your Workflows as the entire history is transferred to your workers with every event processed.

## When to use Signals

Without Signals, you have only two options for passing data to the Workflow implementation:

- Via start parameters
- As return values from Activities

With start parameters, we can only pass in values before Workflow execution begins.

Return values from Activities allow us to pass information to a running Workflow, but this approach comes with its own complications.
One major drawback is **reliance on polling**.
This means that the data needs to be stored in a third-party location until it's ready to be picked up by the Activity.
Further, the lifecycle of this Activity requires management, and the Activity requires manual restart if it fails before acquiring the data.

**Signals**, on the other hand, provide a fully asynchronous and durable mechanism for providing data to a running Workflow.
When a signal is received for a running Workflow, Temporal persists the event and the payload in the Workflow history.
The Workflow can then process the signal at any time afterwards without the risk of losing the information.
The Workflow also has the option to stop execution by blocking on a **signal channel**.

## How many Workers should be running?

### How many Workers can run per "Worker process"?

### When to enable concurrent Task Execution within Workers vs run multiple Workers

### What are the effects of a Parent Close Policy
