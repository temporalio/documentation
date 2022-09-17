---
id: get-workflow-results
title: How to get the results of a Workflow Execution
description: If the call to start a Workflow Execution is successful, you will gain access to the Workflow Execution's Run Id.
sidebar_label: Get Workflow results
tags:
  - guide-context
---

If the call to start a Workflow Execution is successful, you will gain access to the Workflow Execution's Run Id.

The Workflow Id, Run Id, and Namespace may be used to uniquely identify a Workflow Execution in the system and get its result.

It's possible to both block progress on the result (synchronous execution) or get the result at some other point in time (asynchronous execution).

In the Temporal Platform, it's also acceptable to use Queries as the preferred method for accessing the state and results of Workflow Executions.
