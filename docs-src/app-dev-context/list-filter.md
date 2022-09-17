---
id: list-filter
title: How to use List Filters in Advanced Visibility APIs
description: A List Filter is the SQL-like string that is provided as the parameter to an Advanced Visibility List API.
sidebar_label: List Filter
tags:
  - guide-context
---

A List Filter is the SQL-like string that is provided as the parameter to an [Advanced Visibility](/concepts/what-is-advanced-visibility) List API.

A List Filter contains [Search Attribute](/concepts/what-is-a-search-attribute) names, Search Attribute values, and Operators.

- The following operators are supported in List Filters:

  - **AND, OR, ()**
  - **=, !=, >, >=, <, <=**
  - **IN**
  - **BETWEEN ... AND**
  - **ORDER BY**

- A List Filter applies to a single Namespace.

- The range of a List Filter timestamp (`StartTime`, `CloseTime`, `ExecutionTime`) cannot exceed `9223372036854775807` (that is, `maxInt64: 1001`).

- A List Filter that uses a time range has a resolution of 1 ms on Elasticsearch 6 and 1 ns on Elasticsearch 7.

- List Filter Search Attribute names are case-sensitive.

- An Advanced List Filter API may take longer than expected if it is retrieving more than 10 million Workflow Executions.

- A `ListWorkflow` API supports pagination.
  Use the page token in the following call to retrieve the next page; continue until the page token is `null` or `nil`.

- To efficiently count the number of Workflow Executions, use the `CountWorkflow` API.
