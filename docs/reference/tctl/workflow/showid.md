---
id: showid
title: tctl workflow showid
description: How to show Workflow History for a specified Workflow Id and optional Run Id.
tags:
  - reference
  - tctl
---

The `tctl workflow showid` command shows Workflow History for the specified [Workflow Id](/docs/content/what-is-a-workflow-id) and optional [Run Id](/docs/content/what-is-a-run-id).

This command is a shortcut of `show -w <wid> -r <rid>`.

## Syntax

`tctl workflow showid <workflow_id> [<run_id>] [<command options>] [<arguments...>]`

## Command options

<!-- prettier-ignore -->
| Option | Description |
| --- | --- |
| --print\_datetime, --pdt | Print timestamp. |
| --print\_raw\_time, --prt | Print raw timestamp. |
| --output\_filename \<value\>, --of \<value\> | Serialize History event to a file. |
| --print\_full, --pf | Print full event details. |
| --print\_event\_version, --pev | Print event version. |
| --event\_id \<value\>, --eid \<value\> | Print details of specified event (default: 0). |
| --max\_field\_length \<value\>, --maxl \<value\> | Maximum length for each attribute field (default: 500). |
| --reset\_points\_only | Show only events that are eligible for reset. |
