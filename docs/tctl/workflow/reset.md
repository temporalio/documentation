---
id: reset
title: tctl workflow reset
sidebar_label: reset
description: How to reset a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow reset` command resets a [Workflow Execution](/concepts/what-is-a-workflow-execution) by either [`eventId`](#eventid)or [`resetType`](#resettype).

Resetting a Workflow allows the process to be resumed from a certain point without losing your parameters or Event History.

`tctl workflow reset <modifiers>`

The following modifiers control the behavior of the command.

<!--EventId-->

import EventId from '../../references/modifiers/event-id.md'

<EventId />

<!--Reason-->

import Reason from '../../references/modifiers/reason.md'

<Reason />

<!--ResetType-->

import ResetType from '../../references/modifiers/reset-type.md'

<ResetType />

<!--ResetReapplyType-->

import RRT from '../../references/modifiers/reset-reapply-type.md'

<RRT />

<!--ResetBadBinaryChecksum-->

import RBBC from '../../references/modifiers/reset-bad-binary-checksum.md'

<RRBC />

<!--RunId-->

import RunId from '../../references/modifiers/run-id.md'

<RunId />

<!--WorkflowId  -->

import WorkflowId from '../../references/modifiers/workflow-id.md'

<WorkflowId />
