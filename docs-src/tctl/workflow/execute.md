---
id: execute
title: tctl workflow execute
sidebar_label: execute
description: How to start a new Workflow Execution and get Workflow progress using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow execute` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution) and shows its progress until completion.

The command is entered in the following format:

`tctl workflow execute [modifiers]`

Single quotes (`''`) are used to wrap input as JSON.

The following modifiers control the behavior of the command.

<!--Cron-->

import Cron from '../../tctl/modifiers/cron.md'

<Cron />

<!--ExecutionTimeout-->

import ExecutionTimeout from '../../tctl/modifiers/execution-timeout.md'

<ExecutionTimeout />

<!--Fields-->

import Fields from '../../tctl/modifiers/fields.md'

<Fields />

<!--Input-->

import Input from '../../tctl/modifiers/input.md'

<Input />

<!--InputFile-->

import InputFile from '../../tctl/modifiers/input-file.md'

<InputFile />

<!--Limit-->

import Limit from '../../tctl/modifiers/limit.md'

<Limit />

<!--MaxFieldLength-->

import MaxFieldLength from '../../tctl/modifiers/max-field-length.md'

<MaxFieldLength />

<!--MemoKey-->

import MemoKey from '../../tctl/modifiers/memo-key.md'

<MemoKey />

<!--Memo-->

import Memo from '../../tctl/modifiers/memo.md'

<Memo />

<!--MemoFile-->

import MemoFile from '../../tctl/modifiers/memo-file.md'

<MemoFile />

<!--NoPager-->

import NoPager from '../../tctl/modifiers/no-pager.md'

<NoPager />

<!--Output-->

import Output from '../../tctl/modifiers/output.md'

<Output />

<!--Pager-->

import Pager from '../../tctl/modifiers/pager.md'

<Pager />

<!--SearchAttributeKey-->

import SearchAttributeKey from '../../tctl/modifiers/search-attribute-key.md'

<SearchAttributeKey />

<!--SearchAttributeValue-->

import SearchAttributeValue from '../../tctl/modifiers/search-attribute-value.md'

<SearchAttributeValue />

<!--TaskQueue-->

import TaskQueue from '../../tctl/modifiers/task-queue.md'

<TaskQueue />

<!--TaskTimeout-->

import TaskTimeout from '../../tctl/modifiers/task-timeout.md'

<TaskTimeout />

<!--TimeFormat-->

import TimeFormat from '../../tctl/modifiers/time-format.md'

<TimeFormat />

<!--Type-->

import Type from '../../tctl/modifiers/type.md'

<Type />

<!--WorkflowId-->

import WorkflowId from '../../tctl/modifiers/workflow-id.md'

<WorkflowId />

<!--WorkflowIdReusePolicy-->

import WorkflowIdReusePolicy from '../../tctl/modifiers/workflow-id-reuse-policy.md'

<WorkflowIdReusePolicy />
