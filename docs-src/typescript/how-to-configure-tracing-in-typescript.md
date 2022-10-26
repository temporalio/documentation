---
id: how-to-configure-tracing-in-typescript
title: How to configure tracing in TypeScript
sidebar_label: Configure tracing
description: Call `MockActivityEnvironment.cancel()` to cancel an Activity Context.
tags:
  - developer-guide
  - sdk
  - typescript
---

The [`interceptors-opentelemetry`](https://github.com/temporalio/samples-typescript/tree/main/interceptors-opentelemetry) sample shows how to use the SDK's built-in OpenTelemetry tracing to trace everything from starting a Workflow to Workflow Execution to running an Activity from that Workflow.

The built-in tracing uses protobuf message headers (like [this one](https://github.com/temporalio/api/blob/b2b8ae6592a8730dd5be6d90569d1aea84e1712f/temporal/api/workflowservice/v1/request_response.proto#L161) when starting a Workflow) to propagate the tracing information from the client to the Workflow and from the Workflow to its successors (when Continued As New), children, and Activities.
All of these executions are linked with a single trace identifier and have the proper `parent -> child` span relation.

Tracing is compatible between different Temporal SDKs as long as compatible [context propagators](https://opentelemetry.lightstep.com/core-concepts/context-propagation/) are used.

**Context propagation**

The TypeScript SDK uses the global OpenTelemetry propagator.

To extend the default ([Trace Context](https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-core/README.md#w3ctracecontextpropagator-propagator) and [Baggage](https://github.com/open-telemetry/opentelemetry-js/blob/main/packages/opentelemetry-core/README.md#baggage-propagator) propagators) to also include the [Jaeger propagator](https://www.npmjs.com/package/@opentelemetry/propagator-jaeger), follow these steps:

- `npm i @opentelemetry/propagator-jaeger`

- At the top level of your Workflow code, add the following lines:

  ```js
  import { propagation } from '@opentelemetry/api';
  import {
    CompositePropagator,
    W3CBaggagePropagator,
    W3CTraceContextPropagator,
  } from '@opentelemetry/core';
  import { JaegerPropagator } from '@opentelemetry/propagator-jaeger';

  propagation.setGlobalPropagator(
    new CompositePropagator({
      propagators: [
        new W3CTraceContextPropagator(),
        new W3CBaggagePropagator(),
        new JaegerPropagator(),
      ],
    }),
  );
  ```

Similarly, you can customize the OpenTelemetry `NodeSDK` propagators by following the instructions in the [Initialize the SDK](https://github.com/open-telemetry/opentelemetry-js/tree/main/experimental/packages/opentelemetry-sdk-node#initialize-the-sdk) section of the `README.md` file.
