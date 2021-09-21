---
id: what-is-advanced-listing-within-the-temporal-platform
title: What is Advanced Listing within the Temporal Platform?
description: todo
tags:
  - explanation
---

Advanced Listing, within the Temporal Platform, is the feature that lists Workflow Executions, filtering and sorting them via SQL-like syntax.
An Advanced Listing accepts additional [List Attributes](/docs/content/what-is-a-list-attribute).

Example:

```sql
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00") order by StartTime desc
```

To use the Advanced Visibility feature, the Temporal Cluster must be [integrated with Elasticsearch](how-to-integrate-elasticsearch-into-a-temporal-cluster).

We highly recommend operating a Temporal Cluster with Elasticsearch for any use-case that spawns more than just a few Workflow Executions.
Elasticsearch takes on the Visibility request load, relieving potential performance issues that can occur.

Advanced Visibility queries can be performed using [tctl](/docs/system-tools/tctl/#search-workflows), one of the SDKs, or via the Temporal Web UI.
In the Temporal Web UI, use the "Basic/Advanced" button to switch to "Advanced" mode and type the query into the search box.

![](/img/docs/web-ui-advanced-search-button.png)

The following criteria applies to Advanced Visibility queries:

- These operators are supported in search queries:
  - **AND, OR, ()**
  - **=, !=, >, >=, <, <=**
  - **IN**
  - **BETWEEN ... AND**
  - **ORDER BY**
- You can only perform an Advanced Visibility Query for one Namespace at a time.
- The range on a Temporal timestamp Advanced Visibility Query (StartTime, CloseTime, ExecutionTime) cannot be larger than 9223372036854775807 (maxInt64 - 1001)
- Advanced Visibility Queries using a time range will have a 1ms resolution on Elasticsearch 6 and 1ns resolution on Elasticsearch 7.
- Search query column names are case sensitive.
- A `ListWorkflow` search query may take longer when retrieving a large number of Workflows (10M+).
- To retrieve a large number of Workflows without ordering, use the `ScanWorkflow` API.
- To efficiently count the number of Workflows, use the `CountWorkflow` API
