---
id: cancel-activity
title: Cancel an Activity from a Workflow
description: If an Activity is supposed to react to Cancellation.
sidebar_label: Cancel an Activity
tags:
  - guide-context
---

Cancelling an Activity requires that the Activity is Heartbeating. If the Heartbeat is not set, then the Activity cannot receive a cancellation request. It is recommended to set a Heartbeat Timeout when executing an Activity.

When an Activity is cancelled, an error will be raised in the Activity at the next opportunity.
It is recommended to catch the error and perform clean-up logic to complete the task.