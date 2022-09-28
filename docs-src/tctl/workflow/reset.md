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

- [--event-id](/tctl/modifiers/event-id)
- [--reason](/tctl/modifiers/reason)
- [--reset-type](/tctl/modifiers/reset-type)
- [--reset-reapply-type](/tctl/modifiers/reset-reapply-type)
- [--reset-bad-binary-checksum](/tctl/modifiers/rest-bad-binary-checksum)
- [--run-id](/tctl/modifiers/run-id)
- [--workflow-id](/tctl/modifiers/workflow-id)
