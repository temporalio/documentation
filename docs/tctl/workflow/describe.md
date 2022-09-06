---
id: describe
title: tctl workflow describe
sidebar_label: describe
description: How to show information about a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow describe` command shows information about a [Workflow Execution](/concepts/what-is-a-workflow-execution).
This information can be used to locate a failed Workflow Execution, for example.

To find a Workflow with a given Run Id, refer to [`tctl workflow describeid`](/tctl/workflow/describeid).

`tctl workflow describe <modifiers>`

Alias: `d`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

<!--Raw-->

import Raw from '../../references/modifiers/raw.md'

<Raw />

<!--ResetPointsOnly-->

import ResetPointsOnly from '../../references/modifiers/reset-points-only.md'

<ResetPointsOnly />

<!--RunId-->

import RunId from '../../references/modifiers/run-id.md'

<RunId />

<!--WorkflowId-->

import WorkflowId from '../../references/modifiers/workflow-id.md'

<WorkflowId />
