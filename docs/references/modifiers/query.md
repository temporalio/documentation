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

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Alias: `-q`

**Example**

To count all open [Workflow Executions](/concepts/what-is-a-workflow-execution):

```bash
tctl workflow count --query 'ExecutionStatus="Running"'
```
