---
id: how-to-develop-an-activity-definition-in-java
title: How to develop an Activity Definition in Java
sidebar_label: Activity Definition
description: In the Temporal Java SDK programming model, Activities are classes which implement the Activity Interface.
tags:
  - java
  - developer-guide
---

An [Activity Definition](/docs/concepts/what-is-an-activity) is a combination of the Temporal Java SDK [Activity](https://www.javadoc.io/static/io.temporal/temporal-sdk/0.19.0/io/temporal/activity/Activity.html) Class implementing a specially annotated interface.

## Activity interface

Activity interface is a Java interface and is annotated with the `@ActivityInterface` annotation.

```java
@ActivityInterface
public interface GreetingActivities {
    String composeGreeting(String greeting, String language);
}
```

Each method defined in the Actvity interface defines a separate Activity method.
You can annotate each method in the Activity interface with the `@ActivityMethod` annotation, but this is completely optional. The following example uses the `@ActivityMethod` annotation for the method defined in the previous example.

```java
@ActivityInterface
public interface GreetingActivities {
    @ActivityMethod()
    String composeGreeting(String greeting, String language);
}
```

The Activity Type defaults to method name, with the first letter of the method name capitalized. In the previous example, the Activity Type defaults to `ComposeGreeting`.

To overwrite this default naming and assign a custom Activity Type, use the `@ActivityMethod` annotation with the `name` parameter. In the following example, the Activity Type is set to "greet".

```java
@ActivityInterface
public interface GreetingActivities {
    @ActivityMethod(name = "greet")
    String composeGreeting(String greeting, String language);
}
```

You can also define a prefix for all of your Activity Types using the `namePrefix` parameter with the `@ActivityInterface` annotation. The following example shows a `namePrefix` parameter applied to the `@ActivityInterface`, and two Activity methods, of which one is defined using the `@ActivityMethod` annotation.

```java
@ActivityInterface(namePrefix = "A_")
Public interface MyActivity {
    String doSomething(String input);

  @ActivityMethod(name = "abc")
  String doSomethingElse();
}
```

In this example, the Activity type for the first method is set to "A_DoSomething". The Activity type for the method annotated with `@ActivityMethod` is set to "A_abc".

## Activity implementation

An Activity implementation is Java class which implements an Activity Interface.
Example:

```java
  public class MultiLanguageGreeting implements GreetingsActivities {
    private final TranslationService translationService;

    public MultiLanguageGreeting(TranslationService translationService) {
      this.translationService = translationService;
    }

    @Override
    public String composeGreeting(String greeting, String language) {
      return translationService.translate(greeting, language);
    }
  }
```

### Dynamic Activities

Use `DynamicActivity` to implement any number of Activity types dynamically.
When an Activity implementation that extends `DynamicActivity` is registered, it is called for any Activity type invocation that doesn't have an explicitly registered handler.

`DynamicActivity` can be useful for integrations with existing libraries.
For example, it can be used to call some external HTTP API with each function exposed as a different Activity type.

The Dynamic Activity interface is implemented with the `execute` method. This method takes in `EncodedValues` that are inputs to the Activity Execution, as shown in the following example.

```java
 // Dynamic Activity implementation
  public static class DynamicGreetingActivityImpl implements DynamicActivity {
    @Override
    public Object execute(EncodedValues args) {
      String activityType = Activity.getExecutionContext().getInfo().getActivityType();
      return activityType
          + ": "
          + args.get(0, String.class)
          + " "
          + args.get(1, String.class)
          + " from: "
          + args.get(2, String.class);
    }
  }
```

Use `Activity.getExecutionContext()` to get information about the Activity type that should be implemented dynamically.

You can only register one instance that implements `DynamicActivity` with a Worker.
