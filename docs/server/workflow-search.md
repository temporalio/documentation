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

Without Elasticsearch, search functionality is limited to listing Workflows by Id and execution status (open/closed), and search queries are run directly against the Temporal Server database.
Elasticsearch takes on the search query request load, relieving potential performance issues that can occur.
This is why we highly recommend running Temporal with Elasticsearch for any use-case that spawns more than just a few Workflows.
Follow the [Elasticsearch setup instructions](/docs/server/elasticsearch-setup) to do that.
The rest of this page assumes your instance of Temporal is integrated with Elasticsearch.

## Search attributes

Search attributes are indexed and queryable pieces of Workflow metadata.
They are represented as key-value pairs.
Many attributes are provided by default, but you can also add your own.
Keys must be registered with tctl command so that the Temporal Server knows the attribute key name and value type.
To add new search attributes, you should use the [CLI](/docs/system-tools/tctl/#add-new-search-attributes).

## Search queries

You can perform search queries for Workflows using an SQL-like "Where" clause via the [CLI](/docs/system-tools/tctl/#search-workflows), list APIs via one of the SDKs([Go](/docs/go/search-apis)), or via the Temporal Web UI.

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
- To retrieve a large number of Workflows without ordering, use the `ScanWorkflow` API.
- To efficiently count the number of Workflows, use the `CountWorkflow` API

## Local testing

1. Increase the Docker memory to anything higher than 6GB (Navigate to Docker -> Preferences -> Advanced -> Memory).
2. Use the [Quick start guide](/docs/server/quick-install) to clone the [temporalio/docker-compose](https://github.com/temporalio/docker-compose) repo.
3. Start the Temporal Server using the `docker-compose-es.yml` file, which contains Cassandra and Elasticsearch.

```bash
docker-compose -f docker-compose-es.yml up
```

4. From the Docker output log, make sure Elasticsearch and Temporal started correctly.

5. Allow list search attributes.

```bash
tctl admin cluster add-search-attributes --name ProductId --type Keyword
```

Note that starting a Workflow with search attributes, but without Elasticsearch, will succeed as normal.
However the Workflow will not be searchable by those attributes.
