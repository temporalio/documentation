---
id: how-to-customize-activity-type-in-java
title: How to customize Activity Type in Java
sidebar_label: Customize Activity Type
description: The Activity Type defaults to method name with the first letter of the method name capitalized, and can be customized using `namePrefix()` or `{ActivityMethod.name()}` to ensure they are distinct.
tags:
  - developer-guide
  - java
---

The Activity Type defaults to method name, with the first letter of the method name capitalized, and can be customized using `namePrefix()` or `{ActivityMethod.name()}` to ensure they are distinct.

In the following example, the Activity Type defaults to `ComposeGreeting`.

```java
@ActivityInterface
public interface GreetingActivities {
    @ActivityMethod
    String composeGreeting(String greeting, String language);
}
```

To overwrite this default naming and assign a custom Activity Type, use the `@ActivityMethod` annotation with the `name` parameter.
In the following example, the Activity Type is set to "greet".

```java
@ActivityInterface
public interface GreetingActivities {
    @ActivityMethod(name = "greet")
    String composeGreeting(String greeting, String language);
}
```

You can also define a prefix for all of your Activity Types using the `namePrefix` parameter with the `@ActivityInterface` annotation.
The following example shows a `namePrefix` parameter applied to the `@ActivityInterface`, and two Activity methods, of which one is defined using the `@ActivityMethod` annotation.

```java
@ActivityInterface(namePrefix = "A_")
Public interface GreetingActivities {
    String sendGreeting(String input);

  @ActivityMethod(name = "abc")
  String composeGreeting(String greeting, String language);
}
```

In this example, the Activity type for the first method is set to "A_SendGreeting".
The Activity type for the method annotated with `@ActivityMethod` is set to "A_abc".
