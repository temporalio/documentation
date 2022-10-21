---
id: how-to-configure-tracing-in-python
title: How to configure tracing in Python
sidebar_label: Configure tracing
description: Configure tracing
tags:
  - python
  - how-to
---

To configure tracing in python, install the ``opentelemetry` dependencies.

```bash
# This command installs the `opentelemtry` dependencies.
pip install temporalio[opentelemetry]
```

Then the [`temporalio.contrib.opentelemetry.TracingInterceptor`](https://python.temporal.io/temporalio.contrib.opentelemetry.TracingInterceptor.html) class can be set as an interceptor as an argument of [`Client.connect()`](https://python.temporal.io/temporalio.client.Client.html#connect).

When your Client is connected, spans are created for all Client calls, Activities, and Workflow invocations on the Worker. Spans are created and serialized through the server to give one trace for a Workflow Execution.
