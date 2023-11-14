---
id: how-to-set-a-dynamic-signal-in-java
title: How to set a Dynamic Signal
sidebar_label: Set a Dynamic Query
description: Use `Workflow.registerListener(Object)` to register an implementation of the `DynamicSignalListener` in the Workflow implementation code.
tags:
- dynamic query
- java sdk
---

You can also implement Signal handlers dynamically. This is useful for library-level code and implementation of DSLs.

Use `Workflow.registerListener(Object)` to register an implementation of the `DynamicSignalListener` in the Workflow implementation code.

```java
Workflow.registerListener(
  (DynamicSignalHandler)
      (signalName, encodedArgs) -> name = encodedArgs.get(0, String.class));
```

When registered, any Signals sent to the Workflow without a defined handler will be delivered to the `DynamicSignalHandler`.
Note that you can only register one `Workflow.registerListener(Object)` per Workflow Execution.
`DynamicSignalHandler` can be implemented in both regular and dynamic Workflow implementations.
