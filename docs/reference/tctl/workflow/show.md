---
id: show
title: tctl workflow show
description: How to show Workflow History using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow show` command shows History for the specified <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

> `tctl workflow show <command options> <arguments...>`

### --workflow_id

Specify the <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

> `--workflow_id <value>`

Aliases `--wid <value>`, `-w <value>`

**Example**

```
tctl workflow show --workflow_id 3ea6b242-b23c-4279-bb13-f215661b4717
```

### --run_id

Specify the <preview page={WhatIsARunId}>Run Id</preview>.

> `--run_id <value>`

Aliases `--rid <value>`, `-r <value>`

### --print_datetime

Print timestamp.

> `--print_datetime`

Alias `--pdt`

### --print_raw_time

Print raw timestamp.

> `--print_raw_time`

Alias `--prt`

### --output_filename

Serialize the event to the specified file.

> `--output_filename <value>`

Alias `--of`

### --print_full

Print full event details.

> `--print_full`

Alias `--pf`

### --print_event_version

Print the event version.

> `--print_event_version`

Alias `--pev`

### --event_id

Print details of the specified event (default: 0).

> `--event_id <value>`

Alias `--eid`

### --max_field_length

Specify the maximum length for each attribute field (default: 500).

> `--max_field_length <value>`

Alias `--maxl`

### --reset_points_only

Show only events that are eligible for reset.

> `--reset_points_only`
