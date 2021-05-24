---
id: child-workflows
title: Child Workflows in Go
sidebar_label: Child Workflows
---

## Overview

If a Workflow Execution is started by another Workflow Execution, then it is considered a Child Workflow Execution.
The completion or failure of a Child Workflow Execution is reported to the Workflow Execution that started it (the Parent Workflow Execution).
The Parent Workflow Execution has the ability to monitor and impact the lifecycle of the Child Workflow Execution, similar to the way it does for Activities.

### When to use Child Workflows

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

## Example app

Clone the [Temporal Go samples repo](https://github.com/temporalio/samples-go).

<!--SNIPSTART samples-go-child-workflow-example-readme {"enable_source_link": false, "enable_code_block": false}-->
<!--SNIPEND-->

### Parent Workflow Definition

The `workflow.ExecuteChildWorkflow` call is used to schedule Workflow Executions from within an executing Workflow.

<!--SNIPSTART samples-go-child-workflow-example-parent-workflow-definition-->
<!--SNIPEND-->

By default, a Child Workflow Execution inherits the options provided to the Parent Workflow Execution, and the Temporal Server will automatically generate a Child Workflow ID.
You can overwrite these options and specify a customer Child Workflow ID by customizing `ChildWorkflowOptions` and adding them to the execution context.

### Child Workflow Definition

A Child Workflow is defined just like any other Workflow Definition.

<!--SNIPSTART samples-go-child-workflow-example-child-workflow-definition-->
<!--SNIPEND-->

### Parent Workflow Execution starter

<!--SNIPSTART samples-go-child-workflow-example-execution-starter-->
<!--SNIPEND-->

### Worker starter

<!--SNIPSTART samples-go-child-workflow-example-worker-starter-->
<!--SNIPEND-->
