---
id: show
title: tctl workflow show
description: How to show Workflow History using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow show` command shows History for the specified [Workflow Execution](/docs/content/what-is-a-workflow-execution).

`tctl workflow show [<modifiers>]`

See also [`tctl workflow showid`](./showid.md).

The following modifiers control the behavior of the command.

### `--workflow_id`

How to show the History of a [Workflow Execution](/docs/content/what-is-a-workflow-execution) by specifying a [Workflow Id](/docs/content/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow show --workflow_id <id>
```

### `--run_id`

How to show the History of a [Workflow Execution](/docs/content/what-is-a-workflow-execution) by specifying a [Run Id](/docs/content/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow show --run_id <id>
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow show --print_datetime
```

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow show --print_raw_time
```

### `--output_filename`

How to serialize an event to a file.

Alias: `--of`

**Example**

```
tctl workflow show --output_filename <filename>
```

### `--print_full`

How to print full event details.

Alias: `--pf`

**Example**

```
tctl workflow show --print_full
```

### `--print_event_version`

How to print the event version.

Alias: `--pev`

**Example**

```
tctl workflow show --print_event_version
```

### `--event_id`

How to print the details of a specified event.
The default value is 0.

Alias: `--eid`

**Example**

```
tctl workflow show --event_id <id>
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 500.

Alias: `--maxl`

**Example**

```
tctl workflow show --max_field_length <length>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow show --reset_points_only
```

## Related

- [`tctl workflow`](../workflow)
- [tctl reference](/docs/reference/tctl)
