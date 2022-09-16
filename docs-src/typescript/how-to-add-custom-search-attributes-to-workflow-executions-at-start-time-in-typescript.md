---
id: how-to-add-custom-search-attributes-to-workflow-executions-at-start-time-in-typescript
title: How to add custom Search Attributes to Workflow Executions at start time in TypeScript
sidebar_label: Add custom Search Attributes to Workflow Executions at start time
description: Add custom Search Attributes to Workflow Executions at start time
tags:
  - developer-guide
  - typescript
  - client
---

Use [`WorkflowOptions.searchAttributes`](https://typescript.temporal.io/api/interfaces/client.WorkflowOptions#searchattributes).

<!--SNIPSTART typescript-search-attributes-client-->
<!--SNIPEND-->

The type of `searchAttributes` is `Record<string, string[] | number[] | boolean[] | Date[]>`.
