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

Temporal Cloud has a p99 latency SLO of 200ms per region.

In March 2024, latency over a week-long period for starting and signaling Workflow Executions was as follows:

| Operation                          | p90  |  p99 |
| :--------------------------------- | :--: | ---: |
| `StartWorkflowExecution`           | 24ms | 54ms |
| `SignalWorkflowExecution`          | 14ms | 40ms |
| `SignalWithStartWorkflowExecution` | 24ms | 61ms |

As Temporal continues working on improving latencies, these numbers will progressively decrease.

Latency observed from the Temporal Client is influenced by other system components like the Codec Server, egress proxy, and the network itself.
Also, concurrent operations on the same Workflow Execution may result in higher latency.
