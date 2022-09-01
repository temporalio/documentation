---
id: delete
title: tctl namespace delete
sidebar_label: delete
description: Deleting a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace delete` command deletes a [Namespace](/concepts/what-is-a-namespace).

`tctl namespace delete`

The following modifiers control the behavior of the command.

### `--name`

Identifies the Namespace to delete.

Alias: `-n`

**Example**

```bash
tctl namespace delete --name <value>
```

### `--yes`

Confirms all prompts when deleting a Namespace.
This is false by default.

Alias: `-y`

**Example**

```bash
tctl namespace delete --yes <value>
```
