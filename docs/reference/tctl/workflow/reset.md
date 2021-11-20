---
id: reset
title: tctl workflow reset
description: How to reset a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow reset` command resets a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> by either `eventId` or `resetType`.

See also [`tctl workflow reset-batch`](./reset-batch.md).

`tctl workflow reset <options> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow reset --workflow_id <id>
```

### `--run_id`

How to specify a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow reset --run_id <id>
```

### `--event_id`

How to specify the `eventId` of any event after `WorkflowTaskStarted` to which you want to reset.
Valid values are `WorkflowTaskCompleted`, `WorkflowTaskFailed`, and `WorkflowTaskTimeout`.

**Example**

```
tctl workflow reset --event_id <id>
```

### `reason`

How to specify a reason for resetting the <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

<!-- Alias: `--re` -->

**Example**

```
tctl workflow reset --reason <string>
```

### `--reset_type`

How to specify the event type to which you want to reset.

| Value                | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `FirstWorkflowTask`  | Reset to the beginning of the Event History.                |
| `LastWorkflowTask`   | Reset to the end of the Event History.                      |
| `LastContinuedAsNew` | Reset to the end of the Event History for the previous Run. |
| `BadBinary`          | Reset to the point where a bad binary was used.             |

**Example**

```
tctl workflow reset --reset_type <value>
```

### `--reset_reapply_type`

How to specify the types of events to reapply after the reset point.
Valid values are `All`, `Signal`, and `None`. The default is `All`.

**Example**

```
tctl workflow reset --reset_reapply_type <value>
```

### `--reset_bad_binary_checksum`

How to specify the binary checksum when using `--reset_type BadBinary`.

**Example**

```
tctl workflow reset --reset_bad_binary_checksum <value>
```
