---
id: get-activity-results
title: How to get the results of an Activity Execution
description: The call to spawn an Activity Execution generates the ScheduleActivityTask Command and provides the Workflow with an Awaitable.
sidebar_label: Get Activity results
tags:
  - guide-context
---

The call to spawn an [Activity Execution](/concepts/what-is-an-activity-execution) generates the [ScheduleActivityTask](/references/commands/#scheduleactivitytask) Command and provides the Workflow with an Awaitable.
Workflow Executions can either block progress until the result is available through the Awaitable or continue progressing, making use of the result when it becomes available.
