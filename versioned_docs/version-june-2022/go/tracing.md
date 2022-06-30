---
id: tracing
title: Tracing and Context Propagation
---

## Tracing

The Go SDK provides support for distributed tracing through [OpenTracing](https://opentracing.io/).
Tracing allows you to view the call graph of a Workflow along with its Activities and any child Workflows.

Tracing can be configured by providing an [opentracing.Tracer](https://pkg.go.dev/github.com/opentracing/opentracing-go#Tracer)
implementation in [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions) during client instantiation.
For more details on how to configure and leverage tracing, see the [OpenTracing documentation](https://opentracing.io/docs/getting-started/).

The OpenTracing support has been validated using [Jaeger](https://www.jaegertracing.io/), but other implementations mentioned [here](https://opentracing.io/docs/supported-tracers/) should also work.
Tracing functionality utilizes generic context propagation provided by the client.

## Context Propagation

Temporal provides a standard way to propagate a custom context across a Workflow.
You can configure a context propagator in via the [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions).
The context propagator extracts and passes on information present in `context.Context` and `workflow.Context` objects across the Workflow.
Once a context propagator is configured, you should be able to access the required values in the context objects as you would normally do in Go.
You can see how the Go SDK implements a [tracing context propagator](https://github.com/temporalio/sdk-go/blob/master/internal/tracer.go).

### Server-Side Headers

On the server side, Temporal provides a mechanism for propagating context across Workflow transitions called headers.

```proto
message Header {
    map<string, Payload> fields = 1;
}
```

`Client` leverages headers to pass around additional context information.
[HeaderReader](https://pkg.go.dev/go.temporal.io/sdk/internal#HeaderReader) and [HeaderWriter](https://pkg.go.dev/go.temporal.io/sdk/internal#HeaderWriter) are interfaces that allow reading and writing to the Temporal Server headers.
The SDK includes [implementations](https://github.com/temporalio/sdk-go/blob/master/internal/headers.go) for these interfaces.
`HeaderWriter` sets a value for a header.
Headers are held as a map, so setting a value for the same key will overwrite its previous value.
`HeaderReader` gets a value of a header.
It also can iterate through all headers and execute the provided handler function on each header, so that your code can operate on select headers you need.

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

You can propagate additional context through Workflow execution by using a context propagator.
A context propagator needs to implement the `ContextPropagator` interface that includes the following four methods:

```go
type ContextPropagator interface {
  Inject(context.Context, HeaderWriter) error

  Extract(context.Context, HeaderReader) (context.Context, error)

  InjectFromWorkflow(Context, HeaderWriter) error

  ExtractToWorkflow(Context, HeaderReader) (Context, error)
}
```

- `Inject` reads select context keys from a Go [context.Context](https://golang.org/pkg/context/#Context) object and writes them into the headers using the [HeaderWriter](https://pkg.go.dev/go.temporal.io/sdk/internal#HeaderWriter) interface.
- `InjectFromWorkflow` operates similar to `Inject` but reads from a [workflow.Context](https://pkg.go.dev/go.temporal.io/sdk/internal#Context) object.
- `Extract` picks select headers and put their values into the [context.Context](https://golang.org/pkg/context/#Context) object.
- `ExtractToWorkflow` operates similar to `Extract` but write to a [workflow.Context](https://pkg.go.dev/go.temporal.io/sdk/internal#Context) object.

The [tracing context propagator](https://github.com/temporalio/sdk-go/blob/master/internal/tracer.go) shows a sample implementation of a context propagator.

### Is there a complete example?

The [context propagation sample](https://github.com/temporalio/samples-go/blob/master/ctxpropagation/) configures a custom context propagator and shows context propagation of custom keys across a Workflow and an Activity.
It also uses Jaeger for tracing.

### Can I configure multiple context propagators?

Yes. Multiple context propagators help to structure code with each propagator having its own scope of responsibility.

## Useful Resources

- [Passing Context with Temporal](https://spiralscout.com/blog/passing-context-with-temporal) by SpiralScout
