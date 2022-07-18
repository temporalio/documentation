---
id: how-to-emit-metrics-in-java
title: How to emit metrics in Java
sidebar_label: Emit metrics
tags:
  - developer-guide
  - java
---

To emit metrics in Java, you should use the following steps:

- Set the scope
- Set the scrape end point
- Initialize the Workflow service stub
- Add metrics scope in the Workflow service stubs options
- Initialize the Client

In addition to the `client workflow workflowservicestubs workflowservicestubsoptions` options, set the following:

```java
import com.sun.net.httpserver.HttpServer;
import com.uber.m3.tally.RootScopeBuilder;
import com.uber.m3.tally.Scope;
import com.uber.m3.util.ImmutableMap;
import io.micrometer.prometheus.PrometheusConfig;
import io.micrometer.prometheus.PrometheusMeterRegistry;
import io.temporal.common.reporter.MicrometerClientStatsReporter;
```

The following code example demonstrates how to emit metrics from your Workflow.

```java
// task queue to be used for this sample
  public static final String DEFAULT_TASK_QUEUE_NAME = "metricsqueue";

  public static void main(String[] args) {

    PrometheusMeterRegistry registry = new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
```

Set your scope.
In this example, the scope will report once a second.

```java
Scope scope =
        new RootScopeBuilder()
            .reporter(new MicrometerClientStatsReporter(registry))
            .reportEvery(com.uber.m3.util.Duration.ofSeconds(1));
```

Next, set an endpoint to allow Prometheus to scrape metrics from. In this example, the endpoint is set to a http server at `8080`.

```java
HttpServer scrapeEndpoint = MetricsUtils.startPrometheusScrapeEndpoint(registry, 8080);
```

Stopping the Worker will stop the http server that exposes the scrape endpoint.

```java
    Runtime.getRuntime().addShutdownHook(new Thread(() -> scrapeEndpoint.stop(1)));
```

Add the metrics scope to Workflow service stub options.

```java
 WorkflowServiceStubsOptions stubOptions =
        WorkflowServiceStubsOptions.newBuilder().setMetricsScope(scope).build();
```

For more information, see the [Setting up SDK metrics](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/metrics) in the Java Samples repository.
