---
id: query
title: query
description: definition for the --query modifier in tctl
tags:
  - reference
  - tctl
---

### `--query`

_Required modifier_

The `--query` flag is supported only when [Advanced Visibility](/concepts/what-is-advanced-visibility) is configured with the Cluster.

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Using the `--query` option causes tctl to ignore all other filter options, including `open`, `earliest-time`, `latest-time`, `workflow-id`, and `workflow-type`.

Alias: `-q`

**Examples**

Count all open [Workflow Executions](/concepts/what-is-a-workflow-execution):

```bash
tctl workflow <command> --query 'ExecutionStatus="Running"'
```

List all Workflows with the given WorkflowId or RunId:

```bash
tctl workflow <command> \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

List all open Workflows that started at a given time:

```bash
tctl workflow <command> \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and ExecutionStatus = "Running"'
```
