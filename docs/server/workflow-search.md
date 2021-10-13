---
id: workflow-search
title: Search for Temporal Server Workflows
sidebar_label: Search Workflows
---

## Overview

Many use-cases may have hundreds, thousands, or tens of thousands of Workflows.
This means, finding the one you want can be a non-trivial exercise.
To address this, Temporal Server has built-in functionality that enables you to search for Workflows via the CLI(tctl), Web UI, and SDK APIs.

To make this search functionality even better, the Temporal Server supports an integration with [Elasticsearch](https://www.elastic.co/elasticsearch/).
By integrating with Elasticsearch, custom key-value search attributes can be added to Workflow metadata which can be referenced in SQL-like search queries.

Example:

```sql
WorkflowType = "main.Workflow" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00") order by StartTime desc
```

Without Elasticsearch, search functionality is limited to listing Workflows by Id and execution status (open/closed), and search queries are run directly against the Temporal Server visibility database.
Elasticsearch takes on the search query request load, relieving potential performance issues that can occur.
This is why we highly recommend running Temporal with Elasticsearch for any use-case that spawns more than just a few Workflows.
Follow the [Elasticsearch setup instructions](/docs/server/elasticsearch-setup) to do that.
The rest of this page assumes your instance of Temporal is integrated with Elasticsearch.

## Search attributes

Search attributes are indexed and queryable pieces of Workflow metadata.
They are represented as key-value pairs.
Many attributes are provided by default, but you can also add your own.
Keys must be registered with tctl command so that the Temporal Server knows the attribute key name and value type.
To add new search attributes, you should use the [CLI](/#custom-search-attributes).

### System attributes

Here are the system attributes that are provided by default:

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

These can be found by using the [CLI](/#list-search-attributes) or the `GetSearchAttributes` API via one of the [SDKs](/application-development).

There are some special considerations for the System attributes:

- All System search attributes are reserved by Temporal and are read-only.
- ExecutionStatus can be one of these: Running, Completed, Failed, Canceled, Terminated, ContinuedAsNew, TimedOut.
- StartTime, CloseTime and ExecutionTime are stored as dates, but are supported by queries using both EpochTime in nanoseconds and a string in [RFC3339Nano format](https://pkg.go.dev/time#pkg-constants) (ex. "2006-01-02T15:04:05.999999999Z07:00").
- ExecutionDuration is stored in nanoseconds, but supported by queries using integers in nanoseconds, [Golang duration format](https://pkg.go.dev/time#ParseDuration), and "hh:mm:ss" format.
- CloseTime, HistoryLength, StateTransitionCount, ExecutionDuration are only present in a closed Workflow.
- ExecutionTime can be different from StartTime for retry/cron use-cases.

### Custom search attributes

There is no hard limit on the number of attributes you can add.
However, we recommend enforcing the following limits:

- Number of keys: 100 per Workflow
- Size of value: 2kb per value
- Total size of key and values: 40kb per Workflow

Here is how you add a new search attribute:

```bash
tctl admin cluster add-search-attributes --name ProductId --type Keyword
```

The possible values for `--type` are:

- String
- Keyword
- Int
- Double
- Bool
- Datetime

:::note

Due to Elasticsearch limitations you can only add new custom search attributes but not rename or remove existing ones from the index schema.

:::

Note:

- **Double** is backed up by `scaled_float` Elasticsearch type with scale factor 10000 (4 decimal digits).
- **Datetime** is backed up by `date` type with milliseconds precision in Elasticsearch 6 and `date_nanos` type with nanoseconds precision in Elasticsearch 7.
- **Int** is 64-bits integer (`long` Elasticsearch type).
- **Keyword** and **String** types are concepts taken from Elasticsearch. Each word in a **String** is considered a searchable keyword.
  For a UUID, that can be problematic as Elasticsearch will index each portion of the UUID separately.
  To have the whole string considered as a searchable keyword, use the **Keyword** type.
  For example, if the key `ProductId` has the value of `2dd29ab7-2dd8-4668-83e0-89cae261cfb1`
  - As a **Keyword** it would only be matched by `ProductId = "2dd29ab7-2dd8-4668-83e0-89cae261cfb1"`.
  - As a **String** it would be matched by `ProductId = "2dd8"`, which could cause unwanted matches.

Also note that the **String** type cannot be used in the "Order By" clause.

Docker [auto-setup](https://hub.docker.com/r/temporalio/auto-setup) image has some pre-allowlisted search attributes that are handy for testing, that have their types indicated in their name:

- CustomKeywordField
- CustomIntField
- CustomDoubleField
- CustomBoolField
- CustomDatetimeField
- CustomStringField

When performing a [ContinueAsNew](/docs/go/workflows#large-event-histories) or using [Cron](/docs/go/distributed-cron/), search attributes will be carried over to the new run by default.

### List search attributes

You can query the list of search attributes with the following command:

```bash
tctl cluster get-search-attributes
```

Here is some example output:

```bash
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

There is also admin version of this command:

```bash
tctl admin cluster get-search-attributes
```

which will show you custom and system search attributes separately and also show underlying Elasticsearch index schema and corresponding system Workflow status.

### Remove search attributes

Although it is not possible to remove custom search attributes from index schema without reindexing, you can remove an existing custom search attribute from metadata:

```bash
tctl admin cluster remove-search-attributes --name ProductId
```

After this command Workflows won't be able to use them custom search attribute `ProductId`
but it will stay in the Elasticsearch index schema and existing data won't be deleted.
You need to modify the Elasticsearch index manually; in most cases, this requires reindexing.


## Start Workflow with Search Attributes

### using tctl

TODO: (move from tctl page)

### using SDK

TODO: (reference samples-go: https://github.com/temporalio/samples-go/blob/master/searchattributes/starter/main.go#L26-L28
samples-java: https://github.com/temporalio/samples-java/blob/a24f1ccf3e79fc8c86c73318b555cf3133202152/src/main/java/io/temporal/samples/listworkflows/Starter.java#L120-L125)

## Search queries

TODO: I would move everything from tctl page here.

You can perform search queries for Workflows using an SQL-like "WHERE" clause via the [CLI](/docs/system-tools/tctl/#search-workflows), list APIs via one of the SDKs([Go](/docs/go/search-apis)), or via the Temporal Web UI.

In the Temporal Web UI, use the "Basic/Advanced" button to switch to "Advanced" mode and type the query into the search box.

![](/img/docs/web-ui-advanced-search-button.png)

The following criteria applies to search queries:

- These operators are supported in search queries:
  - **AND, OR, ()**
  - **=, !=, >, >=, <, <=**
  - **IN**
  - **BETWEEN ... AND**
  - **ORDER BY**
- You will only be able to search for Workflows from one Namespace at a time.
- The range on a Temporal timestamp search query (StartTime, CloseTime, ExecutionTime) cannot be larger than 9223372036854775807 (maxInt64 - 1001)
- Search queries using a time range will have a 1ms resolution on Elasticsearch 6 and 1ns resolution on Elasticsearch 7.
- Search query column names are case sensitive.
- A `ListWorkflow` search query may take longer when retrieving a large number of Workflows (10M+).
- A `ListWorkflow` API supports pagination. Pass page token to the next call to retrieve next page. Continue to paginate until token is `null`/`nil`.
- To paginate through a large number of Workflows without skipping or duplicating them, use the `ScanWorkflow` API.
- To efficiently count the number of Workflows, use the `CountWorkflow` API

## Scan workflow

TODO: add section about specifics of ScanWorkflow API?

## Local testing

1. Increase the Docker memory to anything higher than 6GB (Navigate to Docker -> Preferences -> Advanced -> Memory).
2. Use the [Quick start guide](/docs/server/quick-install) to clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repo.
3. Start the Temporal Server using the default `docker-compose.yml` file, which contains PostgreSQL and Elasticsearch.

```bash
docker-compose up
```

4. From the Docker output log, make sure Elasticsearch and Temporal started correctly.

5. Add custom search attributes.

```bash
tctl admin cluster add-search-attributes --name ProductId --type Keyword
```

Note that starting a Workflow with search attributes, but without Elasticsearch, will succeed as normal.
However, the Workflow will not be searchable by those attributes.

6. Now you can start and search Workflows using methods listed above.