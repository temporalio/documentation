---
id: how-to-define-workflow-return-values-in-java
title: How to define Workflow return values in Java
sidebar_label: Workflow return values
description: Workflow method arguments and return values must be serializable and deserializable using the provided `DataConverter`.
tags:
  - developer-guide
  - java
---

Workflow method arguments and return values must be serializable and deserializable using the provided [`DataConverter`](https://www.javadoc.io/static/io.temporal/temporal-sdk/1.11.0/io/temporal/common/converter/DataConverter.html).

The `execute` method for `DynamicWorkflow` can return type Object.
Ensure that your Client can handle an Object type return or is able to convert the Object type response.

Related references:

- [What is a Data Converter?](/concepts/what-is-a-data-converter)
- Java DataConverter reference: <https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html>
