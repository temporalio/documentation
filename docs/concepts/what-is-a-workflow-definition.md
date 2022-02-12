---
id: what-is-a-workflow-definition
title: What is a Workflow Definition?
sidebar_label: Workflow Definition
description: A Workflow Definition is the code that defines the constraints of a Workflow Execution.
tags:
  - explanation
---

A Workflow Definition is the code that defines the constraints of a Workflow Execution.

We strongly recommend that you write a Workflow Definition in a language that has a corresponding Temporal SDK.

**How do I handle a Worker Process failure/restart in my Workflow Definition?**

You do not.
Workflow code is completely oblivious to any Worker failures or downtime.
As soon as the Worker Process or the Temporal Cluster has recovered, the current state of the Workflow Execution is fully restored and the execution is continued.
The only reason a Workflow Execution might fail is due to the Workflow business code throwing an exception, not underlying infrastructure outages.

**Implementation guides:**

- [How to develop a Workflow Definition in Go](/docs/go/how-to-develop-a-workflow-definition-in-go)
