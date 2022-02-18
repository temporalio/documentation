---
id: index
title: tctl batch
description: How to operate batch jobs using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch` commands enable batch jobs. A batch job can signal, cancel, or terminate [Workflow Executions](/docs/concepts/what-is-a-workflow-execution).

Terminating a batch job does not roll back the operation performed by the batch job. However, you can use `tctl workflow reset` to roll back Workflow Executions.

- [`tctl batch describe`](/docs/tctl/batch/describe)
- [`tctl batch list`](/docs/tctl/batch/list)
- [`tctl batch start`](/docs/tctl/batch/start)
- [`tctl batch terminate`](/docs/tctl/batch/terminate)
