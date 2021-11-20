---
id: observe
title: tctl workflow observe
description: How to show the progress of the Event History of a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAnEventHistory from '../../../content/what-is-an-event-history.md'
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow observe` command shows the progress of the <preview page={WhatIsAnEventHistory}>Event History</preview> of a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

See also [`tctl workflow observeid`](./observeid.md).

`tctl workflow observe <option> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow observe --workflow_id <id>
```

### `--run_id`

How to specify a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow observe --run_id <id>
```

### `--show_detail`

How to show event details.

Alias: `--sd`

**Example**

```
tctl workflow observe --show_detail
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 0.

Alias: `--maxl`

**Example**

```
tctl workflow observe --max_field_length <length>
```
