---
id: how-to-send-a-signal-to-a-workflow-execution-in-go
title: How to send a Signal to a Workflow Execution in Go
sidebar_label: Sending Signals
description: todo
tags:
  - go
  - developer-guide
---


Inside Workflow code you can also signal other workflows using their workflow type using `SignalExternalWorkflow`:

```go
// Send 10 signals to PHP workflow
for i := 0; i < 10; i++ {
    err :=  workflow.SignalExternalWorkflow(ctx, "simple-workflow-php", "", "goMessage", "Hello from Go workflow: "+strconv.Itoa(i)).Get(ctx, nil)
}
```

Here we are sending a signal to a Workflow with type "simple-workflow-php" and signal name "goMessage".

See [How to handle a Signal in a Workflow in Go](https://docs.temporal.io/docs/go/how-to-handle-a-signal-in-a-workflow-in-go) and [Temporal Polyglot example](https://github.com/tsurdilo/temporal-polyglot) for more.
