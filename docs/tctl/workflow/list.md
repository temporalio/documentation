---
id: list
title: tctl workflow list
sidebar_label: list
description: How to list open or closed Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow list` command lists open or closed [Workflow Executions](/docs/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 10 closed Workflow Executions.

- To set the size of a page, use the `--pagesize` option.
- To list multiple pages, use the `--more` option.
- To list open Workflow Executions, use the `--open` option.

See also [`tctl workflow listall`](/docs/tctl/workflow/listall), [`tctl workflow listarchived`](/docs/tctl/workflow/listarchived), and [`tctl workflow scan`](/docs/tctl/workflow/scan).

`tctl workflow list [<modifiers>]`

The following modifiers control the behavior of the command.

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow list --print_raw_time
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow list --print_datetime
```

### `--print_memo`

How to print a memo.

Alias: `--pme`

**Example**

```
tctl workflow list --print_memo
```

### `--print_search_attr`

How to print the [Search Attributes](/docs/concepts/what-is-a-search-attribute).

Alias: `--psa`

**Example**

```
tctl workflow list --print_search_attr
```

### `--print_full`

How to print the full message without table formatting.

Alias: `--pf`

**Example**

```
tctl workflow list --print_full
```

### `--print_json`

How to print the raw JSON objects.

Alias: `pjson`

**Example**

```
tctl workflow list --print_json
```

### `--open`

How to list open [Workflow Executions](/docs/concepts/what-is-a-workflow-execution).
(By default, the `tctl workflow list` command lists closed Workflow Executions.)

Alias: `--op`

**Example**

```
tctl workflow list --open
```

### `--earliest_time`

How to specify the earliest start time to list. Supported format are as follows:

- `<year>-<month>-<day>T<hour>:<minute>:<second><+|-><offsethours>:<offsetminutes>`
- Raw Unix Epoch time (the number of milliseconds since 0000 UTC on January 1, 1970).
- `<n><duration`, where `<n>` is a value between 0 and 1000000, and `<duration>` is one of the following:
  - `second` or `s`
  - `minute` or `m`
  - `hour` or `h`
  - `day` or `d`
  - `week` or `w`
  - `month` or `M`
  - `year` or `y`

Alias: `--et`

**Examples**

To specify 3:04:05 PM India Standard Time on January 2, 2022:

```
tctl workflow list --earliest-time '2022-01-02T15:04:05+05:30'
```

To specify 15 minutes before the current time:

```
tctl workflow list --earliest-time '15minute'
```

### `--latest_time`

How to specify the latest start time to list. Supported formats are as follows:

- `<year>-<month>-<day>T<hour>:<minute>:<second><+|-><offsethours>:<offsetminutes>`
- Raw Unix Epoch time (the number of milliseconds since 0000 UTC on January 1, 1970).
- `<n><duration`, where `<n>` is a value between 0 and 1000000, and `<duration>` is one of the following:
  - `second` or `s`
  - `minute` or `m`
  - `hour` or `h`
  - `day` or `d`
  - `week` or `w`
  - `month` or `M`
  - `year` or `y`

Alias: `--lt`

**Examples**

To specify 11:02:17 PM Pacific Daylight Time on April 13, 2022:

```
tctl workflow list --latest-time '2022-04-13T23:02:17-07:00'
```

To specify 10 seconds before the current time:

```
tctl workflow list --latest-time '10second'
```

### `--workflow_id`

How to specify a [Workflow Id](/docs/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```
tctl workflow list --workflow_id <id>
```

### `--workflow_type`

How to specify the name of a [Workflow Type](/docs/concepts/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```
tctl workflow list --workflow_type <name>
```

### `--status`

How to specify the status of a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution).
Supported values are as follows:

- `completed`
- `failed`
- `canceled`
- `terminated`
- `continuedasnew`
- `timedout`

Alias: `-s`

**Example**

```
tctl workflow list --status <value>
```

### `--query`

**How to list and filter Workflow Executions with a [List Filter](/docs/concepts/what-is-a-list-filter) using tctl.**

The `--query` flag is supported only when [Advanced Visibility](/docs/concepts/what-is-advanced-visibility) is configured with the Cluster.

Using the `--query` option causes tctl to ignore all other filter options, including `open`, `earliest_time`, `latest_time`, `workflow_id`, and `workflow_type`.

Alias: `-q`

**Example**

```bash
tctl workflow list --query "WorflowId=<your-workflow-id>"
```

More examples:

```bash
tctl workflow list \
  --query "WorkflowType='main.SampleParentWorkflow' AND ExecutionStatus='Running'"
```

```bash
tctl workflow list \
  --query '(CustomKeywordField = "keyword1" and CustomIntField >= 5) or CustomKeywordField = "keyword2"' \
  --print_search_attr
```

```bash
tctl workflow list \
  --query 'CustomKeywordField in ("keyword2", "keyword1") and CustomIntField >= 5 and CloseTime between "2018-06-07T16:16:36-08:00" and "2019-06-07T16:46:34-08:00" order by CustomDatetimeField desc' \
  --print_search_attr
```

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

```bash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and ExecutionStatus = "Running"'
```

### `--more`

How to list more than one page.
(By default, the `tctl workflow list` command lists one page of results.)

Alias: `-m`

**Example**

```
tctl workflow list --more
```

### `--pagesize`

How to specify the maximum number of [Workflow Executions](/docs/concepts/what-is-a-workflow-execution) to list on a page.
(By default, the `tctl workflow list` command lists 10 Workflow Executions per page.)

Alias: `--ps`

**Example**

```
tctl workflow list --pagesize <value>
```
