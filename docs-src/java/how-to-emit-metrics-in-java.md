---
id: how-to-emit-metrics-in-java
title: How to emit metrics in Java
sidebar_label: Emit metrics
description: To emit metrics with the Java SDK, use `WorkflowServiceStubsOptions.Builder.setMetricsScope` to set the metrics scope in your Worker or Client code.
tags:
  - developer-guide
  - java
---

To emit metrics with the Java SDK, use the[`MicrometerClientStatsReporter`](https://github.com/temporalio/sdk-java/blob/55ee7894aec427d7e384c3519732bdd61119961a/src/main/java/io/temporal/common/reporter/MicrometerClientStatsReporter.java#L34) class to integrate with Micrometer MeterRegistry configured for your metrics backend.
[Micrometer](https://micrometer.io/docs) is a popular Java framework that provides integration with Prometheus and other backends.

The following example shows how to use `MicrometerClientStatsReporter` to define the metrics scope and set it with the `WorkflowServiceStubsOptions`.

```java
//...
   // see the Micrometer documentation for configuration details on other supported monitoring systems.
   // in this example shows how to set up Prometheus registry and stats reported.
   PrometheusMeterRegistry registry = new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
   StatsReporter reporter = new MicrometerClientStatsReporter(registry);
    // set up a new scope, report every 10 seconds
     Scope scope = new RootScopeBuilder()
             .reporter(reporter)
             .reportEvery(com.uber.m3.util.Duration.ofSeconds(10));
   // for Prometheus collection, expose a scrape endpoint.
   //...
   // add metrics scope to WorkflowServiceStub options
   WorkflowServiceStubsOptions stubOptions =
       WorkflowServiceStubsOptions.newBuilder().setMetricsScope(scope).build();
//...
```

For more details, see the [Java SDK Samples](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/metrics).
For details on configuring a Prometheus scrape endpoint with Micrometer, see the [Micrometer Prometheus Configuring](https://micrometer.io/docs/registry/prometheus#_configuring) documentation.
