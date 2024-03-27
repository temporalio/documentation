---
id: what-is-a-delay-start-workflow-execution
title: What is a Start Delay?
description: Start Delay determines the amount of time to wait before initiating a Workflow Execution. If the Workflow receives a Signal-With-Start during the delay, it dispatches a Workflow Task and the remaining delay is bypassed.
sidebar_label: Delay Workflow Execution
tags:
    - term
    - explanation
    - delay-workflow
ssdi:
  - In [Public Preview](/temporal/release-stages#public-preview)
  - Available in the [Go SDK](https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions.StartDelay) since [v1.25.0](https://github.com/temporalio/sdk-go/releases/tag/v1.25.0)
  - Available in the [Java SDK](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowOptions.Builder.html#setStartDelay(java.time.Duration)) since [v1.25.0](https://github.com/temporalio/sdk-java/releases/tag/v1.22.1)
  - Available in the [Python SDK](https://python.temporal.io/temporalio.client.Client.html#start_workflow) since [v1.4.0](https://github.com/temporalio/sdk-python/releases/tag/1.4.0)
  - Available in the [.NET SDK](https://dotnet.temporal.io/api/Temporalio.Client.WorkflowOptions.html#Temporalio_Client_WorkflowOptions_StartDelay) since [v1.0.0](https://github.com/temporalio/sdk-dotnet/releases/tag/1.0.0)
  - Available in the [TypeScript SDK](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#startdelay) since [v1.9.0](https://github.com/temporalio/sdk-typescript/releases/tag/v1.9.0)
  - Available in the [PHP SDK](https://github.com/temporalio/sdk-php/blob/d230c855559c166579049df42235f22e2fe9f815/src/Client/WorkflowOptions.php#L313) since [v2.7.0](https://github.com/temporalio/sdk-php/releases/tag/v2.7.0)
---

Start Delay determines the amount of time to wait before initiating a Workflow Execution.

:::note Experimental feature
Start Delay Workflow Execution is incompatible with both [Schedules](/concepts/what-is-a-schedule) and [Cron Jobs](/concepts/what-is-a-temporal-cron-job).

This Workflow Option is considered experimental and may change in future releases.

:::

This is useful if you have a Workflow you want to schedule out in the future, but only want it to execute once: in comparison to reoccurring Workflows using Schedules.

If the Workflow receives a Signal-With-Start during the delay, it dispatches a Workflow Task and the remaining delay is bypassed.
If the Workflow receives a Signal during the delay that is not a Signal-With-Start, it is ignored and the Workflow continues to be delayed until the delay expires or a Signal-With-Start is received.

You can delay the dispatch of the initial Workflow Execution by setting this option in the Workflow Options field of the SDK of your choice.
