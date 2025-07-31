
To emit metrics from the Temporal Client in Go, create a [metrics handler](https://pkg.go.dev/go.temporal.io/sdk/internal/common/metrics#Handler) from the [Client Options](https://pkg.go.dev/go.temporal.io/sdk@v1.15.0/internal#ClientOptions) and specify a listener address to be used by Prometheus.

```go
client.Options{
		MetricsHandler: sdktally.NewMetricsHandler(newPrometheusScope(prometheus.Configuration{
			ListenAddress: "0.0.0.0:9090",
			TimerType:     "histogram",
		}
```

The Go SDK currently supports the [Tally](https://pkg.go.dev/go.temporal.io/sdk/contrib/tally) library; however, Tally offers [extensible custom metrics reporting](https://github.com/uber-go/tally#report-your-metrics), which is exposed through the [`WithCustomMetricsReporter`](/references/server-options#withcustommetricsreporter) API.

For more information, see the [Go sample for metrics](https://github.com/temporalio/samples-go/tree/main/metrics).

## Tracing and Context Propagation {#tracing-and-context-propogation}

The Temporal Go SDK supports three tracing implementations: [Datadog](https://pkg.go.dev/go.temporal.io/sdk/contrib/datadog), [OpenTelemetry](https://pkg.go.dev/go.temporal.io/sdk/contrib/opentelemetry), and [OpenTracing](https://pkg.go.dev/go.temporal.io/sdk/contrib/opentracing).

Tracing allows you to view the call graph of a Workflow along with its Activities, Nexus Operations, and any Child Workflows.

Tracing can be configured by providing a tracer implementation in [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions) during client instantiation.

For details on how to configure and leverage tracing, see the respective documentation:

- [Datadog](https://www.datadoghq.com/)
- [OpenTelemetry](https://opentelemetry.io)
- [OpenTracing](https://opentracing.io/)

The OpenTracing support has been validated using Jaeger, but other implementations should also work.
Tracing functionality utilizes generic context propagation provided by the client.

### Context Propagation

Temporal provides a standard way to propagate a custom context across a Workflow.
You can configure a context propagator in via the [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions).
The context propagator extracts and passes on information present in `context.Context` and `workflow.Context` objects across the Workflow.
Once a context propagator is configured, you should be able to access the required values in the context objects as you would normally do in Go.
You can see how the Go SDK implements a [tracing context propagator](https://github.com/temporalio/samples-go/tree/main/ctxpropagation).

#### Server-Side Headers

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

#### Context Propagators

You can propagate additional context through Workflow Execution by using a context propagator.
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

The [tracing context propagator](https://github.com/temporalio/samples-go/tree/main/ctxpropagation) shows a sample implementation of a context propagator.

#### Is there a complete example?

The [context propagation sample](https://github.com/temporalio/samples-go/blob/master/ctxpropagation/) configures a custom context propagator and shows context propagation of custom keys across a Workflow and an Activity.
It also uses Jaeger for tracing.

#### Can I configure multiple context propagators?

Yes. Multiple context propagators help to structure code with each propagator having its own scope of responsibility.

### Context Propagation Over Nexus Operation Calls

Nexus does not use the standard context propagator header structure.
Instead, it relies on a Temporal-agnostic protocol designed to connect arbitrary systems.
To propagate context over Nexus Operation calls, the context is serialized into a `nexus.Header`.
This is essentially a wrapper around `map[string]string` with helper methods to `Set` and `Get` values.
The header normalizes all keys to lowercase.

Because Nexus uses this custom format, and because Nexus calls may involve external systems, the `ContextPropagator` interface doesn’t apply to Nexus headers.
Context must be explicitly propagated through interceptors, as shown in the [Nexus Context Propagation sample](https://github.com/temporalio/samples-go/tree/main/nexus-context-propagation).

### Useful Resources

- [Passing Context with Temporal](https://spiralscout.com/blog/passing-context-with-temporal) by SpiralScout

The [Go SDK](https://github.com/temporalio/sdk-go) provides support for distributed tracing with **_Interceptors_**.
Interceptors uses Temporal headers to create a call graph of a [Workflow](/workflows), along with its [Activities](/activities) and [Child Workflows](/child-workflows).

There are several tracing implementations supported by the Temporal Go SDK.
For an [OpenTracing](https://pkg.go.dev/go.temporal.io/sdk/contrib/opentracing) Interceptor, use `opentracing.NewInterceptor(opentracing.TracerOptions{})` to create a `TracingInterceptor`.

```go
// create Interceptor
tracingInterceptor, err := opentracing.NewInterceptor(opentracing.TracerOptions{})
```

For an [OpenTelemetry](https://pkg.go.dev/go.temporal.io/sdk/contrib/opentelemetry) Interceptor, use `opentelemetry.NewTracingInterceptor(opentelemetry.TracerOptions{})`.

```go
// create Interceptor
tracingInterceptor, err := opentelemetry.NewTracingInterceptor(opentelemetry.TracerOptions{})
```

For a [Datadog](https://pkg.go.dev/go.temporal.io/sdk/contrib/datadog/tracing) Interceptor, use `tracing.NewTracingInterceptor(tracing.TracerOptions{})`.

```go
// create Interceptor
tracingInterceptor, err := tracing.NewTracingInterceptor(tracing.TracerOptions{})
```

Pass the newly created Interceptor to [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions) to enable tracing.

```go
c, err := client.Dial(client.Options{
  Interceptors:       []interceptor.ClientInterceptor{tracingInterceptor},
})
```

OpenTracing and OpenTelemetry are natively supported by [Jaeger](https://www.jaegertracing.io/docs/1.46/features/#native-support-for-opentracing-and-opentelemetry).
For more information on configuring and using tracing, see the documentation provided by [OpenTracing](https://opentracing.io), [OpenTelemetry](https://opentelemetry.io/), and [Datadog](https://docs.datadoghq.com/tracing/).

