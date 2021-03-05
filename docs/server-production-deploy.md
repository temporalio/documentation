---
id: server-production-deployment
title: Temporal Server self-hosted production deployment
sidebar_label: Production deployment
---

## Overview

While a lot of effort has been made to easily run and test the Temporal Server in a development environment (see the [Quick install guide](/docs/server-quick-install)), there is far less of an established framework for deploying Temporal to a live (production) environment.
That is because the set up of the Server depends very much on the intended use-case and the hosting infrastructure.

This page is dedicated to providing a "first principles" approach to self-hosting the Temporal Server.
As a reminder, experts are accessible via the [Community forum](https://community.temporal.io/) and [Slack](https://join.slack.com/t/temporalio/shared_invite/zt-kfgfjuye-L8gCQVRhPykA2td8pk7eTQ) should you have any questions.

## Setup principles

### Prerequisites

The Temporal Server is a Go application which you can [import](https://docs.temporal.io/docs/server-options) or run as a binary.

The minimum dependency is a database.
The Server supports [Cassandra](https://cassandra.apache.org/), [MySQL](https://www.mysql.com/), or [PostgreSQL](https://www.postgresql.org/).
Further dependencies are only needed to support optional features.
For example, enhanced Workflow search can be achieved using [ElasticSearch](/docs/server-elasticsearch-setup).
And, monitoring and observability are available with [Prometheus](https://prometheus.io/) and [Grafana](https://grafana.com/).

See the [versions & dependencies page](/docs/server-versions-and-dependencies/) for precise versions we support together with these features.

### Configuration

At minimum, the `development.yaml` file needs to have the [`global`](/docs/server-configuration/#global) and [`persistence`](https://docs.temporal.io/docs/server-configuration/#persistence) parameters defined.

The [Server configuration reference](/docs/server-configuration) has a more complete list of possible parameters.

### Scaling and Metrics

Once your instance of the Server is running, you can watch for key metrics to understand the system health and scaling needs. You can use these [Grafana dashboards](https://github.com/temporalio/dashboards) as a starting point.

At a high level, you will want to track these 3 categories of metrics:

- **Service metrics**: For each request made by the service handler we emit `service_requests`, `service_errors`, and `service_latency` metrics with `type`, `operation`, and `namespace` tags.
This gives you basic visibility into service usage and allows you to look at request rates across services, namespaces and even operations.
- **Persistence metrics**: The Server emits `persistence_requests`, `persistence_errors` and `persistence_latency` metrics for each persistence operation.
These metrics include the `operation` tag such that you can get the request rates, error rates or latencies per operation.
These are super useful in identifying issues caused by the database.
- **Workflow stats**: The Server also emits counters on Workflows complete.
These are  useful in getting overall stats about Workflow completions.
Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate` and `workflow_cancel` counters for each type of Workflow completion.
They are also include the `namespace` tag.
Additional information is available in [this forum post](https://community.temporal.io/t/metrics-for-monitoring-server-performance/536/3).

*This section is still being written - if you have specific questions you'd like us to answer, please search or [ask on the Temporal Forum](https://community.temporal.io/).*

Upcoming content:

- Recommended Environment
  - Staging/Test
  - using Temporal Web
- Troubleshooting/Debugging Temporal Apps
  - reading event histories
  - Give guidance on how to set up alerts on Metrics provided by SDK
- More on Monitoring/Prometheus/Logging
- Setting up alerts for Workflow Task failures
- Best practices for writing Workflow Code:
  - Testing: unit, integration
  - Retries: figuring out right values for timeouts
  - Versioning: 

## Further Reading

Understanding the [Temporal Server architecture](https://docs.temporal.io/docs/server-architecture/) can help you debug and troubleshoot production deployment issues.

## External Runbooks

Third party content that may help:

- [Recommended Setup for Running Temporal with Cassandra on Production (Temporal Forums)](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
- [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)
- ECS runbook (*to be completed*)
- EKS runbook (*to be completed*)
