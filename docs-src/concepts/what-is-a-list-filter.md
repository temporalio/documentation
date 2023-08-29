---
id: what-is-a-list-filter
title: What is a List Filter?
sidebar_label: List Filter
description: A List Filter is the SQL-like string that is provided as the parameter to an advanced Visibility List API.
tags:
  - term
  - explanation
  - filtered-lists
  - visibility
---

The [Visibility](/concepts/what-is-visibility) List API requires you to provide a List Filter as an SQL-like string parameter.

A List Filter includes [Search Attribute](/concepts/what-is-a-search-attribute) names, Search Attribute values, and [operators](#supported-operators) so that it can retrieve a filtered list of Workflow Executions from the Visibility Store.

List Filter [Search Attribute](/concepts/what-is-a-search-attribute) names are case sensitive.
A single [Namespace](/concepts/what-is-a-namespace) scopes each List Filter.

A List Filter using a time range provides a resolution of 1 ns on [Elasticsearch](/clusters/how-to-integrate-elasticsearch-into-a-temporal-cluster) and 1 µs for [SQL databases](/clusters/how-to-set-up-visibility-in-a-temporal-cluster).

### Supported operators

List Filters support the following operators:

- **=, !=, >, >=, <, <=**
- **AND, OR, ()**
- **BETWEEN ... AND**
- **IN**

<!-- - **ORDER BY** -->

<!-- The **ORDER BY** operator is supported only when Elasticsearch is used as the Visibility store.

The **ORDER BY** operator is currently not supported in Temporal Cloud.

Custom Search Attributes of the `Text` type cannot be used in **ORDER BY** clauses. -->

### Partial string match

The `=` operator functions similarly to **CONTAINS**, helping to find Workflows with Search Attributes containing a specific word.
Partial string matching only applies to locating Text Search Attributes.

<!-- note: advanced vis features will be supported in SQL upon the release of v1.20.-->

For instance, if you have a custom Search Attribute named `Description` of `Text` type with the value "The quick brown fox jumps over the lazy dog", a search for `Description='quick'` or `Description='fox'` will successfully return the Workflow.
However, searches for partial words like `Description='qui'` or `Description='laz'` won't return the Workflow.
This limitation arises because [Elasticsearch's tokenizer](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html) is configured to return complete words as tokens.

### Efficient API usage

If the Advanced List Filter API retrieves a substantial number of Workflow Executions (over 10,000), the response time might be longer.

Starting from Temporal Server v1.20 and later, you can employ the `CountWorkflow` API to efficiently count the number of [Workflow Executions](/concepts/what-is-a-workflow-execution).

To paginate the results using the `ListWorkflow` API, use the page token to retrieve the next page.
Continue until the page token becomes `null`/`nil`.

#### List Filter examples

Here are examples of List Filters set with [`tctl`](/tctl-v1/workflow/list):

```
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00")
```

When used, you will receive a list of Workflows fulfilling the following criteria:

- Workflow Type is `main.YourWorkflowDefinition`.
- Workflow isn't in a running state.
- Workflow either started after "2021-06-07T16:46:34.236-08:00" or closed after "2021-06-07T16:46:34-08:00".

Additional examples of List Filters are provided below.

```sql
WorkflowId = '<workflow-id>'
```

```sql
WorkflowId = '<workflow-id>' or WorkflowId = '<another-workflow-id>'
```

```sql
WorkflowId IN ('<workflow-id>', '<another-workflow-id>')
```

<!-- ```sql
WorkflowId = '<workflow-id>' order by StartTime desc
``` -->

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

<!-- ```sql
order by ExecutionTime
```

```sql
order by StartTime desc, CloseTime asc
```

```sql
order by CustomIntField asc
``` -->
