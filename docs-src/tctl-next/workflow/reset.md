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

- [--event-id](/tctl-next/modifiers#--event-id)
- [--reason](/tctl-next/modifiers#--reason)
- [--reset-type](/tctl-next/modifiers#--reset-type)
- [--reset-reapply-type](/tctl-next/modifiers#--reset-reapply-type)
- [--reset-bad-binary-checksum](/tctl-next/modifiers#--reset-bad-binary-checksum)
- [--run-id](/tctl-next/modifiers#--run-id)
- [--workflow-id](/tctl-next/modifiers#--workflow-id)
