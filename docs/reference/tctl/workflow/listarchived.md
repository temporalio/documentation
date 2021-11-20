---
id: listarchived
title: tctl workflow listarchived
description: How to list archived Workflow Executions using tctl.
tags:
  - reference
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowExecution from '../../../content/what-is-a-workflow-execution.md'
import * as WhatIsASearchAttribute from '../../../content/what-is-a-search-attribute.md'
import * as WhatIsANamespace from '../../../content/what-is-a-namespace.md'

The `tctl workflow listarchived` command lists archived <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview>.

By default, this command lists a maximum of 100 Workflow Executions.

- To set the size of a page, use the `--pagesize` option.
- To list all pages, use the `--all` option.

See also  [`tctl workflow list`](./list.md), [`tctl workflow listall`](./listall.md), and [`tctl workflow scan`](./scan.md).

`tctl workflow list <options> <arguments...>`

The following options modify the behavior of the command.

### `--print_raw_time`

How to print the raw timestamp.

Alias: `--prt`

**Example**

```
tctl workflow listarchived --print_raw_time
```

### `--print_datetime`

How to print the timestamp.

Alias: `--pdt`

**Example**

```
tctl workflow listarchived --print_datetime
```

### `--print_memo`

How to print a memo.

Alias: `--pme`

**Example**

```
tctl workflow listarchived --print_memo
```

### `--print_search_attr`

How to print the <preview page={WhatIsASearchAttribute}>Search Attributes</preview>.

Alias: `--psa`

**Example**

```
tctl workflow listarchived --print_search_attr
```

### `--print_full`

How to print the full message without table formatting.

Alias: `--pf`

**Example**

```
tctl workflow listarchived --print_full
```

### `--print_json`

How to print the raw JSON objects.

Alias: `pjson`

**Example**

```
tctl workflow listarchived --print_json
```

### `--query`

How to specify an SQL-like query of <preview page={WhatIsASearchAttribute}>Search Attributes</preview>.

Consult the documentation of the visibility archiver that is used by your <preview page={WhatIsANamespace}>Namespace</preview> for detailed instructions.

Alias: `-q`

**Example**

```
tctl workflow listarchived --query <value>
```

### `--pagesize`

How to specify the maximum number of <preview page={WhatIsAWorkflowExecution}>Workflow Executions</preview> to list on a page.
(By default, the `tctl workflow listarchived` command lists 100 Workflow Executions per page.)

Alias: `--ps`

**Example**

```
tctl workflow listarchived --pagesize <value>
```

### `--all`

How to list all pages.

Alias: `-a`

**Example**

```
tctl workflow listarchived --all
```
