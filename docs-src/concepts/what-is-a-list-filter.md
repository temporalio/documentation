---
id: what-is-a-list-filter
title: What is a List Filter?
sidebar_label: List Filter
description: A List Filter is the SQL-like string that is provided as the parameter to an Advanced Visibility List API.
tags:
  - term
  - explanation
  - filtered-lists
  - visibility
---

A List Filter is the SQL-like string that is provided as the parameter to an [Advanced Visibility](/concepts/what-is-advanced-visibility) List API.
List Filter [Search Attribute](/concepts/what-is-a-search-attribute) names are case sensitive. List Filter applies to a single [Namespace](/concepts/what-is-a-namespace).

A List Filter that uses a time range has a resolution of 1 ns on Elasticsearch 7.
The range of a List Filter timestamp (StartTime, CloseTime, ExecutionTime) cannot exceed 9223372036854775807 (that is, maxInt64 - 1001).

### Supported operators

A List Filter contains [Search Attribute](/concepts/what-is-a-search-attribute) names, Search Attribute values, and the following supported operators:

- **=, !=, >, >=, <, <=**
- **AND, OR, ()**
- **BETWEEN ... AND**
- **IN**
- **ORDER BY**

The `=` operator works like **CONTAINS** to find Workflows with Search Attributes that contain a specific word.
The **ORDER BY** operator is supported only with [Advanced Visibility](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster).

### Partial string match

If a `Description` Search Attribute of `Text` type is set to a phrase, List Filters containing words within that phrase will return the Workflow.
Custom Search Attributes of `Text` type cannot be used in **ORDER BY** clauses.

- `Description="quick"` or `Description="fox"` would both return a Workflow with the Description Search Attribute set to "The quick brown fox jumps over the lazy dog."
- `Description="qui"` or `Description="laz"` would not return the Workflow.
  [Elasticsearch's tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html) is configured to return complete words as tokens.
- To use a partial string match (i.e. specific word), create a [custom Search Attribute](/app-dev-context/observability#custom-search-attributes) of type `Text` and set it value to a phrase that contains that word.

### Efficient API usage

An Advanced List Filter API may take longer to respond if it is retrieving a large number of Workflow Executions (over 10 million, for instance).

Use the `CountWorkflow` API to efficiently count the number of [Workflow Executions](/concepts/what-is-a-workflow-execution).
Paginate the results with the `ListWorkflow` API by using the page token to retrieve the next page; continue until the page token is `null`/`nil`.

#### List Filter examples

The following is a List Filter set with [`tctl`](/tctl-v1/workflow/list):

```
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00") order by StartTime desc
```

When used, a list of Workflows that meet the following conditions are returned, ordered by `StartTime` in descending order:

- The Workflow Type is set to `main.YourWorkflowDefinition`.
- The Workflow isn't running.
- The Workflow either started after "2021-06-07T16:46:34.236-08:00" or closed after "2021-06-07T16:46:34-08:00".

More List Filter examples have been provided below.

```sql
WorkflowId = '<workflow-id>'
```

```sql
WorkflowId = '<workflow-id>' or WorkflowId = '<another-workflow-id>'
```

```sql
WorkflowId IN ('<workflow-id>', '<another-workflow-id>')
```

```sql
WorkflowId = '<workflow-id>' order by StartTime desc
```

```sql
WorkflowId = '<workflow-id>' and ExecutionStatus = 'Running'
```

```sql
WorkflowId = '<workflow-id>' or ExecutionStatus = 'Running'
```

```sql
WorkflowId = '<workflow-id>' and StartTime > '2021-08-22T15:04:05+00:00'
```

```sql
ExecutionTime between '2021-08-22T15:04:05+00:00' and '2021-08-28T15:04:05+00:00'
```

```sql
ExecutionTime < '2021-08-28T15:04:05+00:00' or ExecutionTime > '2021-08-22T15:04:05+00:00'
```

```sql
order by ExecutionTime
```

```sql
order by StartTime desc, CloseTime asc
```

```sql
order by CustomIntField asc
```
