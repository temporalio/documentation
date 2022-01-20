---
id: what-is-continue-as-new
title: What is Continue As New
sidebar_label: Continue As New
description: Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.
tags:
  - explanation
  - continue-as-new
---

Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.

The reason why this exists is to prevent a Workflow Execution Event History from becoming too large.
As a precautionary measure, the Temporal Platform limits Event Histories to 50,000 and will warn you every 10,000 Events.

All values passed to a Workflow Execution through parameters or returned through a result value are recorded into the Event History.
A Temporal Cluster stores the full Event History of a Workflow Execution for duration of a Namespace's retention period.
A Workflow Execution that periodically executes a large number of Activities has the potential of hitting the size limit.

A very large Event History can adversely performance of a Workflow Execution.
For example, in the case of a Workflow Worker failure, the full Event History must be pulled from the Temporal Cluster and given to another Worker via a Workflow Task.
If the Event history is very large, it may take some time to load it.

The Continue-As-New feature enables developers to complete the current Workflow Execution and start a new one atomically.

The new Workflow Execution has the same Workflow Id, but a different Run Id, and has its own Event History.

In the case of [Temporal Cron Jobs](/docs/content/what-is-a-temporal-cron-job), Continue-As-New is actually used internally for the same effect.

- [How to Continue-As-New in Go](/docs/go/how-to-continue-as-new-in-go)
