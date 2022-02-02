---
id: how-to-set-clientoptions-in-go
title: How to set ClientOptions in Go
sidebar_label: ClientOptions
description: Create an instance of `Options` from the `go.temporal.io/sdk/client` package and pass it the call to create a new Temporal Client.
tags:
  - go
  - developer-guide
---

Create an instance of [`Options`](https://pkg.go.dev/go.temporal.io/sdk/client#Options) from the `go.temporal.io/sdk/client` package and pass it the call to create a new Temporal Client.

| Field                                       | Required | Type                                                                                       |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------ |
| [`HostPort`](#hostport)                     | No       | `string`                                                                                   |
| [`Namespace`](#namespace)                   | No       | `string`                                                                                   |
| [`Logger`](#logger)                         | No       | [`log.Logger`](https://pkg.go.dev/go.temporal.io/sdk/log#Logger)                           |
| [`MetricsHandler`](#metricshandler)         | No       | [`metrics.Handler`](https://pkg.go.dev/go.temporal.io/sdk/internal/common/metrics#Handler) |
| [`Identity`](#identify)                     | No       | `string`                                                                                   |
| [`DataConverter`](#dataconverter)           | No       | [`converter.DataConverter`](https://pkg.go.dev/go.temporal.io/sdk/converter#DataConverter) |
| [`Tracer`](#tracer)                         | No       | `opentracing.Tracer`                                                                       |
| [`ContextPropagators`](#contextpropagators) | No       | `[]ContextPropagator`                                                                      |
| [`ConnectionOptions`](#connectionoptions)   | No       | `ConnectionOptions`                                                                        |
| [`HeadersProvider`](#headersprovider)       | No       | `HeadersProvider`                                                                          |
| [TrafficController](#trafficcontroller)     | No       | `TrafficController`                                                                        |

### `HostPort`

Set the host:port for this client to connect to.

- Type: `string`
- Default: `client.DefaultHostPort`

```go
clientOptions := client.Options{
  HostPort: client.DefaultHostPort,
}
temporalClient, err := client.NewClient(clientOptions)
```

### `Namespace`

Set the namespace name for this client to work with

- Type: `string`

### `Logger`

**How to use a custom logger in Go**

This field sets a custom Logger that is used for all logging actions of the instance of the Temporal Client.

Although the Go SDK does not support most third-party logging solutions natively, [our friends at Banzai Cloud](https://github.com/sagikazarmark) built the adapter package [logur](https://github.com/logur/logur) which makes it possible to use third party loggers with minimal overhead.
Most of the popular logging solutions have existing adapters in Logur, but you can find a full list [in the Logur Github project](https://github.com/logur?q=adapter-).

Here is an example of using Logur to support [Logrus](https://github.com/sirupsen/logrus):

```go
package main
import (
  "go.temporal.io/sdk/client"

	"github.com/sirupsen/logrus"
	logrusadapter "logur.dev/adapter/logrus"
	"logur.dev/logur"
)

func main() {
  // ...
	logger := logur.LoggerToKV(logrusadapter.New(logrus.New()))
  clientOptions := client.Options{
    Logger: logger,
  }
  temporalClient, err := client.NewClient(clientOptions)
  // ...
}
```

### `MetricsHandler`

Sets the metric scope, which metrics should be reported

- Type: [`metrics.Handler`](https://pkg.go.dev/go.temporal.io/sdk/internal/common/metrics#Handler)
- Default: None

### `Identity`

Sets an identify that can be used to track this host for debugging

### `DataConverter`

Sets DataConverter to customize serialization/deserialization of arguments in Temporal

### `Tracer`

Sets opentracing Tracer that is to be used to emit tracing information

- Type: opentracing.Tracer

### `ContextPropagators`

Sets ContextPropagators that allows users to control the context information passed through a workflow

- Type: `[]ContextPropagator`

### `ConnectionOptions`

Sets options for server connection that allow users to control features of connections such as TLS settings

- Type: `ConnectionOptions`

### `HeadersProvider`

Sets custom request headers

- Type: `HeadersProvider`

### `TrafficController`

Set to induce artificial failures in test scenarios

- Type: `TrafficController`
