---
id: how-to-manage-namespaces-in-java
title: How to manage Namespaces in Java
sidebar_label: Manage Namespaces
description: Manage your registered Namespaces on self-hosted Temporal Clusters using tctl (recommended) or programmatically using the APIs for updating, listing, and ddeprecating your Namespaces.
tags:
  - developer-guide
  - java
---

On Temporal Cloud, use the [Temporal Cloud UI](/cloud/how-to-manage-namespaces-in-temporal-cloud) or [tcld commands](https://docs.temporal.io/cloud/tcld/namespace/) to manage Namespaces.

On self-hosted Temporal Cluster, you can manage your registered Namespaces using tctl (recommended) or programmatically using APIs. Note that these APIs and tctl commands will not work with Temporal Cloud.

- Update information and configuration for a registered Namespace on your Temporal Cluster:

  - With tctl: [`tctl namespace update`](/tctl/namespace/update)
    Example
  - Use the [`UpdateNamespace` API](https://github.com/temporalio/api/blob/e5cf521c6fdc71c69353f3d2ac5506dd6e827af8/temporal/api/workflowservice/v1/service.proto) to update configuration on a Namespace.
    Example

    ```java
    import io.temporal.api.workflowservice.v1.*;
    //...
    UpdateNamespaceRequest updateNamespaceRequest = UpdateNamespaceRequest.newBuilder()
                .setNamespace("your-namespace-name") //the namespace that you want to update
                .setUpdateInfo(UpdateNamespaceInfo.newBuilder() //has options to update namespace info
                        .setDescription("your updated namespace description") //updates description in the namespace info.
                        .build())
                .setConfig(NamespaceConfig.newBuilder() //has options to update namespace configuration
                        .setWorkflowExecutionRetentionTtl(Durations.fromHours(30)) //updates the retention period for the namespace "your-namespace--name" to 30 hrs.
                        .build())
                .build();
        UpdateNamespaceResponse updateNamespaceResponse = namespaceservice.blockingStub().updateNamespace(updateNamespaceRequest);
    //...
    ```

- Get details for a registered Namespace on your Temporal Cluster:

  - With tctl: [`tctl namespace describe`](/tctl/namespace/describe)
  - Use the [`DescribeNamespace` API](https://github.com/temporalio/api/blob/e5cf521c6fdc71c69353f3d2ac5506dd6e827af8/temporal/api/workflowservice/v1/service.proto) to return information and configuration details for a registered Namespace.
    Example

    ```java
    import io.temporal.api.workflowservice.v1.*;
    //...
    DescribeNamespaceRequest descNamespace = DescribeNamespaceRequest.newBuilder()
                .setNamespace("your-namespace-name") //specify the namespace you want details for
                .build();
        DescribeNamespaceResponse describeNamespaceResponse = namespaceservice.blockingStub().describeNamespace(descNamespace);
        System.out.println("Namespace Description: " + describeNamespaceResponse);
    //...
    ```

- Get details for all registered Namespaces on your Temporal Cluster:

  - With tctl: [`tctl namespace list`](/tctl/namespace/list)
  - Use the [`ListNamespace` API](https://github.com/temporalio/api/blob/e5cf521c6fdc71c69353f3d2ac5506dd6e827af8/temporal/api/workflowservice/v1/service.proto) to return information and configuration details for all registered Namespaces on your Temporal Cluster.
    Example

    ```java
    import io.temporal.api.workflowservice.v1.*;
    //...
    ListNamespacesRequest listNamespaces = ListNamespacesRequest.newBuilder().build(); //lists all namespaces in the active cluster
        ListNamespacesResponse listNamespacesResponse = namespaceservice.blockingStub().listNamespaces(listNamespaces);
    //...
    ```

- Deprecate a Namespace: The [`DeprecateNamespace` API](https://github.com/temporalio/api/blob/e5cf521c6fdc71c69353f3d2ac5506dd6e827af8/temporal/api/workflowservice/v1/service.proto) updates the state of a registered Namespace to "DEPRECATED". Once a Namespace is deprecated, you cannot start new Workflow Executions on it. All existing and running Workflow Executions on a deprecated Namespace will continue to run.
  Example:

```java
import io.temporal.api.workflowservice.v1.*;
//...
DeprecateNamespaceRequest deprecateNamespace = DeprecateNamespaceRequest.newBuilder()
                .setNamespace("your-namespace-name") //specify the namespace that you want to deprecate
                .build();
        DeprecateNamespaceResponse response = namespaceservice.blockingStub().deprecateNamespace(deprecateNamespace);
//...
```
