---
id: what-is-a-namespace
title: What is a Namespace?
sidebar_label: Namespace
description: A Namespace is a unit of isolation within the Temporal Platform
tags:
  - term
  - explanation
---

A Namespace is a unit of isolation within the Temporal Platform.

A single Namespace is still multi-tenant.

### Usage

Namespaces are created on the Temporal Cluster, and provide a range of controls to achieve isolation on Workflow Executions.

- Namespaces are a mechanism for resource isolation. Heavy traffic from one Namespace will not impact other Namespaces running on the same Cluster.
  For example, you can use Namespaces to match the development lifecycle by having separate `dev` and `prod` Namespaces.
- If no other Namespace is specified, the Temporal Cluster uses the Namespace "default" for all Temporal SDKs and tctl.
  See the [Registration](#registration) section for details.
- Namespaces created on self-hosted Temporal Clusters are case-sensitive. For example, `foo` and `Foo` are two different Namespaces.
  On Temporal Cloud, Namespaces are case-insensitive, and we recommend using lowercase for Namespace names to avoid potential issues.
- **Membership**: [Task Queue](/concepts/what-is-a-task-queue) names and [Workflow Ids](/concepts/what-is-a-workflow-id) must all correspond to a specific Namespace.
  For example, when a Workflow Execution is spawned, it does so within a specific Namespace.
- **Uniqueness**: Temporal guarantees a unique Workflow Id within a Namespace.
  Workflow Executions may have the same Workflow Id if they are in different Namespaces.
- **Namespace Configuration**: Various configuration options like the [Retention Period](/concepts/what-is-a-retention-period) and the [Archival](/concepts/what-is-archival) destination are configured per Namespace through a special CRUD API or through [`tctl`](/tctl-v1/namespace).

### Registration

Registering a Namespace creates the Namespace on the Temporal Cluster.
When you register your Namespace, you must also set the [Retention Period](/concepts/what-is-a-retention-period) for the Namespace.

On Temporal Cloud, use the [Temporal Cloud UI](/cloud/how-to-manage-namespaces-in-temporal-cloud) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to create and manage Namespaces.

On self-hosted Temporal Cluster, you can register your Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

All SDKs require a Namespace on the Temporal Cluster (or Temporal Cloud) for their Client calls. If not set using Client options, the Workflow Client API looks for the `default` Namespace. If there is no default Namespace registered with your Temporal Cluster (or Temporal Cloud), all calls will throw errors.
You must register your Namespace with the Temporal Cluster (or Temporal Cloud) before setting it in your Client.

On self-hosted Temporal Clusters, you can register your Namespaces in the following ways:

- In your Cluster setup, create your Namespaces, including the default, in your setup script.
  For example:

  - If deploying through Docker Compose or using the [auto-setup image](https://github.com/temporalio/docker-builds/blob/main/docker/auto-setup.sh) in a custom Docker Compose application, the Namespace "default" is created, through the auto-setup script.
  - If deploying through the [Temporal Helm charts](https://github.com/temporalio/helm-charts), you can create the "default" Namespace by using tctl; for example, `tctl --namespace default namespace register`.

- Use the `tctl namespace register` command with the `--retention` modfiier to register your Namespaces, one at a time, and set the Retention Period on each.

  - [How to register a new Namespace using tctl](/tctl-v1/namespace#register)

- In your Client program, register your Namespace using `RegisterNamespaceRequest` API available in all the SDKs.

  - [How to register a new Namespace using SDK](/application-development/features#namespaces)

Note that registering a Namespace takes up to 15 seconds to complete. Ensure that you are waiting for this process to complete before making calls to the Namespace.

### Manage Namespaces

Use a custom [Authorizer](/concepts/what-is-an-authorizer-plugin) on your Frontend Service in the Temporal Cluster to set restrictions on who can create, update, or deprecate Namespaces.

On Temporal Cloud, use the [Temporal Cloud UI](/cloud/how-to-manage-namespaces-in-temporal-cloud) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to manage Namespaces.

On self-hosted Temporal Cluster, you can manage your registered Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

- Update information and configuration for a registered Namespace on your Temporal Cluster:

  - With tctl: [`tctl namespace update`](/tctl-v1/namespace#update)
  - Use the [`UpdateNamespace` API]9(/application-development/features#namespaces) to update configuration on a Namespace.

- Get details for a registered Namespace on your Temporal Cluster:

  - With tctl: [`tctl namespace describe`](/tctl-v1/namespace#describe)
  - Use the [`DescribeNamespace` API](/application-development/features#namespaces) to return information and configuration details for a registered Namespace.

- Get details for all registered Namespaces on your Temporal Cluster:

  - With tctl: [`tctl namespace list`](/tctl-v1/namespace#list)
  - Use the [`ListNamespace` API](/application-development/features#namespaces) to return information and configuration details for all registered Namespaces on your Temporal Cluster.

- Deprecate a Namespace: The [`DeprecateNamespace` API](/application-development/features#namespaces) updates the state of a registered Namespace to "DEPRECATED". Once a Namespace is deprecated, you cannot start new Workflow Executions on it. All existing and running Workflow Executions on a deprecated Namespace will continue to run.

### Setting

Set Namespaces in your SDK Client to isolate your Workflow Executions to the Namespace.
If you do not set a Namespace, all Workflow Executions started using the Client will be associated with the "default" Namespace. This means, you must have a default Namespace called "default" registered with your Temporal Cluster. See [Registration](#Registration) for details.

- [How to set the Namespace for a Temporal Client](/application-development/foundations#set-namespace)
- [How to list Namespaces in a Cluster using tctl](/tctl-v1/namespace#list)
- [How to view (describe) Namespace metadata and details using tctl](/tctl-v1/namespace#describe)
