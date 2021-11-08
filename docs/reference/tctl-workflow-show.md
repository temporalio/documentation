---
id: tctl-workflow-show
title: Temporal CLI - tctl workflow show
description: The `tctl workflow show` command shows Workflow History.
tags:
  - reference
---

import RelatedReadList from '../components/RelatedReadList.js'

The `tctl workflow show` command shows Workflow History.

## Syntax

`tctl workflow show [*command options*] [*arguments...*]`

## Command options

| Option | Description |
| --- | --- |
| --workflow_id *value*, --wid *value*, -w *value* | [Workflow Id](/docs/content/what-is-a-workflow-id). |
| --run_id *value*, --rid *value*, -r *value* | [Run Id](/docs/content/what-is-a-run-id). |
| --print_datetime, --pdt | Print timestamp. |
| --print_raw_time, --prt | Print raw timestamp. |
| --output_filename *value*, --of *value* | Serialize History event to a file. |
| --print_full, --pf | Print full event details. |
| --print_event_version, --pev | Print event version. |
| --event_id *value*, --eid *value* | Print details of specified event (default: 0). |
| --max_field_length *value*, --maxl *value* | Maximum length for each attribute field (default: 500). |
| --reset_points_only | Show only events that are eligible for reset. |
