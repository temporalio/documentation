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

| Option                                           | Description                                             |
| ------------------------------------------------ | ------------------------------------------------------- |
| --workflow_id _value_, --wid _value_, -w _value_ | [Workflow Id](/docs/content/what-is-a-workflow-id).     |
| --run_id _value_, --rid _value_, -r _value_      | [Run Id](/docs/content/what-is-a-run-id).               |
| --print_datetime, --pdt                          | Print timestamp.                                        |
| --print_raw_time, --prt                          | Print raw timestamp.                                    |
| --output_filename _value_, --of _value_          | Serialize History event to a file.                      |
| --print_full, --pf                               | Print full event details.                               |
| --print_event_version, --pev                     | Print event version.                                    |
| --event_id _value_, --eid _value_                | Print details of specified event (default: 0).          |
| --max_field_length _value_, --maxl _value_       | Maximum length for each attribute field (default: 500). |
| --reset_points_only                              | Show only events that are eligible for reset.           |
