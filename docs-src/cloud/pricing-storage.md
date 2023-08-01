---
id: pricing-storage
title: What are the Temporal Cloud storage prices?
sidebar_label: Storage
description: Temporal Cloud pricing information
tags:
  - pricing
  - temporal cloud
  - storage
  - explanation
---

An execution of a particular Workflow could exist for a few seconds, a day, month, or even forever. Temporal collects the Event History during this time and dispatches work when necessary. In this context, a Workflow Execution has only two states, open (active) or closed.

Storage costs are measured in gigabyte-hours (GBh) and include charges for active Workflows, "running" storage, and the long-term, "retained" storage of Event Histories of closed Workflows. These are measured per Namespace.

Running storage is a measure of the amount of storage used to store active Workflows. When the execution of a Workflow ends, Temporal Cloud stores Event History for a defined Retention Period, for historical use. This is retained storage. Typical uses include compliance, debugging, workload refresh, and business analytics. Both kinds of storage have fixed costs.

| **Storage** | **Cost per GBh** |
| ----------- | ---------------- |
| Retained    | $0.00042         |
| Running     | $0.042           |

If you purchase Temporal Cloud credits (as outlined earlier), running storage costs are tiered and measured in gigabyte-hours.

| **Running storage** | **Cost per GBh** |
| ------------------- | ---------------- |
| Less than 10        | $0.042           |
| 10 to 39            | $0.031           |
| 40 to 119           | $0.023           |
| 120 to 499          | $0.018           |
| 500 to 1999         | $0.013           |
| 2000 or more        | $0.010           |
