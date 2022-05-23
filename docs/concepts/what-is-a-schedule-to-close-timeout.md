---
id: what-is-a-schedule-to-close-timeout
title: What is a Schedule-To-Close Timeout?
sidebar_label: Schedule-To-Close Timeout
description: A Schedule-To-Close Timeout is the maximum amount of time allowed for the overall Activity Execution, from when the first Activity Task is scheduled to when the last Activity Task, in the chain of Activity Tasks that make up the Activity Execution, reaches a Closed status.
tags:
  - explanation
  - timeouts
---

A Schedule-To-Close Timeout is the maximum amount of time allowed for the overall [Activity Execution](/concepts/what-is-an-activity-execution), from when the first [Activity Task](/concepts/what-is-an-activity-task) is scheduled to when the last Activity Task, in the chain of Activity Tasks that make up the Activity Execution, reaches a Closed status.

- [How to set a Schedule-To-Close Timeout in Go](/go/how-to-set-a-schedule-to-close-timeout-in-go)

![Schedule-To-Close Timeout period](/diagrams/schedule-to-close-timeout.svg)

Example Schedule-To-Close Timeout period for an Activity Execution that has a chain Activity Task Executions:

![Schedule-To-Close Timeout period with a retry](/diagrams/schedule-to-close-timeout-with-retry.svg)

**The default Schedule-To-Close Timeout is ∞ (infinity).**

An Activity Execution must have either this timeout (Schedule-To-Close) or [Start-To-Close](/concepts/what-is-a-start-to-close-timeout) set.
By default, an Activity Execution Retry Policy dictates that retries will occur for up to 10 years.
This timeout can be used to control the overall duration of an Activity Execution in the face of failures (repeated Activity Task Executions), without altering the Maximum Attempts field of the Retry Policy.
