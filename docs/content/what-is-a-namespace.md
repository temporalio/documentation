---
id: what-is-a-namespace
title: What is a Namespace?
description: A Namespace is the fundamental unit of isolation within Temporal, which is backed by a multi-tenant service.
---

A Namespace is the fundamental unit of isolation within Temporal, which is backed by a multi-tenant service.

You may use these to match the development lifecycle, e.g. having separate `dev` and `prod` Namespaces.
Or you could use them to ensure workflows between different teams never communicate, e.g. `teamA` Namespace should never impact `teamB` Namespace.

- Out of the box, Temporal server has one "default" and one internal Namespace.
  All APIs and tools, such as the UI and CLI, default to the "default" Namespace if it is not specified.
  So, if you are not planning to use multiple Namespaces, we recommend using the default one.
- **Membership**: [Task Queue](#task-queue) names and [Workflow Ids](#workflow-id) must all correspond to a specific Namespace.
  For example, when a [Workflow](#workflow) is started, it starts within a specific Namespace.
- **Uniqueness**: Temporal guarantees a unique [Workflow Id](#workflow-id) within a Namespace.
  Temporal supports running [Workflow Executions](#workflow-execution) that use the same [Workflow Id](#workflow-id) if they are in different Namespaces.
- **Namespace Configuration**: Various configuration options like the retention period or [Archival](#archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/docs/system-tools/tctl/).
