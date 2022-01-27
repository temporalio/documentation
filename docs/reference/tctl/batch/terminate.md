---
id: terminate
title: tctl batch terminate
description: How to terminate a batch job using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch terminate` command terminates a batch job.

The following modifiers control the behavior of the command.

### `--job_id`

_Required modifier_

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
tctl batch terminate --job_id <id> --reason <string>
```

## Related

- [`tctl batch`](../batch)
- [tctl reference](/docs/reference/tctl)
