---
id: scan
title: tctl workflow scan
sidebar_label: scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow scan` command lists [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 2000 Workflow Executions.
To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](/tctl/workflow/list).

`tctl workflow scan <modifiers>`

The following modifiers control the behavior of the command.

<!--Fields-->

import Fields from '../../references/modifiers/fields.md'

<Fields />

<!--Limit-->

import Limit from '../../references/modifiers/limit.md'

<Limit />

<!--NoPager-->

import NoPager from '../../references/modifiers/no-pager.md'

<NoPager />

<!--Output-->

import Output from '../../references/modifiers/output.md'

<Output />

<!--Pager-->

import Pager from '../../references/modifiers/pager.md'

<Pager />

<!--Query-->

import Query from '../../references/modifiers/query.md'

<Query />

<!--TimeFormat-->

import TimeFormat from '../../references/modifiers/time-format.md'

<TimeFormat />
