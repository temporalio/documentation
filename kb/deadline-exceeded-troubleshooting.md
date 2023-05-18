---
slug: deadline-exceeded-troubleshooting
title: Troubleshoot deadline-exceeded error
tags:
  - troubleshooting
  - error

date: 2023-05-18T00:00:00Z
---

All requests made to the [Temporal Cluster](/clusters) by the Client or Worker are [gRPC requests](https://grpc.io/docs/what-is-grpc/core-concepts/#deadlines).
Sometimes, when these frontend requests can't be completed, you'll see this particular error message: `Context: deadline exceeded`.
Network interruptions, timeouts, server overload, and Query errors are some of the causes of this error.

The following sections discuss the nature of this error and how to troubleshoot it.

<!-- truncate -->

### Check system clocks

Timing skew can cause the system clock on a Worker to drift behind the system clock of the Temporal Cluster.
The difference between the two clocks will cause an `Activity complete after timeout` if it exceeds an Activity's `StartToClose` Timeout.

If you receive an `Activity complete after timeout` error alongside `Context: deadline exceeded`, check the clocks on the Temporal Cluster's system and the system of the Worker sending that error.
Synchronize all clocks to an NTP server if the Worker's clock doesn't match the Temporal Cluster.

### Check Frontend Service logs

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.

If you're using Temporal Cloud, create a [support ticket](https://docs.temporal.io/cloud/how-to-create-a-ticket-for-temporal-support) with as much information as possible, including the Namespace Name and the Workflow Ids of some Workflow Executions in which the issue occurs.

:::

[Frontend Service](/clusters/#frontend-service) logs can show which parts of the Cluster aren't working.
For the error to appear, a service pod or container must be up and running.

OSS users can verify that the Frontend Service is connected and running by using `tctl`.

```
tctl --address frontendAddress:frontendPort cluster health
```

Use [`grpc-health-probe`](https://github.com/grpc-ecosystem/grpc-health-probe) to check the Frontend Service, [Matching Service](/clusters#matching-service), and [History Service](/clusters#history-service).

```
./grpc-health-probe -addr=frontendAddress:frontendPort -service=temporal.api.workflowservice.v1.WorkflowService

./grpc-health-probe -addr=matchingAddress:matchingPort -service=temporal.api.workflowservice.v1.MatchingService

./grpc-health-probe -addr=historyAddress:historyPort -service=temporal.api.workflowservice.v1.HistoryService
```

Logs can also be used to find failed Client [Query](/workflows#queries) requests.

### Check your Cluster metrics

Cluster metrics can be used to detect issues (such as `resource exhausted`) that impact Cluster health.
A `resource exhausted` error can cause your client request to fail, which prompts the `deadline exceeded` error.

Use the following query to check for errors in `RpsLimit`, `ConcurrentLimit` and `SystemOverloaded` on your metrics dashboard.

```
sum(rate(service_errors_resource_exhausted{}[1m])) by (resource_exhausted_cause)
```

Look for high latencies, short timeouts, and other abnormal [Cluster metrics](/references/cluster-metrics).
If the metrics come from a specific service (such as History Service), check the service's health and performance.

### Check Workflow logic

Check your [Client and Worker configuration](/references/configuration) files for missing or invalid target values, such as the following:

- Server names
- Network or host addresses
- Certificates

Invalid targets also cause `connection refused` errors alongside `deadline exceeded`.
Check that the Client connects after updating your files.

## Advanced troubleshooting

In addition to the steps listed in the previous sections, check the areas mentioned in each of the following scenarios.

### After enabling mTLS

Check the health of the Cluster with `tctl cluster health`.

```
tctl --address [SERVER_ADDRESS] cluster health
```

Add any missing [environment variables](/references/web-ui-environment-variables) to the configuration files, and correct any incorrect values.
Server names and certificates must match between Frontend and internode.

### After restarting the Temporal Cluster

You might not be giving the Cluster enough time to respond and reconnect.
Restart the Server, wait, and then check all services for connectivity and further errors.

If the error persists, review your Workflow Execution History and server logs for more specific causes before continuing to troubleshoot.

### When executing or scheduling Workflows

One or more services might be unable to connect to the [Frontend Service](/clusters#frontend-service).
The Workflow might be unable to complete requests within the given connection time.

Increase the value of `frontend.keepAliveMaxConnectionAge` so that requests can be finished before the connection terminates.

:::note

If you increase `frontend.keepAliveMaxConnectionAge` values, consider monitoring your server performance for load.

:::

---

Still unable to resolve your issue?

- If you use Temporal Cloud, create a [support ticket](https://docs.temporal.io/cloud/how-to-create-a-ticket-for-temporal-support).
- If you use our open source software or Temporal Cloud, check for similar questions and possible solutions in our [community forum](https://community.temporal.io) or [community Slack](https://temporal.io/slack).
