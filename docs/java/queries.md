---
id: queries
title: Queries in Java
sidebar_label: Queries
---

Temporal provides a query feature that supports synchronously returning any information from a Workflow to an external caller.

Example Workflow interface that can respond to Queries:

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

Implementation:

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
