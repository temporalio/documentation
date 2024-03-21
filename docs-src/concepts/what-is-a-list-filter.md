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

A List Filter using a time range provides a resolution of 1 ns on [Elasticsearch](/self-hosted/how-to-integrate-elasticsearch-into-a-temporal-cluster) and 1 µs for [SQL databases](/self-hosted/how-to-set-up-visibility-in-a-temporal-cluster).

### Supported operators

List Filters support the following operators:

- **`=, !=, >, >=, <, <=`**
- **`AND, OR, ()`**
- **`BETWEEN ... AND`**
- **`IN`**
- **STARTS_WITH**

<!-- - **ORDER BY** -->

<!-- The **ORDER BY** operator is supported only when Elasticsearch is used as the Visibility store.

The **ORDER BY** operator is currently not supported in Temporal Cloud.

Custom Search Attributes of the `Text` type cannot be used in **ORDER BY** clauses. -->

### Partial string match

There are different options for partial string matching when the type of the Search Attribute is [Text](#text) versus [Keyword](#keyword).

#### Text

Search Attributes of type `Text` are [broken up into words](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-standard-tokenizer.html) that match with the `=` operator.

For example, if you have a custom `Text` Search Attribute named `Description` with either of the following values—

```
my-business-id-foobar
my business id foobar
```

—then the following List Filter matches—

```
Description = 'foobar'
```

—but a partial word does not:

```
// Doesn't match
Description = 'foo'
```

#### Keyword

For Search Attributes of type `Keyword` like `WorkflowId`, the only kind of partial string matching that works is using BETWEEN for suffixes.

`WorkflowId BETWEEN "order-" AND "order-~"` matches WorkflowIds that have characters after `order-` with ASCII values lower than `~` (126, the highest-value printable character), such as the following:

```
order-
order-1234
order-abracadabra
```

It does not match `order-~~`.

### Efficient API usage

If the Advanced List Filter API retrieves a substantial number of Workflow Executions (more than 10,000), the response time might be longer.

Beginning with Temporal Server v1.20, you can employ the `CountWorkflow` API to efficiently count the number of [Workflow Executions](/concepts/what-is-a-workflow-execution).

To paginate the results using the `ListWorkflow` API, use the page token to retrieve the next page.
Continue until the page token becomes `null`/`nil`.

#### List Filter examples

Here are examples of List Filters set with [`tctl`](/tctl-v1/workflow/list):

```
WorkflowType = "main.YourWorkflowDefinition" and ExecutionStatus != "Running" and (StartTime > "2021-06-07T16:46:34.236-08:00" or CloseTime > "2021-06-07T16:46:34-08:00")
```

When you use the preceding example, you receive a list of Workflows fulfilling the following criteria:

- Workflow Type is `main.YourWorkflowDefinition`.
- Workflow isn't in a running state.
- Workflow either started after "2021-06-07T16:46:34.236-08:00" or closed after "2021-06-07T16:46:34-08:00".

The following are additional examples of List Filters.

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

```sql
WorkflowType STARTS_WITH '<workflow-type-prefix>'
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
