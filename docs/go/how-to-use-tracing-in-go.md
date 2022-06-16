---
id: how-to-use-tracing-in-go
title: How to use tracing in Go
sidebar_label: Use tracing
description: Use tracing
tags:
  - go
  - how-to
---

The Go SDK provides support for distributed tracing through [OpenTracing](https://opentracing.io/).
Tracing allows you to view the call graph of a Workflow along with its Activities and any child Workflows.

Tracing can be configured by providing an [opentracing.Tracer](https://pkg.go.dev/github.com/opentracing/opentracing-go#Tracer)
implementation in [ClientOptions](https://pkg.go.dev/go.temporal.io/sdk/internal#ClientOptions) during client instantiation.

For more details on how to configure and leverage tracing, see the [OpenTracing documentation](https://opentracing.io/docs/getting-started/).

The OpenTracing support has been validated using [Jaeger](https://www.jaegertracing.io/), but other implementations mentioned [here](https://opentracing.io/docs/supported-tracers/) should also work.

Tracing functionality utilizes generic context propagation provided by the Client.
