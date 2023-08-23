---
id: how-to-list-workflow-executions-using-the-client-in-java
title: How to list Workflow Executions using the Client in Java
sidebar_label: List Workflow Executions using the Client
description: List Workflow Executions using the Client
tags:
  - how-to-doc-type
  - java sdk
  - temporal client
  - workflow execution
  - search attributes
  - list filter
  - visibility
---

The [listExecutions()]() method retrieves a stream of [Workflow Executions](/concepts/what-is-a-workflow-execution) that match the conditions provided in a [Query]().
(more info here)

Define a `request` to pass into `listExecutions()`.
Make sure that the request body is a Query.
(rewrite this)

```java
request := &workflowservice.ListWorkflowExecutionsRequest{ Query: "CloseTime = missing" }
```

This `request` only returns Workflow Executions that don't have a set `CloseTime`.
 

(text here)

```java
ListWorkflowExecutionsRequest listWorkflowExecutionRequest =
    ListWorkflowExecutionsRequest.newBuilder()
        .setNamespace("default")
        .setQuery("CloseTime < '2022-06-08T16:46:34-08:00'")
        .build();
ListWorkflowExecutionsResponse listWorkflowExecutionsResponse =
    service.blockingStub().listWorkflowExecutions(listWorkflowExecutionRequest);
```








