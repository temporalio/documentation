---
id: cancel-activity
title: Cancel an Activity from a Workflow
description: If an Activity is supposed to react to Cancellation.
sidebar_label: Cancel an Activity
tags:
  - guide-context
---

Cancelling an Activity from within a Workflow requires that the Activity Execution sends Heartbeats and sets a Heartbeat Timeout. If the Heartbeat is not invoked, the Activity cannot receive a cancellation request. Users should set Heartbeat and set a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout) when executing any non-immediate Activity to ensure the server knows it is still working.

When an Activity is cancelled, an error is raised in the Activity at the next available opportunity. If cleanup logic needs to be performed, it can be done in a `finally` clause or inside a caught cancel error, but in order for the Activity to appear cancelled the exception needs to be re-raised.

:::note

Unlike regular Activities, [Local Activities](/concepts/what-is-a-local-activity) do not require Heartbeats to be cancelled. This is because they are handled locally and all the information needed to handle the cancellation logic is available in the same Worker process. As a result, Local Activities can be cancelled without the need for Heartbeats.

:::
