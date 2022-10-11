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

- [--event-id](/tctl-v2/modifiers#--event-id)
- [--reason](/tctl-v2/modifiers#--reason)
- [--reset-type](/tctl-v2/modifiers#--reset-type)
- [--reset-reapply-type](/tctl-v2/modifiers#--reset-reapply-type)
- [--reset-bad-binary-checksum](/tctl-v2/modifiers#--reset-bad-binary-checksum)
- [--run-id](/tctl-v2/modifiers#--run-id)
- [--workflow-id](/tctl-v2/modifiers#--workflow-id)
