---
id: timer
title: How to create a Timer
description: Timers allow you you to schedule sleep functions.
sidebar_label: Tracing
tags:
  - guide-context
  - timers
  - sleep
---

You can schedule a durable timer for a fixed time period on the Temporal service.

A Workflow can sleep for months, and even if your Worker crashes or Temporal Cluster is down, timers and timeouts are persisted and will fire as scheduled. As soon as your Worker and Cluster are back up, your code will appear to resume where it left off. This also means that sleeping or retrying code does not tie up the process - you can run thousands of timers off a single Worker.
