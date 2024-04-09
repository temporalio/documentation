---
id: temporal-client-connect-to-cloud
title: Connect your Client to Temporal Cloud
description: Use your mTLS credentials and gRPC endpoint to connect to Temporal Cloud.
sidebar_label: Connect to Temporal Cloud
tags:
 - guide-context
 - java
 - client
 - temporal client
 - workers
 - applications
---

Before you can configure a Client to communicate with the [Temporal Cloud Cluster](/cloud), you'll need to gather several pieces of information.

- Your [Temporal Cloud Namespace Id](/concepts/what-is-a-cloud-namespace-id) from the [Temporal Cloud Namespaces](https://cloud.temporal.io/namespaces) page.
- Your Namespace's [gRPC endpoint](/concepts/what-is-a-cloud-grpc-endpoint).
  Each Namespace detail page contains an endpoint listing, allowing you to copy it with a click.
  An endpoint is a detailed address for Temporal Cloud gRPC connections.
- Your mTLS CA .pem certificate and .key private key.

This sample assumes you've assigned these details to local environment variables to consume from your Java code.
The code uses paths to the .pem and .key files and loads the contents from those locations.
In real-world deployment, follow your organization's practices to store and retrieve sensitive information.
Where needed, replace the certificate loading steps with the particulars of your own system.

### Building a Cloud Client

The following sample walks you through the process of configuring a Client to work with Temporal Cloud.

```java
package connecttocloud.workers;

import java.io.FileInputStream;
import java.io.InputStream;
import io.grpc.netty.shaded.io.netty.handler.ssl.SslContext;
import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.serviceclient.SimpleSslContextBuilder;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import java.lang.System;
import connecttocloud.CloudActivitiesImpl;
import connecttocloud.CloudWorkflowImpl;
import java.io.IOException;


public class CloudWorker {
  public static void main(String[] args) throws IOException{

    // Get the key and certificate from your environment or local machine
    String clientCertFile = System.getenv("TEMPORAL_CLOUD_CERTIFICATE_PATH");
    String clientCertPrivateKey = System.getenv("TEMPORAL_CLOUD_PRIVATE_KEY_PATH");

    // Open the key and certificate as Input Streams
    InputStream clientCertInputStream = new FileInputStream(clientCertFile);
    InputStream clientKeyInputStream = new FileInputStream(clientCertPrivateKey);

    // Generate the sslContext using the Client Cert and Key
    SslContext sslContext = SimpleSslContextBuilder.forPKCS8(clientCertInputStream, clientKeyInputStream).build();

    // Specify the host and port of your Temporal Cloud Namespace
    // Host and port format: namespace.unique_id.tmprl.cloud:port
    String namespace = System.getenv("TEMPORAL_CLOUD_NAMESPACE");
    String gRPCEndpoint = System.getenv("TEMPORAL_CLOUD_GRPC_ENDPOINT");

    // Specify the IP address, port, and SSL Context for the Service Stubs options
    WorkflowServiceStubsOptions stubsOptions = WorkflowServiceStubsOptions.newBuilder()
            .setSslContext(sslContext)
            .setTarget(gRPCEndpoint)
            .build();

    // Generate the gRPC stubs using the options provided
    WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(stubsOptions);

    // Specify the namespace in the Client options
    WorkflowClientOptions options = WorkflowClientOptions.newBuilder()
            .setNamespace(namespace)
            .build();

    // Initialize the Temporal Client, passing in the gRPC stubs and Client options
    WorkflowClient client = WorkflowClient.newInstance(service, options);

    // Initialize a WorkerFactory, passing in the Temporal Client (WorkflowClient)
    WorkerFactory factory = WorkerFactory.newInstance(client);

    // Create a new Worker
    Worker worker = factory.newWorker("cloud-tasks");

    // Register the Workflow by passing in the class to the worker
    worker.registerWorkflowImplementationTypes(CloudWorkflowImpl.class);

    // Register the Activities by passing in an Activities object used for execution
    worker.registerActivitiesImplementations(new CloudActivitiesImpl());

    // Start the Worker
    factory.start();
  }
}
```

For more information about managing and generating client certificates for Temporal Cloud, see [How to manage certificates in Temporal Cloud](/cloud/certificates-intro).

For more information about configuring TLS to secure inter- and intra-network communication for a Temporal Cluster, see [Temporal Customization Samples](https://github.com/temporalio/samples-server).
