---
id: how-to-define-a-signal-in-go
title: How to define a Signal in Go
sidebar_label: Define Signal
description: Structs should be used to define Signals and carry data.
tags:
  - go
  - developer-guide
---

Structs should be used to define Signals and carry data, as long as the struct is [serializable via the Data Converter](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
The `Receive()` method on the Data Converter decodes the data into the Struct within the Workflow.
Only public fields are serializable.

```go
MySignal struct {
	Message string // serializable
	message string // not serializable
}
```
