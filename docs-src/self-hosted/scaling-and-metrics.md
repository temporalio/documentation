---
id: scaling-and-metrics
title: Scaling and Metrics
sidebar_label: Scaling and Metrics
description: The requirements of your Temporal system will vary widely based on your intended production workload.
tags:
  - scaling
  - metrics
  - production-readiness
---

The requirements of your Temporal system will vary widely based on your intended production workload.
You will want to run your own proof of concept tests and watch for key metrics to understand the system health and scaling needs.

**Load testing.** You can use [the Maru benchmarking tool](https://github.com/temporalio/maru/) ([author's guide here](https://mikhail.io/2021/03/maru-load-testing-tool-for-temporal-workflows/)), see how we ourselves [stress test Temporal](https://temporal.io/blog/temporal-deep-dive-stress-testing/), or write your own.

All metrics emitted by the server are [listed in Temporal's source](https://github.com/temporalio/temporal/blob/main/common/metrics/defs.go).
There are also equivalent metrics that you can configure from the client side.
At a high level, you will want to track these 3 categories of metrics:

- **Service metrics**: For each request made by the service handler we emit `service_requests`, `service_errors`, and `service_latency` metrics with `type`, `operation`, and `namespace` tags.
  This gives you basic visibility into service usage and allows you to look at request rates across services, namespaces and even operations.
- **Persistence metrics**: The Server emits `persistence_requests`, `persistence_errors` and `persistence_latency` metrics for each persistence operation.
  These metrics include the `operation` tag such that you can get the request rates, error rates or latencies per operation.
  These are super useful in identifying issues caused by the database.
- **Workflow Execution stats**: The Server also emits counters for when Workflow Executions are complete.
  These are useful in getting overall stats about Workflow Execution completions.
  Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate` and `workflow_cancel` counters for each type of Workflow Execution completion.
  These include the `namespace` tag.
