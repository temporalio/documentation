---
id: workflow-retries
title: Workflow retries
description: A Retry Policy can work in cooperation with the timeouts to provide fine controls to optimize the execution experience.
sidebar_label: Workflow retries
tags:
  - guide-context
---

A Retry Policy can work in cooperation with the timeouts to provide fine controls to optimize the execution experience.

Use a [Retry Policy](/concepts/what-is-a-retry-policy) to retry a Workflow Execution in the event of a failure.

Workflow Executions do not retry by default, and Retry Policies should be used with Workflow Executions only in certain situations.
