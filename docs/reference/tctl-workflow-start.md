---
id: tctl-workflow-start
title: Temporal CLI - tctl workflow start
description: The `tctl workflow start` command starts a new Workflow Execution.
tags:
  - reference
---

import RelatedReadList from '../components/RelatedReadList.js'

The `tctl workflow start` command starts a new [Workflow Execution](/docs/content/what-is-a-workflow-execution).

## Syntax

`tctl workflow start [*command options*] [*arguments...*]`

## Command options

| Option                                           | Description                                                                                                                                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --taskqueue _value_, --tq _value_                | Task Queue.                                                                                                                                                                                                                              |
| --workflow_id _value_, --wid _value_, -w _value_ | [Workflow Id](/docs/content/what-is-a-workflow-id).                                                                                                                                                                                      |
| --workflow_type _value_, --wt _value_            | Name of a [Workflow Type](/docs/content/what-is-a-workflow-type)                                                                                                                                                                         |
| --execution_timeout _value_, --et _value_        | [Workflow Execution](/docs/content/what-is-a-workflow-execution) [Start-To-Close Timeout](https://docs.temporal.io/docs/content/what-is-a-start-to-close-timeout/) in seconds (default: 0).                                              |
| --workflow_task_timeout _value_, --wtt _value_   | [Workflow Task](/docs/content/what-is-a-workflow-task) [Start-To-Close Timeout](https://docs.temporal.io/docs/content/what-is-a-start-to-close-timeout/) in seconds (default: 10).                                                       |
| --cron value                                     | Optional cron schedule for the workflow. Cron spec is as follows:                                                                                                                                                                        |
|                                                  | `┌───────────── minute (0–59)`                                                                                                                                                                                                           |
|                                                  | `│ ┌───────────── hour (0–23)`                                                                                                                                                                                                           |
|                                                  | `│ │ ┌───────────── day of the month (1–31)`                                                                                                                                                                                             |
|                                                  | `│ │ │ ┌───────────── month (1–12)`                                                                                                                                                                                                      |
|                                                  | `│ │ │ │ ┌───────────── day of the week (0–6, with 0 = Sunday, 1 = Monday, and so on)`                                                                                                                                                   |
|                                                  | `│ │ │ │ │ `                                                                                                                                                                                                                             |
|                                                  | `* * * * *`                                                                                                                                                                                                                              |
| --workflowidreusepolicy _value_, --wrp _value_   | Configure if the same [Workflow Id](/docs/content/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/docs/content/what-is-a-workflow-execution). Options: AllowDuplicate, AllowDuplicateFailedOnly, RejectDuplicate. |
| --input _value_, -i _value_                      | Optional input for the Workflow in JSON format. If there are multiple, pass each as a separate input flag. Pass `null` for null values.                                                                                                  |
| --input_file _value_, --if _value_               | Optional input for the workflow from a JSON file. If there are multiple, concatenate them and separate by space or newline. Input from the file will be overwritten by input from command line.                                          |
| --memo_key _value_                               | Optional key of memo. If there are multiple keys, concatenate them and separate by space.                                                                                                                                                |
| --memo _value_                                   | Optional information, specified in JSON format, that can be shown when the Workflow is listed. If there are multiple, concatenate them and separate by space. The order must be same as in `memo_key`.                                   |
| --memo_file _value_                              | Optional information, from a file in JSON format, that can be shown when the Workflow is listed. If there are multiple, concatenate them and separate by space or newline. The order must be same as in `memo_key`.                      |
| --search_attr_key _value_                        | Optional search attribute key that can be used in list query. If there are multiple keys, concatenate them and separate by pipes (`                                                                                                      | `). Use `cluster get-search-attr` command to list valid keys.                                                                                                                                                                             |
| --search_attr_value _value_                      | Optional search attribute value that can be be used in list query. If there are multiple keys, concatenate them and separate by pipes (`                                                                                                 | `). If *value* is an array, use a JSON array, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2019-06-07T17:16:34-08:00","2019-06-07T18:16:34-08:00"]`. Use `cluster get-search-attr` command to list valid keys and value types. |
