---
id: how-to-list-workflows-in-python
title: How to list Workflows in Python
sidebar_label: List Workflows
description: List Workflows from the Client using `list_workflows()`.
tags:
  - developer-guide
  - sdk
  - python
---

Use the [list_workflows()](https://python.temporal.io/temporalio.client.Client.html#list_workflows) method and pass a [List Filter](/tctl-v1/workflow#list) as an argument to add conditions to filter the listed Workflows.

```python
client = await Client.connect("localhost:7233")
client.list_workflows('TaskQueue="your-activity-task-queue"')
client.list_workflows('WorkflowId="your-activity-workflow-id"')
```
