---
id: how-to-develop-a-workflow-definition-in-java
title: How to develop a Workflow Definition in Java
sidebar_label: Workflow Definition
description: In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface.
tags:
  - java
  - developer-guide
---

In the Temporal Java SDK programming model, a Workflow is a class which implements a Workflow interface:

```java
public class FileProcessingWorkflowImpl implements FileProcessingWorkflow {
  // ...
}
```

In Java, by default, the Workflow Type name is the same as the method name.
