---
id: what-is-a-workflow-id
title: What is a Workflow Id?
sidebar_label: Workflow Id
description: A Workflow Id is a customizable, application-level identifier for a Workflow Execution that is unique to an Open Workflow Execution within a Namespace.
tags:
  - term
  - explanation
---

A Workflow Id is a customizable, application-level identifier for a [Workflow Execution](/concepts/what-is-a-workflow-execution) that is unique to an Open Workflow Execution within a [Namespace](/namespaces).

- [How to set a Workflow Id](/go/how-to-set-a-workflow-id-in-go)

A Workflow Id is meant to be a business-process identifier such as customer identifier or order identifier.

The Temporal Platform guarantees uniqueness of the Workflow Id within a [Namespace](/concepts/what-is-a-namespace) based on the Workflow Id Reuse Policy.

A [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy) can be used to manage whether a Workflow Id from a Closed Workflow can be re-used.

A [Workflow Id Conflict Policy](/concepts/what-is-a-workflow-id-conflict-policy) can be used to decide how to resolve a Workflow Id conflict with a Running Workflow.

A Workflow Execution can be uniquely identified across all Namespaces by its [Namespace](/concepts/what-is-a-namespace), Workflow Id, and [Run Id](/concepts/what-is-a-run-id).
