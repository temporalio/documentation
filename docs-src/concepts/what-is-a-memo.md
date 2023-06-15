---
id: what-is-a-memo
title: What is a Memo?
sidebar_label: Memo
description: A Memo is a non-indexed user-supplied set of Workflow Execution metadata that is returned when you describe or list Workflow Executions.
tags:
  - term
  - explanation
---

A Memo is a non-indexed set of Workflow Execution metadata that developers supply at start time or in Workflow code and that is returned when you describe or list Workflow Executions.

The primary purpose of using a Memo is to enhance the organization and management of Workflow Executions.
Add your own metadata, such as notes or descriptions, to a Workflow Execution, which lets you annotate and categorize Workflow Executions based on developer-defined criteria.
This feature is particularly useful when dealing with numerous Workflow Executions because it facilitates the addition of context, reminders, or any other relevant information that aids in understanding or tracking the Workflow Execution.

<!--

:::note Use Memos judiciously

Memos shouldn't store data that's critical to the execution of a Workflow, for some of the following reasons:

- Unlike Workflow inputs, Memos lack type safety
- Memos are subject to eventual consistency and may not be immediately available
- Excessive reliance on Memos hides mutable state from the Workflow Execution History

:::

-->
