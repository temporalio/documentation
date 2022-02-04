---
id: listarchived
title: tctl workflow listarchived
sidebar_label: listarchived
description: How to list archived Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow listarchived` command lists archived [Workflow Executions](/docs/content/what-is-a-workflow-execution).

By default, this command lists a maximum of 100 Workflow Executions.

- To set the size of a page, use the `--pagesize` option.
- To list all pages, use the `--all` option.

See also [`tctl workflow list`](./list.md), [`tctl workflow listall`](./listall.md), and [`tctl workflow scan`](./scan.md).

`tctl workflow listarchived [<modifiers>]`

The following modifiers control the behavior of the command.

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow listarchived --print_raw_time
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow listarchived --print_datetime
```

### `--print_memo`

How to print a memo.

Alias: `--pme`

**Example**

```
tctl workflow listarchived --print_memo
```

### `--print_search_attr`

How to print the [Search Attributes](/docs/content/what-is-a-search-attribute).

Alias: `--psa`

**Example**

```
tctl workflow listarchived --print_search_attr
```

### `--print_full`

How to print the full message without table formatting.

Alias: `--pf`

**Example**

```
tctl workflow listarchived --print_full
```

### `--print_json`

How to print the raw JSON objects.

Alias: `pjson`

**Example**

```
tctl workflow listarchived --print_json
```

### `--query`

How to specify an SQL-like query of [Search Attributes](/docs/content/what-is-a-search-attribute).

Consult the documentation of the visibility archiver that is used by your [Namespace](/docs/content/what-is-a-namespace) for detailed instructions.

Alias: `-q`

**Example**

```
tctl workflow listarchived --query <value>
```

### `--pagesize`

How to specify the maximum number of [Workflow Executions](/docs/content/what-is-a-workflow-execution) to list on a page.
(By default, the `tctl workflow listarchived` command lists 100 Workflow Executions per page.)

Alias: `--ps`

**Example**

```
tctl workflow listarchived --pagesize <value>
```

### `--all`

How to list all pages.

Alias: `-a`

**Example**

```
tctl workflow listarchived --all
```
