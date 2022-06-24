---
id: how-to-customize-workflow-type-in-java
title: How to customize Workflow Type in Java
sidebar_label: Customize Workflow Type
description: The Workflow Type defaults to the short name of the Workflow interface, and can be customized with the `name` parameter.
tags:
  - developer-guide
  - java
---

The Workflow Type defaults to the short name of the Workflow interface.
In the following example, the Workflow Type defaults to "NotifyUserAccounts".

```java
  @WorkflowInterface

  public interface NotifyUserAccounts {
    @WorkflowMethod
    void notify(String[] accountIds);
}
```

To overwrite this default naming and assign a custom Workflow Type, use the `@WorkflowMethod` annotation with the `name` parameter.
In the following example, the Workflow Type is set to "Abc".

```java
@WorkflowInterface

  public interface NotifyUserAccounts {
  @WorkflowMethod(name = "Abc")
  void notify(String[] accountIds);
  }
```

When you set the Workflow Type this way, the value of the `name` parameter does not have to start with an uppercase letter.
