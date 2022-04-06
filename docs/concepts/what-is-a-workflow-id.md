---
id: what-is-a-workflow-id
title: What is a Workflow Id?
sidebar_label: Workflow Id
description: A Workflow Id is a customizable, application-level identifier for a Workflow Execution that is unique to an Open Workflow Execution within a Namespace.
tags:
  - explanation
---

A Workflow Id is a customizable, application-level identifier for a [Workflow Execution](/docs/concepts/what-is-a-workflow-execution) that is unique to an Open Workflow Execution within a [Namespace](/docs/server/namespaces).

A Workflow Id is often a business-level customer ID or order ID.

A [Workflow Id Reuse Policy](/docs/concepts/what-is-a-workflow-id-reuse-policy) can be used to manage whether a Workflow Id can be re-used.

It is never possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution.
An attempt to spawn a Workflow Execution with a Workflow Id that is the same as the Id of a currently Open Workflow Execution results in a "Workflow execution already started" error.

You may assign a custom Workflow Id to a Workflow.
This Id is meant for business level identification such as a customer Id or an order Id.
The Temporal Server enforces the uniqueness of the Id, within a [Namespace](/docs/concepts/what-is-a-namespace) based on the Workflow Id re-use policy.

Any attempt to start a Workflow that has the same Id of a Workflow with a re-use policy that does not allow it, is going to fail with a "Workflow execution already started" error.

:::note
It is not possible to have two open Workflows with the same Workflow Id, regardless of the re-use policy.
The re-use policy applies only to closed Workflows.
:::

A Workflow is uniquely identified by its [Namespace](/docs/concepts/what-is-a-namespace), Workflow Id, and [Run Id](/docs/concepts/what-is-a-run-id).
