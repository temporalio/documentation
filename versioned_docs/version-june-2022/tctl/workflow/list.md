---
id: list
title: tctl workflow list
sidebar_label: list
description: How to list open or closed Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow list` command lists open or closed [Workflow Executions](/concepts/what-is-a-workflow-execution).

By default, this command lists a maximum of 10 closed Workflow Executions.

- To set the size of a page, use the `--pagesize` option.
- To list multiple pages, use the `--more` option.
- To list open Workflow Executions, use the `--open` option.

See also [`tctl workflow listall`](/tctl/workflow/listall), [`tctl workflow listarchived`](/tctl/workflow/listarchived), and [`tctl workflow scan`](/tctl/workflow/scan).

`tctl workflow list [<modifiers>]`

The following modifiers control the behavior of the command.

### `--print_raw_time`

Print the raw timestamp.

Alias: `--prt`

**Example**

```bash
tctl workflow list --print_raw_time
```

### `--print_datetime`

Print the timestamp.

Alias: `--pdt`

**Example**

```bash
tctl workflow list --print_datetime
```

### `--print_memo`

Print a memo.

Alias: `--pme`

**Example**

```bash
tctl workflow list --print_memo
```

### `--print_search_attr`

Print the [Search Attributes](/concepts/what-is-a-search-attribute).

Alias: `--psa`

**Example**

```bash
tctl workflow list --print_search_attr
```

### `--print_full`

Print the full message without table formatting.

Alias: `--pf`

**Example**

```bash
tctl workflow list --print_full
```

### `--print_json`

Print the raw JSON objects.

Alias: `pjson`

**Example**

```bash
tctl workflow list --print_json
```

### `--open`

List open [Workflow Executions](/concepts/what-is-a-workflow-execution).
(By default, the `tctl workflow list` command lists closed Workflow Executions.)

Alias: `--op`

**Example**

```bash
tctl workflow list --open
```

### `--earliest_time`

Specify the earliest start time to list.
Supported format are as follows:

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

```bash
tctl workflow list --earliest-time '2022-01-02T15:04:05+05:30'
```

To specify 15 minutes before the current time:

```bash
tctl workflow list --earliest-time '15minute'
```

### `--latest_time`

Specify the latest start time to list.
Supported formats are as follows:

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

```bash
tctl workflow list --latest-time '2022-04-13T23:02:17-07:00'
```

To specify 10 seconds before the current time:

```bash
tctl workflow list --latest-time '10second'
```

### `--workflow_id`

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow list --workflow_id <id>
```

### `--workflow_type`

Specify the name of a [Workflow Type](/concepts/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```bash
tctl workflow list --workflow_type <name>
```

### `--status`

Specify the status of a [Workflow Execution](/concepts/what-is-a-workflow-execution).
Supported values are as follows:

- `completed`
- `failed`
- `canceled`
- `terminated`
- `continuedasnew`
- `timedout`

Alias: `-s`

**Example**

```bash
tctl workflow list --status <value>
```

### `--query`

**How to list and filter Workflow Executions with a [List Filter](/concepts/what-is-a-list-filter) using tctl.**

The `--query` flag is supported only when [Advanced Visibility](/concepts/what-is-advanced-visibility) is configured with the Cluster.

Using the `--query` option causes tctl to ignore all other filter options, including `open`, `earliest_time`, `latest_time`, `workflow_id`, and `workflow_type`.

Alias: `-q`

**Example**

```bashbash
tctl workflow list --query "WorflowId=<your-workflow-id>"
```

More examples:

```bashbash
tctl workflow list \
  --query "WorkflowType='main.SampleParentWorkflow' AND ExecutionStatus='Running'"
```

```bashbash
tctl workflow list \
  --query '(CustomKeywordField = "keyword1" and CustomIntField >= 5) or CustomKeywordField = "keyword2"' \
  --print_search_attr
```

```bashbash
tctl workflow list \
  --query 'CustomKeywordField in ("keyword2", "keyword1") and CustomIntField >= 5 and CloseTime between "2018-06-07T16:16:36-08:00" and "2019-06-07T16:46:34-08:00" order by CustomDatetimeField desc' \
  --print_search_attr
```

```bashbash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" and (WorkflowId = "1645a588-4772-4dab-b276-5f9db108b3a8" or RunId = "be66519b-5f09-40cd-b2e8-20e4106244dc")'
```

```bashbash
tctl workflow list \
  --query 'WorkflowType = "main.Workflow" StartTime > "2019-06-07T16:46:34-08:00" and ExecutionStatus = "Running"'
```

### `--more`

List more than one page.
(By default, the `tctl workflow list` command lists one page of results.)

Alias: `-m`

**Example**

```bash
tctl workflow list --more
```

### `--pagesize`

Specify the maximum number of [Workflow Executions](/concepts/what-is-a-workflow-execution) to list on a page.
(By default, the `tctl workflow list` command lists 10 Workflow Executions per page.)

Alias: `--ps`

**Example**

```bash
tctl workflow list --pagesize <value>
```
