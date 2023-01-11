---
id: namespaces
title: How to create and manage Namespaces
sidebar_label: Namespaces
description: You can create, update, deprecate or delete your Namespaces using either tctl or SDK APIs..
tags:
  - guide-context
---

You can create, update, deprecate or delete your [Namespaces](/concepts/what-is-a-namespace) using either tctl or SDK APIs.

Use Namespaces to isolate your Workflow Executions according to your needs.
For example, you can use Namespaces to match the development lifecycle by having separate `dev` and `prod` Namespaces.
You could also use them to ensure Workflow Executions between different teams never communicate - such as ensuring that the `teamA` Namespace never impacts the `teamB` Namespace.

On Temporal Cloud, use the [Temporal Cloud UI](/cloud-context/namespaces-create) to create and manage a Namespace from the UI, or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to manage Namespaces from the command-line interface.

On self-hosted Temporal Cluster, you can register and manage your Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

Use a custom [Authorizer](/concepts/what-is-an-authorizer-plugin) on your Frontend Service in the Temporal Cluster to set restrictions on who can create, update, or deprecate Namespaces.

You must register a Namespace with the Temporal Cluster before setting it in the Temporal Client.
