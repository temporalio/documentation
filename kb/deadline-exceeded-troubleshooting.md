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

`Context: deadline exceeded` is an error that occurs when requests are not completed on time.
Network interruptions, short timeouts, server overload, and query errors can cause this error.

This error can happen across the Cluster.
To find the cause and begin troubleshooting:

#### Check your Frontend Logs

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.
If you're using Temporal Cloud, consider file a service ticket when this error occurs.

:::

Service logs can show which parts of the Cluster aren't working.

Verify that connections to the Frontend Service are functional.
This includes Workers, Clients, load balancers, and other components.

Check that the following are up and running:

- History Service
- Persistence database
- Advanced Visibility database

Logs can also be used to find query errors.
If connections are functional, proceed to Cluster metrics and Workflow logic.

#### Check your Cluster metrics

Look for high latencies, short timeouts, and other unusual metrics coming from Cluster services.
If the metrics come from a specific service, check that service's connectivity and restart if needed.

If the problem continues, keep reading to find the steps you'll need for your service.

#### Check Workflow logic

Your Workflow may be missing some information needed to make the connection.
Check your code and configuration files for missing or invalid values, along with logic errors.

If the error hasn't resolved, proceed to Advanced Troubleshooting for service-specific steps to take next.

## Advanced troubleshooting

If this error is happening:

#### After you restart the Server

You might not be giving Temporal services enough time to respond and reconnect.
Restart the Server, wait, and then check all services for connectivity and further errors.

#### When executing or scheduling Workflows

#### In conclusion...

`"error":"context deadline exceeded"` is a gRPC error thrown when requests can't be completed on time.
This error is generally caused by network hiccups, short timeouts, server overload, and query errors.

`Context: deadline exceeded` can be located by checking history logs, Workflow logic, and server metrics.
More troubleshooting may be necessary depending on where you see the error.

If you were unable to resolve your issue, please visit the community forum, community Slack, or file a support ticket.
Cloud users should consider filing a support ticket when this error occurs.
