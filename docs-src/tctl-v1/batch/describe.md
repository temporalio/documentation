---
id: describe
title: tctl batch describe
sidebar_label: describe
description: How to describe the progress of a batch job using tctl.
tags:
  - tctl
---

The `tctl batch describe` command describes the progress of a batch job.

`tctl batch describe --job_id <id>`

:::note

`tctl` can run `batch` and `batch-v2` commands.

:::

The following modifier controls the behavior of the command.

### `--job_id`

_Required modifier_

Specify the job ID of a batch job.

**Example**

```bash
tctl batch describe --job_id <id>
```
