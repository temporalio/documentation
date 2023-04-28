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

A List Filter is the SQL-like string that is provided as the parameter to a [Visibility](/concepts/what-is-visibility) List API.

A List Filter contains [Search Attribute](/concepts/what-is-a-search-attribute) names, Search Attribute values, and [operators](#supported-operators) to pull a filtered list of Workflow Executions from the Visibility store.

List Filter [Search Attribute](/concepts/what-is-a-search-attribute) names are case sensitive, and each List Filter is scoped by a single [Namespace](/concepts/what-is-a-namespace).

A List Filter that uses a time range has a resolution of 1 ns on [Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster) and 1 µs for [SQL databases](/clusters/how-to-set-up-visibility-in-a-temporal-cluster).

### Supported operators

A List Filter contains [Search Attribute](/concepts/what-is-a-search-attribute) names, Search Attribute values, and the following supported operators:

- **=, !=, >, >=, <, <=**
- **AND, OR, ()**
- **BETWEEN ... AND**
- **IN**
- **ORDER BY**

The **ORDER BY** operator is supported only when Elasticsearch is used as the Visibility store.
This means that the **ORDER BY** clause is currently not supported in Temporal Cloud.
Additionally, custom Search Attributes of the `Text` type cannot be used in **ORDER BY** clauses.

### Partial string match

The `=` operator works like **CONTAINS** to find Workflows with Search Attributes that contain a specific word.

<!-- note: advanced vis features will be supported in SQL upon the release of v1.20.-->

For example, if you have a custom Search Attribute named `Description` of `Text` type with the value of "The quick brown fox jumps over the lazy dog", searching for `Description='quick'` or `Description='fox'` will successfully return the Workflow.
However, partial word searches such as `Description='qui'` or `Description='laz'` will not return the Workflow.
This is because [Elasticsearch's tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html) is configured to return complete words as tokens.

### Efficient API usage

An Advanced List Filter API may take longer to respond if it is retrieving a large number of Workflow Executions (over 10,000).

With Temporal Server v1.20 and later, you can use the `CountWorkflow` API to efficiently count the number of [Workflow Executions](/concepts/what-is-a-workflow-execution).

Paginate the results with the `ListWorkflow` API by using the page token to retrieve the next page; continue until the page token is `null`/`nil`.

#### List Filter examples

The following is a List Filter set with [`tctl`](/tctl-v1/workflow/list):

```
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00")
```

When used, a list of Workflows that meet the following conditions are returned:

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
