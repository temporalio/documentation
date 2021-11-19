---
id: terminate
title: tctl workflow terminate
description: How to terminate a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow terminate` command terminates a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

Terminating a running Workflow Execution records a `WorkflowExecutionTerminated` event as the closing event in the History. No more command tasks will be scheduled.

See also [`tctl workflow cancel`](./cancel.md).

`tctl workflow terminate <options> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow terminate --workflow_id <id>
```

### `--run_id`

How to specify a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow terminate --run_id <id>
```

### `reason`

How to specify a reason for terminating the <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

Alias: `--re`

**Example**

```
tctl workflow terminate --reason <string>
```
