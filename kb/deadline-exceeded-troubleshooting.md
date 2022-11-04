---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-08T00:00:00Z
---

All requests made to the Temporal Cluster are [gRPC requests](https://grpc.io/docs/what-is-grpc/core-concepts/#deadlines).
Sometimes, when these requests can't be completed, you'll see this particular error message: `Context: deadline exceeded`.

`Context: deadline exceeded` is an error that occurs when requests are not completed on time.
Network interruptions, short timeouts, server overload, and Query errors can cause this error.

The following sections will discuss the nature of this error, and how to troubleshoot it.

#### Check your logs

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.
If you're using Temporal Cloud, consider filing a service ticket when this error occurs.

:::

<!--TODO: show service log or trace -->

Service logs can show which parts of the Cluster aren't working.

Verify that the frontend is connected by opening the Web UI in your browser.

Check that the following are up and running with `tctl cluster` commands:

- History Service
- Persistence database
- Advanced Visibility database

Logs can also be used to find query errors.
If connections are functional, proceed to Cluster metrics and Workflow logic.

#### Check your Cluster metrics

Look for high latencies, short timeouts, and other unusual metrics coming from Cluster services.
If the metrics come from a specific service, check that service's connectivity and restart if needed.

#### Check Workflow logic

Your Workflow may be missing some information needed to make the connection.
Check your code and configuration files for missing or invalid values in:

- Server names
- Network or host names
- Certificates
- Timeouts

If the error hasn't resolved, proceed to Advanced Troubleshooting for service-specific steps to take next.

## Advanced troubleshooting

If you're still getting this error...

#### After enabling mTLS

Check the health of the Cluster with `tctl cluster health`.

Add any missing environment variables to the configuration files, and correct any incorrect values.
Server names and certificates must match between frontend and internode.

#### After restarting the Temporal Cluster

You might not be giving the Cluster enough time to respond and reconnect.
Restart the Server, wait, and then check all services for connectivity and further errors.

If the error persists, review your history and server logs for more specific causes before continuing to troubleshoot.

#### When executing or scheduling Workflows

One or more services may be unable to connect to the frontend.
The Workflow might be unable to complete requests within the given connection time.

Check service metrics, history logs, and connectivity between system components.
If you're running the Cluster in a container, check that service's history or log files.
If needed, modify configuration files and run diagnostic commands specific to your environment.

Increase the timeout value so that requests can be finished before the connection terminates.

::: note

If you increase timeouts or ConnectionAge values, consider adding a hot spotting check to prevent server overload.

:::

#### While using `tctl`

The Cluster may have deployed with missing or incorrect values.

Check your environment for containers that terminated or failed.
Run `tctl cluster` commands to fix issues through CLI.

### In conclusion

`Context: deadline exceeded` is a gRPC error thrown when requests can't be completed on time.
This error is generally caused by network hiccups, short timeouts, server overload, and query errors.

`Context: deadline exceeded` can be located by checking history logs, Workflow logic, and server metrics.
More troubleshooting may be necessary depending on where you see the error.

If you were unable to resolve your issue, please visit the community forum, community Slack, or file a support ticket.
Cloud users should consider filing a support ticket when this error occurs.
