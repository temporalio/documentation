---
id: how-to-use-a-side-effect-in-java
title: How to use a Side Effect in Java
sidebar_label: Side Effect
description: A Side Effect is a method of execution to produce nondeterministic code.
tags:
  - Java
  - developer-guide
---

To use a Side Effect in Java, set the [`sideEffect()`](<https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/Workflow.html#sideEffect(java.lang.Class,io.temporal.workflow.Functions.Func)>) function in your Workflow Execution and return the nondeterministic code.

```java
  int random = Workflow.sideEffect(Integer.class, () -> random.nextInt(100));
  if random < 50 {
         ....
  } else {
         ....
  }
```

Here's another example that uses `sideEffect()`.

```java
// implementation of the @WorkflowMethod
public void execute() {
    int randomInt = Workflow.sideEffect( int.class, () -> {
        Random random = new SecureRandom();
        return random.nextInt();
    });

    String userHome = Workflow.sideEffect(String.class, () -> System.getenv("USER_HOME"));

    if(randomInt % 2 == 0) {
        // ...
    } else {
        // ...
    }
}
```

Java also provides a deterministic method to generate random numbers or random UUIDs.

To generate random numbers in a deterministic method, use [`newRandom()`](<https://www.javadoc.io/static/io.temporal/temporal-sdk/latest/io/temporal/workflow/Workflow.html#newRandom()>)

```java
// implementation of the @WorkflowMethod
public void execute() {
    int randomInt = Workflow.newRandom().nextInt();
    // ...
}
```

To generate a random UUID in a deterministic method, use [`randomUUID()`](<https://www.javadoc.io/static/io.temporal/temporal-sdk/latest/io/temporal/workflow/Workflow.html#newRandom()>).

```java
// implementation of the @WorkflowMethod
public void execute() {
    String randomUUID = Workflow.randomUUID().toString();
    // ...
}
```
