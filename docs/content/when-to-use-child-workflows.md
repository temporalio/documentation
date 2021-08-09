---
id: when-to-use-child-workflows
title: When to use Child Workflows?
description: Use Child Workflows when you need to split up Workflow logic.
tags:
  - explanation
  - when-to
---

### When to use Child Workflows

Some common reasons:

- Execute code using different Workers.
- Enable execution from multiple Workflow Executions.
- Work around [Event History size limits](/docs/server/production-deployment#server-limits).
- Create **one-to-one mappings** between a Workflow Id and some other resource.
- Durably execute some periodic or asynchronous logic like `sleep` or `await`.

### When not to use Child Workflows

The question of when to use Child Workflows vs Activities sometimes arises. Here is why you might _not_ want to use a Child Workflow:

- **Lack of a shared state with the Parent Workflow Execution.**
  Parent Workflow Executions and Child Workflow Executions can communicate only through asynchronous <a href={props.signalsLink}>Signals</a>.
  If the executing logic is tightly coupled between Workflow Executions, it may simply be easier to use a single Workflow Definition that can rely on a shared object's state.
- **Cost**: Child Workflows carry more event history overhead compared to Activities, and this may matter for large Temporal workloads.

If in doubt, we recommend using Activities over Child Workflows until you see a clear need.
