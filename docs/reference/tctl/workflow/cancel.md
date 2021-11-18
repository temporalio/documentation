---
id: cancel
title: tctl workflow cancel
description: How to cancel a Workflow Execution.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow cancel` command cancels a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

Canceling a running Workflow Execution records a `WorkflowExecutionCancelRequested` event in the History. A new command task will be scheduled. After cancellation, the Workflow Execution can perform cleanup work.

See also [`tctl workflow terminate`](.\terminate.md).

`tctl workflow cancel <options> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow cancel --workflow_id <id>
```

### `--run_id`

How to specify a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow show --run_id <id>
```
