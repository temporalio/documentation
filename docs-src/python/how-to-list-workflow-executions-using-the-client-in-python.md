---
id: how-to-list-workflow-executions-using-the-client-in-python
title: How to list Workflows in Python
sidebar_label: List Workflows
description: To list Workflows from the Client, use the [list_workflows()](https
---

Use the [list_workflows()](https://python.temporal.io/temporalio.client.Client.html#list_workflows) method on the Client handle and pass a [List Filter](/concepts/what-is-a-list-filter) as an argument to filter the listed Workflows.

<a class="dacx-source-link" href="https://github.com/temporalio/documentation-samples-python/blob/main/your_visibility/starter_dacx.py">View source code</a>

```python

# ...
        print(f"Workflow: {workflow.id}")

```

