---
id: start
title: tctl batch start
description: How to start a batch job using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsASearchAttribute from '../../../content/what-is-a-search-attribute.md'
import * as WhatIsASignal from '../../../content/what-is-a-signal.md'

The `tctl batch start` command starts a batch job.

`tctl batch start <options> <arguments...>`

The following options modify the behavior of the command.

### `--query`

How to specify the <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> that this batch job should operate.

The SQL-like query of <preview page={WhatIsASearchAttribute}>Search Attributes</preview> is the same as used by the `tctl workflow list --query` command.

Alias: `-q`

**Example**

```
tctl batch start --query <value>
```

### `--reason`

How to specify a reason for running this batch job.

Alias: `--re`

**Example**

```
tctl batch start --reason <string>
```

### `--batch_type`

How to specify the operation that this batch job performs. The supported operations are `signal`, `cancel`, and `terminate`.

Alias: `--bt`

**Example**

```
tctl batch start --batch_type <operation>
```

### `--signal_name`

How to specify the name of a <preview page={WhatIsASignal}>Signal</preview>. This option is required when `--batch_type` is `signal`.

Alias: `--sig`

**Example**

```
tctl batch start --signal_name <name>
```

### `--input`

How to pass input for the <preview page={WhatIsASignal}>Signal</preview>. Input must be in JSON format.

Alias: `-i`

**Example**

```
tctl batch start --input <json>
```

### `--rps`

How to specify RPS of processing. The default value is 50.

**Example**

```
tctl batch start --rps <value>
```

### `--yes`

How to disable the confirmation prompt.

**Example**

```
tctl batch start --yes
```
