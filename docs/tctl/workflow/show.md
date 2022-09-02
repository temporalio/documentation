---
id: show
title: tctl workflow show
sidebar-label: show
description: How to show Workflow History using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow show` command shows the [Event History](/concepts/what-is-an-event-history) for the specified [Workflow Execution](/concepts/what-is-a-workflow-execution).

`tctl workflow show <modifiers>`

See also [`tctl workflow showid`](/tctl/workflow/showid).

The following modifiers control the behavior of the command.

<!-- include:../tctl/modifiers#fields-->

import Fields from './tctl/\_modifiers.md'

<!-- include:../tctl/modifiers#follow-->

### `--limit`

Sets the number of items to print.

**Example**

```bash
tctl workflow show --limit <value>
```

### `--max-field-length`

Specify the maximum length for each attribute field.
The default value is 500.

Alias: `--maxl`

**Example**

```bash
tctl workflow show --max-field-length <value>
```

### `--no-pager`

Disables the interactive pager.

Alias: `-P`

**Example**

```bash
tctl workflow start --no-pager <value>
```

### `--output`

Specifies the format for printed output.

Alias: `-o`

Values: table, json, card

**Example**

```tctl
tctl workflow start --output <value>
```

### `--output-filename`

Serialize an Event to a file.

Alias: `--of`

**Example**

```bash
tctl workflow show --output-filename <value>
```

### `--pager`

Specifies the pager to use.

Values: less, more, favoritePager..[$PAGER]

**Example**

```bash
tctl workflow start --pager <value>
```

### `--reset-points-only`

Show only events that are eligible for reset.

**Example**

```bash
tctl workflow show --reset-points-only
```

### `--run-id`

Show the History of a [Workflow Execution](/concepts/what-is-a-workflow-execution) by specifying a [Run Id](/concepts/what-is-a-run-id).

Alias: `--rid`

**Example**

```bash
tctl workflow show --run-id <value>
```

### `--time-format`

Specifies the format for time values.

Values: relative, iso, raw

**Example**

```bash
tctl workflow start --time-format <value>
```

### `--workflow-id`

Show the History of a [Workflow Execution](/concepts/what-is-a-workflow-execution) by specifying a [Workflow Id](/concepts/what-is-a-workflow-id).

Alias: `--wid`

**Example**

```bash
tctl workflow show --workflow-id <value>
```
