---
id: tctl-workflow-showid
title: Temporal CLI - tctl workflow showid
description: The `tctl workflow showid` command shows Workflow History for the specified Workflow Id and optional Run Id.
tags:
  - reference
---

import RelatedReadList from '../components/RelatedReadList.js'

The `tctl workflow showid` command shows Workflow History for the specified [Workflow Id](/docs/content/what-is-a-workflow-id) and optional [Run Id](/docs/content/what-is-a-run-id).

This command is a shortcut of `show -w *wid* -r *rid*`.

## Syntax

`tctl workflow showid *workflow_id* [*run_id*] [*command options*] [*arguments...*]`

## Command options

| Option                                      | Description                                             |
| ------------------------------------------- | ------------------------------------------------------- |
| --print_datetime, --pdt                     | Print timestamp.                                        |
| --print_raw_time, --prt                     | Print raw timestamp.                                    |
| --output*filename \_value*, --of _value_    | Serialize History event to a file.                      |
| --print_full, --pf                          | Print full event details.                               |
| --print_event_version, --pev                | Print event version.                                    |
| --event*id \_value*, --eid _value_          | Print details of specified event (default: 0).          |
| --max*field_length \_value*, --maxl _value_ | Maximum length for each attribute field (default: 500). |
| --reset_points_only                         | Show only events that are eligible for reset.           |
