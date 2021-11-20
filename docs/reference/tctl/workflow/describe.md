---
id: describe
title: tctl workflow describe
description: How to show information about a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow describe` command shows information about a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

See also [`tctl workflow describeid`](./describeid.md).

`tctl workflow describe <option> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow describe --workflow_id <id>
```

### `--run_id`

How to specify a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow describe --run_id <id>
```

### `--print_raw`

How to print properties exactly as they are stored.

Alias: `--praw`

**Example**

```
tctl workflow describe --run_id <id>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow describe --reset_points_only
```
