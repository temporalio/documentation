---
slug: deadline-exceeded-troubleshooting
title: Troubleshoot deadline-exceeded error
tags:
  - troubleshooting
  - error

date: 2022-11-09T00:00:00Z
---

All requests made to the [Temporal Cluster](/clusters) by the Client or Worker are [gRPC requests](https://grpc.io/docs/what-is-grpc/core-concepts/#deadlines).
Sometimes, when these frontend requests can't be completed, you'll see this particular error message: `Context: deadline exceeded`.
Network interruptions, timeouts, server overload, and Query errors are some of the causes of this error.

The following sections discuss the nature of this error and how to troubleshoot it.

<!-- truncate -->

### Check Frontend Service logs

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.

If you're using Temporal Cloud, check your Workflow History for error messages and create a [support ticket](https://support.temporal.io/) with Temporal.
Provide the full error message in your ticket.

:::

[Frontend Service](/clusters/#frontend-service) logs can show which parts of the Cluster aren't working.
For the error to appear, a service pod or container must be up and running.

OSS users can verify that the Frontend Service is connected and running by using `tctl`.

```
tctl --address frontendAddress:frontendPort cluster health
```

Use `grpc-health-probe` to check the Frontend Service, [Matching Service](/clusters#matching-service), and [History Service](/clusters#history-service).

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

If you were unable to resolve your issue, check for similar questions and possible solutions on our [community forum](https://community.temporal.io) or [community Slack](https://temporal.io/slack), or file a [support ticket](https://support.temporal.io/).
