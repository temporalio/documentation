---
id: describeid
title: tctl workflow describeid
description: How to show information about a Workflow Execution for a specified Workflow Id and optional Run Id using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow describeid` command shows information about a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> for the specified <preview page={WhatIsAWorkflowId}>Workflow Id</preview> and optional <preview page={WhatIsARunId}>Run Id</preview>.

`tctl workflow describeid <workflow_id> [<run_id>] [<options>] [<arguments...>]`

This command is a shortcut for `tctl workflow describe --workflow_id <workflowid> [--run_id <runid>]`.

The following options modify the behavior of the command.

### `--print_raw`

How to print properties exactly as they are stored.

Alias: `--praw`

**Example**

```
tctl workflow describeid --run_id <id>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow describeid --reset_points_only
```
