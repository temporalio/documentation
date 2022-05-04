---
id: how-to-use-queries-in-java
title: How to use Queries in Java
sidebar_label: Queries
description: Define Query methods inside Workflows interfaces, annotated with the `@QueryMethod` annotation.
tags:
  - java
  - developer-guide
---

To use Queries to query the state of a Workflow at any stage of the Workflow Execution, create a Query handler using the `@QueryMethod` annotation in the Workflow interface and call the method in the Client code.

You can send a Query to an open or closed Workflow Execution.

When using Queries, the following restrictions apply:

- It can not modify Workflow state in any way.
- It is not allowed to block its thread in any way.

### Define Query Method

import  DefineQuery from './how-to-define-a-query-in-java.md'

<DefineQuery/>

### Handle Query

import HandleQuery from './how-to-handle-a-query-in-a-workflow-in-java.md'

<HandleQuery/>

### Send Query from Temporal Client

import SendQuery from './how-to-send-a-query-to-a-workflow-in-java.md'

<SendQuery/>