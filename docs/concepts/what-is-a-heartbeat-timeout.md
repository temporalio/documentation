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

- [How to set a Heartbeat Timeout](/application-development-guide/#heartbeat-timeout)

![Heartbeat Timeout periods](/diagrams/heartbeat-timeout.svg)

If this timeout is reached, the Activity Task fails and a retry occurs if a [Retry Policy](/concepts/what-is-a-retry-policy) dictates it.
