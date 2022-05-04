---
id: how-to-handle-a-query-in-a-workflow-in-java
title: How to handle a Query in a Workflow in Java
sidebar_label: Handle Query
description: To handle a Query in a Workflow, define a Query handler method using the `@QueryMethod` annotation in the Workflow interface.
tags:
  - java
  - developer-guide
---

To handle a Query in the Workflow, create a Query handler using the `@QueryMethod` annotation in the Workflow interface and define it in the Workflow implementation.

The `@QueryMethod` annotation indicates that the method is used to handle a [Query](/docs/concepts/what-is-a-query) that is sent to the Workflow Execution.

A Workflow Definition interface can define multiple methods annotated with `@QueryMethod`, but the method names or the `name` parameters for each must be unique.

The following Workflow interface has a Query method `getCount()` to handle Queries to this Workflow.

```java
  @WorkflowInterface
  public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);

    @QueryMethod
    int getCount();
  }
```

The following example is the Workflow implementation with the Query method defined in the `HelloWorld` Workflow interface from the previous exmaple.

```java
  public static class HelloWorldImpl implements HelloWorld {

    private String greeting = "Hello";
    private int count = 0;

    @Override
    public void sayHello(String name) {
      while (!"Bye".equals(greeting)) {
        logger.info(++count + ": " + greeting + " " + name + "!");
        String oldGreeting = greeting;
        Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
      }
      logger.info(++count + ": " + greeting + " " + name + "!");
    }

    @Override
    public int getCount() {
      return count;
    }
  }
```
