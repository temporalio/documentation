The requirements of your Temporal system will vary widely based on your intended production workload.
You will want to run your own proof of concept tests and watch for key metrics to understand the system health and scaling needs.

Temporal emits metrics which gives you insight into how your application and service are working and performing.
To enable metrics, define your endpoints so that your time-series database can scrape your metrics.

There are a variety of metrics which gives you information into your service, persistence, and Workflow metrics.

- Service metrics: For each request by the service handler, Temporal emits `service_requests`, `service_errors`, and `service_latency` metrics with type, operation, and namespace tags. This gives you visibility into service usage and request rates across services, Namespaces, or even operations.

  - Persistence metrics: Temporal emits `persistence_requests`, `persistence_errors,` and `persistence_latency` metric for each persistence operation. These metrics are tagged with operation tags to allow getting request rates, error rates, or latencies per operation. These are used to identify issues like database problems.

- Workflow metrics: Temporal also emits counters on Workflows. These are useful in getting overall stats about Workflow completion. Use `workflow_success`, `workflow_failed`, `workflow_timeout`, `workflow_terminate`, and `workflow_cancel` counters for each type of Workflow completion. They're also tagged with the Namespace tag.
