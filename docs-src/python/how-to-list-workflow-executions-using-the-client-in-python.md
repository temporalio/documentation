---
id: how-to-list-workflow-executions-using-the-client-in-python
title: How to list Workflows in Python
sidebar_label: List Workflows
description: List Workflows from the Client using `list_workflows()`.
tags:
  - developer-guide
  - sdk
  - python
---

Use the [list_workflows()](https://python.temporal.io/temporalio.client.Client.html#list_workflows) method on the Client handle and pass a [List Filter](/concepts/what-is-a-list-filter) as an argument to filter the listed Workflows.

```python
async for workflow in client.list_workflows('WorkflowType="MyWorkflowClass"'):
    print(f"Workflow: {workflow.id}")
```
