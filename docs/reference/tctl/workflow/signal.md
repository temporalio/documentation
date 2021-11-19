---
id: signal
title: tctl workflow signal
description: How to Signal a Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsASignal from '../../../content/what-is-a-signal.md'
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow signal` command <preview page={WhatIsASignal}>Signals</preview> a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

`tctl workflow signal <options> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow signal --workflow_id <id>
```

### `--run_id`

How to specify a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow signal --run_id <id>
```

### `--name`

How to specify the name of a <preview page={WhatIsASignal}>Signal</preview>.

Alias: `-n`

**Example**

```
tctl workflow signal --name <name>
```

### `--input`

How to pass input for the <preview page={WhatIsASignal}>Signal</preview>. Input must be in JSON format.

Alias: `-i`

**Example**

```
tctl workflow signal --input <json>
```

### `--input_file`

How to pass input for the <preview page={WhatIsASignal}>Signal</preview> from a JSON file.

Alias: `--if`

**Example**

```
tctl workflow signal --input_file <filename>
```
