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

Temporal Cloud's latency SLO is 200ms per region for p99.
In June 2023, latency measurements over a week period for starting and signaling Workflow Executions were:

- `StartWorkflowExecution`: 90ms p90, 125ms p99
- `SignalWorkflowExecution`: 53ms p90, 95ms p99
- `SignalWithStartWorkflowExecution`: 87ms p90, 116ms p99

As Temporal continues working on improving latencies, these numbers will decrease over time.
Other system components, such as the Codec Server, egress proxy, and the network itself, impact the latency observed from the Temporal Client.
Concurrent operations on the same Workflow Execution could lead to increased latency.
