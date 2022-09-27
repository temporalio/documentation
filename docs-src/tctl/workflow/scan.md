---
id: scan
title: tctl workflow scan
sidebar_label: scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - tctl
---

The `tctl workflow scan` command lists [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 2000 Workflow Executions.
To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](/tctl/workflow/list).

`tctl workflow scan <modifiers>`

The following modifiers control the behavior of the command.

<!--Fields-->

import Fields from '../../tctl/modifiers/fields.md'

<Fields />

<!--Limit-->

import Limit from '../../tctl/modifiers/limit.md'

<Limit />

<!--NoPager-->

import NoPager from '../../tctl/modifiers/no-pager.md'

<NoPager />

<!--Output-->

import Output from '../../tctl/modifiers/output.md'

<Output />

<!--Pager-->

import Pager from '../../tctl/modifiers/pager.md'

<Pager />

<!--Query-->

import Query from '../../tctl/modifiers/query.md'

<Query />

<!--TimeFormat-->

import TimeFormat from '../../tctl/modifiers/time-format.md'

<TimeFormat />
