---
id: how-to-set-a-dynamic-query-in-java
title: How to set a Dynamic Query
sidebar_label: Set a Dynamic Query
description: Use `Workflow.registerListener(Object)` to register an implementation of the `DynamicQueryListener` in the Workflow implementation code.
tags:
- dynamic query
- java sdk
---

You can also implement Query handlers dynamically. This is useful for library-level code and implementation of DSLs.

Use `Workflow.registerListener(Object)` to register an implementation of the `DynamicQueryListener` in the Workflow implementation code.

```java
Workflow.registerListener(
  (DynamicQueryHandler)
      (queryName, encodedArgs) -> name = encodedArgs.get(0, String.class));
```

When registered, any Queries sent to the Workflow without a defined handler will be delivered to the `DynamicQueryHandler`.
Note that you can only register one `Workflow.registerListener(Object)` per Workflow Execution.
`DynamicQueryHandler` can be implemented in both regular and dynamic Workflow implementations.
