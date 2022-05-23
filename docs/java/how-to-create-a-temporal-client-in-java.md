---
id: how-to-create-a-temporal-client-in-java
title: How to create a Temporal Client in Java
sidebar_label: Temporal Client
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

You can also provide certificates to be able to connect to your frontend service using mTLS.
The following example shows how to set up cetificates and pass the `SSLContext` for the Client.

```java
import io.temporal.serviceclient.SimpleSslContextBuilder;
...
// Load your client certificate, which should look like:
    // -----BEGIN CERTIFICATE-----
    // ...
    // -----END CERTIFICATE-----
    InputStream clientCert = new FileInputStream(System.getenv("TEMPORAL_CLIENT_CERT"));
    // PKCS8 client key, which should look like:
    // -----BEGIN PRIVATE KEY-----
    // ...
    // -----END PRIVATE KEY-----
    InputStream clientKey = new FileInputStream(System.getenv("TEMPORAL_CLIENT_KEY"));
    // For Temporal Cloud this would likely be ${namespace}.tmprl.cloud:7233
    String targetEndpoint = System.getenv("TEMPORAL_ENDPOINT");
    // Your registered Namespace.
    String namespace = System.getenv("TEMPORAL_NAMESPACE");
    // Create SSL enabled client by passing SslContext, created by SimpleSslContextBuilder.
    WorkflowServiceStubs service =
        WorkflowServiceStubs.newInstance(
            WorkflowServiceStubsOptions.newBuilder()
                .setSslContext(SimpleSslContextBuilder.forPKCS8(clientCert, clientKey).build())
                .setTarget(targetEndpoint)
                .build());

```

For details, see [Sample](https://github.com/temporalio/samples-java/blob/main/src/main/java/io/temporal/samples/ssl/SslEnabledWorker.java).

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

To initialize a Workflow in the Client, create a `WorkflowStub`, and start the Workflow Execution with `WorkflowClient.start()`.
Starting Workflows or sending Signals or Queries to Workflows from within a Client must be done using `WorkflowStubs`.

```java
WorkflowClient workflowClient =  WorkflowClient.newInstance(service, clientOptions);
 // Create a Workflow stub.
 YourWorkflow workflow = workflowClient.newWorkflowStub(YourWorkflow.class);
 // Start Workflow asynchronously and call its "yourWFMethod" Workflow method
 WorkflowClient.start(workflow::yourWFMethod);
```

For details, see [How to spawn a Workflow Execution in Java](/java/how-to-spawn-a-workflow-execution-in-java).
See [How to spawn a Workflow Execution in Java](/java/how-to-spawn-a-workflow-execution-in-java) for details.
