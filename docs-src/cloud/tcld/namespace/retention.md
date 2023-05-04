---
id: retention
title: tcld namespace retention
sidebar_label: retention
description: How to manage the length of time a closed Workflow is preserved before deletion.
tags:
  - tcld
---

The `tcld namespace retention` command manages the length of time (in days) a closed Workflow is preserved before deletion for a given Namespace in Temporal Cloud.

Alias: `r`

`tcld namespace retention`

The following modifier controls the behavior of the command.

### `set`

Set the length of time (in days) a closed Workflow will be preserved before deletion for a given namespace.

Alias: `s`

**Example**

```bash
tcld namespace retention set --namespace <namespace_id> --retention-days <retention_days>
```

### `get`

Retrieve the length of time (in days) a closed Workflow will be preserved before deletion for a given namespace.

Alias: `g`

**Example**

```bash
tcld namespace retention get --namespace <namespace_id>
```
