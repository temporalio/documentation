---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-08T00:00:00Z
---

All requests made to the [Temporal Cluster](/concepts/what-is-a-temporal-cluster) are [gRPC requests](https://grpc.io/docs/what-is-grpc/core-concepts/#deadlines).
Sometimes, when these requests can't be completed, you'll see this particular error message: `Context: deadline exceeded`.

`Context: deadline exceeded` is an error that occurs when requests are not completed on time.
Network interruptions, short timeouts, server overload, and Query errors are some of the reasons that can cause this error.

The following sections discuss the nature of this error and how to troubleshoot it.

#### Check your logs

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.
If you're using Temporal Cloud, consider filing a [service ticket](https://support.temporal.io/) when this error occurs.

:::

```
{“level”:“error”,“ts”:“2022-03-21T19:32:42.312Z”,“msg”:“unavailable error”,“service”:“frontend”,“error”:“unable to get temporal-sys-add-search-attributes-workflow workflow state: context deadline exceeded”,“logging-call-at”:“adminHandler.go:1163”,“stacktrace”:“go.temporal.io/server/common/log.
```

Service logs can show which parts of the Cluster aren't working.

Verify that the Frontend Service is connected by opening the Web UI in your browser.

Check that the following are up and running with `tctl cluster` commands:

- [History Service](/clusters#history-service)
- [Persistence](/clusters#persistence) database
- [Advanced Visibility](/visibility#advanced-visibility) database

Logs can also be used to find [Query](/workflows#queries) errors.

#### Check your Cluster metrics

Look for high latencies, short timeouts, and other abnormal [Cluster metrics](/references/cluster-metrics).
If the metrics come from a specific service (such as History Service), check that service's connectivity and restart if needed.

#### Check Workflow logic

Check your [Client and Worker configuration](/references/configuration) files for missing or invalid values in:

- Server names
- Network or host addresses
- Certificates
- Timeouts

## Advanced troubleshooting

If you're still getting this error, here are further things to check.

#### After enabling mTLS

Check the health of the Cluster with `tctl cluster health`.

```
tctl --address [SERVER_ADDRESS] cluster health
```

Add any missing [environment variables](/references/web-ui-environment-variables) to the configuration files, and correct any incorrect values.
Server names and certificates must match between frontend and internode.

#### After restarting the Temporal Cluster

You might not be giving the Cluster enough time to respond and reconnect.
Restart the Server, wait, and then check all services for connectivity and further errors.

If the error persists, review your history and server logs for more specific causes before continuing to troubleshoot.

#### When executing or scheduling Workflows

One or more services may be unable to connect to the [Frontend Service](/clusters#frontend-service).
The Workflow might be unable to complete requests within the given connection time.

Check service metrics, history logs, and connectivity between system components.
If you're running the Cluster in a container, check that service's history or log files.
If needed, modify configuration files and run diagnostic commands specific to your environment.

Increase the timeout value so that requests can be finished before the connection terminates.

::: note

If you increase timeouts or `ConnectionAge` values, consider checking for server overload.

:::

#### While using `tctl`

The Cluster may have deployed with missing or incorrect values.

Check your environment for containers that terminated or failed.
Run `tctl cluster` commands to fix issues through CLI.

---

If you were unable to resolve your issue, please visit the [community forum](https://community.temporal.io), [community Slack](https://temporal.io/slack), or file a [support ticket](https://support.temporal.io/).
