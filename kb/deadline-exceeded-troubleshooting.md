---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-09T00:00:00Z
---

All client-side requests made to the [Temporal Cluster](/concepts/what-is-a-temporal-cluster) are [gRPC requests](https://grpc.io/docs/what-is-grpc/core-concepts/#deadlines).
Sometimes, when these requests can't be completed, you'll see this particular error message: `Context: deadline exceeded`.
Network interruptions, timeouts, server overload, and Query errors are some of the reasons that can cause this error.

The following sections discuss the nature of this error and how to troubleshoot it.

#### Check frontend service logs

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.

If you're using Temporal Cloud, check your Workflow History for error messages and create a [support ticket](https://support.temporal.io/) with Temporal.
Provide the full error message in your ticket.

:::

```
{“level”:“error”,“ts”:“2022-03-21T19:32:42.312Z”,“msg”:“unavailable error”,“service”:“frontend”,“error”:“unable to get temporal-sys-add-search-attributes-workflow workflow state: context deadline exceeded”,“logging-call-at”:“adminHandler.go:1163”,“stacktrace”:“go.temporal.io/server/common/log.
```

Frontend service logs can show which parts of the Cluster aren't working.

Verify that the Frontend Service is connected by opening the Web UI in your browser.

Alternatively, OSS users can check that Frontend and other service are running with

```

tctl --address frontendAddress:frontendPort cluster health

```

and

```

./grpc-health-probe -addr=frontendAddress:frontendPort -service=temporal.api.workflowservice.v1.WorkflowService

./grpc-health-probe -addr=matchingAddress:matchingPort -service=temporal.api.workflowservice.v1.MatchingService

./grpc-health-probe -addr=historyAddress:historyPort -service=temporal.api.workflowservice.v1.HistoryService

```

- [History Service](/clusters#history-service)
- [Persistence](/clusters#persistence) database
- [Advanced Visibility](/visibility#advanced-visibility) database

Logs can also be used to find Client [Query](/workflows#queries) requests that failed with this error.

#### Check your Cluster metrics

Cluster metrics can be used to detect issues (such as 'resource exhausted') that implact cluster health.
`Resource exhausted` errors can cause your client to fail and send a `Deadline exceeded` error.

Use the command below to check for errors in `RpsLimit`, `ConcurrentLimit` and `SystemOverloaded`.

```

sum(rate(service_errors_resource_exhausted{}[1m])) by (resource_exhausted_cause)

```

Look for high latencies, short timeouts, and other abnormal [Cluster metrics](/references/cluster-metrics).
If the metrics come from a specific service (such as History Service), check that the service is connected.

#### Check Workflow logic

Check your [Client and Worker configuration](/references/configuration) files for missing or invalid target values, such as:

- Server names
- Network or host addresses
- Certificates

Invalid targets also cause `connection refused` errors alongside `deadline exceeded`.
Check that the Client connects after updating your files.

## Advanced troubleshooting

If you're still getting this error, here are further things to check.

#### After enabling mTLS

Check the health of the Cluster with `tctl cluster health`.

```
tctl --address [SERVER_ADDRESS] cluster health
```

Add any missing [environment variables](/references/web-ui-environment-variables) to the configuration files, and correct any incorrect values.
Server names and certificates must match between Frontend and internode.

#### After restarting the Temporal Cluster

You might not be giving the Cluster enough time to respond and reconnect.
Restart the Server, wait, and then check all services for connectivity and further errors.

If the error persists, review your Workflow Execution History and server logs for more specific causes before continuing to troubleshoot.

#### When executing or scheduling Workflows

One or more services may be unable to connect to the [Frontend Service](/clusters#frontend-service).
The Workflow might be unable to complete requests within the given connection time.

Increase the value of `frontend.keepAliveMaxConnectionAge` so that requests can be finished before the connection terminates.

::: note

If you increase `frontend.keepAliveMaxConnectionAge` values, consider checking for server overload.

:::

#### While using `tctl`

The Cluster may have deployed with missing or incorrect values.

Check your environment for services that terminated or failed to start correctly.

---

If you were unable to resolve your issue, check for similar questions and possible solutions on [community forum](https://community.temporal.io), [community Slack](https://temporal.io/slack), or file a [support ticket](https://support.temporal.io/).
