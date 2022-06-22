---
id: how-to-set-child-workflow-options-in-python
title: How to set Child Workflow options in Python
sidebar_label: Set Child Workflow options
description: Set Child Workflow options
tags:
  - developer-guide
  - sdk
  - python
---

Use [`workflow.start_child_workflow()`](https://python.temporal.io/temporalio.workflow.html#start_child_workflow) to start a Child Workflow. This accepts either a Workflow run method reference or a string name. The arguments to the Workflow are positional.

Child Workflow options are set as keyword arguments after the positional arguments. The `id` must be provided.
The `await` of the start does not complete until the workflow has confirmed to be started
The result is a Child Workflow handle which is an `asyncio`.

Task and supports basic task features. The handle also has some child info and supports signalling the Child Workflow.

`workflow.execute_activity()` is a shortcut for `workflow.start_activity()` that waits on its result. To get just the handle to wait and cancel separately, `workflow.start_activity()` can be used. `workflow.execute_activity()` should be used in most cases unless advanced task capabilities are needed.
