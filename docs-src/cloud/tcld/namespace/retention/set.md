---
id: set
title: tcld namespace retention set
sidebar_label: set
description: How to set the length of time a closed Workflow will be preserved before deletion for a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

Set the length of time (in days) a closed Workflow will be preserved before deletion for the specified Namespace.

Alias: `s`

The following modifiers control the behavior of the command.

#### `--namespace`

_Required modifier_

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

#### `--retention-days`

_Required modifier_

Specify the number of days a closed Workflow will be preserved before deletion.

Alias: `--rd`

**Example**

```bash
tcld namespace retention set --namespace <namespace_id> --retention-days <retention_days>
```
