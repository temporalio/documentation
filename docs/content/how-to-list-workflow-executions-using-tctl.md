---
id: how-to-list-workflow-executions-using-tctl
title: How to list Workflow Executions using tctl
description: Use the `tctl workflow list` command to list Workflow Executions that are being tracked by the Temporal Platform.

tags:
  - visibility
  - filtered-lists
  - visibility
---

Use the following command to list Workflow Executions that are being tracked by the Temporal Platform:

```bash
tctl workflow list
```

This command will list Workflow Executions with a Closed status by default.

### `--open`

Lists Workflow Executions with an Open status

```bash
tctl workflow list --open
```

### `--more`

Only one page is displayed by default.
To view more items, use the `--more` flag.

```bash
tctl workflow list --more
```

### `--query`

Use the `--query` flag to list Workflows using an SQL-like query.
The use of this flag overrides all other filter flags.

:::note

The `--query` flag is supported only when Advanced Visibility is configured with the Cluster.

:::

```bash
tctl workflow list --query "WorflowId=YourWorkflowId"
```

More examples:

```bash
tctl workflow list \
  --query "WorkflowType='main.SampleParentWorkflow' AND ExecutionStatus='Running'"
```

```bash
tctl workflow list \
  --query '(CustomKeywordField = "keyword1" and CustomIntField >= 5) or CustomKeywordField = "keyword2"' \
  --print_search_attr
```

```bash
tctl workflow list \
  --query 'CustomKeywordField in ("keyword2", "keyword1") and CustomIntField >= 5 and CloseTime between "2018-06-07T16:16:36-08:00" and "2019-06-07T16:46:34-08:00" order by CustomDatetimeField desc' \
  --print_search_attr
```

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and ExecutionStatus = "Running"'
```
