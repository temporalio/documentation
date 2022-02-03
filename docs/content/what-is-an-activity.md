---
id: what-is-an-activity
title: What is an Activity?
description: In day-to-day conversations, the term "Activity" frequently denotes either an Activity Type, an Activity Definition, or an Activity Execution.
tags:
  - explanation
---

In day-to-day conversations, the term "Activity" frequently denotes either an [Activity Type](/docs/content/what-is-an-activity-type), an [Activity Definition](/docs/content/what-is-an-activity-definition), or an [Activity Execution](/docs/content/what-is-an-activity-execution).
Temporal documentation aims to be explicit and differentiate between them.

## Activities calling Activities

For some use cases, having an Activity call another Activity might seem convenient.
We generally recommend not doing so. Activities are regular functions, so calling one directly is not seen—and therefore not logged—by the Temporal Server.

Instead, move logic out of the Activities and have the parent Workflow use the result of one Activity to call the other Activity.
