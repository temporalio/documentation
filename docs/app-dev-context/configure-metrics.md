The requirements of your Temporal system will vary widely based on your intended production workload.
You will want to run your own proof of concept tests and watch for key metrics to understand the system health and scaling needs.

There are a variety of metrics which gives you information into your _service_, _persistence_, and _Workflow metrics_.

_Service metrics_: For each request by the service handler, Temporal emits metrics with type, operation, and namespace tags. This gives you visibility into service usage and request rates across services, Namespaces, or even operations.

- `service_requests`
- `service_errors`
- `service_latency`

_Persistence metrics_: Temporal emits metrics for each persistence operation. These metrics are tagged with operation tags to allow getting request rates, error rates, or latencies per operation. These can be used to identify issues like database problems.

- `persistence_requests`
- `persistence_errors,`
- `persistence_latency`

_Workflow metrics_: Temporal also emits counters on Workflows. These are useful in getting overall stats about Workflow completion. The following are commonly used Workflow metrics used as counters for each type of Workflow completion, that can also be tagged with the Namespace tag:

- `workflow_success`
- `workflow_failed`
- `workflow_timeout`
- `workflow_terminate`
- `workflow_cancel`
