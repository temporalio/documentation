---
id: what-is-a-namespace
title: What is an Namespace?
description: todo
---

The unit of isolation within Temporal, which is backed by a multi-tenant service.

- By default, a Temporal service is provisioned with a "default" Namespace. All APIs and tools, such as the UI and CLI, default to the "default" Namespace if it is not specified. So, if you are not planning to use multiple Namespaces, we recommend using the default one.
- [Task Queue](#task-queue) names and [Workflow Ids](#workflow-id) correspond to a specific Namespace. For example, when a [Workflow](#workflow) is started, it starts within a specific Namespace.
- Temporal guarantees a unique [Workflow Id](#workflow-id) within a Namespace. Temporal supports running [Workflow Executions](#workflow-execution) that use the same [Workflow Id](#workflow-id) if they are in different Namespaces.
- Various configuration options like the retention period or [Archival](#archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/docs/system-tools/tctl/).
- In a multi-cluster deployment, Namespace is a unit of fail-over.
- Each Namespace can be active on only a single Temporal cluster at a time. However, different Namespaces can be active in different clusters and can fail-over independently.
