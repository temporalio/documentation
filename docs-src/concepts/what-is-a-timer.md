---
id: what-is-a-timer
title: What is a Timer?
sidebar_label: Timer
description: A Workflow can set a durable timer for a fixed time.
tags:
  - term
  - explanation
---

A Workflow can set a durable timer for a fixed time.
Timers in Temporal are persisted, meaning that even if your Worker or Temporal Cluster is down when the time period completes, as soon as your Worker and Cluster are back up, the `sleep()` or `timer()` call will resolve and your code will continue executing.
This makes it a reliable and resource-light operation that does not tie up the process, and you can run millions of Timers off a single Worker.

- [How to set Timers in Go](/go/timers)
- [How to set Timers in Java](/java/timers)
- [How to set Timers in PHP](/php/timers)
- [How to set Timers in Python](/python/timers)
- [How to set Timers in TypeScript](/typescript/timers)

The duration of a Timer is fixed, and your Workflow might specify a value as short as one second or as long as several years.
Although it's possible to specify an extremely precise duration, such as 36 milliseconds or 15.072 minutes, your Workflows should not rely on sub-second accuracy for Timers.
We recommend that you consider the duration as a minimum time, one which will be rounded up slightly due to the latency involved with scheduling and firing the Timer.
For example, setting a Timer for 11.97 seconds is guaranteed to delay execution for at least that long, but will likely be closer to 12 seconds in practice.
