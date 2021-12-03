---
id: fail
title: tctl activity fail
description: How to fail an Activity Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAnActivityExecution from '/docs/content/what-is-an-activity-execution.md'
import * as WhatIsAWorkflowId from '/docs/content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '/docs/content/what-is-a-run-id.md'
import * as WhatIsAnActivityId from '/docs/content/what-is-an-activity-id.md'

The `tctl activity fail` command fails an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview>.

`tctl activity fail <options> <arguments...>`

The following options modify the behavior of the command.

### `workflow_id`

How to specify the <preview page={WhatIsAWorkflowId}>Workflow Id</preview> of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> to fail using tctl.

Aliases: `--wid`, `-w`

**Example**

```
tctl activity fail --workflow_id <id>
```

### `--run_id`

How to specify the <preview page={WhatIsARunId}>Run Id</preview> of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> to fail using tctl.

Aliases: `--rid`, `-r`

**Example**

```
tctl activity fail --run_id <id>
```

### `--activity_id`

How to specify the <preview page={WhatIsAnActivityId}>Activity Id</preview> of an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> to fail using tctl.

Alias: `--aid`

**Example**

```
tctl activity fail --activity_id <id>
```

### `reason`

How to specify the reason for failing an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> when using tctl.

**Example**

```
tctl activity fail --reason <value>
```

### `detail`

How to specify details of the reason for failing an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview> when using tctl.

**Example**

```
tctl activity fail --detail <value>
```

### `identity`

How to specify the identity of the operator when using tctl to fail an <preview page={WhatIsAnActivityExecution}>Activity Execution</preview>.

**Example**

```
tctl activity complete --identity <value>
```
