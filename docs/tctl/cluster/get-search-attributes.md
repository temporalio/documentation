---
id: get-search-attributes
title: tctl cluster get-search-attributes
sidebar_label: get-search-attributes
description: How to list all Search Attributes using tctl.
tags:
  - reference
  - tctl
---

The `tctl cluster get-search-attributes` command lists all [Search Attributes](/concepts/what-is-a-search-attribute) that can be used in the `--query` modifier of the [`tctl workflow list`](/tctl/workflow/list) command.

**Example:**

```bash
tctl cluster get-search-attributes
```

The command has no modifiers.

Example output:

```text
+-----------------------+----------+
|         NAME          |   TYPE   |
+-----------------------+----------+
| BinaryChecksums       | Keyword  |
| CloseTime             | Int      |
| CustomBoolField       | Bool     |
| CustomDatetimeField   | Datetime |
| CustomDoubleField     | Double   |
| CustomIntField        | Int      |
| CustomKeywordField    | Keyword  |
| CustomNamespace       | Keyword  |
| CustomStringField     | String   |
| ExecutionStatus       | Int      |
| ExecutionTime         | Int      |
| Operator              | Keyword  |
| RunId                 | Keyword  |
| StartTime             | Int      |
| TaskQueue             | Keyword  |
| TemporalChangeVersion | Keyword  |
| WorkflowId            | Keyword  |
| WorkflowType          | Keyword  |
+-----------------------+----------+
```

The admin version of this command displays default and custom Search Attributes separately, and also shows the underlying Elasticsearch index schema and system Workflow status.
