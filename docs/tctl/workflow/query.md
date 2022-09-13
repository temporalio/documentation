---
id: query
title: tctl workflow query
sidebar_label: query
description: How to send a Query to a Workflow Execution using tctl.
tags:
  - reference
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

## Modifiers

Queries are written as follows:

`tctl workflow query --workflow-id [modifiers]`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

<!--Input-->

import Input from '../../tctl/modifiers/input.md'

<Input />

<!--InputFile-->

import InputFile from '../../tctl/modifiers/input-file.md'

<InputFile />

<!--QueryRejectCondition-->

import QRC from '../../tctl/modifiers/query-reject-condition.md'

<QRC />

<!--QueryType-->

import QueryType from '../../tctl/modifiers/query-type.md'

<QueryType />

<!--RunId-->

import RunId from '../../tctl/modifiers/run-id.md'

<RunId />

<!--WorkflowId-->

import WorkflowId from '../../tctl/modifiers/workflow-id.md'

<WorkflowId />
