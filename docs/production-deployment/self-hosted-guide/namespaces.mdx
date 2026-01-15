---
id: namespaces
title: Managing Namespaces
sidebar_label: Namespaces
description: How to create and manage Namespaces in open source Temporal, including registration, configuration, and security.
slug: /self-hosted-guide/namespaces
keywords:
  - namespaces
  - self-hosted
  - open source
tags:
  - Namespaces
  - Self-hosting
---

:::info Open source Temporal
This page covers namespace operations for **open source Temporal**.
For core namespace concepts, see [Temporal Namespace](/namespaces).
For Temporal Cloud, see [Temporal Cloud Namespaces](/cloud/namespaces).
:::

A [Namespace](/namespaces) is a unit of isolation within the Temporal Platform.
Before you can run Workflows, you must register at least one Namespace with your Temporal Service.

## Create a Namespace

Registering a Namespace creates it on the Temporal Service.
When you register a Namespace, you must set a [Retention Period](/temporal-service/temporal-server#retention-period) that determines how long closed Workflow execution history is kept.

You can create Namespaces using:

- **Temporal CLI** (recommended): [`temporal operator namespace create`](/cli/operator#create)
- **Go SDK**: [`RegisterNamespace`](/develop/go/namespaces#register-namespace)
- **Java SDK**: [`RegisterNamespace`](/develop/java/namespaces#register-namespace)
- **TypeScript SDK**: [Namespace management](/develop/typescript/namespaces#register-namespace)

### The default Namespace

If no Namespace is specified, SDKs and CLI use the `default` Namespace.
You must register this Namespace before using it.

When deploying with Docker Compose or the [auto-setup image](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh), the `default` Namespace is created automatically.

When deploying with [Helm charts](https://github.com/temporalio/helm-charts), create it manually:

```bash
temporal operator namespace create --namespace default
```

Namespace registration takes up to 15 seconds to complete.
Wait for this process to finish before making calls to the Namespace.

## Manage Namespaces

Common namespace management operations:

| Operation | CLI Command | Description |
|-----------|-------------|-------------|
| List | [`temporal operator namespace list`](/cli/operator#list) | List all registered Namespaces |
| Describe | [`temporal operator namespace describe`](/cli/operator#describe) | Get details for a Namespace |
| Update | [`temporal operator namespace update`](/cli/operator#update) | Update Namespace configuration |
| Delete | [`temporal operator namespace delete`](/cli/operator#delete) | Delete a Namespace and all its data |

For SDK-based namespace management:
- [Go SDK namespace management](/develop/go/namespaces#manage-namespaces)
- [Java SDK namespace management](/develop/java/namespaces#manage-namespaces)
- [TypeScript SDK namespace management](/develop/typescript/namespaces#manage-namespaces)

### Deprecate vs Delete

- **Deprecate**: Prevents new Workflow Executions from starting, but existing Workflows continue to run.
- **Delete**: Removes the Namespace and all Workflow Executions. This is irreversible.

## Security

Use a custom [Authorizer](/self-hosted-guide/security#authorizer-plugin) on your Frontend Service to control who can create, update, or deprecate Namespaces.

Without an Authorizer configured, Temporal uses the `nopAuthority` authorizer that allows all API calls unconditionally.

For Temporal Cloud, [role-based access controls](/cloud/users#namespace-level-permissions) provide namespace-level authorization without custom configuration.

## Best practices

For namespace naming conventions, organizational patterns, and production safeguards, see [Namespace Best Practices](/best-practices/managing-namespace).
