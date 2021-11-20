---
id: observeid
title: tctl workflow observeid
description: How to show the progress of the Event History of a Workflow Execution for a specified Workflow Id and optional Run Id using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAnEventHistory from '../../../content/what-is-an-event-history.md'
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow observeid` command shows the progress of the <preview page={WhatIsAnEventHistory}>Event History</preview> of a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> for the specified <preview page={WhatIsAWorkflowId}>Workflow Id</preview> and optional <preview page={WhatIsARunId}>Run Id</preview>.

`tctl workflow observeid <workflow_id> [<run_id>] [<options>] [<arguments...>]`

This command is a shortcut for `tctl workflow observe --workflow_id <workflowid> [--run_id <runid>]`.

The following options modify the behavior of the command.

### `--show_detail`

How to show event details.

Alias: `--sd`

**Example**

```
tctl workflow observeid --show_detail
```

### `--max_field_length`

How to specify the maximum length for each attribute field. The default value is 0.

Alias: `--maxl`

**Example**

```
tctl workflow observeid --max_field_length <length>
```
