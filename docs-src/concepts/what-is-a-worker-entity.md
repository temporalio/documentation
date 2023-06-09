---
id: what-is-a-worker-entity
title: What is a Worker Entity?
sidebar_label: Worker Entity
description: A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.
tags:
  - term
  - explanation
---

A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.

A Worker Entity listens and polls on a single Task Queue.
A Worker Entity contains a Workflow Worker and/or an Activity Worker, which make progress on Workflow Executions and Activity Executions, respectively.

**Can a Worker handle more Workflow Executions than its cache size or number of supported threads?**

Yes it can.
However, the trade off is added latency.

Workers are stateless, so any Workflow Execution in a blocked state can be safely removed from a Worker.
Later on, it can be resurrected on the same or different Worker when the need arises (in the form of an external event).
Therefore, a single Worker can handle millions of open Workflow Executions, assuming it can handle the update rate and that a slightly higher latency is not a concern.

**Operation guides:**

- [How to tune Workers](/dev-guide/worker-performance)
