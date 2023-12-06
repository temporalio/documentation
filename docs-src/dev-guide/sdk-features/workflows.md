---
id: workflows
title: Workflows
sidebar_label: Workflows
description: This code orchestrates the execution of Activities, persisting the results.
tags:
  - term
  - explanation
---

Often referred to as a Workflow Definition, and considered to be the fundamental unit of a Temporal Application, this code orchestrates the execution of Activities, persisting the results.
Workflow code effectively executes once to completion.
This is also called Durable Execution.

<LanguageLinks>
- Go SDK
- [Feature guide](/go/developing-workflows)
- [Project setup tutorial](/go/generated/backgroundcheck-boilerplate-backgroundcheck-workflow)
- Java SDK
- [Project setup chapter](/java/chapter-project-setup/backgroundcheck-boilerplate-workflow-definition)
- [Feature guide](/java/how-to-develop-a-workflow-definition-in-java)
- PHP SDK
- [Feature guide](/php/developing-workflows)
- Python SDK
- [Feature guide](/python/developing-workflows)
- [Project setup chapter](/python/backgroundcheck-boilerplate-backgroundcheck-workflow)
- TypeScript SDK
- [Feature guide](/typescript/developing-workflows)
</LanguageLinks>

When developing Workflow Definitions, it's crucial to ensure they consistently demonstrate deterministic characteristics.
Specifically, they should emit the same Commands in the same order each time the Workflow code executes within the context of an existing Workflow Execution.

Workflow Execution involves the re-execution of the Workflow code, known as Replay.
The Workflow Definitions's use of Workflow APIs generates Commands, which instruct the Cluster on which Events to create and add to the Workflow Execution's Event History.
During the Workflow code's execution, the emitted Commands get compared to the existing Event History.
Progression in the Workflow Execution occurs if there's an Event in the Event History that corresponds to the Command's generation in the same sequence and certain specific metadata of the Command aligns with that of the Event.

Read the [conceptual deep dive](/concepts/what-is-a-workflow-definition) for more details.
