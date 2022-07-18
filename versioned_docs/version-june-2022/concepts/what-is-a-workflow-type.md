---
id: what-is-a-workflow-type
title: What is a Workflow Type?
sidebar_label: Workflow Type
description: A Workflow Type is a name that maps to a Workflow Definition.
tags:
  - explanation
---

A Workflow Type is a name that maps to a Workflow Definition.

- A single Workflow Type can be instantiated as multiple Workflow Executions.
- A Workflow Type is scoped by a Task Queue.
  It is acceptable to have the same Workflow Type name map to different Workflow definitions if they are using completely different Workers.

![Workflow Type cardinality with Workflow Definitions and Workflow Executions](/diagrams/workflow-type-cardinality.svg)
