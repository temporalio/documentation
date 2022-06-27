---
id: signal
title: tctl workflow signal
sidebar_label: signal
description: How to Signal a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow signal` command [Signals](/concepts/what-is-a-signal) a [Workflow Execution](/concepts/what-is-a-workflow-execution).

`tctl workflow signal [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow signal --workflow_id <id>
```

### `--run_id`

Specify a [Run Id](/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```bash
tctl workflow signal --run_id <id>
```

### `--name`

Specify the name of a [Signal](/concepts/what-is-a-signal).

Alias: `-n`

**Example**

```bash
tctl workflow signal --name <name>
```

### `--input`

Pass input for the [Signal](/concepts/what-is-a-signal).
Input must be in JSON format.

Alias: `-i`

**Example**

```bash
tctl workflow signal --input <json>
```

### `--input_file`

Pass input for the [Signal](/concepts/what-is-a-signal) from a JSON file.

Alias: `--if`

**Example**

```bash
tctl workflow signal --input_file <filename>
```
