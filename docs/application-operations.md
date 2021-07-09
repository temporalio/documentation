---
id: application-operations
title: Temporal Application operations guide
sidebar_label: Application operations
---


## What are general requirements for writing Workflow Defintions?

Consider that [Workflow](/docs/concepts-new/introduction#what-is-a-workflow) logic must be "deterministic".
  Therefore any logic that is not deterministic must be called upon by an SDK API.


Practically, this means that Workflow Definition code can only read and manipulate input parameters, local variables, or variables received as return values from Temporal Go SDK APIs.

For example, Workflow Definiton code should never read a config file directly, as the config file may change during a Workflow Execution.

- Workflow Definition code can not affect changes in external systems directly.
- Workflow Definition code must use Go SDK APIs to handle things like time, logging, and goroutines.

## When to return an error from a Workflow?
