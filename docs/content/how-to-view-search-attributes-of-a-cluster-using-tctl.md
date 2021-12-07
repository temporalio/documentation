---
id: how-to-view-search-attributes-of-a-cluster-using-tctl
title: How to view Search Attributes of a Cluster using tctl
description: Use the `tctl cluster get-search-attributes` command to view Search Attributes currently indexed by the Cluster.
tags:
  - operation-guide
  - filtered-lists
  - visibility
  - tctl
---

<!-- prettier-ignore -->
import * as WhatIsASearchAttribute from './what-is-a-search-attribute.md'

Use the following command to view the <preview page={WhatIsASearchAttribute}>Search Attributes</preview> currently indexed by the Cluster:

```bash
tctl cluster get-search-attributes
```

Example output:

```
+-----------------------+----------+
|         NAME          |   TYPE   |
+-----------------------+----------+
| BinaryChecksums       | Keyword  |
| CloseTime             | Int      |
| CustomBoolField       | Bool     |
| CustomDatetimeField   | Datetime |
| CustomDoubleField     | Double   |
| CustomIntField        | Int      |
| CustomKeywordField    | Keyword  |
| CustomNamespace       | Keyword  |
| CustomStringField     | String   |
| ExecutionStatus       | Int      |
| ExecutionTime         | Int      |
| Operator              | Keyword  |
| RunId                 | Keyword  |
| StartTime             | Int      |
| TaskQueue             | Keyword  |
| TemporalChangeVersion | Keyword  |
| WorkflowId            | Keyword  |
| WorkflowType          | Keyword  |
+-----------------------+----------+
```

The admin version of this command displays default and custom Search Attributes separately, and also shows the underlying Elasticsearch index schema and system Workflow status.

```bash
tctl admin cluster get-search-attributes
```
