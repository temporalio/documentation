---
id: api-reference
title: OpenMetrics API reference
sidebar_label: API reference
description: Detailed API documentation for the Temporal Cloud OpenMetrics endpoint.
keywords:
  - temporal cloud metrics configuration
  - configure metrics endpoint
  - temporal cloud observability
  - tcld CLI guide
  - temporal cloud UI setup
  - grafana temporal integration
  - prometheus metrics endpoint
  - openmetrics endpoint
  - observability tools integration
  - openmetrics api
tags:
  - Metrics
  - OpenMetrics
  - Observability
  - Temporal Cloud
---

import { CaptionedImage } from '@site/src/components';

The Temporal Cloud OpenMetrics API provides actionable operational metrics about your Temporal Cloud deployment. This is a scrapable HTTP API that returns metrics in OpenMetrics format, suitable for ingestion by Prometheus-compatible monitoring systems.

:::tip SUPPORT, STABILITY, and DEPENDENCY INFO

Temporal Cloud OpenMetrics support is available in  [Public Preview](/evaluate/development-production-features/release-stages#public-preview).

:::

## Available Metrics Reference

Metrics descriptions are also available programmatically via the `/v1/descriptors` endpoint. You can see the Metrics Reference for a list of available metrics.

## Authentication

Temporal uses API keys for integrating with the OpenMetrics endpoint. Applications must be authorized and authenticated before they can access metrics from Temporal Cloud.

An API key is owned by a Service Account and inherits the permissions granted to the owner.

### Creating API Keys

API keys can be created using the [Temporal Cloud UI](https://cloud.temporal.io):

1. Navigate to Settings → Service Accounts  
2. Create a service account with **"Metrics Read-Only"** Account Level Role
3. Generate an API key within the service account

:::info

See the [docs](https://docs.temporal.io/cloud/api-keys#serviceaccount-api-keys) for more details on generating API keys.

:::

### Using API Keys

All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.

```shell
curl -H "Authorization: Bearer <API_KEY>" https://metrics.temporal.io/v1/metrics
```

## Object Model

The object model for the Metrics API follows the [OpenMetrics](https://openmetrics.io/) standard.

### Metrics

A metric is a numeric attribute measured at a specific point in time, labeled with contextual metadata gathered at the point of instrumentation.

### Metric Types

All Temporal Cloud metrics are exposed as *gauges* in OpenMetrics format, but represent different measurement types:

* **Rate metrics**: Pre-computed per-second rates with delta temporality (e.g., `temporal_cloud_v1_workflow_success_count` \- workflows completed per second)  
* **Value metrics**: Current or instantaneous values (e.g., `temporal_cloud_v1_approximate_backlog_count` \- current number of tasks in queue)

The list of metrics and their labels are available via the [List Descriptors](/cloud/metrics/openmetrics/api-reference#list-metric-descriptors) endpoint or in the [Metrics Reference](/cloud/metrics/openmetrics/metrics-reference).

### Labels

A label is a key-value attribute associated with a metric data point. Labels can be used to filter or aggregate metrics.

Common labels include:

* `temporal_namespace`: The Temporal namespace  
* `temporal_account`: The Temporal account  
* `region`: The cloud region where the metric originated  
* `temporal_workflow_type`: The workflow type (where applicable)  
* `temporal_task_queue`: The task queue name (where applicable)

Each metric has its own set of applicable labels. See the Metrics Reference for complete details.

### Metric Family

A [Metric Family](https://github.com/prometheus/OpenMetrics/blob/main/specification/OpenMetrics.md#metricfamily) may have zero or more metrics.  The set of metrics returned will vary based on actual system activity.  Metrics only appear in a Metric Family if they were reported during the aggregation window.

## Client Considerations

### Rate Limiting

To protect the stability of the API and keep it available to all users, Temporal employs multiple safeguards.

When a rate limit is breached, an HTTP `429 Too Many Requests` error is returned with the following headers:

| Header | Description |
| ----- | ----- |
| `Retry-After` | The time in seconds until the rate limit window resets |

#### Rate Limit Scopes
:::note
Rate limit scopes are subject to change.

:::

| Scope | Limit |
| ----- | ----- |
| Account | 180 requests per hour |

### Response Completeness

The `X-Completeness` header indicates whether the response contains all available data:

* `complete`: The response contains all metrics requested  
* `limited`: Response truncated due to size limits (30k metric data points max). Use namespace or metric filtering to reduce the response size.
* `unknown`: Completeness cannot be determined (possibly due to regional issues or timeouts). Clients are encouraged to retry.

### Retry Logic

Implement retry logic in your client to gracefully handle transient API failures. Use exponential backoff with jitter to avoid retry storms with reasonable retry intervals to avoid reaching rate limits.

### Data Latency

Metric data points are available for query within 2 minutes of their origination. This is in line with the freshest metrics [available from any major service provider](https://docs.datadoghq.com/integrations/guide/cloud-metric-delay/). This latency should be accounted for when setting up monitoring alerts.

## Endpoints

:::info

All endpoints are served from: `metrics.temporal.io`

:::

### Get Metrics

`GET /v1/metrics`

Returns metrics in OpenMetrics format suitable for scraping by Prometheus-compatible systems.

#### Timestamp Offset

To account for metric data latency, this endpoint returns metrics from the current timestamp minus a fixed offset.  The current offset is 2 minutes rounded down to the start of the minute. To accommodate this offset, the timestamps in the response should be honored when importing the metrics. For example, in Prometheus this can be controlled using the `honor\_timestamps` flag.

#### Query Parameters

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `namespaces` | string array | Filter to specific Namespaces. Supports wildcards (e.g., `production-*`) |
| `metrics` | string array | Filter to specific metrics |

#### Response Headers

| Header | Description |
| ----- | ----- |
| `X-Completeness` | Indicates the response status: `complete`, `limited`, or `unknown` |
| `Content-Type` | `application/openmetrics-text` |

:::info Example

Request:

```shell
curl -H "Authorization: Bearer <API_KEY>" \
  "https://metrics.temporal.io/v1/metrics?namespaces=production-*"
```

Response:
```
# TYPE temporal_cloud_v1_workflow_success_count gauge
# HELP temporal_cloud_v1_workflow_success_count The number of successful workflows per second
temporal_cloud_v1_workflow_success_count{temporal_namespace="production",temporal_workflow_type="payment-processing",region="aws-us-west-2"} 42.0 1609459200000
temporal_cloud_v1_workflow_success_count{temporal_namespace="production",temporal_workflow_type="order-fulfillment",region="aws-us-west-2"} 128.0 1609459200000

# TYPE temporal_cloud_v1_approximate_backlog_count gauge  
# HELP temporal_cloud_v1_approximate_backlog_count Approximate number of tasks in a task queue
temporal_cloud_v1_approximate_backlog_count{temporal_namespace="production",temporal_task_queue="critical-queue",task_type="workflow", region="aws-us-west-2"} 15.0 1609459200000
```

:::

#### Summary of Best Practices

* *Honor timestamps*: Set `honor_timestamps: true` in Prometheus  
* *Scrape interval*: Use 30 or 60 second intervals  
* *Timeout*: Set scrape timeout to 10 seconds for large responses  
* *Filtering*: Use query parameters to reduce response size

### List Metric Descriptors

`GET /v1/descriptors`

Lists all metric descriptors including metadata, data types, and available dimensions (a.k.a. labels).

#### Query Parameters

| Parameter | Type | Description |
| ----- | ----- | ----- |
| `limit` | integer | Page size (1-100, default: 100\) |
| `offset` | integer | Page offset |

:::info Example

Request:

```shell
curl -H "Authorization: Bearer <API_KEY>" \
  "https://metrics.temporal.io/v1/descriptors"
```

Response:

```json
{
  "meta": {
    "pagination": {
      "total": 35,
      "limit": 100,
      "offset": 0
    }
  },
  "descriptors": [
    {
      "name": "temporal_cloud_v1_workflow_success_count",
      "help": "The number of successful workflows per second",
      "dimensions": [
        "temporal_namespace",
        "temporal_workflow_type", 
        "temporal_task_queue",
        "region"
      ]
    }
  ]
}
```

:::

## Managing High Cardinality

:::caution

High-cardinality labels like `temporal_task_queue` and `temporal_workflow_type` can significantly increase metric volume and impact performance of your monitoring system. 

:::

### Cardinality Estimation

To estimate your metric cardinality and see if this is an issue:

```
Total series = Base metrics × Namespaces × Task queues × Workflow types
```

Example:

* 6 workflow metrics with both labels  
* 10 namespaces  
* 50 task queues  
* 20 workflow types  
* \= 6 × 10 × 50 × 20 \= 60,000 time series

:::note

60,000 time series in the above example results in exceeding the 30,000 data points per scrape limit.

:::

If the cardinality is too high or you are hitting API limits, consider the following strategies.

### Filtering at Scrape Time

You can isolate only the metrics/namespaces you need.  For example, the following shows examples of filtering by modifying the `metrics_path.`

```shell
# Only specific namespaces matching the wildcard pattern
/v1/metrics?namespaces=production-*

# Only specific metrics
/v1/metrics?metrics=temporal_cloud_v1_workflow_success_count

# Combined filtering
/v1/metrics?namespaces=prod-*&metrics=temporal_cloud_v1_approximate_backlog_count
```

:::info

In Prometheus, the `params` config can be set to match the same behavior as above.

```yaml
scrape_configs:
- job_name: 'temporal-cloud'
  ...
  static_configs:
    - targets: ['metrics.temporal.io']
  metrics_path: '/v1/metrics'
  params:
    namespaces: ['prod-*']
    metrics: ['temporal_cloud_v1_approximate_backlog_count']

```

:::


### Label Management

#### Prometheus

If using Prometheus, you can configure it to drop metrics with a specific label or even rename specific label values to reduce the cardinality.

```yaml
metric_relabel_configs:
# Consolidate non-critical task queues
- source_labels: [temporal_task_queue]
  regex: '(critical-queue|payment-queue)'
  target_label: __tmp_keep_original
  replacement: 'true'
  
- source_labels: [__tmp_keep_original]
  regex: ''
  target_label: temporal_task_queue
  replacement: 'other'
  
- regex: '__tmp_keep_original'
  action: labeldrop
```

#### OpenTelemetry Collector

To accomplish the same as Prometheus, a filter can be used in the collector along with any other processors.

```
processors:
  filter:
    metrics:
      include:
        match_type: regexp
        expressions:
          # Only keep metrics with critical-queue or payment-queue
          - Label("temporal_task_queue") == nil or IsMatch(Label("temporal_task_queue"), "^(critical-queue|payment-queue)$")
```

### Monitoring Cardinality

Cardinality can be monitored using this PromQL query.

```shell
# Count the total number of series
count({__name__=~"temporal_cloud_v1_.*"})

# Count the total number of series by metric
count({__name__=~"temporal_cloud_v1_.*"}) by (__name__)
```

## API Limits

| Limit | Impact | Mitigation |
| ----- | ----- | ----- |
| 30k total datapoints per scrape | Response may be truncated | Use namespace/metric filtering |
| 180 requests per account per hour (~3 requests per minute) | HTTP 429 returned | Set appropriate scrape interval of 30-60s |
