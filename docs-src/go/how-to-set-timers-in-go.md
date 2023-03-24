---
id: how-to-set-timers-in-go
title: How to set Timers in Go
sidebar_label: Timers
description: To set a Timer in Go, use the `NewTimer()` function.
tags:
  - timers
  - sleep
---

To set a Timer in Go, use the [`NewTimer()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#NewTimer) function and pass the duration you want to wait before continuing.

```go
timer := workflow.NewTimer(timerCtx, duration)
```

To set a sleep duration in Go, use the [`sleep()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#Sleep) function and pass the duration you want to wait before continuing.
A zero or negative sleep duration causes the function to return immediately.

```go
sleep = workflow.Sleep(ctx, 10*time.Second)
```

For more information, see the [Timer](https://github.com/temporalio/samples-go/tree/main/timer) example in the [Go Samples repository](https://github.com/temporalio/samples-go).
