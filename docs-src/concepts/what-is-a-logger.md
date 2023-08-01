---
id: what-is-a-logger
title: What is a Logger?
sidebar_label: Logger
description: A Logger provides an API containing the logic for recording runtime behavior.
tags:
  - term
  - explanation
  - logger
  - metrics
---

A logger provides an API containing the logic needed to record details about the application behavior at runtime.
The output posts timestamps alongside the logged values, making it easier to evaluate the state and flow of [Workflows]() and [Activities]().

[Temporal SDKs]() provide both a logging API and a built-in logger implementation.
The logging implementation provided by the SDK emits messages to the standard output of the [Worker]() executing the code.
The Temporal logging API automatically injects helpful information (such as [Workflow ID]()) about the execution into the output.
In addition, the logging API is replay-aware, preventing the duplication of log messages if History Replay is used to restore the app after a crash.

Although the output is timestamped and given a log level (similar to other logging APIs out there), the SDK does not support output customization.
If you require the ability to customize logger output, replace the logging implementation with one of your own design, or with an adapter that maps our API calls to a third-party library's implementation.

:::caution
It's permissible to use an API provided by a third-party logging library in your Workflow and Activity Definitions.
However, third-party APIs won't automatically inject information, and may duplicate logs upon a crash.
:::

For most cases, Temporal's API and default logging implementations will be sufficient for monitoring execution state.
If you require more control over the format, threshold, and destination of output, consider using a third-party implementation alongside our logging API, or integrate a third-party library.


