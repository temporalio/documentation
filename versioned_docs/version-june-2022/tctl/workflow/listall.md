---
id: listall
title: tctl workflow listall
sidebar_label: listall
description: How to list all open or closed Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow listall` command lists all open or closed [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists all closed Workflow Executions.
To list open Workflow Executions, use the `--open` option.

See also [`tctl workflow list`](/tctl/workflow/list), [`tctl workflow listarchived`](/tctl/workflow/listarchived), and [`tctl workflow scan`](/tctl/workflow/scan).

`tctl workflow listall [<modifiers>]`

The following modifiers control the behavior of the command.

### `--print_raw_time`

Print the raw timestamp.

Alias: `--prt`

**Example**

```bash
tctl workflow listall --print_raw_time
```

### `--print_datetime`

Print the timestamp.

Alias: `--pdt`

**Example**

```bash
tctl workflow listall --print_datetime
```

### `--print_memo`

Print a memo.

Alias: `--pme`

**Example**

```bash
tctl workflow listall --print_memo
```

### `--print_search_attr`

Print the [Search Attributes](/concepts/what-is-a-search-attribute).

Alias: `--psa`

**Example**

```bash
tctl workflow listall --print_search_attr
```

### `--print_full`

Print the full message without table formatting.

Alias: `--pf`

**Example**

```bash
tctl workflow listall --print_full
```

### `--print_json`

Print the raw JSON objects.

Alias: `pjson`

**Example**

```bash
tctl workflow listall --print_json
```

### `--open`

List open [Workflow Executions](/concepts/what-is-a-workflow-execution).
(By default, the `tctl workflow listall` command lists closed Workflow Executions.)

Alias: `--op`

**Example**

```bash
tctl workflow listall --open
```

### `--earliest_time`

Specify the earliest start time to list. Supported format are as follows:

- `<year>-<month>-<day>T<hour>:<minute>:<second><+|-><offsethours>:<offsetminutes>`
- Raw Unix Epoch time (the number of milliseconds since 0000 UTC on January 1, 1970).
- `<n><duration`, where `<n>` is a value between 0 and 1000000, and `<duration>` is one of the following:
  - `second` or `s`
  - `minute` or `m`
  - `hour` or `h`
  - `day` or `d`
  - `week` or `w`
  - `month` or `M`
  - `year` or `y`

Alias: `--et`

**Examples**

To specify 3:04:05 PM India Standard Time on January 2, 2022:

```bash
tctl workflow listall --earliest-time '2022-01-02T15:04:05+05:30'
```

To specify 15 minutes before the current time:

```bash
tctl workflow listall --earliest-time '15minute'
```

### `--latest_time`

Specify the latest start time to list. Supported formats are as follows:

- `<year>-<month>-<day>T<hour>:<minute>:<second><+|-><offsethours>:<offsetminutes>`
- Raw Unix Epoch time (the number of milliseconds since 0000 UTC on January 1, 1970).
- `<n><duration`, where `<n>` is a value between 0 and 1000000, and `<duration>` is one of the following:
  - `second` or `s`
  - `minute` or `m`
  - `hour` or `h`
  - `day` or `d`
  - `week` or `w`
  - `month` or `M`
  - `year` or `y`

Alias: `--lt`

**Examples**

To specify 11:02:17 PM Pacific Daylight Time on April 13, 2022:

```bash
tctl workflow listall --latest-time '2022-04-13T23:02:17-07:00'
```

To specify 10 seconds before the current time:

```bash
tctl workflow listall --latest-time '10second'
```

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow listall --workflow_id <id>
```

### `--workflow_type`

Specify the name of a [Workflow Type](/concepts/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```bash
tctl workflow listall --workflow_type <name>
```

### `--status`

Specify the status of a [Workflow Execution](/concepts/what-is-a-workflow-execution).
Supported values are as follows:

- `completed`
- `failed`
- `canceled`
- `terminated`
- `continuedasnew`
- `timedout`

Alias: `-s`

**Example**

```bash
tctl workflow listall --status <value>
```

### `--query`

Specify an SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute).

Using the `--query` option causes tctl to ignore all other filter options, including `open`, `earliest_time`, `latest_time`, `workflow_id`, and `workflow_type`.

Alias: `-q`

**Example**

```bash
tctl workflow listall --query <value>
```
