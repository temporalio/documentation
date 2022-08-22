---
id: async-activity-completion
title: How to asynchronously complete an Activity
description: Asynchronous Activity Completion enables the Activity Function to return without the Activity Execution completing.
sidebar_label: Asynchronous Activity Completion
tags:
  - guide-context
---

[Asynchronous Activity Completion](/concepts/what-is-asynchronous-activity-completion) enables the Activity Function to return without the Activity Execution completing.

There are three steps to follow:

1. The Activity provides the external system with identifying information needed to complete the Activity Execution.
   Identifying information can be a [Task Token](/concepts/what-is-a-task-token), or a combination of Namespace, Workflow Id, and Activity Id.
2. The Activity Function completes in a way that identifies it as waiting to be completed by an external system.
3. The Temporal Client is used to Heartbeat and complete the Activity.
