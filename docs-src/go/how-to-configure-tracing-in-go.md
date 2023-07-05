---
id: how-to-configure-tracing-in-go
title: How to configure tracing in Go
sidebar_label: Configure tracing
description: Configure tracing
tags:
  - go
  - how-to
---

The [Go SDK](https://github.com/temporalio/sdk-go) provides support for distributed tracing with **_Interceptors_**.
Interceptors uses Temporal headers to create a call graph of a [Workflow](/concepts/what-is-a-workflow), along with its [Activities](/concepts/what-is-an-activity) and [Child Workflows](/concepts/what-is-a-child-workflow-execution).

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

For a [Datadog](https://pkg.go.dev/go.temporal.io/sdk/contrib/datadog/tracing#NewTracingInterceptor) Interceptor, use `tracing.NewTracingInterceptor(tracing.TracerOptions{})`.

```go
// create Interceptor
tracingInterceptor, err := tracing.NewTracingInterceptor(tracing.TracerOptions{})
```

Pass the newly created Interceptor to [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions) to enable tracing.

```go
c, err := client.Dial(client.Options{
  HostPort:           client.DefaultHostPort,
  ContextPropagators: []workflow.ContextPropagator{ctxpropagation.NewContextPropagator()},
  Interceptors:       []interceptor.ClientInterceptor{tracingInterceptor},
})
```

OpenTracing and OpenTelemetry are natively supported by [Jaeger](https://www.jaegertracing.io/docs/1.46/features/#native-support-for-opentracing-and-opentelemetry).
For more information on configuring and using tracing, see the documentation provided by [OpenTracing](https://opentracing.io/docs/overview/what-is-tracing/), [OpenTelemetry](https://www.dynatrace.com/support/help/extend-dynatrace/opentelemetry/overview/traces), and [Datadog](https://docs.datadoghq.com/tracing/#send-traces-to-datadog).
