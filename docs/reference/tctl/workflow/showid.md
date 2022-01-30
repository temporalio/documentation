---
id: showid
title: tctl workflow showid
description: How to show Workflow History for a specified Workflow Id and optional Run Id using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow showid` command shows Workflow History for the specified [Workflow Id](/docs/content/what-is-a-workflow-id) and optional [Run Id](/docs/content/what-is-a-run-id).

`tctl workflow showid <workflow_id> [<run_id>] [<modifiers>]`

This command is a shortcut for `tctl workflow show --workflow_id <workflowid> [--run_id <runid>]`.

The following modifiers control the behavior of the command.

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow showid <workflow_id> --print_datetime
```

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow showid <workflow_id> --print_raw_time
```

### `--output_filename`

How to serialize an event to a file.

Alias: `--of`

**Example**

```
tctl workflow showid <workflow_id> --output_filename <filename>
```

### `--print_full`

How to print full event details.

Alias: `--pf`

**Example**

```
tctl workflow showid <workflow_id> --print_full
```

### `--print_event_version`

How to print the event version.

Alias: `--pev`

**Example**

```
tctl workflow showid <workflow_id> --print_event_version
```

### `--event_id`

How to print the details of a specified event.
The default value is 0.

Alias: `--eid`

**Example**

```
tctl workflow showid <workflow_id> --event_id <id>
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 500.

Alias: `--maxl`

**Example**

```
tctl workflow showid <workflow_id> --max_field_length <length>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow showid <workflow_id> --reset_points_only
```

## Related

- [`tctl workflow`](../workflow)
- [tctl reference](/docs/reference/tctl)
