---
id: show
title: tctl workflow show
sidebar_label: show
description: How to show Workflow History using tctl.
tags:
  - tctl
---

The `tctl workflow show` command shows the [Event History](/concepts/what-is-an-event-history) for the specified [Workflow Execution](/concepts/what-is-a-workflow-execution).

`tctl workflow show <modifiers>`

See also [`tctl workflow showid`](/tctl-v1/workflow/showid).

The following modifiers control the behavior of the command.

### `--workflow_id`

Show the History of a [Workflow Execution](/concepts/what-is-a-workflow-execution) by specifying a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `-w`

**Example**

```bash
tctl workflow show --workflow_id <id>
```

### `--run_id`

Show the History of a [Workflow Execution](/concepts/what-is-a-workflow-execution) by specifying a [Run Id](/concepts/what-is-a-run-id).

Alias: `-r`

**Example**

```bash
tctl workflow show --run_id <id>
```

### `--print_datetime`

Print the timestamp.

**Example**

```bash
tctl workflow show --print_datetime
```

### `--print_raw_time`

Print the raw timestamp.

**Example**

```bash
tctl workflow show --print_raw_time
```

### `--output_filename`

Serialize an event to a file.

**Example**

```bash
tctl workflow show --output_filename <filename>
```

### `--print_full`

Print full event details.

**Example**

```bash
tctl workflow show --print_full
```

### `--print_event_version`

Print the event version.

**Example**

```bash
tctl workflow show --print_event_version
```

### `--event_id`

Print the details of a specified event.
The default value is 0.

**Example**

```bash
tctl workflow show --event_id <id>
```

### `--max_field_length`

Specify the maximum length for each attribute field.
The default value is 500.

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
