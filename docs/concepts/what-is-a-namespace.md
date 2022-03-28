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

- The Temporal Cluster uses the Namespace, “default”, if no other Namespace is specified, for all Temporal SDKs and the tctl.
  - If you are deploying through Docker Compose or using the [auto-setup image](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) in a custom Docker Compose application, the Namespace, "default", is created, through the auto-setup script.
  - If you are deploying through the [Temporal Helm charts](https://github.com/temporalio/helm-charts), you can create the "default" Namespace through the tctl, for example: `tctl namespace default`.
    We recommend using the default Namespace if you aren’t using multiple Namespaces.
- **Case Insensitive**: Because of the DNS, namespaces are case-insensitive on the network/routing part.
  We recommend using lower case for namespace names to avoid potential issues.
- **Membership**: [Task Queue](/docs/concepts/what-is-a-task-queue) names and [Workflow Ids](/docs/concepts/what-is-a-workflow-id) must all correspond to a specific Namespace.
  For example, when a Workflow Execution is spawned, it does so within a specific Namespace.
- **Uniqueness**: Temporal guarantees a unique Workflow Id within a Namespace.
  Workflow Executions may have the same Workflow Id if they are in different Namespaces.
- **Namespace Configuration**: Various configuration options like the retention period and the [Archival](/docs/concepts/what-is-archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/docs/tctl).
