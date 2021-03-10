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

### Debugging Workflows

> ⚠️ This is a basic guide to troubleshooting/debugging Temporal applications. It is work-in-progress and we encourage [reading about our Architecture](https://docs.temporal.io/docs/server-architecture) for more detail. The better you understand how Temporal works, the better you will be at debugging your workflows.

If you have the time, we recommend [watching our 19 minute video guide on YouTube](https://youtu.be/PqcVKIxI0nU) which demonstrates the debugging explained below.

#### Basic Debugging on Temporal Web

The primary mechanism we recommend for debugging is [Temporal Web](https://github.com/temporalio/web), which is run in a separate process:

![6XkjmR](https://user-images.githubusercontent.com/6764957/110544958-71746480-8167-11eb-8152-8d3a3eb73d4e.gif)

- [Workflows](https://docs.temporal.io/docs/glossary/#workflow) are identified by their [**Workflow ID**](https://docs.temporal.io/docs/glossary/#workflow-id), which you provide when creating the workflow. They also have a **Name** which is directly taken from your code.
- Workflow **Status** is usually in one of a few states: Running, Completed, or Terminated, with **Start Time** and **End Time** shown accordingly.
- Workflow ID's are are distinct from **Run ID's**, which uniquely identify one of potentially many Runs of Workflows with the same Workflow ID.

> Tip: Don't confuse Runs with [Workflow Executions](https://docs.temporal.io/docs/glossary/#workflow-execution) - they are similar, but a long-running Workflow Execution can have multiple Runs. A Run is the atomic unit.
The full state of every Run is inspectable in Temporal Web:

- If your workflows seem like they aren't receiving the right data, check the **Input** arguments given.
- If your workflows seem "stuck", check the **Task Queue** assigned to a given workflow to see that there are active workers polling.
- If you see inspect the **Pending Activities** and see an activity with a lot of retry `attempt`s, you can check the `lastFailure` field for a clue as to what happened.
- If you need to go back in time from the current state, check the **History Events** where you can see the full Workflow Execution History logs (this is what makes Temporal so resilient)

#### Execution Histories on Temporal Web

Reading execution histories is one of the more reliable ways of debugging:

![image](https://user-images.githubusercontent.com/6764957/110546362-54d92c00-8169-11eb-81a6-74817e0d1378.png)

Here, you can see the exact sequence of events that have happened so far, together with the relevant state for each event, and reason about what went wrong or what is preventing the next correct event. *There are about 40 system events in total - We intend to publish a full guide to each.*

#### Viewing Stack Traces on Temporal Web

Temporal also stores the stack trace of where a given activity is currently blocked:

![image](https://user-images.githubusercontent.com/6764957/110547621-20ff0600-816b-11eb-84f3-c6a97c5cad31.png)

This is often a good way to get a deep understanding of whether your workflow is executing as expected.

#### Recovering In-flight Workflows While Running

Here we will discuss how to proceed oince you have identified and fixed the code for an erroring activity.

If your activity code is deterministic, you might be able to simply restart the worker to pick up the changes. Execution will continue from where it last succeeded. In other words, we get "hotfixing for free" due to Temporal's execution model.

However, if your activity is more complex, you will have to explicitly [version your workflows](https://docs.temporal.io/docs/go-versioning/) or even manually terminate and restart the workflows.

*This section is still being written - if you have specific questions you'd like us to answer, please search or [ask on the Temporal Forum](https://community.temporal.io/).*

Topics this document will cover in future: (for now, please search/ask on the forum)

- Recommended Environment
  - Staging/Test
  - using Temporal Web
- More on Monitoring/Prometheus/Logging
  - Give guidance on how to set up alerts on Metrics provided by SDK
- Setting up alerts for Workflow Task failures
- Best practices for writing Workflow Code:
  - Testing: unit, integration
  - Retries: figuring out right values for timeouts
  - Versioning

## Further Reading

Understanding the [Temporal Server architecture](https://docs.temporal.io/docs/server-architecture/) can help you debug and troubleshoot production deployment issues.

## External Runbooks

Third party content that may help:

- [Recommended Setup for Running Temporal with Cassandra on Production (Temporal Forums)](https://community.temporal.io/t/what-is-the-recommended-setup-for-running-cadence-temporal-with-cassandra-on-production/556)
- [How To Deploy Temporal to Azure Container Instances](https://mikhail.io/2020/10/how-to-deploy-temporal-to-azure-container-instances/)
- [How To Deploy Temporal to Azure Kubernetes Service (AKS)](https://mikhail.io/2020/11/how-to-deploy-temporal-to-azure-kubernetes-aks/)
- ECS runbook (*to be completed*)
- EKS runbook (*to be completed*)
