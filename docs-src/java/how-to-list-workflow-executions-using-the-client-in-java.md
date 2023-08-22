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
The stream is then collected into a list with `Collectors.toList()`, where the returned metadata can be filtered further into Sets.







