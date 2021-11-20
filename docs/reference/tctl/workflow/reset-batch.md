---
id: reset-batch
title: tctl workflow reset-batch
description: How to reset a batch of Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow reset-batch` command resets a batch of <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> by `resetType`.

See also [`tctl workflow reset`](./reset.md).

`tctl workflow reset-batch <options> <arguments...>`

The following options modify the behavior of the command.

### `--input_file`

How to provide an input file that specifies <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> to reset.

Each line contains one <preview page={WhatIsAWorkflowId}>Workflow Id</preview> as the base Run. and, optionally, a <preview page={WhatIsARunId}>Run Id</preview>.
If a Run Id is not specified, the current Run Id is used.

Alias: `--if`

**Example**

```
tctl workflow reset-batch --input_file <filename>
```

### `--query`

How to specify an SQL-like query of <preview page={WhatIsASearchAttribute}>Search Attributes</preview> describing the <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> to reset.

Alias: `-q`

**Example**

```
tctl workflow reset-batch --query <value>
```

### `--exclude_file`

How to provide an input file that specifies <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> to exclude from resetting.

Each line contains one <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

**Example**

```
tctl workflow reset-batch --exclude_file <filename>
```

### `--input_separator`

How to specify the separator for the input file.
The default is a tab (`\t`).

**Example**

```
tctl workflow reset-batch --input_separator <string>
```

### `--reason`

How to specify a reason for resetting the <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>.

<!-- Alias: `--re` -->

**Example**

```
tctl workflow reset-batch --reason <string>
```

### `--input_parallism`

How to specify the number of goroutines to run in parallel.
Each goroutine processes one line for every second.
The default is 1.

**Example**

```
tctl workflow reset-batch --input_parallism <value>
```

### `--skip_current_open`

How to indicate that a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> should be skipped if the current Run is open for the same <preview page={WhatIsAWorkflowId}>Workflow Id</preview> as the base Run.

**Example**

```
tctl workflow reset-batch --skip_current_open
```

### `--skip_base_is_not_current`

How to indicate that a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> should be skipped if the base Run is not the current Run.

**Example**

```
tctl workflow reset-batch --skip_base_is_not_current
```

### `--only_non_deterministic`

How to indicate that a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> should be reset only if its last event is `WorkflowTaskFailed` with a nondeterministic error.

**Example**

```
tctl workflow reset-batch --only_non_deterministic
```

### `--dry_run`

How to simulate use of the `tctl workflow reset-batch` command without resetting any <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>.
Output is logged to `stdout`.

**Example**

```
tctl workflow reset-batch --dry_run
```

### `--reset_type`

How to specify the event type to which you want to reset.

| Value | Description |
| --- | --- |
| `FirstWorkflowTask` | Reset to the beginning of the Event History. |
| `LastWorkflowTask` | Reset to the end of the Event History. |
| `LastContinuedAsNew` | Reset to the end of the Event History for the previous Run. |
| `BadBinary` | Reset to the point where a bad binary was used. |

**Example**

```
tctl workflow reset-batch --reset_type <value>
```

### `--reset_bad_binary_checksum`

How to specify the binary checksum when using `--reset_type BadBinary`.

**Example**

```
tctl workflow reset-batch --reset_bad_binary_checksum <value>
```
