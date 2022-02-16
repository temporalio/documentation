---
id: what-is-a-namespace
title: What is a Namespace?
sidebar_label: Namespace
description: A Namespace is a unit of isolation within the Temporal Platform
tags:
  - explanation
---

A Namespace is the unit of isolation within the Temporal Platform.

A single Namespace is still multi-tenant.
You can use Namespaces to match the development lifecycle; for example, having separate `dev` and `prod` Namespaces.
Or you could use them to ensure Workflow Executions between different teams never communicate; such as ensuring that the `teamA` Namespace never impacts the `teamB` Namespace.

- By default a Temporal Cluster has one "default" and one internal Namespace.
  All APIs and tools, such as the UI and CLI, default to the "default" Namespace if it is not specified.
  So, if you are not planning to use multiple Namespaces, we recommend using the default one.
- **Case Insensitive**: Because of the DNS, namespaces are case insensitive on the network/routing part.
  We recommend using lower case for namespace names to avoid potential issues.
- **Membership**: [Task Queue](/docs/concepts/what-is-a-task-queue) names and [Workflow Ids](/docs/concepts/what-is-a-workflow-id) must all correspond to a specific Namespace.
  For example, when a Workflow Execution is spawned, it does so within a specific Namespace.
- **Uniqueness**: Temporal guarantees a unique Workflow Id within a Namespace.
  Workflow Executions may have the same Workflow Id if they are in different Namespaces.
- **Namespace Configuration**: Various configuration options like the retention period and the [Archival](/docs/concepts/what-is-archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/docs/tctl).
