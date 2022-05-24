---
id: show
title: tctl workflow show
sidebar_label: show
description: How to show Workflow History using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow show` command shows History for the specified [Workflow Execution](/concepts/what-is-a-workflow-execution).

`tctl workflow show [<modifiers>]`

See also [`tctl workflow showid`](/tctl/workflow/showid).

The following modifiers control the behavior of the command.

### `--workflow_id`

Show the History of a [Workflow Execution](/concepts/what-is-a-workflow-execution) by specifying a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow show --workflow_id <id>
```

### `--run_id`

Show the History of a [Workflow Execution](/concepts/what-is-a-workflow-execution) by specifying a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```bash
tctl workflow show --run_id <id>
```

### `--print_datetime`

Print the timestamp.

Alias: `--pdt`

**Example**

```bash
tctl workflow show --print_datetime
```

### `--print_raw_time`

Print the raw timestamp.

Alias: `--prt`

**Example**

```bash
tctl workflow show --print_raw_time
```

### `--output_filename`

Serialize an event to a file.

Alias: `--of`

**Example**

```bash
tctl workflow show --output_filename <filename>
```

### `--print_full`

Print full event details.

Alias: `--pf`

**Example**

```bash
tctl workflow show --print_full
```

### `--print_event_version`

Print the event version.

Alias: `--pev`

**Example**

```bash
tctl workflow show --print_event_version
```

### `--event_id`

Print the details of a specified event.
The default value is 0.

Alias: `--eid`

**Example**

```bash
tctl workflow show --event_id <id>
```

### `--max_field_length`

Specify the maximum length for each attribute field.
The default value is 500.

Alias: `--maxl`

**Example**

```bash
tctl workflow show --max_field_length <length>
```

### `--reset_points_only`

Show only events that are eligible for reset.

**Example**

```bash
tctl workflow show --reset_points_only
```
