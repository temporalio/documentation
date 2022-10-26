---
id: how-to-upsert-custom-search-attributes-to-a-workflow-executions-during-execution-in-typescript
title: How to upsert custom Search Attributes to Workflow during Execution in TypeScript
sidebar_label: How to upsert custom Search Attributes to Workflow during Execution
tags:
  - developer-guide
  - typescript
---

Inside a Workflow, we can read from [`WorkflowInfo.searchAttributes`](https://typescript.temporal.io/api/interfaces/workflow.WorkflowInfo#searchattributes) and call [`upsertSearchAttributes`](https://typescript.temporal.io/api/namespaces/workflow#upsertsearchattributes):

<!--SNIPSTART typescript-search-attributes-workflow -->
<!--SNIPEND-->
