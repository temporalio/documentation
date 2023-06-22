---
id: debugging
title: Debugging
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Debug
tags:
  - guide-context
---

In addition to writing unit and integration tests, debugging your Workflows is also a very valuable testing tool.
You can debug your Workflow code using a debugger provided by your favorite Java IDE.

Note that when debugging your Workflow code, the Temporal Java SDK includes deadlock detection which fails a Workflow Task in case the code blocks over a second without relinquishing execution control.
Because of this you can often encounter the `PotentialDeadlockException` Exception while stepping through Workflow code during debugging.

To alleviate this issue, you can set the `TEMPORAL_DEBUG` environment variable to true before debugging your Workflow code. Make sure to set `TEMPORAL_DEBUG` to true only during debugging.
