---
id: ide-debug
title: Debug with IDE
description: How to debug your code using your favorite IDE
sidebar_label: Debug with IDE
tags:
  - guide-context
---

Many IDEs support a debugging feature that enables you to step through your code.
You can use these tools with your Workflow code, however make sure to set the `TEMPORAL_DEBUG` environment variable to `true` first.

The SDKs include deadlock detection which fails a Workflow Task whenever the code blocks for over a second without relinquishing execution control.
If the environment variable is not set, you can often encounter a "potential deadlock detected" error while stepping through Workflow Definitions during debugging.
