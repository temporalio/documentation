---
id: what-is-a-search-attribute
title: What is a Search Attribute?
sidebar_label: Search Attribute
description: A Search Attribute is an indexed name used in List Filters to filter a list of Workflow Executions that have the Search Attribute in their metadata.
tags:
  - term
  - explanation
  - filtered-lists
  - visibility
---

Search Attributes are indexed fields used in a [List Filter](/concepts/what-is-a-list-filter) to filter a list of [Workflow Executions](/workflows#workflow-execution) that have the Search Attribute in their metadata.

A Search Attribute is a key-value pair metadata object and is part of the Workflow Execution visibility information, stored in the Visibility store. Use Search Attributes for metadata and search purposes only, not business logic.

Temporal provides [default Search Attributes](#default-search-attributes) out-of-the-box.
You can create [custom Search Attribute](#custom-search-attributes) keys in your Visibility store, and assign values in a Workflow Execution.

Search Attribute values are assigned to a specific Workflow Execution, and are available for that execution only up to the Namespace [Retention Period](/concepts/what-is-a-retention-period) specified.

When using [Continue-As-New](/concepts/what-is-continue-as-new) or a [Temporal Cron Job](/concepts/what-is-a-temporal-cron-job), Search Attributes are carried over to the new Workflow Run by default.

#### Search Attributes limits

<!-- TODO - [How to configure maximum number of Search Attribute keys per Cluster](#) -->

The following table lists the maximum number of custom Search Attributes you can create per Namespace by supported Visibility database.

| Search Attribute Type | MySQL (v8.0.17 and later) | PostgreSQL (v12 and later) | SQLite (v3.31.0 and later) | Temporal Cloud |
| --------------------- | :-----------------------: | :------------------------: | :------------------------: | :------------: |
| Keyword               |            10             |             10             |             10             |       20       |
| Keywordlist           |            10             |             10             |             10             |       20       |
| Text                  |             3             |             3              |             3              |       5        |
| Datetime              |             3             |             3              |             3              |       20       |
| Int                   |             3             |             3              |             3              |       20       |
| Double                |             3             |             3              |             3              |       20       |
| Bool                  |             3             |             3              |             3              |       20       |

Temporal does not impose a limit on the number of custom Search Attributes you can create with Elasticsearch. However, [Elasticsearch sets a default mapping limit](https://www.elastic.co/guide/en/elasticsearch/reference/8.6/mapping-settings-limit.html) that may apply.
Custom Search Attributes are an Advanced Visibility feature and are not supported on Cassandra.

After you create a custom Search Attribute, you can use it any number of times in your Workflows.

Size limits for Search Attribute:

<!--
_This refers to the SA key you create in the visibility store with `tctl search-attribute create`. this value is no longer applicable so commenting out for ref later_
Default total maximum number of Search Attribute **keys** per Temporal Cluster is 100.-->

- The default single Search Attribute **value** size limit is 2 KB.

<!-- TODO - [How to configure Search Attribute value size limit](#) -->

- Total Search Attribute size: 40 KB

<!-- TODO - [How to configure total Search Attribute size limite](#) -->

<!-- temp keeping for reference
This is configurable with [`SearchAttributesNumberOfKeysLimit`, `SearchAttributesTotalSizeLimit` and `SearchAttributesSizeOfValueLimit`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L440-L442), if you know what you are doing.
-->

#### Default Search Attributes

A Temporal Cluster has a set of default Search Attributes already available.
These Search Attributes are created when the initial index is created.

| NAME                  | TYPE     | DEFINITION                                                                                                                                                                   |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| WorkflowType          | Keyword  | The type of Workflow.                                                                                                                                                        |
| WorkflowId            | Keyword  | Identifies the Workflow Execution.                                                                                                                                           |
| ExecutionStatus       | Keyword  | The current state of the Workflow Execution.                                                                                                                                 |
| StartTime             | Datetime | The time at which the Workflow Execution started.                                                                                                                            |
| CloseTime             | Datetime | The time at which the Workflow Execution completed.                                                                                                                          |
| ExecutionTime         | Datetime | Same as StartTime for the most cases but different for cron Workflows and retried Workflows. For them it is the time at which the Workflow Execution actually begin running. |
| RunId                 | Keyword  | Identifies the current Workflow Execution Run.                                                                                                                               |
| ExecutionDuration     | Int      | The time needed to run the Workflow Execution. Available only for closed Workflows.                                                                                          |
| HistoryLength         | Int      | The number of events in the history of Workflow Execution. Available only for closed Workflows.                                                                              |
| StateTransitionCount  | Int      | The number of times that Workflow Execution has persisted its state. Available only for closed Workflows.                                                                    |
| TaskQueue             | Keyword  | Task Queue used by Workflow Execution.                                                                                                                                       |
| TemporalChangeVersion | Keyword  | If Workflow versioning is enabled, list of change/version pairs will be stored here.                                                                                         |
| BinaryChecksums       | Keyword  | List of binary Ids of Workers that run the Workflow Execution.                                                                                                               |
| BatcherNamespace      | Keyword  | Used by internal batcher to indicate the Namespace where batch operation was applied to.                                                                                     |
| BatcherUser           | Keyword  | Used by internal batcher to indicate the user who started the batch operation.                                                                                               |

- All default Search Attributes are reserved and read-only.
  (You cannot create a custom one with the same name or alter the existing one.)

- `ExecutionStatus` values correspond to Workflow Execution Statuses: Running, Completed, Failed, Canceled, Terminated, ContinuedAsNew, TimedOut.

- StartTime, CloseTime, and ExecutionTime are stored as dates but are supported by queries that use either EpochTime in nanoseconds or a string in [RFC3339Nano format](https://pkg.go.dev/time#pkg-constants) (such as "2006-01-02T15:04:05.999999999Z07:00").

- `ExecutionDuration` is stored in nanoseconds but is supported by queries that use integers in nanoseconds, [Golang duration format](https://pkg.go.dev/time#ParseDuration), or "hh:mm:ss" format.

- `CloseTime`, `HistoryLength`, `StateTransitionCount`, and `ExecutionDuration` are present only in a Closed Workflow Execution.

- `ExecutionTime` can differ from `StartTime` in retry and cron use cases.

You can use the default Search Attributes in a List Filter to get a list of specific Workflow Executions under the following conditions:

- Without Advanced Visibility, you can only use the `=` operator with a single default Search Attribute in your List Filter. For example: `tctl workflow list -q "ExecutionStatus = 'Completed'"` or `tctl workflow list -q "WorkflowType = 'YourWorkflow'"`.
- With Advanced Visibility, you can combine default Search Attributes in a List Filter to get a list of specific Workflow Executions. For example: `tctl workflow list -q "WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime < "2021-06-08T16:46:34-08:00")"`

#### Custom Search Attributes

You can create custom Search Attributes with unique key names that are relevant to your business needs, using [`tctl search-attribute create`](/tctl-next/search-attribute#create).

Adding a custom Search Attribute to your Visibility store makes it available to use with Workflow Executions within that Cluster. With Temporal Server v1.20, your custom Search Attributes must be associated with a Namespace within your Temporal Cluster.

Use your custom Search Attributes in a List Filter, say in your WebUI or with the `tctl workflow list` commands, with the following conditions:

- Without Advanced Visibility, you cannot use a custom Search Attribute in your List Filter.
- With Advanced Visibility, you can create multiple custom Search Attributes and use them in combinations with List Filters to get specific Workflow Executions list. For example: `tctl workflow list -q "WorkflowType = "main.YourWorkflowDefinition" and YourCustomSA = "YourCustomSAValue" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime < "2021-06-08T16:46:34-08:00")"`
  - With Temporal Server v1.19 and earlier, you must [integrate Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster) to use custom Search Attributes with List Filters.
  - With Temporal Server v1.20 and later, custom Search Attribute capabilities are available on MySQL (v8.0.17 or later), PostgreSQL (v12 and later), and SQLite (v3.31.0 and later), in addition to Elasticsearch.

See [Search Attribute limits](#search-attribute-limits) for limits on the number and size of custom Search Attributes you can create.

:::note
You can only add and remove custom Search Attributes. Renaming a custom Search Attributes is not supported.
:::

The [temporalio/auto-setup](https://hub.docker.com/r/temporalio/auto-setup) Docker image uses a pre-defined set of custom Search Attributes that are handy for testing.
Their names indicate their types:

- CustomBoolField
- CustomDatetimeField
- CustomDoubleField
- CustomIntField
- CustomKeywordField
- CustomTextField

#### Types

Search Attributes must be one of the following types:

- Bool
- Datetime
- Double
- Int
- Keyword
- Keywordlist
- Text

Note:

- **Double** is backed up by `scaled_float` Elasticsearch type with scale factor 10000 (4 decimal digits).
- **Datetime** is backed up by `date` type with milliseconds precision in Elasticsearch 6 and `date_nanos` type with nanoseconds precision in Elasticsearch 7.
- **Int** is 64-bit integer (`long` Elasticsearch type).
- **Keyword** and **Text** types are concepts taken from Elasticsearch. Each word in a **Text** is considered a searchable keyword.
  For a UUID, that can be problematic because Elasticsearch indexes each portion of the UUID separately.
  To have the whole string considered as a searchable keyword, use the **Keyword** type.
  For example, if the key `ProductId` has the value of `2dd29ab7-2dd8-4668-83e0-89cae261cfb1`:
  - As a **Keyword** it would be matched only by `ProductId = "2dd29ab7-2dd8-4668-83e0-89cae261cfb1`.
  - As a **Text** it would be matched by `ProductId = 2dd8`, which could cause unwanted matches.
- The **Text** type cannot be used in the "Order By" clause.

- [How to view Search Attributes using tctl](/tctl-v1/cluster#get-search-attributes)

#### Search Attributes as Workflow Execution metadata

To actually have results from the use of a [List Filter](/concepts/what-is-a-list-filter), Search Attributes must be added to a Workflow Execution as metadata.
How to do this entirely depends on the method by which you spawn the Workflow Execution:

- [How to set Search Attributes as Workflow Execution metadata](/app-dev-context/set-custom-search-attributes)
