---
id: how-to-spawn-a-child-workflow-execution-in-typescript
title: How to spawn a Child Workflow Execution in Typescript
sidebar_label: Child Workflow Execution
tags:
  - developer-guide
  - typescript
---

To start a Child Workflow and return a [handle](https://typescript.temporal.io/api/interfaces/workflow.ChildWorkflowHandle/) to it, use [`startChild`](https://typescript.temporal.io/api/namespaces/workflow/#startchild).

To start a Child Workflow Execution and await its completion, use [`executeChild`](https://typescript.temporal.io/api/namespaces/workflow/#executechild).

By default, a child is scheduled on the same Task Queue as the parent.

<!--SNIPSTART typescript-child-workflow -->
<!--SNIPEND-->
