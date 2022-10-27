---
id: how-to-define-activity-return-values-in-java
title: How to define Activity return values in Java
sidebar_label: Activity return values
description: Activity return values must be serializable and deserializable by the provided `DataConverter`
tags:
  - developer-guide
  - java
---

Activity return values must be serializable and deserializable by the provided [`DataConverter`](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.17.0/io/temporal/common/converter/DataConverter.html).

The `execute` method for `DynamicActivity` can return type Object.
Ensure that your Workflow or Client can handle an Object type return or is able to convert the Object type response.

- [What is a Data Converter?](/concepts/what-is-a-data-converter)
- Java DataConverter reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html>
