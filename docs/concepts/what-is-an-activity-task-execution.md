---
id: what-is-an-activity-task-execution
title: What is an Activity Task Execution?
sidebar_label: Activity Task Execution
description: An Activity Task Execution is the execution of an Activity Type.
tags:
  - explanation
---

An Activity Task Execution is when the Worker uses the Context provided from the [Activity Task](/docs/concepts/what-is-an-activity-task) and executes the [Activity Definition](/docs/concepts/what-is-an-activity-definition). 

From the API, users see an Activity being executed and assume that it runs once.

In reality, the Activity can be retried per a Retry Policy until it achieves its expected result.
