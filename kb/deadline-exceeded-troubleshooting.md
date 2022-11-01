---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-11-01T00:00:00Z
---

`DeadlineExceeded` is a Context error that originates in `gRPC`.
This error occurs when a request hasn't been replied to before its timeout.

`DeadlineExceeded` often occurs alongside other errors.
Together, the errors can indicate several different conditions, such as:

- Connection issues
- Timeouts
- Server overload
- Query handling issues

<!-- Temporal is aware that this error is vague, especially with how many cases it covers.
Should any problems persist after troubleshooting below, contact Temporal. -->

We've highlighted some users' encounters below, along with the steps they took to resolve their issues.

<!-- Refer to the end for general troubleshooting. -->

### Connection issues

Network interruptions can cause a `DeadlineExceeded` error.

<!-- TODO: add images and snippets. May make user cases their own subheadings. -->

[One user](https://community.temporal.io/t/context-deadline-exceeded-when-trying-to-start-workflow-v1-7-1/4249) received the error while trying to start their Workflow.
The Temporal Worker failed to connect to the frontend service, and appeared to be blocking Workflow Execution.
Looking deeper into the problem revealed that HTTP requests were being fulfilled, but weren't registered at any point in their progress on Temporal Web.

[Another user](https://community.temporal.io/t/unable-to-execute-workflow-context-deadline-exceeded-after-setting-up-mtls/3124) ran into the same error while setting up mTLS.
Like before, the frontend could not be reached by the system's Workers.
The user found that their `internode.server` certificate was invalid, and that they were missing a DNS name in their environmental configuration.

A similar case was seen when [this user](https://community.temporal.io/t/unable-to-get-temporal-sys-add-search-attributes-workflow-workflow-state-context-deadline-exceeded/4229) tried configuring mTLS in a Docker container and Openshift pod.
The environment couldn't find the user's `FRONTEND_DNS_NAME` and couldn't connect with Temporal.

Check your configuration files for missing environmental variables.
Make sure that the frontend and internode certificates are clearly defined.
Add any missing values before deploying the server again.

### Short timeouts

`DeadlineExceeded` may be thrown if connections are closed too soon.
This can happen if the provided timeouts are too short to allow requests to complete.

[In the case of one user](https://community.temporal.io/t/how-to-best-handle-mysterious-context-deadline-exceeded-502-errors/2689/3), the Temporal Server was closing connections as they expired.

- more about issue

- more about solution
  When the connection age was delayed, the rate of 502s received plummeted.

- more summary here

Check your configuration to make sure that timeouts are long enough to allow requests to be completed.
If timeouts keep expiring, increase the value and add a check for network growth.

### Server overload

`DeadlineExceeded` may occur if the Temporal Server cannot complete requests on time.
Querying a Workflow Execution that fails to return a response can also cause a timeout.

- situation here
- summary here

### Query handling issues

If the timeout occurs on a Query, check your Worker logs to identify any issues with query handling.
Otherwise, check your server metrics for unexpected latency.

<!-- [](https://community.temporal.io/t/context-deadline-exceeded-issue/5310) -->
