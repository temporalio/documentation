---
id: design-patterns
title: Workflow Definition design patterns in Go
sidebar_label: Design patterns
---

## Overview

The following code snippets come from fully working sample applications that provide example implementations and design patterns for common scenarios.

## Child Workflow Executions

Clone the [Temporal Go samples repo](https://github.com/temporalio/samples-go).

<!--SNIPSTART samples-go-child-workflow-example-readme {"enable_source_link": false, "enable_code_block": false}-->
<!--SNIPEND-->

### Parent Workflow Definition

<!--SNIPSTART samples-go-child-workflow-example-parent-workflow-definition-->
<!--SNIPEND-->

### Child Workflow Definition

<!--SNIPSTART samples-go-child-workflow-example-child-workflow-definition-->
<!--SNIPEND-->

## Workflow Execution cancellation

Clone the [Temporal Go samples repo](https://github.com/temporalio/samples-go).

<!--SNIPSTART samples-go-cancellation-readme {"enable_source_link": false, "enable_code_block": false}-->
<!--SNIPEND-->

### Workflow Definition

<!--SNIPSTART samples-go-cancellation-workflow-definition-->
<!--SNIPEND-->

### Activity Definition

<!--SNIPSTART samples-go-cancellation-activity-definition-->
<!--SNIPEND-->

### Cancellation trigger

<!--SNIPSTART samples-go-cancellation-cancel-workflow-execution-trigger-->
<!--SNIPEND-->

## Parallel Activity Executions

Clone the [Temporal Go samples repo](https://github.com/temporalio/samples-go).

<!--SNIPSTART samples-go-branch-readme {"enable_source_link": false, "enable_code_block": false}-->
<!--SNIPEND-->

### Workflow Definition

<!--SNIPSTART samples-go-branch-workflow-definition-->
<!--SNIPEND-->

### Activity Definition

<!--SNIPSTART samples-go-branch-activity-definition-->
<!--SNIPEND-->

### Workflow Definition tests

<!--SNIPSTART samples-go-branch-workflow-definition-test-->
<!--SNIPEND-->
