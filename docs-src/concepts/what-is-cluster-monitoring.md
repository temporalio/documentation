---
id: what-is-cluster-monitoring
title: Cluster monitoring and observation
sidebar_label: Cluster monitoring and observation
description: Monitor and observe performance using the metrics emitted by your self-hosted Temporal Cluster or by Temporal Cloud.
tags:
  - term
  - explanation
---

You can monitor and observe performance by using the metrics emitted by your self-hosted Temporal Cluster or by Temporal Cloud.

Temporal emits metrics by default in a format that is supported by Prometheus.
Any metrics software that supports the same format can be used.
Currently, we test with the following Prometheus and Grafana versions:

- **Prometheus >= v2.0**
- **Grafana >= v2.5**

Temporal Cloud emits metrics through a Prometheus HTTP API endpoint which can be directly used as a Prometheus data source in Grafana or to query and export Cloud metrics to any observability platform.

On self-hosted Temporal Clusters, expose Prometheus endpoints in your Cluster configuration and configure Prometheus to scrape metrics from the endpoints. You can then set up your observability platform (such as Grafana) to use this as a datasource.

Metrics reference:

- [Temporal Cloud metrics reference](/cloud/how-to-monitor-temporal-cloud-metrics)
- [Temporal Cluster OSS metrics reference](/references/cluster-metrics)

For details on setting up metrics on Temporal Cloud and self-hosted Clusters, see:

- [Set up Grafana with Temporal Cloud observability to view metrics](/kb/prometheus-grafana-setup-cloud#data-sources-configuration-for-temporal-cloud-and-sdk-metrics-in-grafana)
- [Set up Prometheus and Grafana to view SDK and self-hosted Cluster metrics](/kb/prometheus-grafana-setup)
