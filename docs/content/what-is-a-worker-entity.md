---
id: what-is-a-worker-entity
title: What is a Worker Entity
description: A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.
tags:
  - explanation
---

A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.

A Worker Entity listens and polls on a single Task Queue.
A Worker Entity contains both a Workflow Worker and an Activity Worker so that it may make progress of either a Workflow Execution or an Activity Execution.
