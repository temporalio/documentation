---
id: how-to-define-a-query-in-java
title: How to define a Query in Java
sidebar_label: Define Query
description: Create a Query handler using the `@QueryMethod` annotation in the Workflow interface.
tags:
  - java
  - developer-guide
---

To define a Query, define the method name and the result type of the Query.

```java
query(String queryType, Class<R> resultClass, Type resultType, Object... args);

  /* @param queryType name of the Query handler. Usually it is a method name.
   * @param resultClass class of the Query result type
   * @param args optional Query arguments
   * @param <R> type of the Query result
  */
```

Query methods can take in any number of input parameters which can be used to limit the data that is returned.

Use the Query method names to send and receive Queries.

Query methods must never change any Workflow state including starting Activities or blocking threads in any way.
