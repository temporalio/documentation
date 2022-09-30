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

- [--dry-run](/tctl/modifiers/dry-run)
- [--exclude-file](/tctl/modifiers/exclude-file)
- [--input-file](/tctl/modifiers/input-file)
- [--input-parallelism](/tctl/modifiers/input-parallelism)
- [--non-deterministic](/tctl/modifiers/non-deterministic)
- [--query](/tctl/modifiers/query)
- [--reason](/tctl/modifiers/reason)
- [--reset-bad-binary-checksum](/tctl/modifiers/reset-bad-binary-checksum)
- [--reset-type](/tctl/modifiers/reset-type)
- [--skip-current-open](/tctl/modifiers/skip-current-open)
- [--skip-base-not-current](/tctl/modifiers/skip-base-is-not-current)
