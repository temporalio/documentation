---
id: pending-child-workflows-limit-exceeded
title: Pending Child Workflows Limit Exceeded
description: Explanation for Pending Child Workflows Limit Exceeded error message, and how to fix it.
sidebar_label: Pending Child Workflows Limit Exceeded
tags:
  - errors
  - strongly-typed
---

This error indicates that the [Workflow](/workflows) has reached capacity for pending [Child Workflows](/concepts/what-is-a-child-workflow-execution).
Therefore, the [Workflow Task](/concepts/what-is-a-workflow-task)was failed to prevent additional Child Workflows from being added.

Wait for the system to finish any currently running Child Workflows before redeploying this Task.
