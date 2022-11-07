---
id: developing-activities
title: How to develop a basic Activity
description: One of the primary things that Workflows do is orchestrate the execution of Activities.
sidebar_label: Develop Activities
tags:
  - guide-context
---

One of the primary things that Workflows do is orchestrate the execution of Activities.
Activities are normal function/method executions that can interact with the world.
For the Workflow to be able to execute the Activity, we must define the [Activity Definition](/concepts/what-is-an-activity-definition).

Temporal recommends that Activities are idempotent. Activities are idempotent if multiple applications of that operation do not change the state of the system beyond the initial application.
