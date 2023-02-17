---
id: cancel-activity
title: Cancel an Activity from a Workflow
description: If an Activity is supposed to react to Cancellation.
sidebar_label: Cancel an Activity
tags:
  - guide-context
---

Cancelling an Activity from within a Workflow requires that the Activity Execution sends Heartbeats. If the Heartbeat is not set, the Activity cannot receive a cancellation request. To avoid this issue, Temporal recommends setting a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout) when executing an Activity to ensure that it remains responsive to the cancellation request.

When an Activity is cancelled, an error is raised in the Activity at the next available opportunity. Temporal recommends catching the error and perform clean-up logic to ensure that the task is properly completed.

:::note

Unlike regular Activities, Core-based [Local Activities](/concepts/what-is-a-local-activity) do not require Heartbeats to be cancelled. This is because they are handled locally and all the information needed to handle the cancellation logic is available in the same Worker process. As a result, Local Activities can be cancelled without the need for Heartbeats.

:::
