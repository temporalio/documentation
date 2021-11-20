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

See also [`tctl workflow showid`](./showid.md).

`tctl workflow show <options> <arguments...>`

The following options modify the behavior of the command.

### `--workflow_id`

How to show the History of a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> by specifying a <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow show --workflow_id <id>
```

### `--run_id`

How to show the History of a <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> by specifying a <preview page={WhatIsARunId}>Run Id</preview>.

Aliases: `--rid`, `-r`

**Example**

```
tctl workflow show --run_id <id>
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow show --print_datetime
```

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow show --print_raw_time
```

### `--output_filename`

How to serialize an event to a file.

Alias: `--of`

**Example**

```
tctl workflow show --output_filename <filename>
```

### `--print_full`

How to print full event details.

Alias: `--pf`

**Example**

```
tctl workflow show --print_full
```

### `--print_event_version`

How to print the event version.

Alias: `--pev`

**Example**

```
tctl workflow show --print_event_version
```

### `--event_id`

How to print the details of a specified event.
The default value is 0.

Alias: `--eid`

**Example**

```
tctl workflow show --event_id <id>
```

### `--max_field_length`

How to specify the maximum length for each attribute field.
The default value is 500.

Alias: `--maxl`

**Example**

```
tctl workflow show --max_field_length <length>
```

### `--reset_points_only`

How to show only events that are eligible for reset.

**Example**

```
tctl workflow show --reset_points_only
```
