---
id: activity-timeouts
title: How to set Activity timeouts
sidebar_label: Activity timeouts
description: Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.
tags:
  - guide-context
---

Each Activity timeout controls the maximum duration of a different aspect of an Activity Execution.

The following timeouts are available in the Activity Options.

- **[Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout)**: is the maximum amount of time allowed for the overall [Activity Execution](/concepts/what-is-an-activity-execution).
- **[Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout)**: is the maximum time allowed for a single [Activity Task Execution](/concepts/what-is-an-activity-task-execution).
- **[Schedule-To-Start Timeout](/concepts/what-is-a-schedule-to-start-timeout)**: is the maximum amount of time that is allowed from when an [Activity Task](/concepts/what-is-an-activity-task) is scheduled to when a [Worker](/concepts/what-is-a-worker) starts that Activity Task.

An Activity Execution must have either the Start-To-Close or the Schedule-To-Close Timeout set.
