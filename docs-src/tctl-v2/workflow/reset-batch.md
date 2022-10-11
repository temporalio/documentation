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

- [--dry-run](/tctl-v2/modifiers#--dry-run)
- [--exclude-file](/tctl-v2/modifiers#--exclude-file)
- [--input-file](/tctl-v2/modifiers#--input-file)
- [--input-parallelism](/tctl-v2/modifiers#--input-parallelism)
- [--non-deterministic](/tctl-v2/modifiers#--non-deterministic)
- [--query](/tctl-v2/modifiers#--query)
- [--reason](/tctl-v2/modifiers#--reason)
- [--reset-bad-binary-checksum](/tctl-v2/modifiers#--reset-bad-binary-checksum)
- [--reset-type](/tctl-v2/modifiers#--reset-type)
- [--skip-current-open](/tctl-v2/modifiers#--skip-current-open)
- [--skip-base-not-current](/tctl-v2/modifiers#--skip-base-is-not-current)
