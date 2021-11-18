---
id: run
title: tctl workflow run
description: How to start a new Workflow Execution and get Workflow progress using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsATaskQueue from '../../../content/what-is-a-task-queue.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsAWorkflowType from '../../../content/what-is-a-workflow-type.md'
import * as WhatIsAStartToCloseTimeout from '../../../content/what-is-a-start-to-close-timeout.md'
import * as WhatIsAWorkflowTask from '../../../content/what-is-a-workflow-task.md'
import * as WhatIsAWorkflowIdReusePolicy from '../../../content/what-is-a-workflow-id-reuse-policy.md'
import * as WhatIsASearchAttribute from '../../../content/what-is-a-search-attribute.md'

The `tctl workflow run` command starts a new <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> and can show Workflow progress.

`tctl workflow run <options> <arguments...>`

The following options modify the behavior of the command.

### `--taskqueue`

How to specify a <preview page={WhatIsATaskQueue}>Task Queue</preview>.

Alias: `--tq`

**Example**

```
tctl workflow run --taskqueue <name>
```

### `--workflow_id`

How to specify a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow run --workflow_id <id>
```

### `--workflow_type`

How to specify the name of a <preview page={WhatIsAWorkflowType}>Workflow Type</preview>.

Alias: `--wt`

**Example**

```
tctl workflow run --workflow_type <name>
```

### `--execution_timeout`

How to specify the <preview page={WhatIsAStartToCloseTimeout}>Start-To-Close Timeout</preview> of the <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> in seconds. The default value is 0.

Alias: `--et`

**Example**

```
tctl workflow run --execution_timeout <seconds>
```

### `--workflow_task_timeout`

How to specify the <preview page={WhatIsAStartToCloseTimeout}>Start-To-Close Timeout</preview> of the <preview page={WhatIsAWorkflowTask}>Workflow Task</preview> in seconds. The default value is 10.

Alias: `--wtt`

**Example**

```
tctl workflow run --workflow_task_timeout <seconds>
```

### `--cron`

How to specify a [Cron Schedule](../../../content/what-is-a-temporal-cron-job/#cron-schedules).

**Example**

```
tctl workflow run --cron <string>
```

### `--workflowidreusepolicy`

How to specify a <preview page={WhatIsAWorkflowIdReusePolicy}>Workflow Id Reuse Policy</preview>. Configure if the same <preview page={WhatIsAWorkflowId}>Workflow Id</preview> is allowed for use in new <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>.

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```
tctl workflow run --workflowidreusepolicy AllowDuplicate
tctl workflow run --workflowidreusepolicy AllowDuplicateFailedOnly
tctl workflow run --workflowidreusepolicy RejectDuplicate
```

### `--input`

How to pass input for the Workflow. Input must be in JSON format. For multiple JSON objects, pass each in a separate `--input` option. Use `null` for null values.

Alias: `-i`

**Example**

```
tctl workflow run --input <json>
```

### `--input_file`

How to pass input for the Workflow from a JSON file. For multiple JSON objects, concatenate them and use spaces or newline characters as separators. Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```
tctl workflow run --input_file <filename>
```

### `--memo_key`

How to pass a key for a memo. For multiple keys, concatenate them and use spaces as separators.

**Example**

```
tctl workflow run --memo_key <key>
```

### `--memo`

How to pass a memo. A memo is information in JSON format that can be shown when the Workflow is listed. For multiple memos, concatenate them and use spaces as separators. The order must match the order of keys in `--memo_key`.

**Example**

```
tctl workflow run --memo <json>
```

### `--memo_file`

How to pass information for a memo from a JSON file. For multiple JSON objects, concatenate them and use spaces or newline characters as separators. The order must match the order of keys in `--memo_key`.

**Example**

```
tctl workflow run --memo_file <filename>
```

### `--search_attr_key`

How to specify a <preview page={WhatIsASearchAttribute}>Search Attribute</preview> key. For multiple keys, concatenate them and use pipes (`|`) as separators.

To list valid keys, use the `tctl cluster get-search-attr` command.

**Example**

```
tctl workflow run --search_attr_key <key>
```

### `--search_attr_value`

How to specify a <preview page={WhatIsASearchAttribute}>Search Attribute</preview> value. For multiple values, concatenate them and use pipes (`|`) as separators. If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid keys and value types, use the `tctl cluster get-search-attr` command.

**Example**

```
tctl workflow run --search_attr_value <value>
```

### `--show_detail`

How to get event details.

Alias: `--sd`

**Example**

```
tctl workflow run --show_detail
```

### `--max_field_length`

How to specify the maximum length for each attribute field. The default value is 0.

Alias: `--maxl`

**Example**

```
tctl workflow run --max_field_length <length>
```
