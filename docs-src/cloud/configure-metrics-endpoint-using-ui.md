---
id: configure-metrics-endpoint-using-ui
title: How to configure a metrics endpoint using Temporal Cloud UI
description: You can configure a metrics endpoint in your Temporal Cloud Account settings.
sidebar_label: Configure via UI
tags:
  - How-to archetype
  - Observability concept
  - Temporal Cloud
---

:::note

To view and manage third-party integration settings, your user account must have the Global Admin [Role](https://docs.temporal.io/cloud/#account-level-roles).

:::

To assign a certificate and generate your metrics endpoint, follow these steps:

1. In Temporal Cloud UI, click **Settings**.
1. On the **Settings** page, click **Integrations**.
1. In the **Observability** card, click **Configure Observability**.
   (If observability is already configured, the **Edit** link appears instead.)
1. In **Certificates**, paste a base64-encoded CA certificate PEM block.
1. Click **Generate endpoint**.

After the page refreshes, the new metrics endpoint appears below **Endpoint**, in the form `https://<account-id>.tmprl.cloud/prometheus`.
Use the endpoint to configure your observability tool—for example, [Grafana](https://grafana.com/) with [this dashboard](https://github.com/temporalio/dashboards/blob/master/cloud/temporal_cloud.json).
For more information, see [Set up Grafana with Temporal Cloud](/kb/prometheus-grafana-setup-cloud).

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
          "temporal_account": "a2dd6",
          "temporal_namespace": "mynamespace.a2dd6",
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
