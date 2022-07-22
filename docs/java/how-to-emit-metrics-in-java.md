---
id: how-to-emit-metrics-in-java
title: How to emit metrics in Java
sidebar_label: Emit metrics
description: To emit metrics with the Java SDK, use the `MicrometerClientStatsReporter` implementation for Prometheus and other backends supported by Micrometer, and use `WorkflowServiceStubsOptions.Builder.setMetricsScope` to set the metrics scope in your Worker or Client code.
tags:
  - developer-guide
  - java
---

To emit metrics with the Java SDK, use the [`MicrometerClientStatsReporter`](https://github.com/temporalio/sdk-java/blob/55ee7894aec427d7e384c3519732bdd61119961a/src/main/java/io/temporal/common/reporter/MicrometerClientStatsReporter.java#L34) implementation for Prometheus and other backends supported by [Micrometer](https://micrometer.io/docs), and use `WorkflowServiceStubsOptions.Builder.setMetricsScope` to set the metrics scope in your Worker or Client code.

The following example shows how to set the `MicrometerClientStatsReporter` for Prometheus, define the metrics scope, and set it with the `WorkflowServiceStubsOptions`.

```java
//...
   // Set up Prometheus registry and stats reported
   PrometheusMeterRegistry registry = new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
   StatsReporter reporter = new MicrometerClientStatsReporter(registry);
    // Set up a new scope, report every 10 seconds
     Scope scope = new RootScopeBuilder()
             .reporter(reporter)
             .reportEvery(com.uber.m3.util.Duration.ofSeconds(10));
   // Start the Prometheus scrape endpoint for metrics
   HttpServer scrapeEndpoint = MetricsUtils.startPrometheusScrapeEndpoint(registry, 8081);
   //...
   // Add metrics scope to WorkflowServiceStub options
   WorkflowServiceStubsOptions stubOptions =
       WorkflowServiceStubsOptions.newBuilder().setMetricsScope(scope).build();
//...
```

See the [Java SDK Samples](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/metrics) for more details.
