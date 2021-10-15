---
id: how-to-view-search-attributes-of-a-cluster-using-tctl
title: How to view Search Attributes of a Cluster using tctl
description: To view the Search Attribute keys currently indexed by the Cluster, use the `tctl cluster get-search-attributes` command.
tags:
  - operation-guide
  - filtered-lists
  - tctl
---

To view the Search Attribute keys currently indexed by the Cluster, use the `tctl cluster get-search-attributes` command.

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

There is also admin version of this command which will show you default and custom Search Attributes separately, and also show the underlying Elasticsearch index schema and system Workflow status.

```bash
tctl admin cluster get-search-attributes
```
