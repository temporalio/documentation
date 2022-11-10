---
id: list
title: tctl batch-v2 list
sidebar_label: list
description: How to list batch jobs using tctl.
tags:
  - tctl
---

Alias: `l`

The `tctl batch-v2 list` command lists all batch jobs.

`tctl batch-v2 list [<modifiers>]`

The following modifier controls the behavior of the command.

### `--pagesize`

Specify the maximum number of batch jobs to list on a page. The default value is 30.

Alias: `--ps`

**Example**

```bash
tctl batch-v2 list --pagesize <value>
```
