---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-08T00:00:00Z
---

All requests to the Temporal Cluster are gRPC requests.
Sometimes, when these requests can't be completed, you'll see this particular error message: `"error":"context deadline exceeded"`.
What is this error, and what does it mean?

`DeadlineExceeded` is an error that occurs when requests are not completed on time.
Network interruptions, short timeouts, server overload, and query errors can cause this error.

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.
If you're using Temporal Cloud, consider file a service ticket when this error occurs.

:::

This error can happen across the Cluster.
To find the cause and begin troubleshooting:

#### Check your Frontend Logs

Service logs can show which parts of the Cluster aren't working.
Logs can also be used to find query errors.

Verify that connections to the Frontend Service are functional.

#### Check your Cluster metrics

Look for unusually high latencies, short timeouts, and other measures indicating trouble.
If the metrics come from a specific service, check that service's connectivity.

#### Check Workflow logic

Your Workflow may be missing some information needed to make the connection.
Verify connec

## If your problem lies in a service:

To recap, `"error":"context deadline exceeded"` is a gRPC error thrown when requests can't be completed on time.
This error is generally caused by network hiccups, short timeouts, server overload, and query errors.

`DeadlineExceeded` can be located by checking history logs, Workflow logic, and server metrics.
More troubleshooting may be necessary depending on where you see the error.

If you were unable to resolve your issue, please visit the community forum, community Slack, or file a support ticket.
Cloud users should consider filing a support ticket when this error occurs.
