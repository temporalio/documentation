---
id: what-is-a-heartbeat-timeout
title: What is a Heartbeat Timeout?
sidebar_label: Heartbeat Timeout
description: A Heartbeat Timeout is the maximum time between Activity Heartbeats.
tags:
  - term
  - explanation
  - timeouts
---

A Heartbeat Timeout is the maximum time between [Activity Heartbeats](/concepts/what-is-an-activity-heartbeat).

- [How to set a Heartbeat Timeout using the Go SDK](/go/heartbeat-timeout)
- [How to set a Heartbeat Timeout using the Java SDK](/java/heartbeat-timeout)
- [How to set a Heartbeat Timeout using the PHP SDK](/php/heartbeat-timeout)
- [How to set a Heartbeat Timeout using the Python SDK](/python/heartbeat-timeout)
- [How to set a Heartbeat Timeout using the TypeScript SDK](/typescript/heartbeat-timeout)

![Heartbeat Timeout periods](/diagrams/heartbeat-timeout.svg)

If this timeout is reached, the Activity Task fails and a retry occurs if a [Retry Policy](/concepts/what-is-a-retry-policy) dictates it.
