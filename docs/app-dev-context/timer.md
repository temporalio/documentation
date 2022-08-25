---
id: timer
title: How to create a Timer
description: Timers allow you you to schedule sleep functions.
sidebar_label: Timers
tags:
  - guide-context
  - timers
  - sleep
---

A Workflow can schedule a durable timer for a fixed time period. In some SDKs, the function is called `timer()`, and in others, it's called `sleep()`.

A Workflow can sleep for months, and even if your Worker crashes or Temporal Cluster goes down, Timers are persisted and will fire as scheduled. As soon as your Worker and Cluster are back up, your code will resume where it left off. Sleeping is a resource-light operation: it does not tie up the process, and you can run millions of Timers off a single Worker.
