---
id: how-to-initialize-a-workflow-client-in-java
title: How to initialize a Workflow Client in Java
sidebar_label: Workflow Client Initialization
description: To initialize a Workflow Client, create an instance of a `WorkflowClient`, create a client-side `WorkflowStub`, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).
tags:
  - java
  - developer-guide
---

To initialize a Workflow Client, create an instance of a `WorkflowClient`, create a client-side `WorkflowStub`, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).

To start a Workflow Execution, your Temporal Server must be running, and your front-end service must be accepting gRPC calls.

To establish a connection with the front-end service, use `WorkflowServiceStubs`.

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
```

You can provide `WorkflowServiceStubsOptions` to override the default values for the gRPC calls.

For example, the default front-end service gRPC address is set to `127.0.0.1:7233`, where `7233` is the default port for the Temporal frontend service. If your server is running on a different host or port from the default, you can set it as shown in the following example.

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(
                    WorkflowServiceStubsOptions.newBuilder()
                     .setTarget(TARGET_ENDPOINT)
                            .build());

```

See [WorkflowServiceStubsOptions](/java/how-to-set-workflowservicestuboptions-in-java) for details.

After the connection to the Temporal frontend service is established, create a Client for the service stub.
The Workflow Client helps with client-side APIs and is required by Workers.

Create an instance of a `WorkflowClient` for the Workflow service stub, and use `WorkflowClientOptions` to set options for the Workflow Client.
The following example shows how to create a `WorkflowClient` instance called "client" for the `WorkflowServiceStubs` "service" that we created in the previous example, and set `Namespace` option for the `WorkflowClient`.

```java
WorkflowClient client = WorkflowClient.newServiceStubs(
                service,
                WorkflowClientOptions.newBuilder()
                        .setNamespace(“Abc”)
                    .build());

```

See [WorkflowClientOptions](/java/how-to-set-workflowclientoptions-in-java) for details.

`WorkflowService` and `WorkflowClient` creation is a heavyweight operation, and will be resource-intensive if created each time you start a Workflow or send a Signal to it.
The recommended way is to create them once and reuse where possible.

With the Client defined, you can start interacting with the Temporal Frontend Service using the SDK APIs.

Starting Workflows or sending Signals or Queries to Workflows from within a Client must be done using `WorkflowStubs`.
See [How to spawn a Workflow Execution in Java](/java/how-to-spawn-a-workflow-execution-in-java) for details.
