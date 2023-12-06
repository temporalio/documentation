---
id: workflow-patching-strategies
title: Strategies for Workflow Code Updates
sidebar_label: Update Strategies
description: Covers different strategies for updating workflow code in Temporal, including the use of the Patching API.
tags:
  - guide-temporal
  - patching-strategies
---

The Patching API in Temporal is designed to allow you to change Workflow Definitions without causing non-deterministic behavior in current long-running Workflows.
However, there are situations where you might not need to use the Patching API, if your Workflow Executions are short-lived, and you don't need to preserve your currently running Workflow Executions, you can simply terminate all the currently running Workflow Executions and suspend new ones from being created while you deploy the new version of your Workflow code.
After the deployment, you can resume Workflow creation.

The Patching API is particularly useful when you need to update Workflow Definition logic that still has running Workflow Executions that depend on it.
