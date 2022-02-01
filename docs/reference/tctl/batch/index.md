---
id: index
title: tctl batch
sidebar_label: Index
description: How to operate batch jobs using tctl.
tags:
  - reference
  - tctl
---

The `tctl batch` commands enable batch jobs. A batch job can signal, cancel, or terminate [Workflow Executions](/docs/content/what-is-a-workflow-execution).

Terminating a batch job does not roll back the operation performed by the batch job. However, you can use `tctl workflow reset` to roll back Workflow Executions.

- [`tctl batch start`](/docs/reference/tctl/batch/start)
- [`tctl batch list`](/docs/reference/tctl/batch/list)
- [`tctl batch describe`](/docs/reference/tctl/batch/describe)
- [`tctl batch terminate`](/docs/reference/tctl/batch/terminate)
