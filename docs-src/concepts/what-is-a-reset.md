---
id: what-is-a-reset
title: What is a Reset?
sidebar_label: Reset
description: A Reset terminates a Workflow Execution, removes the progress in the Event History up to the reset point, and then creates a new Workflow Execution with the same Workflow Type and Id to continue.
tags:
  - term
  - resets
  - explanation
---

A Reset terminates a [Workflow Execution](/concepts/what-is-a-workflow-execution) and creates a new Workflow Execution with the same [Workflow Type](/workflows#workflow-type) and [Workflow ID](/concepts/what-is-a-workflow-id).
The [Event History](/workflows#event-history) is copied from the original execution up to and including the reset point.
The new execution continues from the reset point.
Signals in the original history can be optionally copied to the new history, whether they appear after the reset point or not.
