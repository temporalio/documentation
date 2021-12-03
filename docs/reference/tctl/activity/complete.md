---
id: complete
title: tctl activity complete
description: How to complete an Activity Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAnActivityExecution from '/docs/content/what-is-an-activity-execution.md'
import * as WhatIsAWorkflowId from '/docs/content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '/docs/content/what-is-a-run-id.md'
import * as WhatIsAnActivityId from '/docs/content/what-is-an-activity-id.md'

The `tctl activity complete` command completes an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview>.

`tctl activity complete <options> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify the <preview page={WhatIsAWorkflowId}>Workflow Id</preview> of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> to complete using tctl.

Aliases: `--wid`, `-w`

**Example**

```
tctl activity complete --workflow_id <id>
```

### `--run_id`

How to specify the <preview page={WhatIsARunId}>Run Id</preview> of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> to complete using tctl.

Aliases: `--rid`, `-r`

**Example**

```
tctl activity complete --run_id <id>
```

### `--activity_id`

How to specify the <preview page={WhatIsAnActivityId}>Activity Id</preview> of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> to complete using tctl.

Alias: `--aid`

**Example**

```
tctl activity complete --activity_id <id>
```

### `--result`

How to specify the result of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> when using tctl to complete the Activity Execution.

**Example**

```
tctl activity complete --result <value>
```

### `--identity`

How to specify the identity of the operator when using tctl to complete an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview>.

**Example**

```
tctl activity complete --identity <value>
```
