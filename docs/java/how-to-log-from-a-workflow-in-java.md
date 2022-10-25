---
id: how-to-log-from-a-workflow-in-java
title: How to log from a Workflow in Java
sidebar_label: Log from a Workflow
description: To log from a Workflow in Java, use the `Workflow.getLogger` method.
tags:
  - developer-guide
  - sdk
  - java
---

To get a standard `slf4j` logger in your Workflow code, use the [`Workflow.getLogger`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/Workflow.html) method.

```java
  private static final Logger logger = Workflow.getLogger(DynamicDslWorkflow.class);
```

Logs in replay mode are omitted unless the [`WorkerFactoryOptions.Builder.setEnableLoggingInReplay(boolean)`](<https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/worker/WorkerFactoryOptions.Builder.html#setEnableLoggingInReplay(boolean)>) method is set to true.
