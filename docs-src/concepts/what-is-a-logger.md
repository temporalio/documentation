---
id: what-is-a-logger
title: What is a Logger?
sidebar_label: Logger
description: A Logger provides an API containing the logic for recording runtime behavior.
tags:
  - term
  - explanation
  - logger
  - api
  - sdks
---

A logger provides an API containing the logic needed to record details about the application behavior at runtime.
The output posts timestamps alongside the logged values, making it easier to evaluate the state and flow of [Workflows](/concepts/what-is-a-workflow) and [Activities](/concepts/what-is-an-activity).

[Temporal SDKs](/concepts/what-is-a-temporal-sdk) provide both a logging API and a built-in logger implementation.
The logging implementation provided by the SDK emits messages to the standard output of the [Worker](/concepts/what-is-a-worker) executing the code.
The Temporal logging API automatically injects helpful information (such as [Workflow ID](/concepts/what-is-a-workflow-id)) about the execution into the output.
In addition, the logging API is replay-aware, preventing the duplication of log messages if History Replay is used to restore the app after a crash.

Although the output is timestamped and given a log level (similar to other logging APIs out there), the SDK does not support output customization.
If you need to customize logger output, replace the logging implementation with an adapter that maps Temporal's API calls to a third-party library's implementation.

:::caution
It's permissible to use an API provided by a third-party logging library in your Workflow and Activity Definitions.
However, third-party APIs won't automatically inject information, and may duplicate logs upon a crash.
:::

For most cases, Temporal's API and default logging implementations will be enough for monitoring execution state.
If you require more control over the format, threshold, and destination of output, consider using a third-party implementation alongside Temporal's logging API, or integrate a third-party library.

<!-- TODO: should I add example links down here or within the text? -->


