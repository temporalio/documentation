---
id: how-to-set-timers-in-go
title: How to set Timers in Go
sidebar_label: Timers
tags:
  - timers
  - sleep
---

To set a timer in Go, use the [`NewTimer()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#NewTimer) function and pass how you long you want to wait before continuing.

```go
workflow.NewTimer(timerCtx, duration)
```

For more information, see the [Timer](https://github.com/temporalio/samples-go/tree/main/timer) example in the [Go Samples repository](https://github.com/temporalio/samples-go).
