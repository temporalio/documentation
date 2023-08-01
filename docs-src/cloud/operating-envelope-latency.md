---
id: operating-envelope-latency
title: What kind of latency can I expect from Temporal Cloud?
sidebar_label: Latency
description: Our latency SLO is 200ms per region for p99.
tags:
  - temporal cloud
  - operations
  - explanation
---

Our latency SLO is 200ms per region for p99.
In June 2023, latency measurements over a week period for starting and signaling Workflow Executions were:

- `StartWorkflowExecution`: 90ms p90, 125ms p99
- `SignalWorkflowExecution`: 53ms p90, 95ms p99
- `SignalWithStartWorkflowExecution`: 87ms p90, 116ms p99

As we continue working on improving latencies, these numbers will decrease over time

Concurrent operations on the same Workflow Execution could lead to increased latency.
