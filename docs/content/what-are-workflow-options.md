---
id: what-are-workflow-options
title: What are Workflow Options?
description: todo
---

Each SDK provides an API for customizing the properties of a Workflow Execution.
The only property that is required to be set by the application developer is the name of the [Task Queue](#task-queue).
All other properties either have defaults or are not required to be set.

The following is a full list of all properties that can be customized for a Workflow Execution:

- [Task Queue](#task-queue)
- [Workflow Execution Timeout](#workflow-execution-timeout)
- [Workflow Run Timeout](#workflow-run-timeout)
- [Workflow Task Timeout](#workflow-task-timeout)
- [Namespace](#namespace)
- [Workflow Id](#workflow-id)
- [Workflow Id Reuse Policy](#workflow-id-reuse-policy)
- [Wait For Cancellation](#wait-for-cancellation)
- [Data Converter](#data-converter)
- [Retry Policy](#what-is-a-retry-policy)
- [Cron Schedule](#cron-schedule)
- [Context Propagators](#context-propagators)
- [Memo](#memo)
- [Search Attributes](#search-attributes)
- [Parent Close Policy](#parent-close-policy)
