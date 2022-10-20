---
id: count
title: tctl workflow count
sidebar_label: count
description: How to count Workflow Executions using tctl.
tags:
  - tctl
---

The `tctl workflow count` command counts [Workflow Executions](/concepts/what-is-a-workflow-execution).
This command requires Elasticsearch to be enabled.

`tctl workflow count <modifiers>`

The following modifier controls the behavior of the command.

- [--query](/tctl-next/modifiers#--query)

**Example**

```bash
tctl workflow count --query 'ExecutionStatus="Running"'
```
