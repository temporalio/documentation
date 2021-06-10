---
id: production-deployment
title: Temporal Server self-hosted production deployment
sidebar_label: Production deployment
---

## Overview

While a lot of effort has been made to easily run and test the Temporal Server in a development environment (see the [Quick install guide](/docs/server/quick-install)), there is far less of an established framework for deploying Temporal to a live (production) environment.
That is because the set up of the Server depends very much on the intended use-case and the hosting infrastructure.

This page is dedicated to providing a "first principles" approach to self-hosting the Temporal Server.
As a reminder, experts are accessible via the [Community forum](https://community.temporal.io/) and [Slack](https://join.slack.com/t/temporalio/shared_invite/zt-onhti57l-J0bl~Tr7MqSUnIc1upjRkw) should you have any questions.

## Setup principles

### Prerequisites

The Temporal Server is a Go application which you can [import](https://docs.temporal.io/docs/server/options) or run as a binary.

The minimum dependency is a database.
The Server supports [Cassandra](https://cassandra.apache.org/), [MySQL](https://www.mysql.com/), or [PostgreSQL](https://www.postgresql.org/).
Further dependencies are only needed to support optional features.
For example, enhanced Workflow search can be achieved using [ElasticSearch](/docs/server/elasticsearch-setup).
And, monitoring and observability are available with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/).

See the [versions & dependencies page](/docs/server/versions-and-dependencies/) for precise versions we support together with these features.

### Configuration

At minimum, the `development.yaml` file needs to have the [`global`](/docs/server/configuration/#global) and [`persistence`](https://docs.temporal.io/docs/server/configuration/#persistence) parameters defined.

The [Server configuration reference](/docs/server/configuration) has a more complete list of possible parameters.

Make sure to set Workflow and Activity timeouts everywhere.

### Scaling and Metrics

The requirements of your Temporal system will vary widely based on your intended production workload.
You will want to run your own proof of concept tests and watch for key metrics to understand the system health and scaling needs.

- **[Configure your metrics subsystem](https://docs.temporal.io/docs/server/configuration/#metrics).** Temporal supports three metrics providers out of the box: [StatsD](https://github.com/statsd/statsd), [Prometheus](https://prometheus.io/), and [M3](https://m3db.io/), via [Uber's Tally](https://github.com/uber-go/tally) interface.
  Tally offers [extensible custom metrics reporting](https://github.com/uber-go/tally#report-your-metrics), which we expose via [`temporal.WithCustomMetricsReporter`](https://docs.temporal.io/docs/server/options/#withcustommetricsreporter).
  OpenTelemetry support is planned in future. 
- **Set up monitoring.** You can use these [Grafana dashboards](https://github.com/temporalio/dashboards) as a starting point. The single most important metric to track is `ScheduleToStart` latency - if you get a spike in workload and don't have enough workers, your tasks will get backlogged. **We strongly recommend setting alerts for this metric**.
- **Load testing.** You can use [Maru](https://github.com/temporalio/maru/) ([author's guide here](https://mikhail.io/2021/03/maru-load-testing-tool-for-temporal-workflows/)), see how we ourselves [stress test Temporal](https://docs.temporal.io/blog/temporal-deep-dive-stress-testing/), or write your own.

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
  Additional information is available in [this forum post](https://community.temporal.io/t/metrics-for-monitoring-server-performance/536/3).

Temporal is highly scalable due to its event sourced design.
We have load tested up to 200 million concurrent Workflow Executions.
Every shard is low contention by design and it is very difficult to oversubscribe to a Task Queue in the same cluster.
With that said, here are some guidelines to some common bottlenecks:

- Usually the limiting factor to scaling is the database connection getting saturated; therefore you will want to monitor `ScheduleToStart` latency to look out for this.
- Temporal Server's Frontend service is more CPU bound, whereas the History and Matching services require more memory.
- See the **Server Limits** section below for other limits you will want to monitor, including event history length.

### FAQ: Autoscaling Workers based on Task Queue load

Temporal does not yet support returning the number of tasks in a task queue.
The main technical hurdle is that each task can have its own `ScheduleToStart` timeout, so just counting how many tasks were added and consumed is not enough.

This is why we recommend tracking `ScheduleToStart` latency for determining if the task queue has a backlog (aka Workers are under-provisioned for a given Task Queue).
When workers are able to keep up, the latency is close to zero.
The default is 4 Workers, which should handle no more than 300 messages per second.
Scaling will depend on your workload — for example, for a Task Queue with 500 messages per second, you might want to scale up to 10 workers.

We do plan to add features that give more visibility into the task queue state in future.

## Server limits

Running into limits can cause unexpected failures, so be mindful when you design your systems.
Here is a comprehensive list of all the hard (error) / soft (warn) server limits relevant to operating Temporal:

- **GRPC**: GRPC has 4MB size limit ([per each message received](https://github.com/grpc/grpc/blob/v1.36.2/include/grpc/impl/codegen/grpc_types.h#L466))
- **Event Batch Size**: The `DefaultTransactionSizeLimit` limit is [4MB](https://github.com/temporalio/temporal/pull/1363).
  This is the largest transaction size we allow for event histories to be persisted.
  - This is configurable with `TransactionSizeLimit`, if you know what you are doing.
- **Blob size limit**: For incoming payloads (including Workflow context) - _[source](https://github.com/temporalio/temporal/blob/v1.7.0/service/frontend/service.go#L133-L134)_
  - we warn at 512KB: [`Blob size exceeds limit.`](https://github.com/temporalio/temporal/blob/fee1c43823699e90b330680a8efeb9d8dbee8cf3/common/util.go#L568)
  - we error at 2MB: `ErrBlobSizeExceedsLimit: Blob data size exceeds limit.`
  - This is configurable with [`BlobSizeLimitError` and `BlobSizeLimitWarn`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L378-L379), if you know what you are doing.
- **History total size limit**: (leading to a terminated Workflow Execution)
  - We warn at 10MB: `history size exceeds warn limit.`
  - We error at 50mb: [`history size exceeds error limit.`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/workflowExecutionContext.go#L1204)
  - This is configurable with [`HistorySizeLimitError` and `HistorySizeLimitWarn`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L380-L381), if you know what you are doing.
- **History total count limit**: (leading to a terminated Workflow Execution)
  - We warn at 10,000 events: `history size exceeds warn limit.`
  - We error at 50,000 events: [`history size exceeds error limit.`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/workflowExecutionContext.go#L1204)
  - This is configurable with [`HistoryCountLimitError` and `HistoryCountLimitWarn`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L382-L383), if you know what you are doing.
- **Search Attributes**:
  - **Number of Search Attributes**: max 100
  - **Single Search Attribute Size**: 2KB
  - **Total Search Attribute Size**: 40KB
  - This is configurable with [`SearchAttributesNumberOfKeysLimit`, `SearchAttributesTotalSizeLimit` and `SearchAttributesSizeOfValueLimit`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L440-L442), if you know what you are doing.

## Debugging Temporal

### Debugging Temporal Server Configs

Recommended configuration debugging techniques for production Temporal Server setups:

- Containers (to be completed)
- Storage (to be completed)
- Networking
  - [Temporal cluster unable to establish ring membership, causing an infinite crash loop](https://community.temporal.io/t/crash-loop-of-history-service-in-k8s-cluster/2015): Use `tcurl` to audit it

### Debugging Workflows

We recommend [using Temporal Web to debug your Workflow Executions](https://docs.temporal.io/docs/system-tools/web-ui) in development and production.

### Future content

Topics this document will cover in future: (for now, please search/ask on the forum)

- Recommended Environment
  - Staging/Test
  - using Temporal Web
- More on Monitoring/Prometheus/Logging
  - Give guidance on how to set up alerts on Metrics provided by SDK
- Setting up alerts for Workflow Task failures
- Temporal Antipatterns
  - Trying to implement a queue in a workflow (because people hear we replace queues)
  - Serializing massive amounts of state into and out of the workflow.
  - Treating everything as incredibly rigid/linear sequence of steps instead of dynamic logic
  - Implementing a DSL which is actually just a generic schema based language
  - Polling in activities instead of using signals
  - Blocking on incredibly long RPC requests and not using heartbeats
  - Failing/retrying workflows without a very very specific business reason
- Temporal Best practices
  - Mapping things to entities instead of traditional service design
  - Testing: unit, integration
  - Retries: figuring out right values for timeouts
  - Versioning
  - WF as unit of scalability - break things into workflows to scale, don't stuff everything in one workflow!

## Further Reading

Understanding the [Temporal Server architecture](https://docs.temporal.io/docs/server-architecture/) can help you debug and troubleshoot production deployment issues.

## External Runbooks

Third party content that may help:

- [Recommended Setup for Running Temporal with Cassandra on Production (Temporal Forums)](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
- [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)
- ECS runbook (_to be completed_)
- EKS runbook (_to be completed_)
