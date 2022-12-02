---
slug: prometheus-grafana-setup-cloud
title: Set up Grafana with Temporal Cloud Observability to view metrics
tags:
  - kb-article
date: 2022-12-02T00:00:00Z
---

Temporal Cloud and SDKs emit metrics that can be used to monitor performance and troubleshoot errors.

While Temporal Cloud emits metrics through a Prometheus HTTP API endpoint, the open-source SDKs require you to set up a Prometheus scrape endpoint to collect and aggregate the Worker and Client metrics.

This article describes how to set up your Temporal Cloud and SDK metrics, and use them as data sources in Grafana.

The process for setting up Observability includes the following steps:

1. Get Prometheus endpoints for Temporal Cloud metrics and SDK metrics.
   - For Temporal Cloud, [generate a Prometheus HTTP API endpoint](#temporal-cloud-metrics-setup) on Temporal Cloud using valid certificates.
   - For SDKs, [expose a metrics endpoint](#sdk-metrics-setup) where Prometheus can scrape SDK metrics and [run Prometheus](#prometheus-configuration-for-sdk-metrics) on your host. The examples in this article describe running Prometheus on your local machine where you run your application code.
2. Run Grafana and [set up data sources for Temporal Cloud and SDK metrics](#data-sources-configuration-for-temporal-cloud-andssdk-metrics-in-grafana) in Grafana. The examples in this article describe running Grafana on your local host where you run your application code.
3. [Create dashboards](#grafana-dashboards-setup) in Grafana to view Temporal Cloud metrics and SDK metrics.

<!-- truncate -->

## Temporal Cloud metrics setup

Before you set up your Temporal Cloud metrics, ensure that you have the following:

- [Global Admin privileges](/cloud#account-level-roles) to the Temporal Cloud account.
- [CA certificate and key](/cloud/how-to-manage-certificates-in-temporal-cloud) for the Observability integration. You will need the certificate to set up the Observability endpoint in Temporal Cloud, and both the certificate and key when setting up this endpoint in Grafana for the Temporal Cloud metrics.

The following steps describe how to set up your Observability on Temporal Cloud to generate an endpoint:

1. Log in to Temporal Cloud UI as a Global Admin.
2. Go to Settings and select Integrations.
3. Select Configure Observability (if you’re setting it up for the first time) or click Edit (if it was already configured before).
4. Add your root CA certificate (.pem) and save it. Note that if an Observability endpoint is already set up, you can append
   certificates here to use the generated Observability endpoint with your instance Grafana.
5. To test your endpoint, run the following command on your host:
   `curl -v --cert <path to your cert.pem> --key <path to your cert.key> "<your generated Temporal Cloud prometheus_endpoint>/api/v1/query?query=temporal_cloud_v0_state_transition_count"`
   If you have Workflows running on a namespace in your Temporal Cloud instance, you should see some data as a result of running this command.
6. Copy the HTTP API endpoint that is generated (it shows on your UI).

This endpoint can be configured as the datasource for Temporal Cloud metrics in Grafana.
See [Data sources configuration for Temporal Cloud and SDK metrics in Grafana](#data-sources-configuration-for-temporal-cloud-andssdk-metrics-in-grafana) section for details.

This endpoint can be configured as a datasource in Grafana. See Data sources configuration for Temporal Cloud and SDK metrics in Grafana for details.

## SDK metrics setup

SDK metrics are emitted by SDK Clients used to start your Workers and to start, signal or query your Workflow Executions.
You must configure a Prometheus scrape endpoint to collect and aggregate your SDK metrics.
The [Metrics section in the Observability guide](/application-development/observability#metrics) details how to set this up for all the supported SDKs.

The following example uses the Java SDK to set the Prometheus registry and Micrometer stats reporter, set the scope, and expose an endpoint from which Prometheus can scrape the SDK metrics.

```java
//You need the following packages to set up metrics in java.
//See the Developer’s guide for packages required for other SDKs.

//…
import com.sun.net.httpserver.HttpServer;
import com.uber.m3.tally.RootScopeBuilder;
import com.uber.m3.tally.Scope;
import com.uber.m3.util.Duration;
import com.uber.m3.util.ImmutableMap;

import io.micrometer.prometheus.PrometheusConfig;
import io.micrometer.prometheus.PrometheusMeterRegistry;
import io.temporal.common.reporter.MicrometerClientStatsReporter
;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

import io.temporal.serviceclient.SimpleSslContextBuilder;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;

import java.io.FileInputStream;
import java.io.InputStream;
//…
//…
   {
     // See the Micrometer documentation for configuration details on other supported monitoring systems.
     // Set up the Prometheus registry.
     PrometheusMeterRegistry yourRegistry = new
                    PrometheusMeterRegistry(PrometheusConfig.DEFAULT);

       public static Scope yourScope(){
     //Set up a scope, report every 10 seconds
       Scope yourScope = new RootScopeBuilder()
               .tags(ImmutableMap.of(
                       "customtag1",
                       "customvalue1",
                       "customtag2",
                       "customvalue2"))
               .reporter(new MicrometerClientStatsReporter(yourRegistry))
               .reportEvery(Duration.ofSeconds(10));

     //Start Prometheus scrape endpoint at port 8077 on your local host
     HttpServer scrapeEndpoint = startPrometheusScrapeEndpoint(yourRegistry, 8077);
     return yourScope;
   }

   /**
    * Starts HttpServer to expose a scrape endpoint. See
    * https://micrometer.io/docs/registry/prometheus for more info.
    */

   public static HttpServer startPrometheusScrapeEndpoint(
           PrometheusMeterRegistry yourRegistry, int port) {
       try {
           HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);
           server.createContext(
                   "/metrics",
                   httpExchange -> {
                       String response = registry.scrape();
                       httpExchange.sendResponseHeaders(200, response.getBytes(UTF_8).length);
                       try (OutputStream os = httpExchange.getResponseBody()) {
                           os.write(response.getBytes(UTF_8));
                       }
                   });
           server.start();
           return server;
       } catch (IOException e) {
           throw new RuntimeException(e);
       }
   }
}

//…

// With your scrape endpoint configured, set the metrics scope in your Workflow service stub and use it to create a Client to start your Workers and Workflow Executions.

//…
{
    //Create Workflow service stubs to connect to the Frontend Service.
    WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(
               WorkflowServiceStubsOptions.newBuilder()
                      .setMetricsScope(yourScope()) //set the metrics scope for the WorkflowServiceStubs
                      .build());

   //Create a Workflow service client, which can be used to start, signal, and query Workflow Executions.
   WorkflowClient yourClient = WorkflowClient.newInstance(service,
          WorkflowClientOptions.newBuilder().build());
}

//…

```

To check whether your scrape endpoints are emitting metrics, run your code and go to [http://localhost:8077/metrics](http://localhost:8077/metrics) to verify that you see all the SDK metrics.

## Prometheus configuration for SDK metrics

For Temporal SDKs, you must have Prometheus installed on your host, and configured to listen on the scrape endpoints exposed in the application code.

For this example, you can run Prometheus locally, or as a docker container. In either case, ensure that you set the listen targets to the ports where you have exposed your scrape endpoints.
When running Prometheus locally, set your target address to port 8077 that we set in the SDK metrics setup example, in your Prometheus configuration YAML file.

Example:

```
global:
 scrape_interval: 10s # Set the scrape interval to every 10 seconds. Default is every 1 minute.
#...

# set your scrape configuration targets to the ports exposed on your endpoints in the SDK
scrape_configs:
 - job_name: 'temporalsdkmetrics'
   metrics_path: /metrics
   scheme: http
   static_configs:
     - targets:
       # This is the scrape endpoint where Prometheus listens for SDK metrics.
       - localhost:8077
       # You can have multiple targets here, provided they are set up in your application code.

```

See the Prometheus documentation for more details on how you can run Prometheus locally or using docker.

Note that Temporal Cloud exposes metrics through a Prometheus HTTP API endpoint (not a scrape endpoint) that can be configured as a datasource in Grafana. The Prometheus configuration described here is for scraping metrics data on endpoints for SDK metrics only.

To check whether Prometheus is receiving metrics from your SDK target, go to http://localhost:9090 and navigate to Status > Targets. The status of your target endpoint defined in your configuration will show here.

## Data sources configuration for Temporal Cloud and SDK metrics in Grafana

Depending on how you use Grafana, you can either install and run it locally, run it as a docker container, or log in to Grafana Cloud to set up your data sources.

If you have installed and are running Grafana locally, go to [http://localhost:3000](http://localhost:3000) and sign in.

You must configure your Temporal Cloud and the SDK Metrics data sources separately in Grafana.

To add the Temporal Cloud Prometheus HTTP API endpoint that we generated in the previous section, do the following:

1. Go to **Configuration** > **Data sources**.
2. Select **Add data source** > **Prometheus**.
3. Enter a name for your Temporal Cloud metrics data source, for example _Temporal Cloud metrics_.
4. In the **HTTP section**, paste the URL that was generated in the Observability section on the Temporal Cloud UI.
5. In the **Auth section**, enable **TLS Client Auth**.
6. In the **TLS/SSL Auth Details** section, paste the root CA certificate and key that you used to [set up Observability](#temporal-cloud-metrics-setup) in your Temporal Cloud UI.
7. Select **Save and test** to ensure the data source is working properly.

If you see issues in setting this data source, verify that you are using the correct certificates (root CA) on both your Temporal Cloud Observability setup and in the TLS authentication in Grafana.

To add the SDK metrics Prometheus endpoint that we configured in the previous section, do the following:

1. Go to **Configuration** > **Data sources**.
2. Select **Add data source** > **Prometheus**.
3. Enter a name for your Temporal Cloud metrics data source, for example _Temporal SDK metrics_.
4. In the **HTTP** section, enter your Prometheus endpoint in the URL field.
   If running Prometheus locally as described in the examples in this article, enter http://localhost:9090.
5. For this example, enable **Skip TLS Verify** in the **Auth** section.
6. Select **Save and test** to ensure that the data source is working properly.

If you see issues in setting this data source, check whether the endpoints set in your SDKs are showing metrics.
If you don’t see your SDK metrics at the scrape endpoints defined, check whether your Workers and Workflow Executions are running.
If you see metrics on the scrape endpoints, but Prometheus shows your targets are down, then there is an issue with connecting to the targets set in your SDKs. Verify your Prometheus configuration and restart Prometheus.

If you’re running Grafana as a container, you can set your SDK metrics Prometheus datasource in your Grafana configuration. See the example Grafana configuration described in the Prometheus and Grafana setup for open-source Temporal Cluster.

## Grafana dashboards setup

To set up your dashboards in Grafana, either use the UI or configure them in your Grafana deployment.

In this article, we will configure our dashboards using the UI.

1. Go to **Create** > **Dashboard**, and add an empty panel.
2. On the **Panel configuration** page, in the **Query** tab, select the "Temporal Cloud metrics" or "Temporal SDK metrics" data source
   that we configured in the previous section.
   If you want to add multiple queries that involve both data sources, select `–Mixed–`.
3. Add your metrics queries:
   - For Temporal Cloud metrics, expand the **Metrics browser** and select the metrics you want to see. You can also select associated
     labels and values to sort the data on the query. The documentation on Cloud metrics describes metrics emitted from Temporal Cloud.
   - For Temporal SDK metrics, expand the **Metrics browser** and select the metrics you want to see.
     A list of metrics on Worker performance are described in the [Developer's Guide - Worker performance](/application-development/observability#metrics).
     All metrics related to SDKs are described in the [SDK metrics reference](/references/sdk-metrics).
4. You should see the graph show data based on the queries you have selected.
   Note that for SDK metrics to show, you must have some Workflow Execution data and running Workers.
   If you do not see any metrics data from the SDK, run your Worker and Workflow Executions and monitor your dashboard.

Temporal has a repositiry with some community-driven example dashboards for [Temporal Cloud](https://github.com/temporalio/dashboards/tree/master/cloud) and [Temporal SDKs](https://github.com/temporalio/dashboards/tree/master/sdk) that you can use and customize for your own requirements.

To import a dashboard in Grafana, do the following.

1. Go **Create** > **Import**.
2. You can either copy and paste the json from [Temporal Cloud](https://github.com/temporalio/dashboards/tree/master/cloud) and  
   [Temporal SDKs](https://github.com/temporalio/dashboards/tree/master/sdk) sample dashboards, or import the json files into Grafana.
   Ensure that you update dashboard data sources (`"uid": "${datasource}"`) in the JSON to the names you configured in the [Data sources configuration](#data-sources-configuration-for-temporal-cloud-andssdk-metrics-in-grafana) section.
3. Save the dashboard and review the metrics data in the graphs.
