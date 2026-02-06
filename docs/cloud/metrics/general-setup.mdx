---
id: general-setup
title: General observability setup with metrics
sidebar_label: General setup
description: Learn how to configure a metrics endpoint in Temporal Cloud using the UI or tcld CLI, assign certificates, and integrate with observability tools like Grafana.
keywords:
  - temporal cloud metrics configuration
  - configure metrics endpoint
  - temporal cloud observability
  - tcld CLI guide
  - temporal cloud UI setup
  - assign metrics certificate
  - grafana temporal integration
  - prometheus metrics endpoint
  - observability tools integration
  - manage temporal cloud settings
  - tcld account metrics commands
tags:
  - Metrics
  - Observability
  - Temporal Cloud
---

import { RelatedReadContainer, RelatedReadItem } from '@site/src/components';

You will learn how to do the following:

- [Configure an endpoint using the UI](#configure-via-ui)
- [Configure an endpoint using tcld](#configure-via-cli-tcld)
- [Query for metrics with a PromQL endpoint](#query-promql)

## Configure using the UI {#configure-via-ui}

**How to configure a metrics endpoint using Temporal Cloud UI**

:::note

To view and manage third-party integration settings, your user account must have the Account Owner or Global Admin [role](/cloud/users#account-level-roles).

:::

To assign a certificate and generate your metrics endpoint, follow these steps:

1. Log in to Temporal Cloud UI with an Account Owner or Global Admin [role](/cloud/users#account-level-roles).
2. Go to **Settings** and select **Observability**.
4. Add your root CA certificate (.pem) and save it.
   Note that if an observability endpoint is already set up, you can append your root CA certificate here to use the generated observability endpoint in your observability tool.
5. To test your endpoint, run the following command on your host:
   ```
   curl -v --cert <path to your client-cert.pem> --key <path to your client-cert.key> "<your generated Temporal Cloud prometheus_endpoint>/api/v1/query?query=temporal_cloud_v0_state_transition_count"
   ```
   If you have Workflows running on a Namespace in your Temporal Cloud instance, you should see some data as a result of running this command.

After the page refreshes, the new metrics endpoint appears below **Endpoint**, in the form `https://<account-id>.tmprl.cloud/prometheus`.
Use the endpoint to configure your observability tool.
For example, if you use Grafana, see [Grafana data sources configuration](/cloud/metrics/prometheus-grafana#grafana-data-sources-configuration).

You can also query via the [Prometheus HTTP API](https://prometheus.io/docs/prometheus/latest/querying/api/) at URLs like:

```
https://<account-id>.tmprl.cloud/prometheus/api/v1/query?query=temporal_cloud_v0_state_transition_count
```

For example:

```
$ curl --cert client.pem --key client-key.pem "https://<account-id>.tmprl.cloud/prometheus/api/v1/query?query=temporal_cloud_v0_state_transition_count" | jq .
{
  "status": "success",
  "data": {
    "resultType": "vector",
    "result": [
      {
        "metric": {
          "__name__": "temporal_cloud_v0_state_transition_count",
          "__rollup__": "true",
          "operation": "WorkflowContext",
          "temporal_account": "your-account",
          "temporal_namespace": "your-namespace.your-account-is",
          "temporal_service_type": "history"
        },
        "value": [
          1672347471.2,
          "0"
        ]
      },
      ...
}
```

## Configure endpoint using tcld {#configure-via-cli-tcld}

**How to configure a metrics endpoint using the tcld CLI.**

To add a certificate to a metrics endpoint, use [`tcld account metrics accepted-client-ca add`](/cloud/tcld/account#add).

To enable a metrics endpoint, use [`tcld account metrics enable`](/cloud/tcld/account#enable).

To disable a metrics endpoint, use [`tcld account metrics disable`](/cloud/tcld/account#disable).

For more information, see [tcld account metrics command](/cloud/tcld/account#metrics).

## Query for metrics with a PromQL endpoint {#query-promql}

Temporal Cloud emits metrics in a Prometheus-supported format.
Prometheus is an open-source toolkit for alerting and monitoring.
The Temporal Service exposes Cloud metrics with a [Prometheus HTTP API endpoint](https://prometheus.io/docs/prometheus/latest/querying/api/).
Temporal Cloud metrics provide a compatible data source for visualizing, monitoring, and observability platforms.

You can use functions like [rate](https://prometheus.io/docs/prometheus/latest/querying/functions/#rate) or [increase](https://prometheus.io/docs/prometheus/latest/querying/functions/#increase) to calculate the rate of increase for a Temporal Cloud metric:

```
rate(temporal_cloud_v0_frontend_service_request_count[$__rate_interval])
```

Or you might use Prometheus to calculate average latencies or histogram quartiles:

```
# Average latency
rate(temporal_cloud_v0_service_latency_sum[$__rate_interval])
/ rate(temporal_cloud_v0_service_latency_count[$__rate_interval])

# Approximate 99th percentile latency broken down by operation
histogram_quantile(0.99, sum(rate(temporal_cloud_v0_service_latency_bucket[$__rate_interval])) by (le, operation))
```

Metrics are scraped every 30 seconds and exposed to the metrics endpoint with a 1-minute lag.\
The endpoint returns data with a 15-second resolution, which results in displaying the same value twice.

Set up Grafana with Temporal Cloud observability to view metrics by creating or getting your Prometheus endpoint for Temporal Cloud metrics and enabling SDK metrics.

<RelatedReadContainer>
  <RelatedReadItem path="/cloud/metrics/prometheus-grafana" text="How to set up Grafana with Temporal Cloud observability" archetype="feature-guide" />
  <RelatedReadItem path="/cloud/worker-health" text="How to monitor Worker Health with Temporal Cloud Metrics" archetype="feature-guide" />
  <RelatedReadItem path="/cloud/service-health" text="How to monitor Service Health with Temporal Cloud Metrics" archetype="feature-guide" />
</RelatedReadContainer>
