---
id: describe
title: tctl batch describe
sidebar_label: describe
description: How to describe the progress of a batch job using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch describe` command describes the progress of a batch job.

`tctl batch describe --job_id <id>`

The following modifier controls the behavior of the command.

### `--job_id`

_Required modifier_

Specify the job ID of a batch job.

Alias: `--jid`

**Example**

```bash
tctl batch describe --job_id <id>
```
