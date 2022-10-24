---
id: how-to-manage-namespaces-in-go
title: How to manage Namespaces in Go
sidebar_label: Manage Namespaces
description:
tags:
  - developer-guide
  - go
---

On Temporal Cloud, use the [Temporal Cloud UI](/cloud/how-to-manage-namespaces-in-temporal-cloud) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to manage Namespaces.

On self-hosted Temporal Cluster, you can manage your registered Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

- Update information and configuration for a registered Namespace on your Temporal Cluster:

  - With tctl: [`tctl namespace update`](/tctl-v1/namespace#update)
    Example
  - Use the [`UpdateNamespace` API](https://pkg.go.dev/go.temporal.io/sdk@v1.17.0/client#NewNamespaceClient) to update configuration on a Namespace.
    Example

    ```go
        err = client.Update(context.Background(), &workflowservice.UpdateNamespaceRequest{
          Namespace:         "your-namespace-name",
          UpdateInfo:        &namespace.UpdateNamespaceInfo{ //updates info for the namespace "your-namespace-name"
              Description:   "updated namespace description",
              OwnerEmail:    "newowner@mail.com",
              //Data:        nil,
              //State:       0,
          },
          /*other details that you can update:
          Config:            &namespace.NamespaceConfig{ //updates the configuration of the namespace with the following options
              //WorkflowExecutionRetentionTtl: nil,
              //BadBinaries:                   nil,
              //HistoryArchivalState:          0,
              //HistoryArchivalUri:            "",
              //VisibilityArchivalState:       0,
              //VisibilityArchivalUri:         "",
          },
          ReplicationConfig: &replication.NamespaceReplicationConfig{ //updates the replication configuration for the namespace
              //ActiveClusterName: "",
              //Clusters:          nil,
              //State:             0,
          },
          SecurityToken:     "",
          DeleteBadBinary:   "",
          PromoteNamespace:  false,
        })*/
        //...
    ```

- Get details for a registered Namespace on your Temporal Cluster:

  - With tctl: [`tctl namespace describe`](/tctl-v1/namespace#describe)
  - Use the [`DescribeNamespace` API](https://pkg.go.dev/go.temporal.io/sdk@v1.17.0/client#NewNamespaceClient) to return information and configuration details for a registered Namespace.
    Example

    ```go
        client, err := client.NewNamespaceClient(client.Options{})
        //...
        client.Describe(context.Background(), "default")
        //...
    ```

- Get details for all registered Namespaces on your Temporal Cluster:

  - With tctl: [`tctl namespace list`](/tctl-v1/namespace#list)
  - Use the [`ListNamespace` API](https://github.com/temporalio/api/blob/e5cf521c6fdc71c69353f3d2ac5506dd6e827af8/temporal/api/workflowservice/v1/service.proto) to return information and configuration details for all registered Namespaces on your Temporal Cluster.
    Example

    ```go
        namespace.Handler.ListNamespaces(context.Context(), &workflowservice.ListNamespacesRequest{ //lists 1 page (1-100) of namespaces on the active cluster. You can set a large PageSize or loop until NextPageToken is nil
            //PageSize:        0,
            //NextPageToken:   nil,
            //NamespaceFilter: nil,
      })
    ```

- Delete a Namespace: The [`DeleteNamespace` API](https://github.com/temporalio/api/blob/e5cf521c6fdc71c69353f3d2ac5506dd6e827af8/temporal/api/workflowservice/v1/service.proto) deletes a Namespace. Deleting a Namespace deletes all running and completed Workflow Executions on the Namespace, and removes them from the persistence store and the visibility store.
  Example:

```go
    client.OperatorService().DeleteNamespace(ctx, &operatorservice.DeleteNamespaceRequest{...
```
