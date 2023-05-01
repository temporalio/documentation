---
id: cause-bad-update
title: Cause Bad Update
description: Explanation for Cause Bad Update error message, and how to fix it.
sidebar_label: Cause Bad Update
tags:
  - errors
  - strongly-typed
---

<!--TODO: add link to Workflow Update page when written -->

This error indicates that a [Workflow Execution](/concepts/what-is-a-workflow-execution) could not be updated.

`BadUpdate` can happen when a [Worker](/concepts/what-is-a-worker) generates a [Workflow Task Completed](/references/events#WorkflowTaskCompleted) message with missing fields or an invalid format.

This error can also indicate usage of an unsupported SDK.
