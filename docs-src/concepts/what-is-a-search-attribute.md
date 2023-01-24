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

A Search Attribute is an indexed field used in a [List Filter](/concepts/what-is-a-list-filter) to filter a list of [Workflow Executions](/workflows#workflow-execution) that have the Search Attribute in their metadata.

If a [Temporal Cluster](/concepts/what-is-a-temporal-cluster) does not have [Elasticsearch integrated](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster), but a Workflow Execution is spawned and tagged with Search Attributes, no errors occur.
However, you won't be able to use [Advanced Visibility](/concepts/what-is-advanced-visibility) List APIs and List Filters to find and list the Workflow Execution.

When using [Continue-As-New](/concepts/what-is-continue-as-new) or a [Temporal Cron Job](/concepts/what-is-a-temporal-cron-job), Search Attributes are carried over to the new Workflow Run by default.

#### Search Attributes maximums

Default total maximum number of Search Attribute **keys** per Temporal Cluster is 100.

<!-- TODO - [How to configure maximum number of Search Attribute keys per Cluster](#) -->

Default single Search Attribute **value** size limit is 2 KB.

<!-- TODO - [How to configure Search Attribute value size limit](#) -->

Total Search Attribute size: 40 KB

<!-- TODO - [How to configure total Search Attribute size limite](#) -->

<!-- temp keeping for reference
This is configurable with [`SearchAttributesNumberOfKeysLimit`, `SearchAttributesTotalSizeLimit` and `SearchAttributesSizeOfValueLimit`](https://github.com/temporalio/temporal/blob/v1.7.0/service/history/configs/config.go#L440-L442), if you know what you are doing.
-->

#### Default Search Attributes

A Temporal Cluster that is integrated with Elasticsearch has a set of default Search Attributes already available.
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

- ExecutionStatus values correspond to Workflow Execution Statuses: Running, Completed, Failed, Canceled, Terminated, ContinuedAsNew, TimedOut.

- StartTime, CloseTime, and ExecutionTime are stored as dates but are supported by queries that use either EpochTime in nanoseconds or a string in [RFC3339Nano format](https://pkg.go.dev/time#pkg-constants) (such as "2006-01-02T15:04:05.999999999Z07:00").

- ExecutionDuration is stored in nanoseconds but is supported by queries that use integers in nanoseconds, [Golang duration format](https://pkg.go.dev/time#ParseDuration), or "hh:mm:ss" format.

- CloseTime, HistoryLength, StateTransitionCount, and ExecutionDuration are present only in a Closed Workflow Execution.

- ExecutionTime can differ from StartTime in retry and cron use cases.

#### Custom Search Attributes

Custom Search Attributes can be added to a Temporal Cluster by using `tctl search-attribute create`.
Adding a Search Attribute makes it available to use with Workflow Executions within that Cluster.

There is no hard limit on the number of attributes you can add.
However, we recommend enforcing the following limits:

- Number of Search Attributes: 100 per Workflow
- Size of each value: 2 KB per value
- Total size of names and values: 40 KB per Workflow

:::note

Due to Elasticsearch limitations, you can only add Search Attributes.
It is not possible to rename Search Attributes or remove them from the index schema.

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
