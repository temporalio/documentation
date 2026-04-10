---
id: list-filter
title: List Filter
sidebar_label: List Filter
description: This guide on Temporal List Filters explains how to set up, configure, and use the List Filter API in Temporal Server versions. Filter and retrieve Workflow Executions, apply supported operators, and optimize queries for efficiency.
slug: /list-filter
toc_max_heading_level: 4
keywords:
  - explanation
  - filtered-lists
  - term
  - visibility
  - list filter
tags:
  - Concepts
  - Visibility
---

This page discusses [List Filter](#list-filter).

## What is a List Filter? {#list-filter}

The [Visibility](/temporal-service/visibility) List API requires you to provide a List Filter as an SQL-like string parameter.

A List Filter includes [Search Attribute](/search-attribute) names, Search Attribute values, and [operators](#supported-operators) so that it can retrieve a filtered list of Workflow Executions from the Visibility Store.

List Filter [Search Attribute](/search-attribute) names are case sensitive.
A single [Namespace](/namespaces) scopes each List Filter.

A List Filter using a time range provides a resolution of 1 ns on [Elasticsearch](/self-hosted-guide/visibility#elasticsearch) and 1 µs for [SQL databases](/self-hosted-guide/visibility).

### Supported operators

List Filters support the following operators:

- **`=, !=, >, >=, <, <=`**
- **`AND, OR, ()`**
- **`BETWEEN ... AND`**
- **`IN`**
- **STARTS_WITH**

:::note

The **ORDER BY** operator is currently not supported in Temporal Cloud.

The default ordering is: `ClosedTime DESC NULL FIRST`, `StartTime DESC`. {/* `RunID DESC` depends on which visibility store is used. */}

Custom Search Attributes of the `Text` type cannot be used in **ORDER BY** clauses.

:::

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

For Search Attributes of type `Keyword` like `WorkflowId`, perform partial string matching using STARTS_WITH for prefixes and BETWEEN for suffixes.

- `WorkflowId STARTS_WITH "order-"` matches Workflow Ids with the "order-" prefix, regardless of the following text.

  ```
  order-
  order-1234
  order-abracadabra
  order-~~~abracadabra
  ```

- `WorkflowId BETWEEN "order-" AND "order-~"` matches Workflow Ids that have characters after `order-` with ASCII values lower than `~` (126, the highest-value printable character), such as the following:

  ```
  order-
  order-1234
  order-abracadabra
  ```

  It does not match `order-~~`.

:::note Filter Composition Quick Reference

**Composition**

- Data types:
  - String literals with single or double quotes
  - Numbers (Integer and Floating Point)
  - Booleans
- Comparison: `=`, `!=`, `>`, `>=`, `<`, `<=`
- Expressions/Operators:
  - `IN array`
  - `BETWEEN value AND value`
  - `STARTS_WITH string`
  - `IS NULL`, `IS NOT NULL`
  - `expr AND expr`, `expr OR expr`, `( expr )`
- Array: `( comma-separated-values )`

**Please note**

- Wrap attributes with backticks if it contains characters not in
  `[a-zA-Z0-9]`.
- `STARTS_WITH` is only available for Keyword Search Attributes.

:::

### Efficient API usage

If the Advanced List Filter API retrieves a substantial number of Workflow Executions (more than 10,000), the response time might be longer.

Beginning with Temporal Server v1.20, you can employ the `CountWorkflow` API to efficiently count the number of [Workflow Executions](/workflow-execution).

To paginate the results using the `ListWorkflow` API, use the page token to retrieve the next page.
Continue until the page token becomes `null`/`nil`.

#### List Filter examples

Here are examples of List Filters set with the [Temporal CLI](/cli/workflow#list):

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

### Search Attribute aliasing

Temporal prefixes most [default Search Attributes](./search-attributes.mdx#default-search-attribute) with `Temporal` to avoid naming conflicts with custom Search Attributes.
To make it easier to reference default Search Attributes in List Filters, Temporal supports aliasing, which lets you use the non-prefixed name of a default Search Attribute. However, if you choose to define a custom Search Attribute with the same name as the non-prefixed alias of a default Search Attribute, your custom Search Attribute overrides the alias.

:::info Server Version Requirement

Search Attribute aliasing requires Temporal Server version 1.30 and greater.

:::

For example, the default Search Attribute `TemporalWorkflowVersioningBehavior` has the alias `WorkflowVersioningBehavior`. If you haven't defined a custom Search Attribute named `WorkflowVersioningBehavior`, you can use either name in a List Filter, and both refer to the same Search Attribute.

```sql
-- Using the original attribute name
WorkflowVersioningBehavior = 'pinned'

-- Using the Temporal-prefixed alias (equivalent)
TemporalWorkflowVersioningBehavior = 'pinned'
```

#### Alias resolution with custom Search Attributes

When resolving a Search Attribute in a List Filter, Temporal Server checks for matches in the following order:

1. Custom Search Attributes defined in the current Namespace

2. Default Search Attributes

This means that if you define a custom Search Attribute with the same name as the alias of a default Search Attribute, the non `Temporal` prefixed name will refer to your custom attribute. You can still search with the default Search Attribute by using the `Temporal` prefix.

For example, if you have a custom Search Attribute named `SchedulePaused`, List Filters using the following Search Attributes will return different results:

```sql
-- If you have a custom Search Attribute named 'SchedulePaused'
-- This will use your custom attribute, not the default Search Attribute
SchedulePaused = true

-- The original system attribute still works by using the Temporal prefix
TemporalSchedulePaused = true
```

`SchedulePaused` will refer to your custom Search Attribute, while `TemporalSchedulePaused` will refer to the default Search Attribute.


