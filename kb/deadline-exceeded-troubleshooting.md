---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-01T00:00:00Z
---

`DeadlineExceeded` is a Context error that occurs when a request cannot be completed in time.
Downed services, querying errors, and unusually high latencies can all throw this error.

Below, we address the three primary areas where `DeadlineExceeded` applies for our users.
We've highlighted some users' encounters below, along with the steps they took to resolve their issues.

If you're still unable to find the cause of your timeouts, please visit the community forum, community Slack, or file a support ticket if you are using Temporal Cloud.
Cloud users cannot access the logs mentioned below.

### Downed services

- summary
- user cases
- solutions

[One user](https://community.temporal.io/t/context-deadline-exceeded-when-trying-to-start-workflow-v1-7-1/4249) received the error while trying to start their Workflow.
The Temporal Worker failed to connect to the frontend service, and appeared to be blocking Workflow Execution.
Looking deeper into the problem revealed that HTTP requests were being fulfilled, but weren't registered at any point in their progress on Temporal Web.

### Workflow logic issues

- summary
- user cases
- solution

`DeadlineExceeded` may be thrown if connections are closed too soon.
[In the case of one user](https://community.temporal.io/t/how-to-best-handle-mysterious-context-deadline-exceeded-502-errors/2689/3), the Temporal Server was closing connections as they expired.
This behavior is expected, but can be detrimental if there isn't enough time to complete requests.

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

### High latencies

- summary
- use case
- solution

Unusually high latency can prevent requests from completing on time.
This can affect many areas of the Server at once.

As [this user](https://community.temporal.io/t/context-deadline-exceeded-issue/5310) noted, `DeadlineExceeded` was returned while scheduling the Workflow.
The history logs indicated possible database issues, but their metrics revealed latency issues across the Server.

After seeing the Workflow fail consistently, a new SQL instance was deployed and restarted.
The workflow executed without another issue.

If you experience widespread occurrences of the `DeadlineExceeded` error, make sure your server metrics are enabled.
Check persistence and visibility latencies for high values, along with resources exhausted.
