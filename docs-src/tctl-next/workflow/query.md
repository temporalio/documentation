---
id: query
title: tctl workflow query
sidebar_label: query
description: How to send a Query to a Workflow Execution using tctl.
tags:
  - tctl
---

The `tctl workflow query` command sends a [Query](/concepts/what-is-a-query) to a [Workflow Execution](/concepts/what-is-a-workflow-execution).

Queries can be used to retrieve all or part of the Workflow state with given parameters.

```bash
$ tctl workflow query --workflow-id "HelloQuery" --query-type "getCount"
Query result as JSON:
3
```

Queries can also be used on completed Workflows.
Let's complete a Workflow by updating its greeting, and then query the now-finished Workflow.

```bash
$ tctl workflow signal --workflow-id "HelloQuery" --name "updateGreeting" --input \"Bye\"
Signal workflow succeeded.
$ tctl workflow query --workflow-id "HelloQuery" --query-type "getCount"
Query result as JSON:
4
```

Queries are written as follows:

`tctl workflow query --workflow-id [modifiers]`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

- [--input](/tctl-next/modifiers#--input)
- [--input-file](/tctl-next/modifiers#--input-file)
- [--query-reject-condition](/tctl-next/modifiers#--query-reject-condition)
- [--query-type](/tctl-next/modifiers#--query-type)
- [--run-id](/tctl-next/modifiers#--run-id)
- [--workflow-id](/tctl-next/modifiers#--workflow-id)
