---
id: define-signal
title: How to define a Signal in Go
description: Structs should be used to define Signals and carry data.
sidebar_label: Define Signal
tags:
  - developer-guide-doc-type
  - signals
  - signals-feature
    - go sdk
  - how-to-doc-type
  - signals
  - signals-feature
  - developer-guide-doc-type
---

A Signal has a name and can have arguments.

- The name, also called a Signal type, is a string.
- The arguments must be [serializable](/concepts/what-is-a-data-converter).

```go
signalName := "alertWorkflow
```

Structs should be used to define Signals and carry data, as long as the struct is [serializable via the Data Converter](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter.ToPayload).
The `Receive()` method on the Data Converter decodes the data into the Struct within the Workflow.
Only public fields are serializable.

```go
MySignal struct {
	Message string // serializable
	message string // not serializable
}
```
