---
id: reset
title: tctl workflow reset
sidebar_label: reset
description: How to reset a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow reset` command resets a [Workflow Execution](/concepts/what-is-a-workflow-execution) by either [`eventId`](#eventid)or [`resetType`](#resettype).

Resetting a Workflow allows the process to be resumed from a certain point without losing your parameters or Event History.

`tctl workflow reset <modifiers>`

The following modifiers control the behavior of the command.

<!--EventId-->

import EventId from '../../tctl/modifiers/event-id.md'

<EventId />

<!--Reason-->

import Reason from '../../tctl/modifiers/reason.md'

<Reason />

<!--ResetType-->

import ResetType from '../../tctl/modifiers/reset-type.md'

<ResetType />

<!--ResetReapplyType-->

import RRT from '../../tctl/modifiers/reset-reapply-type.md'

<RRT />

<!--ResetBadBinaryChecksum-->

import RBBC from '../../tctl/modifiers/reset-bad-binary-checksum.md'

<RRBC />

<!--RunId-->

import RunId from '../../tctl/modifiers/run-id.md'

<RunId />

<!--WorkflowId  -->

import WorkflowId from '../../tctl/modifiers/workflow-id.md'

<WorkflowId />
