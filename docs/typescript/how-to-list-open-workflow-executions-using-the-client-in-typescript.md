---
id: how-to-list-open-workflow-executions-using-the-client-in-typescript
title: How to list open Workflow Executions using the Client in TypeScript
sidebar_label: List open Workflow Executions using the Client
description: List open Workflow Executions using the Client
tags:
  - developer-guide
  - typescript
  - client
---

You can provide key-value pairs as Search Attributes in [StartWorkflowOptions](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes).
In TypeScript, SearchAttributes are represented as `Record<string, string | number | boolean>`.

- The value provided in the map must match what is registered in the dynamic config.
- The type of value should be a primitive (e.g. string, number, boolean), for dates use `Date.toISOString()`.

This can be useful for tagging executions with useful attributes you may want to search up later. For example:

<!--SNIPSTART typescript-search-attributes-at-creation-->
<!--SNIPEND-->
