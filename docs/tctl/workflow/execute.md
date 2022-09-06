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

import Cron from '../../references/modifiers/cron.md'

<Cron />

<!--ExecutionTimeout-->

import ExecutionTimeout from '../../references/modifiers/execution-timeout.md'

<ExecutionTimeout />

<!--Fields-->

import Fields from '../../references/modifiers/fields.md'

<Fields />

<!--Input-->

import Input from '../../references/modifiers/input.md'

<Input />

<!--InputFile-->

import InputFile from '../../references/modifiers/input-file.md'

<InputFile />

<!--Limit-->

import Limit from '../../references/modifiers/limit.md'

<Limit />

<!--MaxFieldLength-->

import MaxFieldLength from '../../references/modifiers/max-field-length.md'

<MaxFieldLength />

<!--MemoKey-->

import MemoKey from '../../references/modifiers/memo-key.md'

<MemoKey />

<!--Memo-->

import Memo from '../../references/modifiers/memo.md'

<Memo />

<!--MemoFile-->

import MemoFile from '../../references/modifiers/memo-file.md'

<MemoFile />

<!--NoPager-->

import NoPager from '../../references/modifiers/no-pager.md'

<NoPager />

<!--Output-->

import Output from '../../references/modifiers/output.md'

<Output />

<!--Pager-->

import Pager from '../../references/modifiers/pager.md'

<Pager />

<!--SearchAttributeKey-->

import SearchAttributeKey from '../../references/modifiers/search-attribute-key.md'

<SearchAttributeKey />

<!--SearchAttributeValue-->

import SearchAttributeValue from '../../references/modifiers/search-attribute-value.md'

<SearchAttributeValue />

<!--TaskQueue-->

import TaskQueue from '../../references/modifiers/task-queue.md'

<TaskQueue />

<!--TaskTimeout-->

import TaskTimeout from '../../references/modifiers/task-timeout.md'

<TaskTimeout />

<!--TimeFormat-->

import TimeFormat from '../../references/modifiers/time-format.md'

<TimeFormat />

<!--Type-->

import Type from '../../references/modifiers/type.md'

<Type />

<!--WorkflowId-->

import WorkflowId from '../../references/modifiers/workflow-id.md'

<WorkflowId />

<!--WorkflowIdReusePolicy-->

import WorkflowIdReusePolicy from '../../references/modifiers/workflow-id-reuse-policy.md'

<WorkflowIdReusePolicy />
