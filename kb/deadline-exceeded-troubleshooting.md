---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-10-28T00:00:00Z
---

`DeadlineExceeded` is a Context error that originates in `gRPC`.
This error occurs when a request hasn't been replied to before its timeout.

This error is caused by several different conditions, and can be a symptom of other issues occurring on the network.

### Connection issues

Network interruptions can interfere with the Server's function.

[](https://community.temporal.io/t/context-deadline-exceeded-when-trying-to-start-workflow-v1-7-1/4249)
[](https://community.temporal.io/t/unable-to-execute-workflow-context-deadline-exceeded-after-setting-up-mtls/3124)
[](https://community.temporal.io/t/unable-to-get-temporal-sys-add-search-attributes-workflow-workflow-state-context-deadline-exceeded/4229)

### Short timeouts

[](https://community.temporal.io/t/how-to-best-handle-mysterious-context-deadline-exceeded-502-errors/2689/3)

### Registration / scheduling

[](https://community.temporal.io/t/context-deadline-exceeded-issue/5310)
[](https://community.temporal.io/t/context-deadline-exceeded-issue/5310/16)

### Troubleshooting

[](https://github.com/temporalio/legacy-documentation-sdks/blob/60153986bed3f4588005471271d552e5417d674e/docs/typescript/troubleshooting.md)

Verify that the connection from your Worker to the Server is working.
Check your server metrics for unusually high latency.

If the timeout occurs on a Query, check your Worker logs to identigy any issues with query handling.

### Conclusion

Temporal is aware that this error is vague, especially with how many cases it covers.
