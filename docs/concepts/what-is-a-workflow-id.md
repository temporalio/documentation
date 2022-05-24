---
id: what-is-a-workflow-id
title: What is a Workflow Id?
sidebar_label: Workflow Id
description: A Workflow Id is a customizable, application-level identifier for a Workflow Execution that is unique to an Open Workflow Execution within a Namespace.
tags:
  - explanation
---

A Workflow Id is a customizable, application-level identifier for a [Workflow Execution](/concepts/what-is-a-workflow-execution) that is unique to an Open Workflow Execution within a [Namespace](/server/namespaces).

- [How to set a Workflow Id in Go](/go/how-to-set-a-workflow-id-in-go)

A Workflow Id is meant to be a business-process identifier such as customer identifier or order identifier.

A [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy) can be used to manage whether a Workflow Id can be re-used.
The Temporal Platform guarantees uniqueness of the Workflow Id within a [Namespace](/concepts/what-is-a-namespace) based on the Workflow Id Reuse Policy.

It is never possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution, regardless of the Workflow Id Reuse Policy.
An attempt to spawn a Workflow Execution with a Workflow Id that is the same as the Id of a currently Open Workflow Execution results in a "Workflow execution already started" error.

A Workflow Execution can be uniquely identified across all Namespaces by its [Namespace](/concepts/what-is-a-namespace), Workflow Id, and [Run Id](/concepts/what-is-a-run-id).
