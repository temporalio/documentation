---
id: test-functions-in-workflow-context
title: Test functions in Workflow context
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Workflow context
tags:
  - guide-context
---

For a function or method to run in the Workflow context (where it’s possible to get the current Workflow info, or running inside the sandbox in the case of TypeScript or Python), it needs to be run by the Worker as if it were a Workflow.

:::note

This section is applicable in Python and TypeScript.
In Python, we allow testing of Workflows only and not generic Workflow-related code.

:::
