---
id: metrics-integrations
title: Metrics integrations
sidebar_label: Metrics integrations
description: Integrating with the Temporal Cloud OpenMetrics endpoint.
keywords:
  - temporal cloud metrics configuration
  - configure metrics endpoint
  - temporal cloud observability
  - temporal cloud UI setup
  - grafana temporal integration
  - prometheus metrics endpoint
  - openmetrics endpoint
  - observability tools integration
  - openmetrics api
  - datadog temporal integration
tags:
  - Metrics
  - OpenMetrics
  - Observability
  - Temporal Cloud
---

import { CaptionedImage } from '@site/src/components';

Metrics can be exported from Temporal Cloud using the OpenMetrics endpoint. This document describes configuring integrations that have third party support or are based on open standards.
This document is for basic configuration only. For advanced concepts such as label management and high cardinality scenarios see the 
[general API reference](/cloud/metrics/openmetrics/api-reference).

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

Temporal Cloud OpenMetrics support is available in  [Public Preview](/evaluate/development-production-features/release-stages#public-preview).

:::

## Integrations

### Datadog

Datadog provides a serverless integration with the OpenMetrics endpoint. This integration will scrape metrics, store them in Datadog, and provides a default dashboard with some built in monitors. See the [integration page](https://docs.datadoghq.com/integrations/temporal-cloud-openmetrics/) for more details.

### Grafana Cloud

Grafana provides a serverless integration with the OpenMetrics endpoint for Grafana Cloud. This integration will scrape metrics, store them in Grafana Cloud, and provides a default dashboard
for visualizing the metrics in Grafana Cloud. See the [integration page](https://grafana.com/docs/grafana-cloud/monitor-infrastructure/integrations/integration-reference/integration-temporal/)
 for more details.

### ClickStack

ClickHouse provides an integration with the OpenMetrics endpoint for ClickStack. This integration uses an OpenTelemetry collector to read from the OpenMetrics endpoint, ingest data into ClickHouse, and
includes a default dashboard to visualize the data with HyperDX. See the [integration page](https://clickhouse.com/docs/use-cases/observability/clickstack/integrations/temporal-metrics) for more details.

### New Relic

New Relic integrates with Temporal Cloud via the infrastructure agent using a flex integration that pull data from the OpenMetrics endpoint. See the [integration page](https://docs.newrelic.com/docs/infrastructure/host-integrations/host-integrations-list/temporal-cloud-integration/) for more details.

### Prometheus \+ Grafana

Self hosted Prometheus can be used to scrape the OpenMetrics endpoint.

1. Add a new scrape job for the OpenMetrics endpoint with your [API key](/cloud/metrics/openmetrics/api-reference#creating-api-keys).

```yaml
scrape_configs:
  - job_name: 'temporal-cloud'
    scrape_interval: 60s
    scrape_timeout: 30s
    honor_timestamps: true
    scheme: https
    authorization:
      type: Bearer
      credentials: '<API_KEY>'
    static_configs:
      - targets: ['metrics.temporal.io']
    metrics_path: '/v1/metrics'
```

2. Import the [Grafana dashboard](https://github.com/grafana/jsonnet-libs/blob/master/temporal-mixin/dashboards/temporal-overview.json) and configure your Prometheus datasource.

### OpenTelemetry Collector Configuration

Collect metrics with a self-hosted OpenTelemetry Collector to ingest into the system of your choosing.

1. Add a new prometheus receiver for the OpenMetrics endpoint with your [API key](/cloud/metrics/openmetrics/api-reference#creating-api-keys).

```yaml
receivers:
  prometheus:
    config:
      scrape_configs:
      - job_name: 'temporal-cloud'
        scrape_interval: 60s
        scrape_timeout: 30s
        honor_timestamps: true
        scheme: https
        authorization:
          type: Bearer
          credentials_file: <API_KEY_FILE>
        static_configs:
          - targets: ['metrics.temporal.io']
        metrics_path: '/v1/metrics'

processors:
  batch:

exporters:
  otlphttp:
    endpoint: <ENDPOINT>

service:
  pipelines:
    metrics:
      receivers: [prometheus]
      processors: [batch]
      exporters: [otlphttp]
```

:::info

Examples for these integrations and more are [here](https://github.com/temporal-community/cloud-metrics-scrape-examples).

:::
