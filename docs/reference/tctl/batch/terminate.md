---
id: terminate
title: tctl batch terminate
description: How to terminate a batch job using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch terminate` command terminates a batch job.

`tctl batch terminate <options> <arguments...>`

The following options modify the behavior of the command.

### `--job_id`

How to specify the job ID of a batch job.

Alias: `--jid`

**Example**

```
tctl batch terminate --job_id <id>
```

### `--reason`

How to specify a reason for terminating this batch job.

Alias: `--re`

**Example**

```
tctl batch terminate --reason <string>
```
