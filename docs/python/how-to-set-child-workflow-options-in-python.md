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

Use `async workflow.start_child_workflow()` to set a Child Workflow. This accepts either a Workflow run method
reference or a string name.
The arguments to the workflow are positional.

Child Workflow options are set as keyword arguments after the positional arguments. The `id` must be provided.
The await of the start does not complete until the workflow has confirmed to be started
The result is a Child Workflow handle which is an `asyncio`.

Task and supports basic task features. The handle also has some child info and supports signalling the Child Workflow
A `sync workflow.execute_child_workflow()` helper is provided which takes the same arguments as
`workflow.start_child_workflow()` and awaits on the result. This should be used in most cases unless advanced task
capabilities are needed.
