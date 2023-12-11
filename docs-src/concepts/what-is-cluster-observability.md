---
id: what-is-cluster-obervability
title: What is Cluster observability?
sidebar_label: Monitoring and observation
description: Monitor and observe Cluster performance with metrics emitted by your self-hosted Temporal Cluster or by Temporal Cloud.
tags:
  - explanation
---

You can monitor and observe performance with metrics emitted by your self-hosted Temporal Cluster or by Temporal Cloud.

Temporal emits metrics by default in a format that is supported by Prometheus.
Any metrics software that supports the same format can be used.
Currently, we test with the following Prometheus and Grafana versions:

- **Prometheus >= v2.0**
- **Grafana >= v2.5**

Temporal Cloud emits metrics through a Prometheus HTTP API endpoint, which can be directly used as a Prometheus data source in Grafana or to query and export Cloud metrics to any observability platform.

For details on Cloud metrics and setup, see the following:

- [Temporal Cloud metrics reference](/cloud/metrics-intro)
- [Set up Grafana with Temporal Cloud observability to view metrics](/cloud/prometheus-grafana-setup#data-sources-configuration-for-temporal-cloud-and-sdk-metrics-in-grafana)

On self-hosted Temporal Clusters, expose Prometheus endpoints in your Cluster configuration and configure Prometheus to scrape metrics from the endpoints.
You can then set up your observability platform (such as Grafana) to use Prometheus as a data source.

For details on self-hosted Cluster metrics and setup, see the following:

- [Temporal Cluster OSS metrics reference](/references/cluster-metrics)
- [Set up Prometheus and Grafana to view SDK and self-hosted Cluster metrics](/self-hosted/prometheus-grafana-setup#prometheus-and-grafana-setup)
