---
id: reset-batch
title: tctl workflow reset-batch
sidebar_label: reset-batch
description: How to reset a batch of Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow reset-batch` command resets a batch of [Workflow Executions](/concepts/what-is-a-workflow-execution) by [`resetType`](#resettype).

Resetting a Workflow allows the process to be resumed from a certain point without losing your parameters or Event History.

`tctl workflow reset-batch <modifiers>`

The following modifiers control the behavior of the command.

<!--DryRun-->

import DryRun from '../../references/modifiers/dry-run.md'

<DryRun />

<!--ExcludeFile-->

import ExcludeFile from '../../references/modifiers/exclude-file.md'

<ExcludeFile />

<!--InputFile-->

import InputFile from '../../references/modifiers/input-file.md'

<InputFile />

<!--InputParallelism-->

import IP from '../../references/modifiers/input-parallelism.md'

<IP />

<!--NonDeterministic-->

import NonDeterministic from '../../references/modifiers/non-deterministic.md'

<NonDeterministic />

<!--Query-->

import Query from '../../references/modifiers/query.md'

<Query />

<!--Reason-->

import Reason from '../../references/modifiers/reason.md'

<Reason />

<!--ResetBadBinaryChecksum-->

import ResetBadBinaryChecksum from '../../references/modifiers/reset-bad-binary-checksum.md'

<ResetBadBinaryChecksum />

<!--ResetType-->

import ResetType from '../../references/modifiers/reset-type.md'

<ResetType />

<!--SkipCurrentOpen-->

import SCO from '../../references/modifiers/skip-current-open.md'

<SCO />

<!--SkipBaseIsNotCurrent-->

import SkipBaseNotCurrent from '../../references/modifiers/skip-base-not-current.md'

<SkipBaseNotCurrent />
