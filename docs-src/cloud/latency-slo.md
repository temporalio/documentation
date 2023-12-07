---
id: latency-slo
title: Latency Service Level Objective (SLO)
sidebar_label: Latency
description: Temporal Cloud's latency SLO is 200ms per region for p99.
tags:
  - temporal cloud
  - operations
  - explanation
---

**What kind of latency can I expect from Temporal Cloud?**

Temporal Cloud aims for a latency SLO of 200ms per region for p99.
In June 2023, Temporal measured latency over a week-long period for starting and signaling Workflow Executions as follows:

- For `StartWorkflowExecution`: p90 latency was 90ms, and p99 latency was 125ms.
- For `SignalWorkflowExecution`: p90 latency was 53ms, and p99 latency was 95ms.
- For `SignalWithStartWorkflowExecution`: p90 latency was 87ms, and p99 latency was 116ms.

As Temporal continues working on improving latencies, these numbers will progressively decrease.

Latency observed from the Temporal Client is influenced by other system components like the Codec Server, egress proxy, and the network itself.
Increased latency might result from concurrent operations on the same Workflow Execution.
