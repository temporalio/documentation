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

Temporal is aware that this error is vague, especially with how many cases it covers.
Should any problems persist after troubleshooting below, contact Temporal.

### Connection issues

Network interruptions can cause a `DeadlineExceeded` error.
[Several users](https://community.temporal.io/t/context-deadline-exceeded-when-trying-to-start-workflow-v1-7-1/4249) [have reported such problems](https://community.temporal.io/t/unable-to-execute-workflow-context-deadline-exceeded-after-setting-up-mtls/3124) while setting up mTLS on their servers.

Check your configuration files for missing environmental variables.
Make sure that the frontend and internode certificates are clearly defined.
Add any missing values before deploying the server again.

<!-- [](https://community.temporal.io/t/unable-to-get-temporal-sys-add-search-attributes-workflow-workflow-state-context-deadline-exceeded/4229) -->

### Short timeouts

`DeadlineExceeded` may be thrown if connections are closed too soon.
This can happen if the provided timeouts are too short to allow requests to complete.

[In the case of one user](https://community.temporal.io/t/how-to-best-handle-mysterious-context-deadline-exceeded-502-errors/2689/3), the Temporal Server was closing connections as they expired.
When the connection age was delayed, the rate of 502s received plummeted.

Check your configuration to make sure that timeouts are long enough to allow requests to be completed.
If timeouts keep expiring, increase the value and add a check for network growth.

### Server overload

`DeadlineExceeded` may occur if the Temporal Server cannot complete requests on time.
Querying a Workflow Execution that fails to return a response can also cause a timeout.

If the timeout occurs on a Query, check your Worker logs to identify any issues with query handling.
Otherwise, check your server metrics for unexpected latency.

<!-- [](https://community.temporal.io/t/context-deadline-exceeded-issue/5310) -->
