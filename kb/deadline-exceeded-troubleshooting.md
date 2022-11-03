---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-01T00:00:00Z
---

`DeadlineExceeded` is a Context error thrown when requests are not completed on time.

Many requests are sent and received in a Temporal system.
These requests can be made between services, between client and server, and between the entire system and a network.
This extensive coverage, along with the error's brief message, makes it confusing to figure out where the error could come from.

Based on what users have seen, we can deduce that the three most common problem areas lie in downed services, faulty Workflow logic, and unusually high latencies.

Therefore, the best route for troubleshooting is to check the 3 L's of system functionality.

- Logs
- Logic
- Latency

If you're still unable to find the cause of your timeouts, please visit the community forum, community Slack, or file a support ticket if you are using Temporal Cloud.

:::note

Cloud users cannot access some of the logs needed to diagnose the source of the error.
If you're using Temporal Cloud, you must file a service ticket when this error occurs.

:::

<!-- TODO: move the note above or delete if not needed -->

### Logs

If a service has gone down, your history logs might be able to point to the culprit.
Queries that continually return errors can also be traced back in the logs.

[One user](https://community.temporal.io/t/context-deadline-exceeded-when-trying-to-start-workflow-v1-7-1/4249) received the error while trying to start their Workflow.
The Temporal Worker failed to connect to the frontend service.

Looking deeper into the problem revealed that HTTP requests were being fulfilled, but weren't registered at any point in their progress on Temporal Web.

[Other](https://community.temporal.io/t/temporal-cluster-always-seems-to-be-out-of-resources-but-always-seems-healthy/4938)[users](https://community.temporal.io/t/solved-context-deadline-exceeded-not-enough-hosts-to-serve-requests-errors/4328) was unable to get enough hosts to serve their requests.
Upon reviewing their logs, they were able to correct their production environments to resolve the problem.

If the problem is a downed service, review the logs and redeploy the server instance.
If needed, run `tctl cluster health` and other environment-related commands to check on server health.

If the problem persists, there might be a problem with your Workflow logic.
Proceed to the next section to find out if your issue is code-related.

### Logic

If a Workflow repeatedly fails to execute, the problem could lie in the code itself.

`DeadlineExceeded` may be thrown if connections are closed too soon.
[In the case of one user](https://community.temporal.io/t/how-to-best-handle-mysterious-context-deadline-exceeded-502-errors/2689/3), the Temporal Server was closing connections as they expired.

This behavior is expected, but can be detrimental if there isn't enough time to complete requests.
By extending the deadlines, the user was able to solve the problem.

[Another scenario](https://community.temporal.io/t/unable-to-execute-workflow-context-deadline-exceeded-after-setting-up-mtls/3124) [that a few users](https://community.temporal.io/t/unable-to-get-temporal-sys-add-search-attributes-workflow-workflow-state-context-deadline-exceeded/4229) have run into was with setting up mTLS.

In both cases, the frontend could not be reached by the system's Workers.
One user found that their `internode.server` certificate was invalid; both were missing a DNS name in their environmental configuration.

If your Workflow repeatedly fails to start or execute, check your files for any missing or invalid environmental variables.
Run the server again after adding or changing these variables.

### Latency

If an issue cannot be found in the logs or with the Workflow itself, there may be a problem with the network connection.
More specifically, the network may have latency problems.

Unusually high latency can prevent requests from completing on time.
This can affect many areas of the Server at once.

As [this user](https://community.temporal.io/t/context-deadline-exceeded-issue/5310) noted, `DeadlineExceeded` was returned while scheduling the Workflow.
[Similarly, this user](https://community.temporal.io/t/history-server-context-deadline-exceed-errors-every-hour/6090/3) had a recurring issue on their history server.
The history logs for both indicated possible database issues, but their metrics revealed latency issues across the Server.

After seeing the Workflow fail consistently, a new SQL instance was deployed and restarted on both setups.
The workflow executed without another issue.

If you experience widespread occurrences of the `DeadlineExceeded` error, make sure your server metrics are enabled.
Check persistence and visibility latencies for high values, along with resources exhausted.

<!--- - Check your configuration files for missing environmental variables.
- Make sure that the frontend and internode certificates are clearly defined.
- Add any missing values before deploying the server again.-->
