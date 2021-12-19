---
id: how-to-send-a-cancellation-request-to-an-activity-execution-in-go
title: How to send a Cancellation Request to an Activity Execution in Go
sidebar_label: Sending Cancellation Requests - Activities
description: todo
tags:
  - developer-guide
  - go
---

- [What is a Cancellation Request](/docs/content/what-is-a-cancellation-request)

`ctx.Done()` is only signaled when a heartbeat is sent to the service.
Temporal's SDK throttles this so a heartbeat may not be sent to the service until 80% of the heartbeat timeout has elapsed.

For example, if your heartbeat timeout is 20 seconds, `ctx.Done()` will not be signaled until 80% of 20 seconds (~16 seconds) has elapsed.
To increase or decrease the delay of cancelation, modify the heartbeat timeout defined for the activity context.
