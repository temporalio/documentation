---
id: server-workflow-search
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
WorkflowType = "main.Workflow" and ExecutionStatus != 0 and (StartTime > "2019-06-07T16:46:34-08:00" or CloseTime > "2019-06-07T16:46:34-08:00") order by StartTime desc
```

Without Elasticsearch, search functionality is limited to listing Workflows by Id and type (open/closed), and search queries are run directly against the Temporal Server database.
Elasticsearch takes on the search query request load, relieving potential performance issues that can occur.
This is why we highly recommend running Temporal with Elasticsearch for any use-case that spawns more than just a few Workflows.
Follow the [Elasticsearch setup instructions](/docs/server-elasticsearch-setup) to do that.
The rest of this page assumes your instance of Temporal is integrated with Elasticsearch.

## Search attributes

Search attributes are indexed and queryable pieces of Workflow metadata.
They are represented as key-value pairs.
There are many attributes provided by default, but you can also add your own.
Keys must be registered within the dynamic config file so that the Temporal Server knows the attribute key name and value type.
If there are multiple instances of the Server running across multiple hosts, then keys must be registered across all of the dynamic config files.
To add new search attributes, you can use the [CLI](/docs/tctl/#add-new-search-attributes) or edit the dynamic config file manually.

### Default attributes

Here are the attributes that are provided by default:

| KEY                 | VALUE TYPE |
| ------------------- | ---------- |
| ExecutionStatus     | INT        |
| CloseTime           | INT        |
| CustomBoolField     | DOUBLE     |
| CustomDatetimeField | DATETIME   |
| CustomNamespace     | KEYWORD    |
| CustomDoubleField   | BOOL       |
| CustomIntField      | INT        |
| CustomKeywordField  | KEYWORD    |
| CustomStringField   | STRING     |
| NamespaceId         | KEYWORD    |
| ExecutionTime       | INT        |
| HistoryLength       | INT        |
| RunId               | KEYWORD    |
| StartTime           | INT        |
| TaskQueue           | STRING     |
| WorkflowId          | KEYWORD    |
| WorkflowType        | KEYWORD    |

These can be found by using the [CLI](/docs/tctl/#search-attributes) or the `GetSearchAttributes` API via one of the [SDKs](/docs/sdks-introduction).

There are some special considerations for the Default attributes:

- ExecutionStatus, CloseTime, NamespaceId, ExecutionTime, HistoryLength, RunId, StartTime, WorkflowId, WorkflowType are reserved by Temporal and are read-only.
- ExecutionStatus is a mapping of an integer to a state:

| Integer | State |
|---------|-------|
| 0 | Unspecified |
|	1 | Running |
|	2 | Completed |
|	3 | Failed |
|	4 | Canceled |
|	5 | Terminated |
|	6 | ContinuedAsNew |
|	7 | TimedOut |

- StartTime, CloseTime and ExecutionTime are stored as integers, but are supported by queries using both EpochTime in nanoseconds and a string in RFC3339 format (ex. "2006-01-02T15:04:05+07:00").
- CloseTime, HistoryLength are only present in a closed Workflow.
- ExecutionTime is meant for queries against Workflows that will run in the future (retry/cron use-cases).

### Custom attributes

There is no hard limit on the number of attributes you can add.
However we recommend enforcing the following limits:

- Number of keys: 100 per Workflow
- Size of value: 2kb per value
- Total size of key and values: 40kb per Workflow

Search attributes must be one of the following types:

- string
- keyword
- int
- double
- bool
- datetime

Note that **keyword** and **string** types are concepts taken from Elasticsearch.
Each word in a **string** is considered a searchable keyword.
For a UUID, that can be problematic as Elasticsearch will index each portion of the UUID separately.
To have the whole string considered as a searchable keyword, use the **keyword** type.

For example, if the key `SomeUniqueId` has the value of "2dd29ab7-2dd8-4668-83e0-89cae261cfb1"

- As a **keyword** it would only be matched by `SomeUniqueId` = "2dd29ab7-2dd8-4668-83e0-89cae261cfb1".
- As a **string** it would be matched by `SomeUniqueId` = "2dd8", which could cause unwanted matches.

Also note that the **string** type cannot be used in the "Order By" clause.

There are some pre-allowlisted search attributes that are handy for testing, that have their types indicated in their name:

- CustomKeywordField
- CustomIntField
- CustomDoubleField
- CustomBoolField
- CustomDatetimeField
- CustomStringField

When performing a [ContinueAsNew](/docs/go-continue-as-new/) or using [Cron](/docs/go-distributed-cron/), search attributes will be carried over to the new run by default.

## Search queries

You can perform search queries for Workflows using an SQL-like "Where" clause via the [CLI](/docs/tctl/#search-workflows), list APIs via one of the SDKs([Go](/docs/go-search-apis)), or via the Temporal Web UI.

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
- The default pagesize is 1000, and cannot be larger than 10,000.
- The range on a Temporal timestamp search query (StartTime, CloseTime, ExecutionTime) cannot be larger than 9223372036854775807 (maxInt64 - 1001)
- Search queries using a time range will have a 1ms resolution.
- Search query column names are case sensitive.
- A `ListWorkflow` search query may take longer when retrieving a large number of Workflows (10M+).
- To retrieve a large number of Workflows without ordering, use the `ScanWorkflow` API.
- To efficiently count the number of Workflows, use the `CountWorkflow` API
- To list only open Workflows, add `CloseTime = missing` to the end of the query.
- If you use the retry/cron feature to search for Workflows that will start execution within a certain time range, you can add predicates on ExecutionTime.
For example: `ExecutionTime > 2019-01-01T10:00:00-07:00`.
Note that, if a predicate on `ExecutionTime` is included, only the cron/retry Workflow will be returned.

## Local testing

1. Increase the Docker memory to anything higher than 6GB (Navigate to Docker -> Preferences -> Advanced -> Memory).
2. Use the [Quick start guide](/docs/server-quick-install) to clone the temporalio/docker-compose repo.
3. Start the Temporal Server using the `docker-compose-es.yml` file, which contains Cassandra, Kafka, Zookeeper, and Elasticsearch.

```bash
docker-compose -f docker-compose-es.yml up
```

4. From the Docker output log, make sure Elasticsearch and Temporal started correctly.

5. Allow list search attributes.

```bash
tctl admin cluster add_search_attr --search_attr_key NewKey --search_attr_type string
```

Note that starting a Workflow with search attributes, but without Elasticsearch, will succeed as normal.
However the Workflow will not be searchable by those attributes.
