---
id: how-to-monitor-temporal-cloud-metrics
title: How to monitor Temporal Cloud metrics
sidebar_label: Cloud metrics
description: Configure and track performance metrics for Temporal Cloud.
tags:
  - how-to
---

Beyond the [metrics](/application-development/observability#metrics) provided by the Temporal SDKs, some key metrics exist only in Temporal Cloud.
You can use your own observability tool to query an endpoint and review Namespace metrics.

To ensure security of your metrics, a CA certificate dedicated to observability is required.
Only clients that use certificates signed by that CA, or that chain up to the CA, can query the metrics endpoint.
For more information about CA certificates in Temporal Cloud, see [Certificate requirements](https://docs.temporal.io/cloud/how-to-manage-certificates-in-temporal-cloud#certificate-requirements).

<!--- How to configure a metrics endpoint in Temporal Cloud using Temporal Cloud UI --->

## Configure a metrics endpoint using Temporal Cloud UI

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

After the page refreshes, the new metrics endpoint appears below **Endpoint**.
Use the endpoint to configure your observability tool.

<!--- How to configure a metrics endpoint in Temporal Cloud using tcld --->

## Configure a metrics endpoint using tcld

To add a certificate to a metrics endpoint, use [`tcld account metrics accepted-client-ca add`](/cloud/tcld/account/metrics/accepted-client-ca/add).

To enable a metrics endpoint, use [`tcld account metrics enable`](/cloud/tcld/account/metrics/enable).

To disable a metrics endpoint, use [`tcld account metrics disable`](/cloud/tcld/account/metrics/disable).

## Available performance metrics

Temporal tracks the following metrics for your various Namespaces.

- temporal_cloud_v0_frontend_service_error_count
- temporal_cloud_v0_frontend_service_request_count
- temporal_cloud_v0_poll_success_count
- temporal_cloud_v0_poll_success_sync_count
- temporal_cloud_v0_poll_timeout_count
- temporal_cloud_v0_service_latency_bucket
- temporal_cloud_v0_service_latency_count
- temporal_cloud_v0_service_latency_sum
- temporal_cloud_v0_state_transition_count
- temporal_cloud_v0_total_action_count
- temporal_cloud_v0_workflow_cancel_count
- temporal_cloud_v0_workflow_continued_as_new_count
- temporal_cloud_v0_workflow_failed_count
- temporal_cloud_v0_workflow_success_count
- temporal_cloud_v0_workflow_terminate_count
- temporal_cloud_v0_workflow_timeout_count

Metrics for all Namespaces in your account are available from the metrics endpoint.
The `temporal_namespace` label identifies the Namespace that is associated with each metric so that each user can build their own dashboard to meet their needs.

Metrics lag real-time performance by approximately one minute.

We retain raw metrics for seven days.
