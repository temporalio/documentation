---
id: what-is-a-workflow-run-timeout
title: What is a Workflow Run Timeout?
tags:
  - explanation
---

This is the maximum amount of time that a single Workflow Run is restricted to.

**The default is set to the same value as the [Workflow Execution Timeout](/docs/content/what-is-a-workflow-execution-timeout).**

This timeout is most commonly used to limit the execution time of a single [cron scheduled Workflow Execution](#cron-schedule).

If this timeout is reached and there is an associated Retry Policy, the Workflow will be retried before any scheduling occurs.

If there is no Retry Policy then the Workflow will be scheduled per the [cron schedule](#cron-schedule).
