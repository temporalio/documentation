---
id: list
title: tctl batch list
sidebar_label: list
description: How to list batch jobs using tctl.
tags:
  - tctl
---

The `tctl batch list` command lists all batch jobs.

`tctl batch list <modifiers>`

:::note

`tctl-v1` can run `batch` and `batch-v2` commands.

:::

The following modifier controls the behavior of the command.

### --pagesize

Specify the maximum number of batch jobs to list on a page. The default value is 30.

**Example**

```bash
tctl batch list --pagesize <value>
```
