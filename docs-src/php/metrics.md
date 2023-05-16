---
id: metrics
title: How to emit metrics
description: Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
sidebar_label: Metrics
tags:
  - guide-context
---

Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
For a complete list of metrics capable of being emitted, see the [SDK metrics reference](/references/sdk-metrics).

Metrics can be scraped and stored in time series databases, such as:

- [Prometheus](https://prometheus.io/docs/introduction/overview/)
- [M3db](https://m3db.io/docs/)
- [statsd](https://github.com/statsd/statsd)

Temporal also provides a dashboard you can integrate with graphing services like [Grafana](https://grafana.com/docs/). For more information, see:

- Temporal's implementation of the [Grafana dashboard](https://github.com/temporalio/dashboards)
- [How to export metrics in Grafana](https://github.com/temporalio/helm-charts#exploring-metrics-via-grafana)
