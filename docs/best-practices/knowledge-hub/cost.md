---
id: cost
title: Temporal Cloud Cost
sidebar_label: Cost
description: Understanding Temporal Cloud's consumption-based pricing model and tips for building cost-effective Workflows.
toc_max_heading_level: 3
keywords:
  - temporal cloud cost
  - temporal pricing
  - temporal actions
  - temporal storage
tags:
  - Best Practices
  - Knowledge Hub
---

:::info
This page is part of the [Temporal Knowledge Hub](./index.md).
:::

:::note
Add cost-saving tips to help developers optimize Temporal Cloud spending.
:::

As we scale our usage of Temporal Cloud, understanding the cost model is critical for designing cost-efficient workflows. Temporal Cloud is consumption-based, and its pricing is based on Action and Storage.

Our Enterprise contract covers base fees and support, but your specific namespace usage drives the variable costs.

## Action

Actions are the primary unit of consumption-based pricing for Temporal Cloud. They track billable operations within the Temporal Cloud Service.

### What counts as an Action?

* **Workflow Start**: Starting a Workflow execution.
* **Activity Start and Retry**: Starting and retrying an Activity.
* **Signals**: Sending a signal to a Workflow.
* **Timers**: A Timer firing.
* **Child Workflows**: Starting a Child Workflow.
* **Search Attribute upsert**: occurs for each invocation of `UpsertSearchAttributes` command

For a complete list of billable Actions, see [Temporal Cloud Actions](https://docs.temporal.io/cloud/actions).

### Cost-saving tip #1: Configure exponential backoff for Activity Retry

Ensure your Activity Retry Policy uses a `BackoffCoefficient` > 1.0 (e.g. 2.0) and a reasonable `MaximumInterval`.

**Why**: Each retry attempt counts as a billable Action. Aggressive, constant-interval retries during downstream outages will skyrocket Action usage and costs without progressing the workflow.

## Storage

Storage is charged based on Gigabyte-Hours (GB-h). There are two tiers:

1. **Active Storage (higher cost)**:
   * This is the storage used by `Open` workflows.
   * It is 40x more expensive than Retained storage.
2. **Retained Storage (lower cost)**:
   * This is the Event History of `Closed` Workflows.
   * We pay this to keep the history available for debugging (based on the Namespace Retention policy).

### Cost-saving tip #2: Use Continue-As-New for long-running Workflows

Trigger `ContinueAsNew` periodically (e.g. every ~4,000 events or daily) for long-running or indefinite workflows.

**Why**: This closes the current run, moving its Event History from Active Storage (expensive) to Retained Storage (cheap). This creates a ~97% reduction in storage costs for that history data.

## What's next

* [Temporal Cloud pricing](https://docs.temporal.io/cloud/pricing)
* [Temporal Cloud Actions](https://docs.temporal.io/cloud/actions)
