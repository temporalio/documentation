---
id: scan
title: tctl workflow scan
description: How to quickly list Workflow Executions without sorting using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsASearchAttribute from '../../../content/what-is-a-search-attribute.md'

The `tctl workflow scan` command lists <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>. It is faster than the `tctl workflow listall` command, but the results are not sorted.

By default, this command lists a maximum of 2000 Workflow Executions. To set the size of a page, use the `--pagesize` option.

See also [`tctl workflow list`](./list.md), [`tctl workflow listall`](./listall.md), and [`tctl workflow listarchived`](./listarchived.md).

`tctl workflow scan <options> <arguments...>`

The following options modify the behavior of the command.

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow scan --print_raw_time
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow scan --print_datetime
```

### `--print_memo`

How to print a memo.

Alias: `--pme`

**Example**

```
tctl workflow scan --print_memo
```

### `--print_search_attr`

How to print the <preview page={WhatIsASearchAttribute}>Search Attributes</preview>.

Alias: `--psa`

**Example**

```
tctl workflow scan --print_search_attr
```

### `--print_full`

How to print the full message without table formatting.

Alias: `--pf`

**Example**

```
tctl workflow scan --print_full
```

### `--print_json`

How to print the raw JSON objects.

Alias: `pjson`

**Example**

```
tctl workflow scan --print_json
```

### `--pagesize`

How to specify the maximum number of <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> to list on a page. (By default, the `tctl workflow scan` command lists 2000 Workflow Executions per page.)

Alias: `--ps`

**Example**

```
tctl workflow scan --pagesize <value>
```

### `--query`

How to specify an SQL-like query of <preview page={WhatIsASearchAttribute}>Search Attributes</preview>.

Alias: `-q`

**Example**

```
tctl workflow scan --query <value>
```
