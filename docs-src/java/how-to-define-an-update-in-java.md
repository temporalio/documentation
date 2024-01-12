---
id: how-to-define-an-update-in-java
title: How to define Updates
sidebar_label: Define Update
description: Define an Update method with `@UpdateMethod` annotation in the Workflow interface.
tags:
  - java
  - developer-guide
---

An Update handler has a name, arguments, response, and an optional validator.

- The name, also called an Update type, is a string.
- The arguments and response must be [serializable](/concepts/what-is-a-data-converter).

The `@UpdateMethod` annotation indicates that the method is used to handle and respond to update requests.

```java
@UpdateMethod
   String myUpdate(String signalName);
```
