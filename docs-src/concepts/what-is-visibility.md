---
id: what-is-visibility
title: What is Visibility?
sidebar_label: Visibility
description: The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.
tags:
  - term
---

The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Cluster.

When a Workflow Execution is triggered, data related to the Workflow Execution is persisted to the Visibility store.
For example, the following objects are persisted in the Workflow Execution Event History:

- Inputs and outputs/results in your [Workflow](/concepts/what-is-a-workflow-execution), [Activity](/concepts/what-is-an-activity-execution), and [Child Workflow](/concepts/what-is-a-child-workflow-execution)
- Inputs to your [Signal](/concepts/what-is-a-signal)
- Metadata information associated with the Workflow Execution
- Results of [Local Activity](/concepts/what-is-a-local-activity), [Side Effects](/concepts/what-is-a-side-effect)
- [Search Attributes](/concepts/what-is-a-search-attribute)
- Results from your [Query](/concepts/what-is-a-query)
- [Memo](/concepts/what-is-a-memo)
- [Application errors and failures](/kb/failures)
