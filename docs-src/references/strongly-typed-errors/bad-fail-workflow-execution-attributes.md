---
id: bad-fail-workflow-execution-attributes
title: Bad Fail Workflow Execution Attributes
description: Explanation for Bad Fail Workflow Execution Attributes error message, and how to fix it.
sidebar_label: Bad Fail Workflow Execution Attributes
tags:
  - errors
  - strongly-typed
---

This error indicates that the Workflow Task failed due to unset FailWorkflowExecution attributes.

If you encounter this error, make sure that `StartToClostTimeout` or `ScheduleToCloseTimeout` are set.
Restart the Worker that the Workflow and Activity are registered to.
