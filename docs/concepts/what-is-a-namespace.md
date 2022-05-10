---
id: what-is-a-namespace
title: What is a Namespace?
sidebar_label: Namespace
description: A Namespace is a unit of isolation within the Temporal Platform
tags:
  - explanation
---

A Namespace is a unit of isolation within the Temporal Platform.

- [How to register a new Namespace using tctl](/docs/tctl/namespace/register)
- [How to list Namespaces in a Cluster using tctl](/docs/tctl/namespace/list)
- [How to view Namespace metadata and details using tctl](/docs/tctl/namespace/describe)
- [How to set the Namespace for a Temporal Client in Go](/docs/go/how-to-set-the-namespace-for-a-temporal-client-in-go)
- [How to set the Namespace for a Temporal Client in Java](/docs/java/how-to-set-the-namespace-for-a-temporal-client-in-java)
- [How to set the Namespace for a Temporal Client in Typescript](/docs/typescript/how-to-set-the-namespace-for-a-temporal-client-in-typescript)

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
<<<<<<< HEAD
- **Namespace Configuration**: Various configuration options like the retention period and the [Archival](/docs/concepts/what-is-archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/docs/tctl).
=======
- **Namespace Configuration**: Various configuration options like the retention period and the [Archival](/concepts/what-is-archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/tctl).

#### Retention Period

The Retention Period is the amount of time a Workflow Execution Event History remains in the Cluster's persistence store.

Retention Periods are per Namespace.
A Retention Period is set for the Namespace when the Namespace is created.
If the retention period isn't set, it defaults to 2 days.
The minimum retention period is 1 day.
The maximum retention period is 30 days.
Setting the retention period to 0 results in the error _A valid retention period is not set on request_.
>>>>>>> 802f761 (full conversion of links from /docs to /)
