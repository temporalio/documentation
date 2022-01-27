---
id: batch
title: tctl batch
description: How to operate batch jobs using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch` commands operate batch jobs. A batch job can signal, cancel, or terminate [Workflow Executions](/docs/content/what-is-a-workflow-execution).

Terminating a batch job does not roll back the operation performed by the batch job. However, you can use `tctl workflow reset` to roll back Workflow Executions.

- [`tctl batch start`](./batch/start)
- [`tctl batch list`](./batch/list)
- [`tctl batch describe`](./batch/describe)
- [`tctl batch terminate`](./batch/terminate)

## Related

- [tctl reference](/docs/reference/tctl)
