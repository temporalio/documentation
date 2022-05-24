---
id: what-are-metrics
title: What are Metrics?
sidebar_label: Metrics
tags:
 - explanation
 - concepts
---
 
Temporal emits metrics which gives you insight into how your application and service are working and performing.
To enable metrics, define your endpoints so that your time-series database can scrape your metrics.
 
There are a variety of metrics which gives you information into your service, persistence, and Workflow metrics.
 
- Service metrics: For each request by the service handler, Temporal emits `service_requests`, `service_errors`, and `service_latency` metrics with type, operation, and namespace tags. This gives you visibility into service usage and request rates across services, Namespaces, or even operations.
- Persistence metrics: Temporal emits `persistence_requests`, `persistence_errors,` and `persistence_latency` metric for each persistence operation. These metrics are tagged with operation tag to allow getting request rates, error rates, or latencies per operation. These are used to identify issues like database problems.
- Workflow metrics: Temporal also emits counters on Workflows. These are useful in getting overall stats about Workflow completion. Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate`, and `workflow_cancel` counters for each type of Workflow completion. They're also tagged with the Namespace tag.
 
 
Temporal SDKs provide scopes for emitting metrics.
For more information on metrics, see the [SDK metric reference](https://docs.temporal.io/docs/references/sdk-metrics/).
 
You can scrape the endpoint provide by Temporal and store your data in time series databases like [Prometheus](https://prometheus.io/docs/introduction/overview/), [M3db](https://m3db.io/docs/), and [statsd](https://github.com/statsd/statsd).
Temporal also provides a dashboard you can integrate with graphing services like Grafana. For more information, see Temporal’s [Grafana dashboard](https://github.com/temporalio/dashboards).
