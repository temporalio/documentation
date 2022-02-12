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

How to specify the [Workflow Executions](/docs/concepts/what-is-a-workflow-execution) that this batch job should operate.

The SQL-like query of [Search Attributes](/docs/concepts/what-is-a-search-attribute) is the same as used by the `tctl workflow list --query` command.

Alias: `-q`

**Example**

```
tctl batch start --query <value>
```

### `--reason`

How to specify a reason for running this batch job.

Alias: `--re`

**Example**

```
tctl batch start --query <value> --reason <string>
```

### `--batch_type`

How to specify the operation that this batch job performs. The supported operations are `signal`, `cancel`, and `terminate`.

Alias: `--bt`

**Example**

```
tctl batch start --query <value> --batch_type <operation>
```

### `--signal_name`

How to specify the name of a [Signal](/docs/concepts/what-is-a-signal). This modifier is required when `--batch_type` is `signal`.

Alias: `--sig`

**Example**

```
tctl batch start --query <value> --batch_type signal --signal_name <name>
```

### `--input`

How to pass input for the [Signal](/docs/concepts/what-is-a-signal). Input must be in JSON format.

Alias: `-i`

**Example**

```
tctl batch start --query <value> --input <json>
```

### `--rps`

How to specify RPS of processing. The default value is 50.

**Example**

```
tctl batch start --query <value> --rps <value>
```

### `--yes`

How to disable the confirmation prompt.

**Example**

```
tctl batch start --query <value> --yes
```
