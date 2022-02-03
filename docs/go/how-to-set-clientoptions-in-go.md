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
| [`ContextPropagators`](#contextpropagators) | No       | [`[]ContextPropagator`](https://pkg.go.dev/go.temporal.io/sdk/internal#ContextPropagator)                                                                      |
| [`ConnectionOptions`](#connectionoptions)   | No       | [`ConnectionOptions`](https://pkg.go.dev/go.temporal.io/sdk/internal#ConnectionOptions)                                                                        |
| [`HeadersProvider`](#headersprovider)       | No       | [`HeadersProvider`](https://pkg.go.dev/go.temporal.io/sdk/internal#HeadersProvider)                                                                          |
| [TrafficController](#trafficcontroller)     | No       | [`TrafficController`](https://pkg.go.dev/go.temporal.io/sdk/internal#TrafficController)                                                                        |
| [Interceptors](#interceptors) | No | [`[]ClientInterceptor`](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientInterceptor) |

### `HostPort`

Sets the host:port for this client to connect to.

- Type: `string`
- Default: [`client.DefaultHostPort`](https://pkg.go.dev/go.temporal.io/sdk/client#pkg-constants) (localhost:7233)

```go
clientOptions := client.Options{
  HostPort: client.DefaultHostPort,
}
temporalClient, err := client.NewClient(clientOptions)
```

The `HostPort` value is a gRPC address and therefore can also support a special-formatted address of "<resolver>:///<value>" that will use a registered resolver.
By default all hosts returned from the resolver will be used in a round-robin fashion.

The "dns" resolver is registered by default.
Using a "dns:///" prefixed address will cause a periodic round-robin resolution of all IPs for all DNS addresses.

A custom resolver can be created to provide multiple hosts in other ways.
For example, to manually provide multiple IPs to round-robin across, a google.golang.org/grpc/resolver/manual resolver can be created and registered with google.golang.org/grpc/resolver with a custom scheme:

```go
builder := manual.NewBuilderWithScheme("myresolver")
builder.InitialState(resolver.State{Addresses: []resolver.Address{{Addr: "1.2.3.4:1234"},{Addr: "2.3.4.5:2345"}}})
resolver.Register(builder)
temporalClient, err := client.NewClient(client.Options{HostPort: "myresolver:///ignoredvalue"})
```
Other more advanced resolvers can also be registered.

### `Namespace`

Sets the [Namespace](/docs/content/what-is-a-namespace) name for this Temporal Client to work with.

- Type: `string`
- Default: default

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

- Type: [`converter.DataConverter`](https://pkg.go.dev/go.temporal.io/sdk/converter#DataConverter)

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

### Interceptors
