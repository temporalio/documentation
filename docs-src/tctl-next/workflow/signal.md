---
id: signal
title: tctl workflow signal
sidebar_label: signal
description: How to Signal a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow signal` command [Signals](/concepts/what-is-a-signal) a [Workflow Execution](/concepts/what-is-a-workflow-execution).

The use of the [`--query` modifier](/tctl-next/modifiers#--query) (`tctl workflow signal --query ...`) starts a [batch job](/tctl-next/batch) that sends a Signal to the Workflow Executions according to the List Filter provided.

`tctl workflow signal --query <value> <modifiers>`

The following modifiers are supported and control the behavior of the command.
Always include required modifiers when executing this command.

- [--namespace](/tctl-next/modifiers#--namespace)
- [--name](/tctl-next/modifiers#--name)
- [--input](/tctl-next/modifiers#--input)
- [--query](/tctl-next/modifiers#--query)
- [--reason](/tctl-next/modifiers#--reason)
- [--yes](/tctl-next/modifiers#--yes)
