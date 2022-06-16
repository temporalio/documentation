---
id: how-to-emit-metrics-in-go
title: How to emit metrics in Go
sidebar_label: Emit metrics
description: Emit metrics
tags:
  - go
  - how-to
---

Set the metric scope, which metrics should be reported

- Type: [`metrics.Handler`](https://pkg.go.dev/go.temporal.io/sdk/internal/common/metrics#Handler)
- Default: None

To emit metrics from the Workflow, use the `getMetricsScope()`, that will return a `Scope` object that can be used to emit metrics.

```go
// It returns a `Scope` object that can be used to emit metrics.
Workflow.getMetricsScope()
```

The following code example creates a timer, emits a metric, and starts the timer.

```go
Stopwatch watch = metricScope.timer(METRIC_NAME).start();
operation();
watch.stop();
```
