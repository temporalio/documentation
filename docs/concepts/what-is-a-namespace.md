---
id: what-is-a-namespace
title: What is a Namespace?
sidebar_label: Namespace
description: A Namespace is a unit of isolation within the Temporal Platform
tags:
  - explanation
---

A Namespace is a unit of isolation within the Temporal Platform.

- [How to register a new Namespace using tctl](/tctl/namespace/register)
- [How to list Namespaces in a Cluster using tctl](/tctl/namespace/list)
- [How to view (describe) Namespace metadata and details using tctl](/tctl/namespace/describe)
- [How to set the Namespace for a Temporal Client in Go](/go/how-to-set-the-namespace-for-a-temporal-client-in-go)
- [How to set the Namespace for a Temporal Client in Java](/java/how-to-set-the-namespace-for-a-temporal-client-in-java)
- [How to set the Namespace for a Temporal Client in Typescript](/typescript/how-to-set-the-namespace-for-a-temporal-client-in-typescript)

A single Namespace is still multi-tenant.
You can use Namespaces to match the development lifecycle; for example, having separate `dev` and `prod` Namespaces.
Or you could use them to ensure Workflow Executions between different teams never communicate; such as ensuring that the `teamA` Namespace never impacts the `teamB` Namespace.

- If no other Namespace is specified, the Temporal Cluster uses the Namespace "default" for all Temporal SDKs and tctl.
  - If you are deploying through Docker Compose or using the [auto-setup image](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) in a custom Docker Compose application, the Namespace "default" is created, through the auto-setup script.
  - If you are deploying through the [Temporal Helm charts](https://github.com/temporalio/helm-charts), you can create the "default" Namespace by using tctl; for example, `tctl namespace default`.
    We recommend using the default Namespace if you aren’t using multiple Namespaces.
- **Case Insensitive**: Because of DNS, Namespaces are case insensitive on the network and routing side.
  We recommend using lowercase for namespace names to avoid potential issues.
- **Membership**: [Task Queue](/concepts/what-is-a-task-queue) names and [Workflow Ids](/concepts/what-is-a-workflow-id) must all correspond to a specific Namespace.
  For example, when a Workflow Execution is spawned, it does so within a specific Namespace.
- **Uniqueness**: Temporal guarantees a unique Workflow Id within a Namespace.
  Workflow Executions may have the same Workflow Id if they are in different Namespaces.
- **Namespace Configuration**: Various configuration options like the retention period and the [Archival](/concepts/what-is-archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/tctl).
