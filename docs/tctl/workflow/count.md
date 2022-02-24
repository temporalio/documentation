---
id: count
title: tctl workflow count
sidebar_label: count
description: How to count Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow count` command counts [Workflow Executions](/docs/concepts/what-is-a-workflow-execution).
This command requires Elasticsearch to be enabled.

`tctl workflow count [<modifiers>]`

The following modifier controls the behavior of the command.

### `--query`

_Required modifier_

Specify an SQL-like query of [Search Attributes](/docs/concepts/what-is-a-search-attribute).

Alias: `-q`

**Example**

To count all open [Workflow Executions](/docs/concepts/what-is-a-workflow-execution):

```bash
tctl workflow count --query 'CloseTime = missing'; 'WorkflowType="wtype" and CloseTime > 0'
```
