---
slug: deadline-exceeded-troubleshooting
title: DeadlineExceeded error troubleshooting
tags:
  - kb-article
date: 2022-10-28T00:00:00Z
---

`DeadlineExceeded` is a Context error that originates in `gRPC`.
This error occurs when an expired timeout is found.

This error is caused by several different conditions.
We've provided examples from users and our own documentation for you to troubleshoot your issue.

### Conclusion

Temporal is aware that this error is vague, especially with how many cases it covers.
In general, the error may be thrown when the server experiences network interruptions, overloaded servers, invalid timeouts, and upon querying a Workflow Execution with an erroneous Query handler.

This error won't interrupt a running server.
However, it could indicate other issues.
