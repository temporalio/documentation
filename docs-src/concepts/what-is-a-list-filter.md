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

- [How to use a List Filter using tctl](/tctl-v1/workflow#list)

The following is an example List Filter:

```
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00") order by StartTime desc
```

[More example List Filters](#example-list-filters)

A List Filter contains [Search Attribute](/concepts/what-is-a-search-attribute) names, Search Attribute values, and Operators.

- The following operators are supported in List Filters:

  - **=, !=, >, >=, <, <=**
  - **AND, OR, ()**
  - **BETWEEN ... AND**
  - **IN**
  - **ORDER BY**

  The last operator (**ORDER BY**) is supported only with Elasticsearch as the Visibility store.
  Custom Search Attributes of `Text` type cannot be used in **ORDER BY** clauses.

- To use a partial string match (i.e. specific word), create a [custom Search Attribute](/app-dev-context/observability#custom-search-attributes) of type `Text` and set it value to a phrase that contains that word.

- The `=` operator works like **CONTAINS** to find Workflows with Search Attributes that contain a specific word.

- If a `Description` Search Attribute of `Text` type is set to a phrase, List Filters containing words within that phrase will return the Workflow.
  For example, `Description="quick"` or `Description="fox"` would both return a Workflow with the Description Search Attribute set to "The quick brown fox jumps over the lazy dog."
  However, `Description="qui"` or `Description="laz"` would not return the Workflow, since [Elasticsearch's tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html) is configured to return complete words as tokens.

- A List Filter applies to a single Namespace.

- The range of a List Filter timestamp (StartTime, CloseTime, ExecutionTime) cannot exceed 9223372036854775807 (that is, maxInt64 - 1001).

- A List Filter that uses a time range has a resolution of 1 ms on Elasticsearch 6 and 1 ns on Elasticsearch 7.

- List Filter Search Attribute names are case sensitive.

- An Advanced List Filter API may take longer than expected if it is retrieving a large number of Workflow Executions (more than 10 million).

- A `ListWorkflow` API supports pagination.
  Use the page token in the following call to retrieve the next page; continue until the page token is `null`/`nil`.

- To efficiently count the number of Workflow Executions, use the `CountWorkflow` API.

#### Example List Filters

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
