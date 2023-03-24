---
id: how-to-create-a-temporal-client-in-java
title: How to create a Temporal Client in Java
sidebar_label: Temporal Client
description: To initialize a Workflow Client, create an instance of a `WorkflowClient`, create a client-side `WorkflowStub`, and then call a Workflow method (annotated with the `@WorkflowMethod` annotation).
tags:
  - java
  - developer-guide
---

To initialize a Workflow Client, create an instance of a `WorkflowClient`, create a client-side `WorkflowStub`, and then call a Workflow method (annotated with `@WorkflowMethod`).

To start a Workflow Execution, your Temporal Server must be running, and your front-end service must be accepting gRPC calls.

To establish a connection with the front-end service, use `WorkflowServiceStubs`.

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();
```

You can provide `WorkflowServiceStubsOptions` to override the default values for the gRPC calls.

For example, the default front-end service gRPC address is set to `127.0.0.1:7233`, where `7233` is the default port for the Temporal Frontend Service.

If your server is running on a different host or port from the default, you can set it as shown in the following example.

```java
WorkflowServiceStubs service = WorkflowServiceStubs.newInstance(
                    WorkflowServiceStubsOptions.newBuilder()
                     .setTarget(TARGET_ENDPOINT)
                            .build());
```

After the connection to the Temporal Frontend Service is established, create a Client for the service stub.
The Workflow Client helps with client-side APIs and is required by Workers.

Create an instance of a `WorkflowClient` for the Workflow service stub, and use `WorkflowClientOptions` to set options for the Workflow Client.
The following example shows how to create a `WorkflowClient` instance called "client" for the `WorkflowServiceStubs` "service" that we created in the previous example, and set `Namespace` option for the `WorkflowClient`.

```java
WorkflowClient client = WorkflowClient.newInstance(
                service,
                WorkflowClientOptions.newBuilder()
                        .setNamespace(“Abc”)
                    .build());
```

For more information, see [WorkflowClientOptions](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/client/WorkflowClientOptions.Builder.html).

`WorkflowService` and `WorkflowClient` creation is a heavyweight operation, and will be resource-intensive if created each time you start a Workflow or send a Signal to it.
The recommended way is to create them once and reuse where possible.

With the Client defined, you can start interacting with the Temporal Frontend Service.

To initialize a Workflow in the Client, create a `WorkflowStub`, and start the Workflow Execution with `WorkflowClient.start()`.
Starting Workflows or sending Signals or Queries to Workflows from within a Client must be done using `WorkflowStubs`.

```java
WorkflowClient workflowClient =  WorkflowClient.newInstance(service, clientOptions);
 // Create a Workflow stub.
 YourWorkflow workflow = workflowClient.newWorkflowStub(YourWorkflow.class);
 // Start Workflow asynchronously and call its "yourWFMethod" Workflow method
 WorkflowClient.start(workflow::yourWFMethod);
```

For more information, see the following:

- [How to spawn a Workflow Execution in Java](/java/how-to-spawn-a-workflow-execution-in-java)
