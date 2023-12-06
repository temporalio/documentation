---
id: start-delay
title: Start Delay
sidebar_label: Start Delay
description: Start Delay determines the amount of time to wait before initiating a Workflow Execution.
tags:
  - term
  - explanation
  - delay-workflow
ssdi:
  - Introduced in the [Temporal Go SDK 1.25.0](https://github.com/temporalio/sdk-go/releases/tag/v1.25.0)
  - Introduced in the [Temporal Java SDK 1.25.0](https://github.com/temporalio/sdk-java/releases/tag/v1.22.1)
  - Introduced in the [Temporal Python SDK 1.4.0](https://github.com/temporalio/sdk-python/releases/tag/1.4.0)
---

Start Delay is a feature that sets a delay period before initiating a Workflow Execution.

:::info Experimental feature

Note that Start Delay is currently incompatible with [Schedules](/dev-guide/sdk-features/schedules) and [Cron Jobs](/dev-guide/sdk-features/cron-jobs).
As an experimental feature, it may undergo changes in future releases.

:::

This option is particularly useful for scheduling a single-execution Workflow in the future, as opposed to using Schedules for recurring Workflows.

During the delay period, if the Workflow receives a Signal-With-Start, it immediately dispatches a Workflow Task, bypassing the remaining delay.

Conversely, if the Workflow receives any other type of Signal during this period, it is ignored, and the Workflow remains delayed until either the delay expires or a Signal-With-Start is received.

To implement this delay, set the Start Delay option in the Workflow Options field within the SDK of your choice.
