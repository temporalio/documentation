---
id: monitoring
title: Monitor Temporal Platform metrics
sidebar_label: Monitoring
description: Monitor and health check a self-hosted Temporal Platform using Prometheus, StatsD, and M3 to track Temporal Service, Client, and Worker metrics for performance and issue troubleshooting.
slug: /self-hosted-guide/monitoring
toc_max_heading_level: 4
keywords:
  - cluster
  - grafana
  - how-to
  - prometheus
tags:
  - Temporal Service
  - Self-hosting
  - Observability
---

The Temporal Service and SDKs emit metrics that can be used to monitor performance and troubleshoot issues. 
You can relay these metrics to any monitoring and observability platform.

This guide will provide an example of configuring [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/) to work with the observability metrics emitted from Temporal.
This solution can work on its own, or serve as a baseline for you to further customize and integrate with other observability tooling.
For example, it is also possible to use the [OpenTelemetry Collector](https://temporal.io/code-exchange/temporal-opentelemetry) in your stack instead of scraping metrics directly with Prometheus, or [Datadog](#datadog) as a frontend instead of Grafana.

This configuration assumes that you have [Docker](https://www.docker.com/) installed and are running a [Temporal dev server](https://temporal.io/setup/start-development-server) via the CLI. 

## Prometheus

This section discusses exporting metrics from Temporal SDKs, and setting up Prometheus to collect metrics on Temporal Service, Temporal Client, and Temporal Worker performance.

The Temporal Service and SDKs emit all metrics by default.
However, you must enable Prometheus in your application code (using the Temporal SDKs) and your Temporal Service configuration to collect the metrics emitted from your SDK and Temporal Service.

First, you'll need to create a `prometheus.yml` configuration file with some target ports to collect metrics from.
Here is a sample with one Temporal Service metrics target and two Temporal Worker (SDK) metrics targets:

```
global:
 scrape_interval: 10s
scrape_configs:
 - job_name: 'temporalmetrics'
   metrics_path: /metrics
   scheme: http
   static_configs:
     # Temporal Service metrics target
     - targets:
         - 'host.docker.internal:8000'
       labels:
         group: 'server-metrics'

     # Local app targets (set in SDK code)
     - targets:
         - 'host.docker.internal:8077'
         - 'host.docker.internal:8078'
       labels:
         group: 'sdk-metrics'
```

In this example, Prometheus is configured to scrape at 10-second intervals and to listen for Temporal Service metrics on `host.docker.internal:8000` and SDK metrics on two targets, `host.docker.internal:8077` and `host.docker.internal:8078`.
The `8077` and `8078` ports must be set on `WorkflowServiceStubs` in your application code with your preferred SDK -- there is an example of this in the next section.
You can set up as many targets as required.

:::info

For further Prometheus configuration options, refer to the [Prometheus documentation](https://prometheus.io/docs/prometheus/latest/configuration/configuration/).

:::

You can use Docker to run the official Prometheus image with this configuration:

```bash
docker run -p 9090:9090 -v /path/to/prometheus.yml /etc/prometheus/prometheus.yml prom/prometheus
```

Next, launch your Temporal dev server from the CLI with an additional `--metrics-port 8000` parameter:

```bash
temporal server start-dev --metrics-port 8000
```

:::info

Refer to the [Temporal Cluster configuration reference](/references/configuration#global) to expose metrics from a production service.

:::

You should now have both Prometheus and a Temporal Service running locally, with Temporal providing Service metrics to Prometheus.
Next, you'll want to configure SDK metrics as well.

### SDK metrics setup

SDK metrics are emitted by Temporal Workers and other Clients, and must be configured in your application code.
The Metrics section in the Observability guide details how to create hooks for all supported SDKs:

- [Go](/develop/go/observability#metrics)
- [Java](/develop/java/observability#metrics)
- [PHP](/develop/php/observability)
- [Python](/develop/python/observability#metrics)
- [TypeScript](/develop/typescript/observability#metrics)
- [.NET](/develop/dotnet/observability#metrics)
- [Ruby](/develop/ruby/observability#metrics)

For end-to-end examples of how to expose metrics from each SDK, see the metrics samples:

- [Go SDK Sample](https://github.com/temporalio/samples-go/tree/main/metrics)
- [Java SDK Sample](https://github.com/temporalio/samples-java/tree/main/core/src/main/java/io/temporal/samples/metrics)
- [Python SDK Sample](https://github.com/temporalio/samples-python/tree/main/prometheus)
- [TypeScript SDK Sample](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry)
- [.NET SDK Sample](https://github.com/temporalio/samples-dotnet/tree/main/src/OpenTelemetry)

Some of these may require you to set different metrics port numbers based on the Prometheus example here, which is configured to scrape port `8077` and `8078` by default.
Follow the instructions from each of the samples to run Workflows and begin emitting metrics.
This will allow you to populate a dashboard in the next section and understand how to further customize Temporal observability for your needs.

### Verifying Prometheus configuration

Once your Workflows are running and emitting metrics, you can visit [http://localhost:9090/targets](http://localhost:9090/targets) on your local Prometheus instance to verify that it is able to scrape the provided endpoints.

![Prometheus scrape targets](/img/observability/prometheus-targets.png)

This example shows a response from the server metrics endpoint, provided by the Temporal dev server, and two SDK metrics endpoints, as defined in the Prometheus configuration.
To create this example, we used the Go and Python metrics samples, running on port 8077 and 8088 respectively.
If you are not pushing data to exactly 3 metrics endpoints, your environment may be different.

Next, you can visit the [local Prometheus query endpoint](http://localhost:9090/query) to manually run [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/) queries on your exported metrics, or proceed to the next section to configure Grafana to generate dashboards from those metrics.

## Grafana

With [Prometheus](#prometheus) configured, deploy Grafana as a metrics frontend, and configure it to use Prometheus as a data source.

As before, you can use Docker to run the official Grafana image:

```bash
docker run -d -p 3000:3000 grafana/grafana-enterprise
```

This will deploy a Grafana instance with a default username and password of `admin`/`admin`.
In production, you would want to [configure authentication](https://grafana.com/docs/grafana/latest/setup-grafana/configure-security/configure-authentication/generic-oauth/) and control port access to Grafana.

:::info

For more information on how to customize your Grafana setup, see the [Grafana documentation](https://grafana.com/docs/grafana/latest/setup-grafana/).

:::

Next, configure Grafana to use Prometheus as the data source.
To do this, click on "Add new data source" from the "Connections" menu in the Grafana sidebar, and add Prometheus from the list.

You will be prompted to add additional configuration parameters.
If you are following this guide using Docker, use `http://host.docker.internal:9090` as the Prometheus address.
This is a [DNS name provided by Docker Desktop](https://docs.docker.com/desktop/features/networking/#use-cases-and-workarounds) which resolves to the internal IP address used by the host machine, and allows you to connect applications across Docker containers without additional configuration rules.
This is the only parameter you will need to set for your Prometheus configuration.
After providing it, scroll down to the "Save and Test" button, and you can validate Prometheus as a data source for this Grafana instance.

![Grafana data sources](/img/observability/grafana-data-sources.png)

In this example, Grafana is set to pull metrics from Prometheus at the port 9090, as defined in the Prometheus configuration.

Now, you'll just need to add some of our provided dashboards for visualizing Temporal metrics.

### Dashboard setup

We provide community-driven Grafana dashboards that can be used for monitoring Temporal Server and SDK metrics in a [dashboards](https://github.com/temporalio/dashboards/) repo.
Follow the instructions in that repo's README to import the dashboards to Grafana.

This way, you can create at least one dashboard for monitoring server metrics:

![Grafana server metrics](/img/observability/grafana-server-metrics.png)

And at least one other dashboard for monitoring SDK metrics:

![Grafana SDK metrics](/img/observability/grafana-sdk-metrics.png)

:::info

You can provide additional queries in your dashboard to report other data as needed.
For more details on configuring Grafana dashboards, see the [Grafana Dashboards documentation](https://grafana.com/docs/grafana/latest/dashboards/).

:::

From here, you can configure Grafana [Alerts](https://grafana.com/docs/grafana/latest/alerting/) for any monitored parameters, add custom metrics to your Temporal SDK code, and use these observability features to help scale your Temporal deployment.
Refer to the [Cluster metrics](/references/cluster-metrics) and [SDK metrics](/references/sdk-metrics) reference for more.

## Configuring Temporal Service health checks {#health-checks}

The [Frontend Service](/temporal-service/temporal-server#frontend-service) supports TCP or [gRPC](https://github.com/grpc/grpc/blob/875066b61e3b57af4bb1d6e36aabe95a4f6ba4f7/src/proto/grpc/health/v1/health.proto#L45) health checks on port 7233.

If you use [Nomad](https://www.nomadproject.io/) to manage your containers, the [check stanza](https://developer.hashicorp.com/nomad/docs/job-specification/check) would look like this for TCP:

```
service {
  check {
    type     = "tcp"
    port     = 7233
    interval = "10s"
    timeout  = "2s"
  }
```

or like this for gRPC (requires Consul ≥ `1.0.5`):

```
service {
  check {
    type         = "grpc"
    port         = 7233
    interval     = "10s"
    timeout      = "2s"
  }
```

## Installing via Helm Chart

If you are installing and running Temporal via [Helm chart](https://github.com/temporalio/helm-charts), you can also [provide additional parameters](https://github.com/temporalio/helm-charts?tab=readme-ov-file#exploring-metrics-via-grafana) to populate and explore a Grafana dashboard out of the box.

## Datadog {#datadog}

Datadog has a Temporal integration for collecting Temporal Service metrics.
Once you've [configured Prometheus](#prometheus), you can configure the [Datadog Agent](https://docs.datadoghq.com/integrations/temporal/).

If you are using [Temporal Cloud](/cloud/overview), you can also [integrate Datadog directly](https://docs.datadoghq.com/integrations/temporal-cloud/), without needing to use Prometheus.
