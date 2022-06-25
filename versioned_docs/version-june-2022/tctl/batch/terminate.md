---
id: terminate
title: tctl batch terminate
sidebar_label: terminate
description: How to terminate a batch job using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch terminate` command terminates a batch job.

`tctl batch terminate --job_id <id> [<modifiers>]`

The following modifiers control the behavior of the command.

### `--job_id`

_Required modifier_

Specify the job ID of a batch job.

Alias: `--jid`

**Example**

```bash
tctl batch terminate --job_id <id>
```

### `--reason`

Specify a reason for terminating this batch job.

Alias: `--re`

**Example**

```bash
tctl batch terminate --job_id <id> --reason <string>
```
