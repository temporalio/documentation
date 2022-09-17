---
id: tracing
title: How to setup Tracing
description: Tracing allows you to view the call graph of a Workflow along with its Activities and any child Workflows.
sidebar_label: Tracing
tags:
  - guide-context
---

Tracing allows you to view the call graph of a Workflow along with its Activities and any child Workflows.

Temporal Web's tracing capabilities mainly track Activity Execution within a Temporal context. If you need custom tracing specific for your use case, you should make use of context propagation to add tracing logic accordingly.

For information about Workflow tracing, see [Tracing Temporal Workflows with DataDog](https://spiralscout.com/blog/tracing-temporal-workflow-with-datadog).

For information about how to configure exporters and instrument your code, see [Tracing Temporal Services with OTEL](https://github.com/temporalio/temporal/blob/master/develop/docs/tracing.md).
