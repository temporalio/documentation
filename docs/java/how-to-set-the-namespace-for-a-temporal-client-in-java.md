---
id: how-to-set-the-namespace-for-a-temporal-client-in-java
title: How to set a Namespace for a Temporal Client in Java
sidebar_label: Set Namespace
description: Use the setNamespace method on Workflow Client Options Builder.
tags:
  - how-to
  - java
---

Use the `setNamespace()` method on Workflow Client Options Builder.

```java
 WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
 // https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowClientOptions.Builder.html
 WorkflowOptions clientOptions = WorkflowClientOptions.newBuilder()
    .setNamespace('my-namespace-name');
 WorkflowClient temporalClient =  WorkflowClient.newInstance(service, clientOptions);
```
