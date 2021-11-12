---
id: showid
title: tctl workflow showid
description: How to show Workflow History for a specified Workflow Id and optional Run Id.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsARunId from '../../../content/what-is-a-run-id.md'

The `tctl workflow showid` command shows Workflow History for the specified <preview page={WhatIsAWorkflowId}>Workflow Id</preview> and optional <preview page={WhatIsARunId}>Run Id</preview>.

This command is a shortcut for `show --workflow_id <workflowid> --run_id <runid>`.

`tctl workflow showid <workflow_id> [<run_id>] [<command options>] [<arguments...>]`

### --print_datetime

Print timestamp.

`--print_datetime`

Alias `--pdt`

### --print_raw_time

Print raw timestamp.

`--print_raw_time`

Alias `--prt`

### --output_filename

Serialize the event to the specified file.

`--output_filename <value>`

Alias `--of`

### --print_full

Print full event details.

`--print_full`

Alias `--pf`

### --print_event_version

Print the event version.

`--print_event_version`

Alias `--pev`

### --event_id

Print details of the specified event (default: 0).

`--event_id <value>`

Alias `--eid`

### --max_field_length

Specify the maximum length for each attribute field (default: 500).

`--max_field_length <value>`

Alias `--maxl`

### --reset_points_only

Show only events that are eligible for reset.
