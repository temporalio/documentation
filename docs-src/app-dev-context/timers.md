---
id: timers
title: What is a Timer?
description: A Timer lets a Workflow sleep for a fixed time period.
sidebar_label: Timers
tags:
  - guide-context
  - timers
  - sleep
---

A Workflow can set a durable timer for a fixed time period.
In some SDKs, the function is called `sleep()`, and in others, it's called `timer()`.

A Workflow can sleep for months.
Even if your Worker crashes or your Temporal Cluster goes down, Timers are persisted and will fire as set.
As soon as your Worker and Cluster are running, your code resumes where it left off.

Sleeping is a resource-light operation: it does not tie up the process, and you can run millions of Timers off a single Worker.
