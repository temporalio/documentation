---
id: what-is-an-activity-task-execution
title: What is an Activity Task Execution?
sidebar_label: Activity Task Execution
description: An Activity Task Execution is the execution of an Activity Type.
tags:
  - explanation
---

An Activity Task Execution is when the Worker uses the Context provided from the [Activity Task](/docs/concepts/what-is-an-activity-task) and executes the [Activity Definition](/docs/concepts/what-is-an-activity-definition).

The API to schedule an Activity Execution provides an "effectively once" experience, even though there may be several Activity Task Executions that take place to successfully complete an Activity.
