---
id: debugging
title: Debugging
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Debug
tags:
  - guide-context
---

You can use a debugger tool provided by your favorite IDE to debug your Workflow Definitions prior to testing or executing them.

The Temporal Go SDK includes deadlock detection which fails a Workflow Task in case the code blocks over a second without relinquishing execution control.
Because of this you can often encounter a `PanicError: Potential deadlock detected` while stepping through Workflow Definitions during debugging.

To alleviate this issue, you can set the `TEMPORAL_DEBUG` environment variable to `true` before debugging your Workflow Definition.

:::note

Make sure to set `TEMPORAL_DEBUG` to true only during debugging.

:::
