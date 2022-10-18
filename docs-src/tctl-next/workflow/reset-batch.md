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

- [--dry-run](/tctl-next/modifiers#--dry-run)
- [--exclude-file](/tctl-next/modifiers#--exclude-file)
- [--input-file](/tctl-next/modifiers#--input-file)
- [--input-parallelism](/tctl-next/modifiers#--input-parallelism)
- [--non-deterministic](/tctl-next/modifiers#--non-deterministic)
- [--query](/tctl-next/modifiers#--query)
- [--reason](/tctl-next/modifiers#--reason)
- [--reset-bad-binary-checksum](/tctl-next/modifiers#--reset-bad-binary-checksum)
- [--reset-type](/tctl-next/modifiers#--reset-type)
- [--skip-current-open](/tctl-next/modifiers#--skip-current-open)
- [--skip-base-not-current](/tctl-next/modifiers#--skip-base-is-not-current)
