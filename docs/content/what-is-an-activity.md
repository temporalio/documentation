---
id: what-is-an-activity
title: What is an Activity?
description: todo
---

In day-to-day conversations, the term "Activity" frequently denotes either an [Activity Type](/docs/content/what-is-an-activity-type), an [Activity Definition](/docs/content/what-is-an-activity-definition), or an [Activity Execution](/docs/content/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

A business-level function that implements your application logic, such as calling a service or transcoding a media file.

- An Activity usually implements a single well-defined action; it can be short or long running.
- An Activity can be implemented as a synchronous method or fully asynchronously involving multiple processes.
- An Activity can be retried indefinitely according to the provided exponential retry policy.
- If for any reason an Activity is not completed within the specified timeout, an error is reported to the [Workflow](#workflow), which decides how to handle it. The duration of an Activity has no limit.
- Activities support an [Activity Heartbeat](#activity-heartbeat) that helps to identify timeouts faster in case the Activity execution fails.
