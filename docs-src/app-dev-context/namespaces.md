---
id: namespaces
title: How to create Namespaces
sidebar_label: Namespaces
description: A Namespace is a unit of isolation within the Temporal Platform.
tags:
  - guide-context
---

A Namespace is a unit of isolation within the Temporal Platform.

You can use Namespaces to match the development lifecycle; for example, having separate `dev` and `prod` Namespaces.
Or you could use them to ensure Workflow Executions between different teams never communicate; such as ensuring that the `teamA` Namespace never impacts the `teamB` Namespace.

The register and update Namespace APIs send a gRPC request to the Frontend Service to create or update a Namespace.
Use a custom [Authorizer](/concepts/what-is-an-authorizer-plugin) on your Frontend Service in the Temporal Cluster to set restrictions on who can create or update Namespaces.

You must register a Namespace with the Temporal Cluster before setting it in the Temporal Client.
