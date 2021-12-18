---
id: list
title: tctl batch list
description: How to list batch jobs using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch list` command lists all batch joba.

`tctl batch list <options> <arguments...>`

The following option modifies the behavior of the command.

### `--pagesize`

How to specify the maximum number of batch jobs to list on a page. The default value is 30.

Alias: `--ps`

**Example**

```
tctl batch list --pagesize <value>
```
