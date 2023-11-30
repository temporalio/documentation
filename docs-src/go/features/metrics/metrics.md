---
id: metrics
title: How to emit metrics
description: Each Temporal SDK is capable of emitting an optional set of metrics from either the Client or the Worker process.
sidebar_label: Metrics
tags:
  - developer-guide-doc-type
  - go sdk
  - logging and metrics
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

To emit metrics from the Temporal Client in Go, create a [metrics handler](https://pkg.go.dev/go.temporal.io/sdk/internal/common/metrics#Handler) from the [Client Options](https://pkg.go.dev/go.temporal.io/sdk@v1.15.0/internal#ClientOptions) and specify a listener address to be used by Prometheus.

```go
client.Options{
		MetricsHandler: sdktally.NewMetricsHandler(newPrometheusScope(prometheus.Configuration{
			ListenAddress: "0.0.0.0:9090",
			TimerType:     "histogram",
		}
```

The Go SDK currently supports the [Tally](https://pkg.go.dev/go.temporal.io/sdk/contrib/tally) library; however, Tally offers [extensible custom metrics reporting](https://github.com/uber-go/tally#report-your-metrics), which is exposed through the [`WithCustomMetricsReporter`](/references/server-options#withcustommetricsreporter) API.

For more information, see the [Go sample for metrics](https://github.com/temporalio/samples-go/tree/main/metrics).
