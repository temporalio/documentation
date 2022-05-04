---
id: how-to-define-a-query-in-java
title: How to define a Query in Java
sidebar_label: Define Query
description: To define a Query, create a Query handler using the `@QueryMethod` annotation in the Workflow interface.
tags:
  - java
  - developer-guide
---

To define a Query, create a Query handler using the `@QueryMethod` annotation in the Workflow interface.

```java
 @QueryMethod
    void myQuery(name );
```

Note that Query methods can only be defined inside the Workflow interface.
Once defined, call the Query method from an external process to send a Query to the Workflow.

The Query method usually just returns a value derived from the fields of the Workflow object.

```java
public String myQuery() {
      // Returns the "greeting" object value derived from the Workflow method.
      return greeting;
    }
```

Query methods can take in any number of input parameters which can be used to limit the data that is returned.
Query methods must never change any Workflow state including starting Activities or blocking threads in any way.
