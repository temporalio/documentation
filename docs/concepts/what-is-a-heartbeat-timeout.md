---
id: what-is-a-heartbeat-timeout
title: What is a Heartbeat Timeout?
sidebar_label: Heartbeat Timeout
description: A Heartbeat Timeout is the maximum time between Activity Heartbeats.
tags:
  - explanation
  - timeouts
---

A Heartbeat Timeout is the maximum time between [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat).

![Heartbeat Timeout periods](/diagrams/heartbeat-timeout.svg)

If this timeout is reached, the Activity Execution changes to a Failed status, and will retry if a Retry Policy dictates it.

- [How to set a Heartbeat Timeout in Go](/go/activityoptions-reference/#heartbeattimeout)
