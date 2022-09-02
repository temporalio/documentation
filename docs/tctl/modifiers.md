---
id: modifiers
title: tctl modifiers
description: Comprehensive list of tctl modifiers, referenced within other files.
tags:
  - reference
  - tctl
---

Modifiers are optional flags added to `tctl` commands to return different results.

Modifiers are listed alphabetically.

### `--fields`

Customize the fields to print.
Set to 'long' to automatically print more of the main fields.

**Example**

```bash
tctl workflow start --fields <value>
```

### `--follow`

Follows the progress of a Workflow Execution.

Alias: `-f`

**Example**

```bash
tctl workflow show --follow
```
