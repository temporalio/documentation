---
id: scan
title: tctl workflow scan
sidebar_label: scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow scan` command lists [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 2000 Workflow Executions.
To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](/tctl/workflow/list).

`tctl workflow scan <modifiers>`

The following modifiers control the behavior of the command.

### `--fields`

Customize the fields to print.
Set to 'long' to automatically print more of the main fields.

**Example**

```bash
tctl workflow start --fields <value>
```

### `--limit`

Sets the number of items to print.

**Example**

```bash
tctl workflow show --limit <value>
```

### `--no-pager`

Disables the interactive pager.

Alias: `-P`

**Example**

```bash
tctl workflow start --no-pager <value>
```

### `--output`

Specifies the format for printed output.

Alias: `-o`

Values: table, json, card

**Example**

```tctl
tctl workflow start --output <value>
```

### `--pager`

Specifies the pager to use.

Values: less, more, favoritePager..[$PAGER]

**Example**

```bash
tctl workflow start --pager <value>
```

### `--query`

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Alias: `-q`

**Example**

```bash
tctl workflow scan --query <value>
```

### `--time-format`

Specifies the format for time values.

Values: relative, iso, raw

**Example**

```bash
tctl workflow start --time-format <value>
```
