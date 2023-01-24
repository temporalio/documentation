---
id: queries
title: Queries in Java
sidebar_label: Queries
tags:
  - java
---

Workflow queries can be used to query a Workflow state by external processes at any time during its execution.
Query methods can only be defined inside Workflows Interfaces and are methods annotated with the `@QueryMethod` annotation, for example:

```java
  @WorkflowInterface
  public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);

    @QueryMethod
    int getCount();
  }
```

Notice that the `getCount` method is annotated with `@QueryMethod`.
There can be multiple Query methods per Workflow interface.

The `QueryMethod` annotation has an optional `name` property which can be used to define the query type.
If not specified it defaults to the method name.

Let's look at a Workflow implementation and its query method:

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

The restrictions on the implementation of the Query method are the following:

- It can not modify Workflow state in any way.
- It is not allowed to block its thread in any way.

The Query method usually just returns a value derived from the fields of the Workflow object.

Query methods can take in any number of input parameters which can be used to limit the data that is returned for example.
