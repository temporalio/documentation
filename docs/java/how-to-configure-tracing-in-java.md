---
id: how-to-configure-tracing-in-java
title: How to configure tracing in Java
sidebar_label: Configure tracing
description: To configure tracing in Java, register the `OpenTracingClientInterceptor()` interceptor.
tags:
  - java
  - how-to
---

To configure tracing in Java, register the `OpenTracingClientInterceptor()` interceptor.
You can register the interceptors on both the Temporal Client side and the Worker side.

The following code examples demonstrate the `OpenTracingClientInterceptor()` on the Temporal Client.

```java
WorkflowClientOptions.newBuilder()
   //...
   .setInterceptors(new OpenTracingClientInterceptor())
   .build();
```

```java
    WorkflowClientOptions clientOptions =
        WorkflowClientOptions.newBuilder()
            .setInterceptors(new OpenTracingClientInterceptor(JaegerUtils.getJaegerOptions(type)))
            .build();
    WorkflowClient client = WorkflowClient.newInstance(service, clientOptions);
```

The following code examples demonstrate the `OpenTracingClientInterceptor()` on the Worker.

```java
WorkerFactoryOptions.newBuilder()
   //...
   .setWorkerInterceptors(new OpenTracingWorkerInterceptor())
   .build();
```

```java
    WorkerFactoryOptions factoryOptions =
        WorkerFactoryOptions.newBuilder()
            .setWorkerInterceptors(
                new OpenTracingWorkerInterceptor(JaegerUtils.getJaegerOptions(type)))
            .build();
    WorkerFactory factory = WorkerFactory.newInstance(client, factoryOptions);
```

For more information, see the Temporal [OpenTracing module](https://github.com/temporalio/sdk-java/blob/master/temporal-opentracing/README.md).
