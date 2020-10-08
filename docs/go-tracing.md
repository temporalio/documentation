---
id: go-tracing
title: Tracing and Context Propagation
---

## Tracing

The Go SDK provides distributed tracing support through [OpenTracing](https://opentracing.io/). Tracing can be
configured by providing an [opentracing.Tracer](https://pkg.go.dev/github.com/opentracing/opentracing-go#Tracer)
implementation in [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions) during client instantiation.
Tracing allows
you to view the call graph of a workflow along with its activities, child workflows etc. For more details on how to
configure and leverage tracing, see the [OpenTracing documentation](https://opentracing.io/docs/getting-started/).
The OpenTracing support has been validated using [Jaeger](https://www.jaegertracing.io/), but other implementations
mentioned [here](https://opentracing.io/docs/supported-tracers/) should also work. Tracing support utilizes generic context
propagation support provided by the client.

## Context Propagation

We provide a standard way to propagate custom context across a workflow.
[ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions)
allows configuring a context propagator. The context propagator extracts and passes on information present in the `context.Context`
and `workflow.Context` objects across the workflow. Once a context propagator is configured, you should be able to access the required values
in the context objects as you would normally do in Go.
For a sample, the Go SDK implements a [tracing context propagator](https://github.com/temporalio/sdk-go/blob/master/internal/tracer.go).

### Server-Side Headers Support

On the server side, Temporal provides a mechanism to propagate what it calls headers across different workflow
transitions.

```proto
message Header {
    map<string, Payload> fields = 1;
}
```

The client leverages this to pass around selected context information. [HeaderReader](https://pkg.go.dev/go.temporal.io/sdk/internal#HeaderReader)
and [HeaderWriter](https://pkg.go.dev/go.temporal.io/sdk/internal#HeaderWriter) are interfaces
that allow reading and writing to the Temporal server headers. The SDK already provides [implementations](https://github.com/temporalio/sdk-go/blob/master/internal/headers.go)
for these. `HeaderWriter` sets a field in the header. Headers is a map, so setting a value for the same key
multiple times will overwrite the previous values. `HeaderReader` gets field from the header. It also can iterate through the headers map and run the
provided handler function on each key/value pair, allowing you to deal with the fields you are interested in.

```go
type HeaderWriter interface {
	Set(string, *commonpb.Payload)
}

type HeaderReader interface {
	Get(string) (*commonpb.Payload, bool)
	ForEachKey(handler func(string, *commonpb.Payload) error) error
}
```

### Context Propagators

Context propagators require implementing the following four methods to propagate selected context across a workflow:

- `Inject` is meant to pick out the context keys of interest from a Go [context.Context](https://golang.org/pkg/context/#Context) object and write that into the
headers using the [HeaderWriter](https://pkg.go.dev/go.temporal.io/sdk/internal#HeaderWriter) interface
- `InjectFromWorkflow` is the same as above, but operates on a [workflow.Context](https://pkg.go.dev/go.temporal.io/sdk/internal#Context) object
- `Extract` reads the headers and places the information of interest back into the [context.Context](https://golang.org/pkg/context/#Context) object
- `ExtractToWorkflow` is the same as above, but operates on a [workflow.Context](https://pkg.go.dev/go.temporal.io/sdk/internal#Context) object

The [tracing context propagator](https://github.com/temporalio/temporal-go-sdk/blob/master/internal/tracer.go)
shows a sample implementation of context propagation.

```go
type ContextPropagator interface {
  Inject(context.Context, HeaderWriter) error

  Extract(context.Context, HeaderReader) (context.Context, error)

  InjectFromWorkflow(Context, HeaderWriter) error

  ExtractToWorkflow(Context, HeaderReader) (Context, error)
}
```

## Q & A

### Is there a complete example?

The [context propagation sample](https://github.com/temporalio/samples-go/blob/master/ctxpropagation/)
configures a custom context propagator and shows context propagation of custom keys across a workflow and an activity.
It also uses Jaeger for tracing.

### Can I configure multiple context propagators?

Yes, we recommended that you configure multiple context propagators with each propagator meant to propagate a particular type of context.
