---
id: namespaces
title: How to create Namespaces
sidebar_label: Namespaces
description: A Namespace is a unit of isolation within the Temporal Platform.
tags:
  - guide-context
---

A [Namespace](/concepts/what-is-a-namespace) is a unit of isolation within the Temporal Platform.

You can use Namespaces to match the development lifecycle; for example, having separate `dev` and `prod` Namespaces.
Or you could use them to ensure Workflow Executions between different teams never communicate; such as ensuring that the `teamA` Namespace never impacts the `teamB` Namespace.

On Temporal Cloud, use the [Temporal Cloud UI](/cloud-context/namespaces-create) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to create and manage Namespaces.

On self-hosted Temporal Cluster, you can register and manage your Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

Use a custom [Authorizer](/concepts/what-is-an-authorizer-plugin) on your Frontend Service in the Temporal Cluster to set restrictions on who can create, update, or deprecate Namespaces.

You must register a Namespace with the Temporal Cluster before setting it in the Temporal Client.
