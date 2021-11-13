---
id: start
title: tctl workflow start
description: How to start a new Workflow Execution using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsATaskQueue from '../../../content/what-is-a-task-queue.md'
import * as WhatIsAWorkflowId from '../../../content/what-is-a-workflow-id.md'
import * as WhatIsAWorkflowType from '../../../content/what-is-a-workflow-type.md'
import * as WhatIsAStartToCloseTimeout from '../../../content/what-is-a-start-to-close-timeout.md'
import * as WhatIsAWorkflowTask from '../../../content/what-is-a-workflow-task.md'

The `tctl workflow start` command starts a new <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview>.

> `tctl workflow start <command options> <arguments...>`

### --taskqueue

Specifies a <preview page={WhatIsATaskQueue}>Task Queue</preview>.

> `--taskqueue <value>`

Alias `--tq`

### --workflow_id

Specify the <preview page={WhatIsAWorkflowId}>Workflow Id</preview>.

> `--workflow_id <value>`

Aliases `--wid <value>`, `-w <value>`

### --workflow_type

Specify the name of a <preview page={WhatIsAWorkflowType}>Workflow Type</preview>.

> `--workflow_type <value>`

Alias `--wt <value>`

### --execution_timeout

Specify the <preview page={WhatIsAStartToCloseTimeout}>Start-To-Close Timeout</preview> of the <preview page={WhatIsAWorkflowExecution}>Workflow Execution</preview> in seconds (default: 0).

> `--execution_timeout <value>`

Alias `--et <value>`

### --workflow_task_timeout

Specify the <preview page={WhatIsAStartToCloseTimeout}>Start-To-Close Timeout</preview> of the <preview page={WhatIsAWorkflowTask}>Workflow Task</preview> in seconds (default: 10).

> `--workflow_task_timeout <value>`

Alias `--wtt <value>`

### ...more TK

<!-- prettier-ignore -->
<!-- 
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
-->
