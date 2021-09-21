---
id: what-is-a-search-attribute
title: What is a Search Attribute
description: todo
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Search attribute is an indexed and queryable piece of Workflow Execution metadata.

A Search Attribute is represented as a key-value pair.

### Default Search Attributes

A Temporal Cluster that is integrated with Elasticsearch has a set of default Search Attributes already available.

| NAME                  | TYPE     |
| --------------------- | -------- |
| BatcherNamespace      | Keyword  |
| BatcherUser           | Keyword  |
| BinaryChecksums       | Keyword  |
| CloseTime             | Datetime |
| ExecutionDuration     | Int      |
| ExecutionStatus       | Keyword  |
| ExecutionTime         | Datetime |
| HistoryLength         | Int      |
| RunId                 | Keyword  |
| StartTime             | Datetime |
| StateTransitionCount  | Int      |
| TaskQueue             | Keyword  |
| TemporalChangeVersion | Keyword  |
| WorkflowId            | Keyword  |
| WorkflowType          | Keyword  |

<RelatedReadList
readlist={[
"How to view the available Search Attributes using tctl", "/docs/system-tools/tctl/#search-workflows", "operations-guide",
"How to get the available Search Attributes in Go", "#", "developer-guide",
]}
/>

All default Search Attributes are reserved and read-only (you can not create a custom one with the same name, or alter the existing one).

Consider the following for some of the default Search Attribute values:

<!--TODO link up Statuses-->
- ExecutionStatus values correspond to Workflow Execution Statuses: Running, Completed, Failed, Canceled, Terminated, ContinuedAsNew, TimedOut.
- StartTime, CloseTime and ExecutionTime are stored as dates, but are supported by queries using both EpochTime in nanoseconds and a string in [RFC3339Nano format](https://pkg.go.dev/time#pkg-constants) (ex. "2006-01-02T15:04:05.999999999Z07:00").
- ExecutionDuration is stored in nanoseconds, but supported by queries using integers in nanoseconds, [Golang duration format](https://pkg.go.dev/time#ParseDuration), and "hh:mm:ss" format.
- CloseTime, HistoryLength, StateTransitionCount, ExecutionDuration are only present in with a Closed Workflow Execution.
- ExecutionTime can be different from StartTime for retry/cron use-cases.

### Custom Search Attributes

Keys must be registered with tctl command so that the Temporal Server knows the attribute key name and value type.
To add new search attributes, you should use the [CLI](/docs/system-tools/tctl/#add-new-search-attributes).


There is no hard limit on the number of attributes you can add.
However we recommend enforcing the following limits:

- Number of keys: 100 per Workflow
- Size of value: 2kb per value
- Total size of key and values: 40kb per Workflow

Search attributes must be one of the following types:

- String
- Keyword
- Int
- Double
- Bool
- Datetime

Note:

- **Double** is backed up by `scaled_float` Elasticsearch type with scale factor 10000 (4 decimal digits).
- **Datetime** is backed up by `date` type with milliseconds precision in Elasticsearch 6 and `date_nanos` type with nanoseconds precision in Elasticsearch 7.
- **Int** is 64-bits integer (`long` Elasticsearch type).
- **Keyword** and **String** types are concepts taken from Elasticsearch. Each word in a **String** is considered a searchable keyword.
  For a UUID, that can be problematic as Elasticsearch will index each portion of the UUID separately.
  To have the whole string considered as a searchable keyword, use the **Keyword** type.
  For example, if the key `ProductId` has the value of "2dd29ab7-2dd8-4668-83e0-89cae261cfb1"
  - As a **Keyword** it would only be matched by `ProductId` = "2dd29ab7-2dd8-4668-83e0-89cae261cfb1".
  - As a **String** it would be matched by `ProductId` = "2dd8", which could cause unwanted matches.

Also note that the **String** type cannot be used in the "Order By" clause.

Docker [auto-setup](https://hub.docker.com/r/temporalio/auto-setup) image has some pre-allowlisted search attributes that are handy for testing, that have their types indicated in their name:

- CustomKeywordField
- CustomIntField
- CustomDoubleField
- CustomBoolField
- CustomDatetimeField
- CustomStringField

When performing a [ContinueAsNew](/docs/go/workflows#large-event-histories) or using [Cron](/docs/go/distributed-cron/), search attributes will be carried over to the new run by default.
