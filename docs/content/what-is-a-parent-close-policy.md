---
id: what-is-a-parent-close-policy
title: What is a Parent Close Policy
description: todo
tags:
  - explanation
---

If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution should its Parent Workflow Execution change to a Closed status (Completed, Failed, Timed out).

If the Workflow Execution is not a Child Workflow Execution, a Parent Close Policy has no effect on the execution.

A Parent Close Policy must be provided when the Workflow Execution is spawned.

A Parent Close Policy has three possible values:

- `ABANDON`: When the Parent Closes, there is no effect to the Child Workflow Execution.
- `TERMINATE`: When the Parent Closes, the Child Workflow Execution is Terminated.
- `REQUEST_CANCEL`: When the Parent Closes, the Child Workflow Execution is Cancelled.

Each Child Workflow Execution may have its own Parent Close Policy.
