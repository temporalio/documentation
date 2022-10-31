---
slug: prometheus-grafana-setup
title: Setting up Prometheus and Grafana
tags:
  - kb-article
date: 2022-10-31T00:00:00Z
---

The Temporal Cluster and SDKs emit metrics that can be used to monitor performance and troubleshoot issues. To collect and aggregate these metrics, you can use one of the following:

- Prometheus
- StatsD
- M3

Once you have enabled your monitoring tool, you can relay these metrics to any monitoring and observability platform.

<!-- truncate -->

In this article, we discuss setting up Prometheus and Grafana to view metrics data on Temporal Server, Temporal Client, and Temporal Worker performance.

Each section describes the steps to setting up Prometheus and Grafana, and an example on how you can do this in your local docker-compose Temporal Cluster setup and with the Java SDK.
If you’re following through with implementing the examples, ensure that you have your local docker-compose setup, added your SDK, and have a sample application to work with (you can clone the SDK samples repositories to get started with).

- See [Run a dev Cluster](/application-development/foundations#run-a-dev-cluster) for details on how to set up your local Temporal docker-compose.
- See [Add your SDK](/application-development/foundations#add-your-sdk) for details on how to add your SDK and get started with samples.
- Create your own sample from the workshops or tutorials, or [clone an existing sample/or example](/application-development/foundations?lang=java#code-samples).

## Prometheus setup and configuration

The Temporal Cluster and SDKs emit all metrics by default. You must enable Prometheus on your Cluster to collect these metrics.

### Cluster Metrics setup

To enable Prometheus to receive metrics data, set listen addresses in the Server configuration for Prometheus to scrap from.

The [docker-compose setup](https://github.com/temporalio/docker-compose/blob/0bca458992ef5135700dcd9369a53fcda30356b0/docker-compose.yml) provided for local development sets up most Temporal Services in one Docker container.

Here’s an example for how to expose a Prometheus endpoint on your local docker-compose Temporal Cluster configuration:

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
     - 8000:8000
   volumes:
     - ./dynamicconfig:/etc/temporal/config/dynamicconfig
#...
```

Depending on how you deploy your Temporal Cluster, you can set different ports for each Temporal Service, as done in this example where each Temporal Service is deployed as a separate container.

### SDK metrics setup

SDK metrics are emitted by Clients and must be set up in your application code. The [Metrics section in the Observability guide](/application-development/observability#metrics) details how to set this up for all the supported SDKs.

For example, with the Java SDK, you can set up the Prometheus registry and Micrometer stats reporter, set the scope, and expose an endpoint for Prometheus to scrape the SDK Client metrics from in the following way.

```java
//...
  // see the Micrometer documentation for configuration details on other supported monitoring systems.
  // in this example shows how to set up the Prometheus registry and stats reported.

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

  // for Prometheus collection, expose the scrape endpoint at port 8077. For example,
  HttpServer scrapeEndpoint = MetricsUtils.startPrometheusScrapeEndpoint(registry, 8077);
  // Stopping the starter will stop the http server that exposes the
  // scrape endpoint.
  //Runtime.getRuntime().addShutdownHook(new Thread(() -> scrapeEndpoint.stop(1)));

  //Create WF service stubs to connect to the front end service.
  WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(
         WorkflowServiceStubsOptions.newBuilder()
                 .setMetricsScope(scope) //set the metrics scope for the WorkflowServiceStubs
                 .build());

  //Create a Workflow service client which can be used to start, Signal, and Query Workflow Executions.
  WorkflowClient greetClient = WorkflowClient.newInstance(service,
         WorkflowClientOptions.newBuilder().build());

  //...
```

You can set up separate scrape endpoints in your Clients that you use to start your Workers and Workflow Executions. For more examples on how this is set across SDKs, see the metrics samples:

- [Java SDK Samples](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/metrics)
- [Go SDK Samples](https://github.com/temporalio/samples-go/tree/main/metrics)

In your Workers, you can set specific WorkerOptions for performance tuning, as described in the Worker Performance Guide.
With the scrape endpoints set, define your Prometheus scrape configuration and targets to receive the metrics data from the Temporal Cluster and Temporal SDKs.

### Prometheus configuration

Enable Prometheus to scrape the metrics from the endpoints defined in the Cluster and SDK configurations.

For example with the local docker-compose Temporal Cluster, you can create a separate container for Prometheus:

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

In this example, we use the Prometheus docker image and the default ports for the container, and set the path to a Prometheus configuration file for the docker container. For other ways to set your Prometheus configuration, see the [Prometheus Configuration documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

Configure your Prometheus setup to scrape metrics data from the Temporal Cluster and SDK Client target endpoints.

For example, in your local docker-compose Temporal Cluster, you can create a Prometheus configuration file (in this example, at ./deployment/prometheus/config.yml) to scrape metrics from targets set on the docker-compose Temporal Cluster, and SDK Clients from the previous examples:

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

In this example, we have a YAML configuration file setting Prometheus to scrape at 10 second interval, with static targets to listen for Cluster metrics on `host.docker.internal:8000` and SDK metrics on two targets `host.docker.internal:8077` and `host.docker.internal:8078` for `WorkflowServiceStubs` that can be used to create Workers and make Client API calls to start Workflow Executions, send Signals, Queries etc.
You can set up as many targets as required.
Note that these SDK metrics ports must be set in your application and are discussed in the [SDK Metrics](#sdkmetricssetup) section for details.

See [Prometheus configuration](https://prometheus.io/docs/prometheus/latest/configuration/configuration/) for more information.

To check whether you’re receiving your metrics data, start your local docker-compose Temporal Cluster with the configuration provided in the examples here) and go to

- http://localhost:8000/metrics - this is the port you’re exposing your Cluster metrics on. You should see all the server metrics emitted when you start up your local docker-compose Temporal Cluster.
- http://localhost:8077/metrics - this is the port you’re exposing your SDK metrics on. Depending on whether you have set this port on the Client that is starting your Worker or your Workflow Executions, the related metrics should show when you start your Worker or Workflow Execution.
- http://localhost:8078/metrics - this is the port you’re exposing your SDK metrics on. Depending on whether you have set this port on the Client that is starting your Worker or your Workflow Executions, the related metrics should show when you start your Worker or Workflow Execution.

You can also check your Prometheus targets statuses at http://localhost:9090/.

## Grafana configuration

With Prometheus set up, you can configure Grafana to use Prometheus as a datasource.

For example, in the modified local docker-compose Temporal Cluster setup described in the previous section, you can create a separate container for Grafana, and set it up to display metrics visualizations on port 8085.

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

In this example, we have set up Grafana without authorizations; this is not a good practice and is not recommended. See the [Grafana documentation](https://grafana.com/docs/grafana/latest/setup-grafana/) for details on how to customize your Grafana setup.

Set Prometheus as your datasource for Grafana at the source path defined in the configuration. You can do this either on the UI or in your Grafana deployment configuration.

In the example above, the data sources are defined in the deployment configuration at ./deployment/grafana/provisioning/datasource, for example, as:

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

Set up your dashboards in Grafana, using either the UI or configure your dashboards in your Grafana deployment on the server, as done in this example. Temporal also has a [repository of community-driven dashboards](https://github.com/temporalio/dashboards) that you can get started with.

When you create a new dashboard, add your Prometheus query to call specific metrics.
The [Temporal Cluster Metrics reference](/references/cluster-metrics) describes a few metrics and queries you can get started with.
For more details on configuring Grafana dashboards, see their [Grafana Dashboards documentation](https://grafana.com/docs/grafana/latest/dashboards/).

Once you have your dashboard set up, you can start experimenting with different samples provided in the Temporal samples repositories.
