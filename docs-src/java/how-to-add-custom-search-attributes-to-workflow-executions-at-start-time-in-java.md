---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-java
title: How to set custom Search Attributes in Java
sidebar_label: Set custom Search Attributes
description: To set custom Search Attributes, call the setSearchAttributes method.
tags:
  - developer-guide
  - sdk
  - java
---

To set a custom Search Attribute, call the [`setSearchAttributes()`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html#setSearchAttributes(java.util.Map)) method.

```java
WorkflowOptions workflowOptions =
    WorkflowOptions.newBuilder()
        .setSearchAttributes(generateSearchAttributes())
        .build();
```

`generateSearchAttributes()` is a `Map<String, ?>` from the Search Attribute used as the key to a value of one of the following types.

- `String`
- `Long`
- `Integer`
- `Boolean`
- `Double`
- `OffsetDateTime`
