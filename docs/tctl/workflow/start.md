---
id: start
title: tctl workflow start
sidebar_label: start
description: How to start a new Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow start` command starts a new [Workflow Execution](/concepts/what-is-a-workflow-execution).
Unlike `run`, this command returns the Workflow Id and Run Id immediately after starting the Workflow.

`tctl workflow start <modifiers>`

The following modifiers control the behavior of the command.
Always include required modifiers when executing this command.

### `--taskqueue`

Specify a [Task Queue](/concepts/what-is-a-task-queue).

Alias: `--tq`

**Example**

```bash
tctl workflow start --taskqueue <name>
```

### `--workflow_id`

**This is a required modifier.**

Specify a [Workflow Id](/concepts/what-is-a-workflow-id).

Aliases: `--wid`, `-w`

**Example**

```bash
tctl workflow start --workflow_id <id>
```

If a Workflow is started without providing an Id, the Client generates one in the form of a UUID.
Temporal recommends using a business id rather than the client-generated UUID.

**Example**

```bash
tctl workflow start  --workflow_id "HelloTemporal1" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"Temporal\"
```

### `--workflow_type`

Specify the name of a [Workflow Type](/concepts/what-is-a-workflow-type).

Alias: `--wt`

**Example**

```bash
tctl workflow start --workflow_type <name>
```

### `--execution_timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Execution](/concepts/what-is-a-workflow-execution) in seconds.
The default value is 0.

Alias: `--et`

**Example**

```bash
tctl workflow start --execution_timeout <seconds>
```

### `--workflow_task_timeout`

Specify the [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout) of the [Workflow Task](/concepts/what-is-a-workflow-task) in seconds.
The default value is 10.

Alias: `--wtt`

**Example**

```bash
tctl workflow start --workflow_task_timeout <seconds>
```

### `--cron`

Specify a [Cron Schedule](/concepts/what-is-a-temporal-cron-job/#cron-schedules).

**Example**

```bash
tctl workflow start --cron <string>
```

### `--workflowidreusepolicy`

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/concepts/what-is-a-workflow-execution).

There are three allowed values:

- [**AllowDuplicateFailedOnly:**](/concepts/what-is-a-workflow-id-reuse-policy)
- [**AllowDuplicate:**](/concepts/what-is-a-workflow-id-reuse-policy)
- [**RejectDuplicate:**] (/concepts/what-is-a-workflow-id-reuse-policy)

**Examples**

```bash
tctl workflow start --workflowidreusepolicy AllowDuplicate
tctl workflow start --workflowidreusepolicy AllowDuplicateFailedOnly
tctl workflow start --workflowidreusepolicy RejectDuplicate
```

:::note

Multiple Workflows with the same Id cannot be run at the same time

:::

### `--input`

Pass input for the Workflow.
Input must be in JSON format.
For multiple JSON objects, pass each in a separate `--input` option.
Use `null` for null values.

Alias: `-i`

**Example**

```bash
tctl workflow start --input <json>
```

### `--input_file`

Pass input for the Workflow from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
Input from the command line overwrites input from the file.

Alias: `--if`

**Example**

```bash
tctl workflow start --input_file <filename>
```

### `--memo_key`

Pass a key for a memo.
For multiple keys, concatenate them and use spaces as separators.

**Example**

```bash
tctl workflow start --memo_key <key>
```

### `--memo`

Pass information for a [memo](/concepts/what-is-a-memo) from a JSON file.

Memos are immutable key/value pairs that can be attached to a workflow run when starting the workflow.
Memos are visible when listing workflows.

For multiple memos, concatenate them and use spaces as separators.
The order must match the order of keys in `--memo_key`.

**Example**

```bash
tctl workflow start \
  -tq your-task-queue \
  -wt your-workflow \
  -et 60 \
  -i '"temporal"' \
  -memo_key '<key values>' \
  -memo '<value>'
```

### `--memo_file`

Pass information for a memo from a JSON file.
For multiple JSON objects, concatenate them and use spaces or newline characters as separators.
The order must match the order of keys in `--memo_key`.

**Example**

```bash
tctl workflow start --memo_file <filename>
```

### `--search_attr_key`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) name.
For multiple names, concatenate them and use pipes (`|`) as separators.

To list valid Search Attributes, use the `tctl cluster get-search-attr` command.

**Example**

```bash
tctl workflow start --search_attr_key <key>
```

### `--search_attr_value`

Specify a [Search Attribute](/concepts/what-is-a-search-attribute) value.
For multiple values, concatenate them and use pipes (`|`) as separators.
If a value is an array, use JSON format, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2022-06-07T17:16:34-08:00","2022-06-07T18:16:34-08:00"]`.

To list valid Search Attributes and value types, use the `tctl cluster get-search-attr` command.

**Example**

```bash
tctl workflow start --search_attr_value <value>
```
