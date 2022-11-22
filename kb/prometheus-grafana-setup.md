---
slug: prometheus-grafana-setup
title: Setting up Prometheus and Grafana to view metrics
tags:
  - kb-article
date: 2022-10-31T00:00:00Z
---

The Temporal Cluster and SDKs emit metrics that can be used to monitor performance and troubleshoot issues. To collect and aggregate these metrics, you can use one of the following tools:

- Prometheus
- StatsD
- M3

After you enable your monitoring tool, you can relay these metrics to any monitoring and observability platform.

<!-- truncate -->

This article discusses setting up Prometheus and Grafana to view metrics data on Temporal Cluster, Temporal Client, and Temporal Worker performance.

Each section includes an example on how you can do this in your local docker-compose Temporal Cluster setup and with the Java SDK.
If you implement the examples, ensure that your local docker-compose is set up, install your SDK, and have a sample application to work with.
(To get started, you can clone the SDK samples repositories.)

- See [Docker Compose](/application-development/foundations#docker-compose) for details on how to set up your local Temporal docker-compose.
- See [Install a Temporal SDK](/application-development/foundations#install-a-temporal-sdk) for details on how to install your SDK and get started with samples.
- Create your own sample from the workshops or tutorials, or clone an existing [code sample](/application-development/foundations?lang=java#code-samples).

To set up Prometheus and Grafana:

1. Set up Prometheus endpoints for your [Cluster metrics](#cluster-metrics-setup) and [SDK metrics](#sdk-metrics-setup).
2. [Configure Prometheus](#prometheus-configuration) to receive metrics data from your Cluster and SDK Clients.
   Make sure to test whether you are receiving metrics data on your Prometheus endpoint.
3. [Set up Grafana](#grafana-configuration) to use Prometheus as a data source.
4. Set up your [Grafana dashboard](#grafana-dashboard-setup) with Prometheus queries to display relevant data.

## Prometheus setup and configuration

The Temporal Cluster and SDKs emit all metrics by default.
However, you must enable Prometheus in your application code (using the Temporal SDKs) and your Cluster configuration to collect the metrics emitted from your SDK and Cluster.

### Cluster metrics setup

To enable Prometheus to receive metrics data, set listen addresses in the Server configuration for Prometheus to scrape from.

The [docker-compose setup](https://github.com/temporalio/docker-compose/blob/0bca458992ef5135700dcd9369a53fcda30356b0/docker-compose.yml) provided for local development sets up most Temporal Services in one Docker container.

Here’s an example of how to expose a Prometheus endpoint on your local docker-compose Temporal Cluster configuration:

```
version: "3.5"
services:
#...

  temporal:
   container_name: temporal
   depends_on:
     - postgresql
     - elasticsearch
   environment:
     - DB=postgresql
     - DB_PORT=5432
     - POSTGRES_USER=temporal
     - POSTGRES_PWD=temporal
     - POSTGRES_SEEDS=postgresql
     - DYNAMIC_CONFIG_FILE_PATH=config/dynamicconfig/development-sql.yaml
     - ENABLE_ES=true
     - ES_SEEDS=elasticsearch
     - ES_VERSION=v7
     - PROMETHEUS_ENDPOINT=0.0.0.0:8000 #expose a port for Prometheus
   image: temporalio/auto-setup:${TEMPORAL_VERSION}
   networks:
     - temporal-network
   ports:
     - 7233:7233
     - 8000:8000 #add your port
   volumes:
     - ./dynamicconfig:/etc/temporal/config/dynamicconfig
#...
```

Depending on how you deploy your Temporal Cluster, you can set different ports for each Temporal Service, as done in [this example](https://github.com/tsurdilo/my-temporal-dockercompose.git), where each Temporal Service is deployed as a separate container.

### SDK metrics setup

SDK metrics are emitted by Clients and must be set up in your application code.
The [Metrics section in the Observability guide](/application-development/observability#metrics) details how to set this up for all the supported SDKs.

For example, with the Java SDK, you can set up the Prometheus registry and Micrometer stats reporter, set the scope, and expose an endpoint from which Prometheus can scrape the SDK Client metrics in the following way.

```java
//...
// You need to import the following packages to set up metrics in Java.
// See the Developer's guide for packages required for the other SDKs.
import com.sun.net.httpserver.HttpServer;
import com.uber.m3.tally.RootScopeBuilder;
import com.uber.m3.tally.Scope;
import com.uber.m3.util.Duration;
import com.uber.m3.util.ImmutableMap;

  // See the Micrometer documentation for configuration details on other supported monitoring systems.
  // This example shows how to set up the Prometheus registry and stats reported.

  PrometheusMeterRegistry registry = new PrometheusMeterRegistry(PrometheusConfig.DEFAULT);
  StatsReporter reporter = new MicrometerClientStatsReporter(registry);

   // set up a new scope, report every 10 seconds
    Scope scope = new RootScopeBuilder()
            .tags(ImmutableMap.of(
                         "workerCustomTag1",
                         "workerCustomTag1Value",
                         "workerCustomTag2",
                         "workerCustomTag2Value"))
            .reporter(reporter)
            .reportEvery(com.uber.m3.util.Duration.ofSeconds(10));

  // For Prometheus collection, expose the scrape endpoint at port 8077. See Micrometer documentation for details on starting the Prometheus scrape endpoint. For example,
  HttpServer scrapeEndpoint = MetricsUtils.startPrometheusScrapeEndpoint(registry, 8077); //note: MetricsUtils is a utility file with the scrape endpoint configuration. See Micrometer docs for details on this configuration.
  // Stopping the starter stops the HTTP server that exposes the scrape endpoint.
  //Runtime.getRuntime().addShutdownHook(new Thread(() -> scrapeEndpoint.stop(1)));

  //Create Workflow service stubs to connect to the Frontend Service.
  WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(
         WorkflowServiceStubsOptions.newBuilder()
                 .setMetricsScope(scope) //set the metrics scope for the WorkflowServiceStubs
                 .build());

  //Create a Workflow service client, which can be used to start, signal, and query Workflow Executions.
  WorkflowClient yourClient = WorkflowClient.newInstance(service,
         WorkflowClientOptions.newBuilder().build());

  //...
```

You can set up separate scrape endpoints in your Clients that you use to start your Workers and Workflow Executions.
To use this example, add the example code with the Prometheus endpoint on port 8077 to your Worker program, and use `yourClient` to start your Workers.
Similarly, in your starter code, add the example code and set the Prometheus endpoint to port 8078, create a Workflow Client (as described in the code example), and use it to start your Workflow Execution.

For more examples on how to set up SDK metrics in other SDKs, see the metrics samples:

- [Java SDK Samples](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/metrics)
- [Go SDK Samples](https://github.com/temporalio/samples-go/tree/main/metrics)

In your Workers, you can set specific `WorkerOptions` for performance tuning, as described in the [Worker Performance Guide](/application-development/worker-performance).

With the scrape endpoints set, define your Prometheus scrape configuration and targets to receive the metrics data from the Temporal Cluster and Temporal SDKs.

### Prometheus configuration

Enable Prometheus to scrape metrics from the endpoints defined in the Cluster and SDK configurations.

For example with the local docker-compose Temporal Cluster, create a separate container for Prometheus with a [Prometheus docker image](https://hub.docker.com/r/prom/prometheus/tags) for v2.37.0 set with the default ports.

```
version: "3.5"
services:
#...
  prometheus:
   container_name: prometheus
   image: prom/prometheus:v2.37.0
   ports:
     - 9090:9090
   volumes:
     - type: bind
       source:./deployment/prometheus/config.yml
       target: /etc/prometheus/prometheus.yml
   depends_on:
     - temporal
#...
```

The Prometheus container configuration will be read from `./deployment/prometheus/config.yml`, so for this example, create a Prometheus configuration YAML file config.yml at `./deployment/prometheus` in your docker-compose Temporal Cluster project.

For other ways to set your Prometheus configuration, see the [Prometheus Configuration documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

Next, add your Prometheus setup configuration to scrape metrics data from the Temporal Cluster and SDK Client target endpoints.

For example, open the Prometheus configuration YAML file, created in the previous example at `./deployment/prometheus/config.yml`, and add the following configuration to scrape metrics from targets set on the docker-compose Temporal Cluster and SDK Clients in the previous sections.

```
global:
 scrape_interval: 10s
scrape_configs:
 - job_name: 'temporalmetrics'
   metrics_path: /metrics
   scheme: http
   static_configs:
     # Cluster metrics target
     - targets:
         - 'host.docker.internal:8000'
       labels:
         group: 'server-metrics'

     # Local app targets (if configured)
     - targets:
         - 'host.docker.internal:8077'
         - 'host.docker.internal:8078'
       labels:
         group: 'sdk-metrics'
```

In this example, Prometheus is configured to scrape at 10-second intervals and to listen for Cluster metrics on `host.docker.internal:8000` and SDK metrics on two targets, `host.docker.internal:8077` and `host.docker.internal:8078`.
The `8077` and `8078` ports must be set on `WorkflowServiceStubs` in your application code with your preferred SDK.
You can use these ports to create Workers and make Client API calls to start Workflow Executions and send Signals and Queries.
See the [SDK Metrics](#sdk-metrics-setup) section for details.
You can set up as many targets as required.

For more details on how to configure Prometheus, refer the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

To check whether you’re receiving your metrics data, restart your local docker-compose Temporal Cluster (with the configuration provided in the examples here) and check the following ports:

- [localhost:8000/metrics](http://localhost:8000/metrics) - The port for exposing your Cluster metrics.
  You should see all the Cluster metrics emitted when you start your local docker-compose Temporal Cluster.
- [localhost:8077/metrics](http://localhost:8077/metrics) - The port for exposing your SDK metrics.
  Depending on whether you have set this port on the Client that is starting your Worker or your Workflow Executions, the related metrics should show when you start your Worker or Workflow Execution.
- [localhost:8078/metrics](http://localhost:8078/metrics) - The port for exposing your SDK metrics.
  Depending on whether you have set this port on the Client that is starting your Worker or your Workflow Executions, the related metrics should show when you start your Worker or Workflow Execution.
- [localhost:9090/](http://localhost:9090/) - The port for Prometheus detail.
  Go to **Status > Targets** to check the statuses of your Prometheus target endpoints.

## Grafana configuration

With Prometheus configured, set up Grafana to use Prometheus as a data source.

For example, in the modified local docker-compose Temporal Cluster setup described in the previous section, create a separate container with port 8085 for Grafana.

```
version: "3.5"
services:
#...
  grafana:
   container_name: grafana
   image: grafana/grafana:7.5.16
   environment:
     - GF_AUTH_DISABLE_LOGIN_FORM=true
     - GF_AUTH_ANONYMOUS_ENABLED=true
     - GF_AUTH_ANONYMOUS_ORG_ROLE=Admin
   ports:
     - 8085:3000
   volumes:
     - type: bind
       source: ./deployment/grafana/provisioning/datasources
       target: /etc/grafana/provisioning/datasources
   depends_on:
     - prometheus
#...
```

Note that in this example, Grafana is set up to start without authorizations; this is not a good practice and is not recommended.
For more information on how to customize your Grafana setup, see the [Grafana documentation](https://grafana.com/docs/grafana/latest/setup-grafana/).

Next, configure Grafana to use Prometheus as the data source.
You can do this either on the UI or in your Grafana deployment configuration.

For the preceding example, create a configuration file (for example, config.yml) at `./deployment/grafana/provisioning/datasource` in your docker-compose Temporal Cluster project and configure the Prometheus data source for Grafana, as shown:

```
apiVersion: 1

datasources:
 - name: 'Temporal Prometheus'
   type: 'prometheus'
   org_id: 1
   url: 'http://prometheus:9090'
   is_default: true
   version: 1
   editable: true
```

In this example, Grafana is set to pull metrics from Prometheus at the port 9090, as defined in the Prometheus configuration.
After you update this configuration, restart your local docker-compose Temporal Cluster, and go to [localhost:8085](http://localhost:8085) to access Grafana.

### Grafana dashboard setup

To set up your dashboards in Grafana, either use the UI or configure them in your Grafana deployment on the Cluster, as done in this [dashboards](https://github.com/tsurdilo/my-temporal-dockercompose/tree/main/deployment/grafana/dashboards) example.

In your Grafana dashboard, add your Prometheus query to call specific metrics.
The [Temporal Cluster Metrics reference](/references/cluster-metrics) describes a few metrics and queries that you can get started with.

For example, to create a dashboard in your local Grafana UI at [localhost:8085](http://localhost:8085):

1. Go to **Create > Dashboard**, and add an empty panel.
2. On the **Panel configuration** page, in the **Query** tab, select **Temporal Prometheus** as the data source.
3. In the **Metrics** field, use any of the queries listed in the [Temporal Cluster Metrics reference](/references/cluster-metrics).
   For example, add `sum by (operation) (rate(service_requests{service_name="frontend"}[2m]))` to see all the Frontend Service requests on your local docker-compose Temporal Cluster.
4. You should see the graph show metrics data for the Frontend Service from the docker-compose Temporal Cluster.
5. When you start your Workflows (after setting up your SDK Metrics), you will see your SDK metrics in the graph as well.
6. Optional: In the Legend field, add "{{operation}}" to clean the legend on the graph to show operations.

You can add multiple queries in your dashboard to report relevant data.
For more details on configuring Grafana dashboards, see the [Grafana Dashboards documentation](https://grafana.com/docs/grafana/latest/dashboards/).

After you set up your dashboard, you can start experimenting with different samples provided in the Temporal samples repositories.

Temporal also has a repository of community-driven [Grafana dashboards](https://github.com/temporalio/dashboards) that you can get started with.
You can set these up in your Grafana configuration to show the dashboards by default when you start your Cluster.
If you are following the examples provided here and importing a dashboard from the community-driven dashboards repository, update the data source for each panel to "Temporal Prometheus" (which is the name set for the Prometheus data source in the [Grafana configuration](#grafana-configuration) section).
