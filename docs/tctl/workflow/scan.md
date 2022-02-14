---
id: scan
title: tctl workflow scan
sidebar_label: scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow scan` command lists [Workflow Executions](/docs/concepts/what-is-a-workflow-execution).
It is faster than the `tctl workflow listall` command, but the results are not sorted.

By default, this command lists a maximum of 2000 Workflow Executions.
To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](/docs/tctl/workflow/list), [`tctl workflow listall`](/docs/tctl/workflow/listall), and [`tctl workflow listarchived`](/docs/tctl/workflow/listarchived).

`tctl workflow scan [<modifiers>]`

The following modifiers control the behavior of the command.

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow scan --print_raw_time
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow scan --print_datetime
```

### `--print_memo`

How to print a memo.

Alias: `--pme`

**Example**

```
tctl workflow scan --print_memo
```

### `--print_search_attr`

How to print the [Search Attributes](/docs/concepts/what-is-a-search-attribute).

Alias: `--psa`

**Example**

```
tctl workflow scan --print_search_attr
```

### `--print_full`

How to print the full message without table formatting.

Alias: `--pf`

**Example**

```
tctl workflow scan --print_full
```

### `--print_json`

How to print the raw JSON objects.

Alias: `pjson`

**Example**

```
tctl workflow scan --print_json
```

### `--pagesize`

How to specify the maximum number of [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) to list on a page.
(By default, the `tctl workflow scan` command lists 2000 Workflow Executions per page.)

Alias: `--ps`

**Example**

```
tctl workflow scan --pagesize <value>
```

### `--query`

How to specify an SQL-like query of [Search Attributes](/docs/concepts/what-is-a-search-attribute).

Alias: `-q`

**Example**

```
tctl workflow scan --query <value>
```
