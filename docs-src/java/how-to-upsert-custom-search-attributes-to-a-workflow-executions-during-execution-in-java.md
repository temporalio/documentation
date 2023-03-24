---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-java
title: How to upsert custom Search Attributes
sidebar_label: Upsert custom Search Attributes
description: To upsert custom Search Attributes, call the Workflow.upsertSearchAttributes(Map<String, ?> searchAttributes) method.
tags:
  - developer-guide
  - sdk
  - java
---

In your Workflow code, call the [`upsertSearchAttributes(Map<String, ?> searchAttributes)`](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/workflow/Workflow.html#upsertSearchAttributes(java.util.Map)) method.

```java
 Map<String, Object> attr1 = new HashMap<>();
     attr1.put("CustomIntField", 1);
     attr1.put("CustomBoolField", true);
     Workflow.upsertSearchAttributes(attr1);

     Map<String, Object> attr2 = new HashMap<>();
     attr2.put("CustomIntField", Lists.newArrayList(1, 2));
     attr2.put("CustomKeywordField", "Seattle");
     Workflow.upsertSearchAttributes(attr2);
```

The results of `upsertSearchAttributes()` output the following search attributes.

```json
{
    "CustomIntField": 1, 2,
    "CustomBoolField": true,
    "CustomKeywordField": "Seattle",
  }
```
