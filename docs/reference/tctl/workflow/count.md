---
id: count
title: tctl workflow count
description: How to count Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsASearchAttribute from '../../../content/what-is-a-search-attribute.md'

The `tctl workflow count` command counts <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>. This command requires Elasticsearch to be enabled.

`tctl workflow count <option> <arguments...>`

The following option modifies the behavior of the command.

### `--query`

How to specify an SQL-like query of <preview page={WhatIsASearchAttribute}>Search Attributes</preview>.

Alias: `-q`

**Example**

To count all open <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>:

```
tctl workflow count --query 'CloseTime = missing'; 'WorkflowType="wtype" and CloseTime > 0'
```
