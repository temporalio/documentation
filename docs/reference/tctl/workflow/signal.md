---
id: signal
title: tctl workflow signal
sidebar_label: signal
description: How to Signal a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow signal` command [Signals](/docs/concepts/what-is-a-signal) a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).

`tctl workflow signal [<modifiers>]`

The following modifiers control the behavior of the command.

### `--workflow_id`

How to specify a [Workflow Id](/docs/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow signal --workflow_id <id>
```

### `--run_id`

How to specify a [Run Id](/docs/concepts/what-is-a-run-id).

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow signal --run_id <id>
```

### `--name`

How to specify the name of a [Signal](/docs/concepts/what-is-a-signal).

Alias: `-n`

**Example**

```
tctl workflow signal --name <name>
```

### `--input`

How to pass input for the [Signal](/docs/concepts/what-is-a-signal).
Input must be in JSON format.

Alias: `-i`

**Example**

```
tctl workflow signal --input <json>
```

### `--input_file`

How to pass input for the [Signal](/docs/concepts/what-is-a-signal) from a JSON file.

Alias: `--if`

**Example**

```
tctl workflow signal --input_file <filename>
```
