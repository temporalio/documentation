---
id: production-deployment
title: Temporal Server self-hosted production deployment
sidebar_label: Production deployment
---

## Overview

While a lot of effort has been made to easily run and test the Temporal Server in a development environment (see the [Quick install guide](/clusters/quick-install)), there is far less of an established framework for deploying Temporal to a live (production) environment.
That is because the set up of the Server depends very much on your intended use-case and the hosting infrastructure.

This page is dedicated to providing a "first principles" approach to self-hosting the Temporal Server.
As a reminder, experts are accessible via the [Community forum](https://community.temporal.io/) and [Slack](https://temporal.io/slack) should you have any questions.

:::info

If you are interested in a fully managed service hosting Temporal Server, please [register your interest in Temporal Cloud](https://temporal.io/cloud). We have a waitlist for early Design Partners.

:::

## Temporal Server

Temporal Server is a Go application which you can [import](/references/server-options) or run as a binary (we offer [builds with every release](https://github.com/temporalio/temporal/releases)).

If you are running only the Go binary, Go is not required.

But if you are building Temporal or running it from source, [Go v1.16+ is required](https://github.com/temporalio/temporal/blob/master/CONTRIBUTING.md).

While Temporal can be run as a single Go binary, we recommend that production deployments of Temporal Server should deploy each of the 4 internal services separately (if you are using Kubernetes, one service per pod) so they can be scaled independently in future.

See below for a refresher on the 4 internal services:

<details>
<summary>
Temporal Cluster Architecture
</summary>

import WhatIsCluster from "../concepts/what-is-a-temporal-cluster.md"

<WhatIsCluster />

</details>

In practice, this means you will run each container with a flag specifying each service, e.g.

```bash
docker run
    # persistence/schema setup flags omitted
    -e SERVICES=history \                      -- Spinup one or more of: history, matching, worker, frontend
    -e LOG_LEVEL=debug,info \                           -- Logging level
    -e DYNAMIC_CONFIG_FILE_PATH=config/foo.yaml         -- Dynamic config file to be watched
    temporalio/server:<tag>
```

[See the Docker source file](https://github.com/temporalio/temporal/tree/master/docker) for more details.

Each release also ships a `Server with Auto Setup` Docker image that includes [an `auto-setup.sh` script](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) we recommend using for initial schema setup of each supported database. You should familiarize yourself with [what auto-setup does](https://temporal.io/blog/auto-setup), as you will likely be replacing every part of the script to customize for your own infrastructure and tooling choices.

Though **neither are blessed for production use**, you can consult our [Docker-Compose repo](https://github.com/temporalio/docker-compose) or [Helm Charts](https://github.com/temporalio/helm-charts) for more hints on configuration options.

## Minimum Requirements

- The minimum Temporal Server dependency is a database. We support [Cassandra](https://cassandra.apache.org/), [MySQL](https://www.mysql.com/), or [PostgreSQL](https://www.postgresql.org/), with [SQLite on the way](https://github.com/temporalio/temporal/pulls?q=is%3Apr+sort%3Aupdated-desc+sqlite+).
- Further dependencies are only needed to support optional features. For example, enhanced Workflow search can be achieved using [Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).
- Monitoring and observability are available with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/).
- Each language SDK also has minimum version requirements. See the [versions & dependencies page](/clusters/) for precise versions we support together with these features.

Kubernetes is not required for Temporal, but it is a popular deployment platform anyway.
We do maintain [a Helm chart](https://github.com/temporalio/helm-charts) you can use as a reference, but you are responsible for customizing it to your needs.
We also [hosted a YouTube discussion](https://www.youtube.com/watch?v=11I87HKS_NM) on how we think about the Kubernetes ecosystem in relation to Temporal.

## Configuration

At minimum, the `development.yaml` file needs to have the [`global`](/references/configuration/#global) and [`persistence`](/references/configuration/#persistence) parameters defined.

The [Server configuration reference](/references/configuration) has a more complete list of possible parameters.

:::warning Before you deploy: Reminder on shard count

A huge part of production deploy is understanding current and future scale - the **number of shards can't be changed after the cluster is in use** so this decision needs to be upfront. Shard count determines scaling to improve concurrency if you start getting lots of lock contention.
The default `numHistoryShards` is 4; deployments at scale can go up to 500-2000 shards.
Please [consult our configuration docs](/references/configuration/#persistence) and check with us for advice if you are worried about scaling.

:::

## Scaling and Metrics

The requirements of your Temporal system will vary widely based on your intended production workload.
You will want to run your own proof of concept tests and watch for key metrics to understand the system health and scaling needs.

- **[Configure your metrics subsystem](/references/configuration/#metrics).** Temporal supports three metrics providers out of the box via [Uber's Tally](https://github.com/uber-go/tally) interface: [StatsD](https://github.com/statsd/statsd), [Prometheus](https://prometheus.io/), and [M3](https://m3db.io/).
  Tally offers [extensible custom metrics reporting](https://github.com/uber-go/tally#report-your-metrics), which we expose via [`temporal.WithCustomMetricsReporter`](/references/server-options#withcustommetricsreporter).
  OpenTelemetry support is planned in the future.
- **Set up monitoring.** You can use these [Grafana dashboards](https://github.com/temporalio/dashboards) as a starting point.
  The single most important metric to track is `schedule_to_start_latency` - if you get a spike in workload and don't have enough workers, your tasks will get backlogged. **We strongly recommend setting alerts for this metric**. This is usually emitted in client SDKs as both `temporal_activity_schedule_to_start_latency_*` and `temporal_workflow_task_schedule_to_start_latency_*` variants - see [the Prometheus GO SDK example](https://github.com/temporalio/samples-go/pull/65) and the [Go SDK source](https://community.temporal.io/t/strategies-for-scaling-aws-services/1577) and there are [plans to add it on the Server](https://github.com/temporalio/temporal/issues/1754).
  - Set up alerts for Workflow Task failures.
  - Also set up monitoring/alerting for all Temporal Workers for standard metrics like CPU/Memory utilization.
- **Load testing.** You can use [the Maru benchmarking tool](https://github.com/temporalio/maru/) ([author's guide here](https://mikhail.io/2021/03/maru-load-testing-tool-for-temporal-workflows/)), see how we ourselves [stress test Temporal](https://temporalio/blog/temporal-deep-dive-stress-testing/), or write your own.

All metrics emitted by the server are [listed in Temporal's source](https://github.com/temporalio/temporal/blob/master/common/metrics/defs.go).
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

Please request any additional information in [our forum](https://community.temporal.io). Key discussions are here:

- https://community.temporal.io/t/metrics-for-monitoring-server-performance/536/3
- https://community.temporal.io/t/guidance-on-creating-and-interpreting-grafana-dashboards/493

## Checklist for Scaling Temporal

Temporal is highly scalable due to its event sourced design.
We have load tested up to 200 million concurrent Workflow Executions.
Every shard is low contention by design and it is very difficult to oversubscribe to a Task Queue in the same cluster.
With that said, here are some guidelines to some common bottlenecks:

- **Database**. The vast majority of the time the database will be the bottleneck. **We highly recommend setting alerts on `schedule_to_start_latency`** to look out for this. Also check if your database connection is getting saturated.
- **Internal services**. The next layer will be scaling the 4 internal services of Temporal ([Frontend, Matching, History, and Worker](/concepts/what-is-a-temporal-cluster)).
  Monitor each accordingly. The Frontend Service is more CPU bound, whereas the History and Matching Services require more memory.
  If you need more instances of each service, spin them up separately with different command line arguments. You can learn more cross referencing [our Helm chart](https://github.com/temporalio/helm-charts) with our [Server Configuration reference](/references/configuration/).
- See [Platform limits](/kb/temporal-platform-limits-sheet) for other limits you will want to keep in mind when doing system design, including event history length.

Please see the dedicated docs on [Tuning and Scaling Workers](/application-development/worker-performance).

## FAQs

### FAQ: Autoscaling Workers based on Task Queue load

Temporal does not yet support returning the number of tasks in a task queue.
The main technical hurdle is that each task can have its own `ScheduleToStart` timeout, so just counting how many tasks were added and consumed is not enough.

This is why we recommend tracking `schedule_to_start_latency` for determining if the task queue has a backlog (aka your Workflow and Activity Workers are under-provisioned for a given Task Queue).
We do plan to add features that give more visibility into the task queue state in future.

### FAQ: High Availability cluster configuration

You can set up a high availability deployment by running more than one instance of the server. Temporal also handles [membership and routing](https://temporal.io/blog/workflow-engine-principles/#membership-and-routing-1350). You can find more details in [the `clusterMetadata` section of the Server Configuration reference](/references/configuration/#clustermetadata).

```yaml
clusterMetadata:
  enableGlobalNamespace: false
  failoverVersionIncrement: 10
  masterClusterName: "active"
  currentClusterName: "active"
  clusterInformation:
    active:
      enabled: true
      initialFailoverVersion: 0
      rpcAddress: "127.0.0.1:7233"
```

### FAQ: Multiple deployments on a single cluster

You may sometimes want to have multiple parallel deployments on the same cluster, eg:

- when you want to split Temporal deployments based on namespaces, e.g. staging/dev/uat, or for different teams who need to share common infrastructure.
- when you need a new deployment to change `numHistoryShards`.

**We recommend not doing this if you can avoid it**. If you need to do it anyway, double-check the following:

- Have a separate persistence (database) for each deployment
- Cluster membership ports should be different for each deployment (they can be set through environment variables). For example:
  - Temporal1 services can have 7233 for frontend, 7234 for history, 7235 for matching
  - Temporal2 services can have 8233 for frontend, 8234 for history, 8235 for matching
- There is no need to change gRPC ports.

[More details about the reason here](https://github.com/temporalio/temporal/issues/1234).

## Securing Temporal

Please see our dedicated docs on [Temporal Server Security](/server/security).

## Debugging Temporal

### Debugging Temporal Server Configs

Recommended configuration debugging techniques for production Temporal Server setups:

- Containers (to be completed)
- Storage (to be completed)
- Networking
  - [Temporal cluster unable to establish ring membership, causing an infinite crash loop](https://community.temporal.io/t/crash-loop-of-history-service-in-k8s-cluster/2015): Use `tcurl` to audit it

### Debugging Workflows

We recommend [using Temporal Web to debug your Workflow Executions](/web-ui) in development and production.

### Tracing Workflows

Temporal Web's tracing capabilities mainly track activity execution within a Temporal context. If you need custom tracing specific for your usecase, you should make use of context propagation to add tracing logic accordingly.

- Example: [Tracing Temporal Workflows with DataDog](https://spiralscout.com/blog/tracing-temporal-workflow-with-datadog)

## Further things to consider

:::warning

This document is still being written and we would welcome your questions and contributions.

Please search for these topics in our forum or ask on Slack.

:::

### Temporal Antipatterns

_Please request elaboration on any of these_.

- Trying to implement a queue in a workflow (because people hear we replace queues)
- Serializing massive amounts of state into and out of the workflow.
- Treating everything as rigid/linear sequence of steps instead of dynamic logic
- Implementing a DSL which is actually just a generic schema based language
- Polling in activities instead of using signals
- Blocking on incredibly long RPC requests and not using heartbeats
- Failing/retrying workflows without a very very specific business reason

### Temporal Best practices

_Please request elaboration on any of these_.

- Mapping things to entities instead of traditional service design
- Testing: unit, integration
- Retries: figuring out right values for timeouts
- Versioning
- The Workflow is Temporal's fundamental unit of scalability - break things into workflows to scale, don't try to stuff everything in one workflow!

## External Runbooks

Third party content that may help:

- [Recommended Setup for Running Temporal with Cassandra on Production (Temporal Forums)](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
- [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)
- AWS ECS runbook (_we are seeking external contributions, please let us know if you'd like to work on this_)
- AWS EKS runbook (_we are seeking external contributions, please let us know if you'd like to work on this_)
