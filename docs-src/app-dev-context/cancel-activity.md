---
id: cancel-activity
title: Cancel an Activity from a Workflow
description: An Activity can be canceled from within a Workflow if the Activity sends Heartbeats.
sidebar_label: Cancel an Activity
tags:
  - guide-context
---

Canceling an Activity from within a Workflow requires that the Activity Execution sends Heartbeats and sets a Heartbeat Timeout.
If the Heartbeat is not invoked, the Activity cannot receive a cancellation request.
When any non-immediate Activity is executed, the Activity Execution should send Heartbeats and set a [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout) to ensure that the server knows it is still working.

When an Activity is canceled, an error is raised in the Activity at the next available opportunity.
If cleanup logic needs to be performed, it can be done in a `finally` clause or inside a caught cancel error.
However, for the Activity to appear canceled the exception needs to be re-raised.

:::note

Unlike regular Activities, [Local Activities](/concepts/what-is-a-local-activity) can be canceled if they don't send Heartbeats.
Local Activities are handled locally, and all the information needed to handle the cancellation logic is available in the same Worker process.

:::
