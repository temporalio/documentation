---
id: child-workflows
title: How to start a Child Workflow Execution
description: A Child Workflow Execution is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.
sidebar_label: Child Workflows
tags:
  - guide-context
---

A [Child Workflow Execution](/concepts/what-is-a-child-workflow-execution) is a Workflow Execution that is scheduled from within another Workflow using a Child Workflow API.

When using a Child Workflow API, Child Workflow related Events ([StartChildWorkflowExecutionInitiated](/references/events#startchildworkflowexecutioninitiated), [ChildWorkflowExecutionStarted](/references/events#childworkflowexecutionstarted), [ChildWorkflowExecutionCompleted](/references/events#childworkflowexecutioncompleted), etc...) are logged in the Workflow Execution Event History.

Always block progress until the [ChildWorkflowExecutionStarted](/references/events#childworkflowexecutionstarted) Event is logged to the Event History to ensure the Child Workflow Execution has started.
After that, Child Workflow Executions may be abandoned using the default _Abandon_ [Parent Close Policy](/concepts/what-is-a-parent-close-policy) set in the Child Workflow Options.

To be sure that the Child Workflow Execution has started, first call the Child Workflow Execution method on the instance of Child Workflow future, which returns a different future.

Then get the value of an object that acts as a proxy for a result that is initially unknown, which is what waits until the Child Workflow Execution has spawned.
