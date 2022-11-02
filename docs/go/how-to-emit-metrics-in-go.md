---
id: how-to-emit-metrics-in-go
title: How to emit metrics in Go
sidebar_label: Emit metrics
description: Emit metrics
tags:
  - go
  - how-to
---

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
