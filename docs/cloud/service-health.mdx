---
id: service-health
title: Monitor Temporal Cloud
sidebar_label: Monitor Temporal Cloud
description: Use Temporal Cloud metrics to monitor your production deployment Temporal Cloud.
toc_max_heading_level: 4
keywords:
  - temporal-cloud
  - metrics
  - observability
  - health
tags:
  - Temporal Cloud
  - Observability
---

Temporal Cloud metrics help monitor production deployments.
This documentation covers best practices for monitoring Temporal Cloud.

## Monitor availability issues

When you see a sudden drop in Worker resource utilization, verify whether Temporal Cloud's API is showing increased latency and error rates.

### Reference Metrics

- [temporal\_cloud\_v1\_service\_latency\_p99](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_service_latency_p99)

This metric measures latency for `SignalWithStartWorkflowExecution`, `SignalWorkflowExecution`, `StartWorkflowExecution` operations.
These operations are mission critical and never [throttled](/cloud/service-availability#throughput).
This metric is a good indicator of your lowest possible latency for the 99th percentile of requests.

## Monitor Temporal Service errors

Check for Temporal Service gRPC API errors.
Note that Service API errors are not equivalent to guarantees mentioned in the [Temporal Cloud SLA](/cloud/sla).

### Reference Metrics

- [temporal\_cloud\_v1\_frontend\_service\_error\_count](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_service_error_count)
- [temporal\_cloud\_v1\_frontend\_service\_request\_count](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_service_request_count)

### Prometheus Query for this Metric

Measure your daily average errors over 10-minute windows:

```
avg_over_time((
    (

        (
            sum(increase(temporal_cloud_v1_service_request_count{temporal_namespace=~"$namespace", operation=~"StartWorkflowExecution|SignalWorkflowExecution|SignalWithStartWorkflowExecution|RequestCancelWorkflowExecution|TerminateWorkflowExecution"}[10m]))
            -
            sum(increase(temporal_cloud_v1_service_error_count{temporal_namespace=~"$namespace", operation=~"StartWorkflowExecution|SignalWorkflowExecution|SignalWithStartWorkflowExecution|RequestCancelWorkflowExecution|TerminateWorkflowExecution"}[10m]))
        )
        /
        sum(increase(temporal_cloud_v1_service_request_count{temporal_namespace=~"$namespace", operation=~"StartWorkflowExecution|SignalWorkflowExecution|SignalWithStartWorkflowExecution|RequestCancelWorkflowExecution|TerminateWorkflowExecution"}[10m]))
    )

    or vector(1)

    )[1d:10m])
```

## Detecting Activity and Workflow Failures

The metrics `temporal_activity_execution_failed` and `temporal_cloud_v1_workflow_failed_count` together provide failure detection for Temporal applications. These metrics work in tandem to give you both granular component-level visibility and high-level workflow health insights.

Note that `temporal_activity_execution_failed` is an SDK metric that must be collected from the Worker.

### Activity failure cascade

If not using infinite retry policies, Activity failures can lead to Workflow failures:

```
Activity Failure --> Retry Logic --> More Activity Failures --> Workflow Decision --> Potential Workflow Failure
```

Activity failures are often recoverable and expected. Workflow failures represent terminal states requiring immediate attention.
A spike in activity failures may precede workflow failures.
Generally Temporal recommends that Workflows should be designed to always succeed. If an Activity fails more than its retry policy allows, we suggest having the Workflow handle Activity failure and take action to notify a human to take corrective action or be aware of the error.

### Ratio-based monitoring

#### Failure conversion rate

Monitor the ratio of workflow failures to activity failures:

```
workflow_failure_rate = temporal_cloud_v1_workflow_failed_count / temporal_activity_execution_failed
```

What to watch for:
- High ratio (greater than 0.1): Poor error handling - activities failing are causing workflow failures
- Low ratio (less than 0.01): Good resilience - activities fail but workflows recover
- Sudden spikes: May indicate systematic issues

#### Activity success rate

```
activity_success_rate = (total_activities - temporal_activity_execution_failed) / total_activities
```

Target: >95% for most applications. Lower success rate can be a sign of system troubles.
See also:
- [Crafting an Error Handling Strategy](https://learn.temporal.io/courses/errstrat/)
- [Temporal Failures reference](/references/failures)
- [Detecting Workflow failures](/encyclopedia/detecting-workflow-failures)

## Monitor replication lag for Namespaces with High Availability features

Replication lag refers to the transmission delay of Workflow updates and history events from the primary Namespace to the replica.
Always check the [metric replication lag](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_replication_lag_p99) before initiating a failover.
A forced failover when there is a large replication lag has a higher likelihood of rolling back Workflow progress.

**Who owns the replication lag?**
Temporal owns replication lag.

**What guarantees are available?**
There is no SLA for replication lag.
Temporal recommends that customers do not trigger failovers except for testing or emergency situations.
High Availability feature's four-9 guarantee SLA means Temporal will handle failovers and ensure high availability.
Temporal also monitors replication lag.
Customer who decide to trigger failovers should look at this metric before moving forward.

**If the lag is high, what should you do?**
We don't expect users to failover.
Please contact Temporal support if you feel you have a pressing need.

**Where can you read more?**
See [operations and metrics](/cloud/high-availability) for Namespaces with High Availability features.

### Reference Metrics

- [temporal\_cloud\_v1\_replication\_lag\_p99](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_replication_lag_p99)
- [temporal\_cloud\_v1\_replication\_lag\_p95](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_replication_lag_p95)
- [temporal\_cloud\_v1\_replication\_lag\_p50](/cloud/metrics/openmetrics/metrics-reference#temporal_cloud_v1_replication_lag_p50)

## Detecting Resource Exhaustion

The Cloud metric `temporal_cloud_v1_resource_exhausted_error_count` is the primary indicator for Cloud-side throttling, signaling system limits
are exceeded and `ResourceExhausted` gRPC errors are occurring. This generally does not break workflow processing due to how resources are prioritized. 

Persistent non-zero values of this metric are unexpected.

## Monitoring Trends Against Limits {#rps-aps-rate-limits}

The set of [limit metrics](/cloud/metrics/openmetrics/metrics-reference#limit-metrics) provide a time series of values for limits. Use these 
metrics with their corresponding count metrics to monitor general trends against limits and set alerts when limits are exceeded. Use the corresponding throttle metrics
to determine the severity of any active rate limiting.
| Limit Metric | Count Metric | Throttle Metric |
| ------------ | ------------ | --------------- |
| `temporal_cloud_v1_action_limit` | `temporal_cloud_v1_total_action_count` | `temporal_cloud_v1_total_action_throttled_count` |
| `temporal_cloud_v1_service_request_limit` | `temporal_cloud_v1_service_request_count` | `temporal_cloud_v1_service_request_throttled_count` |
| `temporal_cloud_v1_operations_limit` | `temporal_cloud_v1_operations_count` | `temporal_cloud_v1_operations_throttled_count` |

The [Grafana dashboard example](https://github.com/grafana/jsonnet-libs/blob/master/temporal-mixin/dashboards/temporal-overview.json) includes a Usage & Quotas section
that creates demo charts for these limits and count metrics respectively.

The limit metrics, throttle metrics, and count metrics are already directly comparable as per second rates. Keep in mind that each `count` metric is represented as a per second rate averaged 
over each minute. For example, to get the total count of Actions, you must multiply this metric by 60.  
When setting alerts against limits, consider if your workload is spiky or sensitive to throttling (e.g. does latency matter?). If your workload is sensitive, consider alerting
for `temporal_cloud_v1_total_action_count` at a 50% threshold of the `temporal_cloud_v1_action_limit`. If your workload is not sensitive, consider an alert at 90% of this threshold
or directly when throttling is detected as a value greater than zero for `temporal_cloud_v1_total_action_throttled_count`. This logic can also be used to automatically scale [Temporal
Resource Units](/cloud/capacity-modes#provisioned-capacity) up or down as needed. Some workloads choose to exceed limits and accept throttling because they are not latency sensitive.
