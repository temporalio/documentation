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
Latency is greatly influenced by the actual throughput of a single [Workflow Execution](/concepts/what-is-a-workflow-execution).
Concurrent operations on the same Workflow Execution could lead to increased latency.

Typical latency for starting and signaling Workflow Executions is less than 100ms.
