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

Therefore, the best route for troubleshooting lies in checking on the 3 L's:

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

If the system has an issue sending or receiving from a service, your logs will be able to tell which service is having trouble.

[One user](https://community.temporal.io/t/context-deadline-exceeded-when-trying-to-start-workflow-v1-7-1/4249) received the error while trying to start their Workflow.
The Temporal Worker failed to connect to the frontend service.

Looking deeper into the problem revealed that HTTP requests were being fulfilled, but weren't registered at any point in their progress on Temporal Web.

### Logic

If a Workflow repeatedly fails to execute, the problem could lie in the code itself.

`DeadlineExceeded` may be thrown if connections are closed too soon.
[In the case of one user](https://community.temporal.io/t/how-to-best-handle-mysterious-context-deadline-exceeded-502-errors/2689/3), the Temporal Server was closing connections as they expired.

This behavior is expected, but can be detrimental if there isn't enough time to complete requests.
By extending the deadlines, the user was able to solve the problem.

### Latency

If an issue cannot be found in the logs or with the Workflow itself, there may be a problem with the network connection.
More specifically, the network may have latency problems.

Unusually high latency can prevent requests from completing on time.
This can affect many areas of the Server at once.

As [this user](https://community.temporal.io/t/context-deadline-exceeded-issue/5310) noted, `DeadlineExceeded` was returned while scheduling the Workflow.
The history logs indicated possible database issues, but their metrics revealed latency issues across the Server.

After seeing the Workflow fail consistently, a new SQL instance was deployed and restarted.
The workflow executed without another issue.

If you experience widespread occurrences of the `DeadlineExceeded` error, make sure your server metrics are enabled.
Check persistence and visibility latencies for high values, along with resources exhausted.

---

### Workflow logic issues

- summary
- user cases
- solution

[Another user](https://community.temporal.io/t/unable-to-execute-workflow-context-deadline-exceeded-after-setting-up-mtls/3124) ran into the same error while setting up mTLS.
Like before, the frontend could not be reached by the system's Workers.
The user found that their `internode.server` certificate was invalid, and that they were missing a DNS name in their environmental configuration.

A similar case was seen when [this user](https://community.temporal.io/t/unable-to-get-temporal-sys-add-search-attributes-workflow-workflow-state-context-deadline-exceeded/4229) tried configuring mTLS in a Docker container and Openshift pod.
The environment couldn't find the user's `FRONTEND_DNS_NAME` and couldn't connect with Temporal.

Querying a Workflow Execution that fails to return a response can also cause a timeout.
If the timeout occurs on a Query, check your Worker logs to identify any issues with query handling.

Try to resolve the problem with the solutions below.

- Check your configuration files for missing environmental variables.
- Make sure that the frontend and internode certificates are clearly defined.
- Add any missing values before deploying the server again.
