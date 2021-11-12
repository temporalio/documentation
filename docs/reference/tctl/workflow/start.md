---
id: start
title: tctl workflow start
description: How to start a new Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

The `tctl workflow start` command starts a new [Workflow Execution](/docs/content/what-is-a-workflow-execution).

## Syntax

`tctl workflow start <command options> <arguments...>`

## Command options

<!-- prettier-ignore -->
| Option | Description |
| --- | --- |
| --taskqueue \<value\>, --tq \<value\> | Task Queue. |
| --workflow\_id \<value\>, --wid \<value\>, -w \<value\> | [Workflow Id](/docs/content/what-is-a-workflow-id). |
| --workflow\_type \<value\>, --wt \<value\> | Name of a [Workflow Type](/docs/content/what-is-a-workflow-type) |
| --execution\_timeout \<value\>, --et \<value\> | [Workflow Execution](/docs/content/what-is-a-workflow-execution) [Start-To-Close Timeout](https://docs.temporal.io/docs/content/what-is-a-start-to-close-timeout/) in seconds (default: 0). |
| --workflow\_task_timeout \<value\>, --wtt \<value\> | [Workflow Task](/docs/content/what-is-a-workflow-task) [Start-To-Close Timeout](https://docs.temporal.io/docs/content/what-is-a-start-to-close-timeout/) in seconds (default: 10). |
| --cron value | Optional cron schedule for the workflow. Cron spec is as follows: |
| | `┌───────────── minute (0–59)` |
| | `│ ┌───────────── hour (0–23)` |
| | `│ │ ┌───────────── day of the month (1–31)` |
| | `│ │ │ ┌───────────── month (1–12)` |
| | `│ │ │ │ ┌───────────── day of the week (0–6, with 0 = Sunday, 1 = Monday, and so on)` |
| | `│ │ │ │ │` |
| | `* * * * *` |
| --workflowidreusepolicy \<value\>, --wrp \<value\> | Configure if the same [Workflow Id](/docs/content/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/docs/content/what-is-a-workflow-execution). Options: AllowDuplicate, AllowDuplicateFailedOnly, RejectDuplicate. |
| --input \<value\>, -i \<value\> | Optional input for the Workflow in JSON format. If there are multiple, pass each as a separate input flag. Pass `null` for null values. |
| --input\_file \<value\>, --if \<value\> | Optional input for the workflow from a JSON file. If there are multiple, concatenate them and separate by space or newline. Input from the file will be overwritten by input from command line. |
| --memo\_key \<value\> | Optional key of memo. If there are multiple keys, concatenate them and separate by space. |
| --memo \<value\> | Optional information, specified in JSON format, that can be shown when the Workflow is listed. If there are multiple, concatenate them and separate by space. The order must be same as in `memo_key`. |
| --memo\_file \<value\> | Optional information, from a file in JSON format, that can be shown when the Workflow is listed. If there are multiple, concatenate them and separate by space or newline. The order must be same as in `memo_key`. |
| --search\_attr\_key \<value\> | Optional search attribute key that can be used in list query. If there are multiple keys, concatenate them and separate by pipes (`|`). Use `cluster get-search-attr` command to list valid keys. |
| --search\_attr\_value \<value\> | Optional search attribute value that can be be used in list query. If there are multiple keys, concatenate them and separate by pipes (`|`). If \<value\> is an array, use a JSON array, such as `["a","b"]`, `[1,2]`, `["true","false"]`, or `["2019-06-07T17:16:34-08:00","2019-06-07T18:16:34-08:00"]`. Use `cluster get-search-attr` command to list valid keys and value types. |
