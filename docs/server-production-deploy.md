---
id: server-production-deployment
title: Production self-hosted deployment of Temporal Server
sidebar_label: Production deployment
---

## Overview

While it is easy to [quick start for local development](https://docs.temporal.io/docs/server-quick-install), there is a lot of nuance to a production deployment of Temporal Server, because it is highly use-case and infrastructure dependent. 

It is impossible for us to document every permutation, so we instead focus on giving you what you need to know to deploy Temporal Server from first principles.
We remain accessible to you via the [Community forum](https://community.temporal.io/) or [Slack](https://join.slack.com/t/temporalio/shared_invite/zt-kfgfjuye-L8gCQVRhPykA2td8pk7eTQ) 
for further questions.

1. **Prerequisites**:  Temporal Server is a Go application which [you can import](https://docs.temporal.io/docs/server-options) or run as a binary. 

    - The other minimum requirement is a database - we support Cassandra, MySQL, or PostgreSQL.  Further dependencies are only needed to support optional features. For example: enhanced workflow search (with ElasticSearch), monitoring & observability (Prometheus & Grafana), and multi-cluster replication (including cross-data-center).
    - Please see our [versions & dependencies doc](https://docs.temporal.io/docs/server-versions-and-dependencies/) for precise versions we support together with their features.

2. **Configuration**: You will want to configure `development.yaml` with at least the [`global`](https://docs.temporal.io/docs/server-configuration/#global) and [`persistence`](https://docs.temporal.io/docs/server-configuration/#persistence) parameters. A full configuration reference is available [here](https://docs.temporal.io/docs/server-configuration).

3. **Scaling and Metrics**: Once your Temporal instance is running, you will want to watch key metrics to understand system health and scaling needs. Temporal maintains a set of [Grafana dashboards](https://github.com/temporalio/dashboards) you can use as a starting point.

    At a high level, you will want to track these 3 categories of metrics:

    - **Service Metrics**: For each request by service handler we emit `service_requests`, `service_errors`, and `service_latency` metric with type, operation, and namespace tags. This gives you basic visibility into service usage and allows you to look request rates across services, namespaces or even operations.

    - **Persistence Metrics**: Temporal emits `persistence_requests`, `persistence_errors` and `persistence_latency` metrics for each persistence operation. These metrics are tagged with operation tag to allow getting request rates, error rates or latencies per operation. These are super useful to identify issues caused by database problems.

    - **Workflow Stats**: Temporal also emits counters on completion of workflows. These are super useful in getting overall stats about workflow completion. Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate` and `workflow_cancel` counters for each type of workflow completion. They are also tagged with namespace tag.
    
    More details can be found [in our forums](https://community.temporal.io/t/metrics-for-monitoring-server-performance/536/3).

4. **Debugging**: *to be completed*

## Further Reading

A full understanding of [Temporal Server Architecture](https://docs.temporal.io/docs/server-architecture/) will help you debug and troubleshoot production deployment issues.

## External Runbooks

Third party content that may help:

- [Recommended Setup for Running Temporal with Cassandra on Production (Temporal Forums)](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
- [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)
- ECS runbook (*to be completed*)
- EKS runbook (*to be completed*)
