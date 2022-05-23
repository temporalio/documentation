---
id: start
title: tctl batch start
sidebar_label: start
description: How to start a batch job using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch start` command starts a batch job.

`tctl batch start --query <value> [<modifiers>]`

The following modifiers control the behavior of the command.

### `--query`

_Required modifier_

Specify the [Workflow Executions](/concepts/what-is-a-workflow-execution) that this batch job should operate.

The SQL-like query of [Search Attributes](/concepts/what-is-a-search-attribute) is the same as used by the `tctl workflow list --query` command.

Alias: `-q`

**Example**

```bash
tctl batch start --query <value>
```

### `--reason`

Specify a reason for running this batch job.

Alias: `--re`

**Example**

```bash
tctl batch start --query <value> --reason <string>
```

### `--batch_type`

Specify the operation that this batch job performs. The supported operations are `signal`, `cancel`, and `terminate`.

Alias: `--bt`

**Example**

```bash
tctl batch start --query <value> --batch_type <operation>
```

### `--signal_name`

Specify the name of a [Signal](/concepts/what-is-a-signal). This modifier is required when `--batch_type` is `signal`.

Alias: `--sig`

**Example**

```bash
tctl batch start --query <value> --batch_type signal --signal_name <name>
```

### `--input`

Pass input for the [Signal](/concepts/what-is-a-signal). Input must be in JSON format.

Alias: `-i`

**Example**

```bash
tctl batch start --query <value> --input <json>
```

### `--rps`

Specify RPS of processing. The default value is 50.

**Example**

```bash
tctl batch start --query <value> --rps <value>
```

### `--yes`

Disable the confirmation prompt.

**Example**

```bash
tctl batch start --query <value> --yes
```
