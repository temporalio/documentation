---
id: tctl-workflow-show
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

## Syntax

`tctl workflow show <command options> <arguments...>`

## Command options

### `--workflow_id <value>`

**Aliases** `--wid <value>`, `-w <value>`

**Description** Specify the <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

<!--
**Example** `tctl workflow show --workflow_id 3ea6b242-b23c-4279-bb13-f215661b4717`
-->

### `--run_id <value>`

**Aliases** `--rid <value>`, `-r <value>`

**Description** Specify the <preview page={WhatIsARunId}>Run Id</preview>.

### `--print_datetime`

**Alias** `--pdt`

**Description** Print timestamp.

### `--print_raw_time`

**Alias** `--prt`

**Description** Print raw timestamp.

| --output_filename \<value\>, --of \<value\> | Serialize History event to a file. |
| --print*full, --pf | Print full event details. |
| --print_event_version, --pev | Print event version. |
| --event_id \<value\>, --eid \<value\> | Print details of specified event (default: 0). |
| --max*field_length \<value\>, --maxl \<value\> | Maximum length for each attribute field (default: 500). |
| --reset_points_only | Show only events that are eligible for reset. |
