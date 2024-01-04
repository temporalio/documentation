---
id: pricing-storage
title: What are the Temporal Cloud storage prices?
sidebar_label: Storage
description: Pricing for Temporal Cloud storage.
tags:
  - pricing
  - temporal cloud
  - storage
  - explanation
---

An execution of a particular Workflow could exist for a few seconds, a day, month, or even forever. Temporal collects the Event History during this time and dispatches work when necessary. In this context, a Workflow Execution has only two states, open (active) or closed.

Storage costs are measured in gigabyte-hours (GBh) and include charges for active Workflows, active storage, and the long-term, "retained" storage of Event Histories of closed Workflows. These are measured per Namespace.

_Active storage_ is a measure of the amount of storage used to store active Workflows.

When the execution of a Workflow ends, Temporal Cloud stores Event History for a defined Retention Period, for historical use. This is _retained storage_. Typical uses include compliance, debugging, workload refresh, and business analytics. Both kinds of storage have fixed costs.

| **Storage** | **Cost per GBh** |
| ----------- | ---------------- |
| Retained    | $0.00042         |
| Active      | $0.042           |

If you purchase Temporal Cloud credits (as outlined earlier), active storage costs are tiered and measured in gigabyte-hours.

| **Active storage**           | **Cost per GBh per Namespace** |
| ---------------------------- | ------------------------------ |
| Up to 7,000                  | $0.039                         |
| Over 7,000 up to 30,000      | $0.031                         |
| Over 30,000 up to 90,000     | $0.023                         |
| Over 90,000 up to 400,000    | $0.018                         |
| Over 400,000 up to 1,500,000 | $0.013                         |
| Over 1,500,000               | $0.010                         |
