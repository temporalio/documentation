---
id: detecting-workflow-failures
title: Detecting Workflow failures
sidebar_label: Workflows
description: Learn about Workflow Execution Timeout, Workflow Run Timeout, and Workflow Task Timeout in Temporal. Maximize Workflow efficiency and manage durations effectively.
toc_max_heading_level: 4
keywords:
  - workflows
  - failures
  - timeouts
tags:
  - Concepts
  - Workflows
  - Failures
  - Timeouts
---

import { RelatedReadContainer, RelatedReadItem, CaptionedImage } from '@site/src/components';

Each Workflow Timeout controls the maximum duration of a different aspect of a Workflow Execution. Workflow Timeouts are set when starting the Workflow Execution.

Before we continue, we want to note that we generally do not recommend setting Workflow Timeouts, because Workflows are designed to be long-running and resilient.
Instead, setting a Timeout can limit its ability to handle unexpected delays or long-running processes.
If you need to perform an action inside your Workflow after a specific period of time, we recommend using a Timer.

- [Workflow Execution Timeout](#workflow-execution-timeout)
- [Workflow Run Timeout](#workflow-run-timeout)
- [Workflow Task Timeout](#workflow-task-timeout)

## Workflow Execution Timeout {#workflow-execution-timeout}

**What is a Workflow Execution Timeout in Temporal?**

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

<RelatedReadContainer>
    <RelatedReadItem path="/develop/go/failure-detection#workflow-timeouts" text="Set a Workflow Execution Timeout using the Go SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/java/failure-detection#workflow-timeouts" text="Set a Workflow Execution Timeout using the Java SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/php/failure-detection#workflow-timeouts" text="Set a Workflow Execution Timeout using the PHP SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/python/failure-detection#workflow-timeouts" text="Set a Workflow Execution Timeout using the Python SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/typescript/failure-detection#workflow-timeouts" text="Set a Workflow Execution Timeout using the TypeScript SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/dotnet/failure-detection#workflow-timeouts" text="Set a Workflow Execution Timeout using the .NET SDK" archetype="feature-guide" />
</RelatedReadContainer>

<CaptionedImage
    src="/diagrams/workflow-execution-timeout.svg"
    title="Workflow Execution Timeout period" />

**The default value is ∞ (infinite).**
If this timeout is reached, the Workflow Execution changes to a Timed Out status.
This timeout is different from the [Workflow Run Timeout](#workflow-run-timeout).
This timeout is most commonly used for stopping the execution of a [Temporal Cron Job](/cron-job) after a certain amount of time has passed.

## Workflow Run Timeout {#workflow-run-timeout}

**What is a Workflow Run Timeout in Temporal?**

A Workflow Run is the instance of a specific Workflow Execution.

Due to the potential for Workflow Retries or Continue-as-New, a Workflow Execution may have multiple Workflow runs. For example, if a Workflow that specifies a Retry Policy initially fails and then succeeds during the next retry attempt, there is a single Workflow Execution that spans two Workflow Runs. Both runs will share the same Workflow ID but have a unique Run ID to distinguish them.

A Workflow Run Timeout restricts the maximum duration of a single Workflow Run. If the Workflow Run Timeout is reached, the Workflow Execution will be Timed Out. Because this Timeout only applies to an individual Workflow Run, this does not include retries or Continue-As-New.

<RelatedReadContainer>
    <RelatedReadItem path="/develop/go/failure-detection#workflow-timeouts" text="Set a Workflow Run Timeout using the Go SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/java/failure-detection#workflow-timeouts" text="Set a Workflow Run Timeout using the Java SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/php/failure-detection#workflow-timeouts" text="Set a Workflow Run Timeout using the PHP SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/python/failure-detection#workflow-timeouts" text="Set a Workflow Run Timeout using the Python SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/typescript/failure-detection#workflow-timeouts" text="Set a Workflow Run Timeout using the TypeScript SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/dotnet/failure-detection#workflow-timeouts" text="Set a Workflow Timeout using the .NET SDK" archetype="feature-guide" />
</RelatedReadContainer>

<CaptionedImage
    src="/diagrams/workflow-run-timeout.svg"
    title="Workflow Run Timeout period" />

**The default is set to the same value as the [Workflow Execution Timeout](#workflow-execution-timeout).**
This timeout is most commonly used to limit the execution time of a single [Temporal Cron Job Execution](/cron-job).

If the Workflow Run Timeout is reached, the Workflow Execution will be Timed Out.

## Workflow Task Timeout {#workflow-task-timeout}

**What is a Workflow Task Timeout in Temporal?**

A Workflow Task Timeout is the maximum amount of time allowed for a [Worker](/workers#worker) to execute a [Workflow Task](/tasks#workflow-task) after the Worker has pulled that Workflow Task from the [Task Queue](/task-queue).

This Timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.

<RelatedReadContainer>
    <RelatedReadItem path="/develop/go/failure-detection#workflow-timeouts" text="Set a Workflow Task Timeout using the Go SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/java/failure-detection#workflow-timeouts" text="Set a Workflow Task Timeout using the Java SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/php/failure-detection#workflow-timeouts" text="Set a Workflow Task Timeout using the PHP SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/python/failure-detection#workflow-timeouts" text="Set a Workflow Task Timeout using the Python SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/typescript/failure-detection#workflow-timeouts" text="Set a Workflow Task Timeout using the TypeScript SDK" archetype="feature-guide" />
    <RelatedReadItem path="/develop/dotnet/failure-detection#workflow-timeouts" text="Set a Workflow Task Timeout using the .NET SDK" archetype="feature-guide" />
</RelatedReadContainer>

<CaptionedImage
    src="/diagrams/workflow-task-timeout.svg"
    title="Workflow Task Timeout period" />

**The default value is 10 seconds.**
This timeout is primarily available to recognize whether a Worker has gone down so that the Workflow Execution can be recovered on a different Worker.
The main reason for increasing the default value is to accommodate a Workflow Execution that has an extensive Workflow Execution History, requiring more than 10 seconds for the Worker to load.
It's worth mentioning that although you can extend the timeout up to the maximum value of 120 seconds, it's not recommended to move beyond the default value.

## Detecting Workflow Task Failures

Use the `TemporalReportedProblems` Search Attribute to detect Workflows with failed Workflow Tasks. 
A failed Workflow Task does not cause the Workflow to fail. Some Tasks within a Workflow may be intended to fail.
For example, a Workflow Task may check a remote data source for new messages. If there aren't any, the Task will fail as intended.
If your Task has code to handle the failure, the Workflow will proceed.
However, if your Workflow has a Task that fails and the failure is not handled, the Workflow will continue to run, but will not complete.
Detecting Workflows in this state is a common troubleshooting issue.

To identify Workflows with Task failures, you can use the Temporal Web UI. See [Task Failures View](/web-ui/#task-failures-view) for more details.

You can also detect Workflows with Task failures by searching for the `TemporalReportedProblems` search attribute with your observability tools.

:::warning Activating Workflow Task Failure
To enable the Task Failures View for a Namespace, you need to update the Dynamic Config for that Namespace. See [Activating Task Failures View](/web-ui/#activate-task-failures-view).
:::
