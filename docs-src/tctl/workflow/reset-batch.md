---
id: reset-batch
title: tctl workflow reset-batch
sidebar_label: reset-batch
description: How to reset a batch of Workflow Executions using tctl.
tags:
  - tctl
---

The `tctl workflow reset-batch` command resets a batch of [Workflow Executions](/concepts/what-is-a-workflow-execution) by [`resetType`](#resettype).

Resetting a Workflow allows the process to be resumed from a certain point without losing your parameters or Event History.

`tctl workflow reset-batch <modifiers>`

The following modifiers control the behavior of the command.

<!--DryRun-->

import DryRun from '../../tctl/modifiers/dry-run.md'

<DryRun />

<!--ExcludeFile-->

import ExcludeFile from '../../tctl/modifiers/exclude-file.md'

<ExcludeFile />

<!--InputFile-->

import InputFile from '../../tctl/modifiers/input-file.md'

<InputFile />

<!--InputParallelism-->

import IP from '../../tctl/modifiers/input-parallelism.md'

<IP />

<!--NonDeterministic-->

import NonDeterministic from '../../tctl/modifiers/non-deterministic.md'

<NonDeterministic />

<!--Query-->

import Query from '../../tctl/modifiers/query.md'

<Query />

<!--Reason-->

import Reason from '../../tctl/modifiers/reason.md'

<Reason />

<!--ResetBadBinaryChecksum-->

import ResetBadBinaryChecksum from '../../tctl/modifiers/reset-bad-binary-checksum.md'

<ResetBadBinaryChecksum />

<!--ResetType-->

import ResetType from '../../tctl/modifiers/reset-type.md'

<ResetType />

<!--SkipCurrentOpen-->

import SCO from '../../tctl/modifiers/skip-current-open.md'

<SCO />

<!--SkipBaseIsNotCurrent-->

import SkipBaseNotCurrent from '../../tctl/modifiers/skip-base-is-not-current.md'

<SkipBaseNotCurrent />
