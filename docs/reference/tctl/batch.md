---
id: batch
title: tctl batch
description: How to operate batch jobs using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../content/what-is-a-workflow-execution.md'

The `tctl batch` commands operate batch jobs. A batch job can signal, cancel, or terminate <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>.

Terminating a batch job does not roll back the operation performed by the batch job. However, you can use `tctl workflow reset` to roll back Workflow Executions.

## `start`

import TctlBatchStart from './batch/start.md'

<TctlBatchStart/>

## `list`

import TctlBatchList from './batch/list.md'

<TctlBatchList/>

## `describe`

import TctlBatchDescribe from './batch/describe.md'

<TctlBatchDescribe/>

## `terminate`

import TctlBatchTerminate from './batch/terminate.md'

<TctlBatchTerminate/>
