/* dacx */
package backgroundcheckboilerplate.workers;

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
import backgroundcheckboilerplate.BackgroundCheckBoilerplateActivitiesImpl;
import backgroundcheckboilerplate.BackgroundCheckBoilerplateWorkflowImpl;
import java.io.IOException;

/*
A Temporal Cloud Worker requires that you specify the following in the Client connection options:

- Temporal Cloud Namespace
- Temporal Cloud Address
- Certificate and private key associated with the Namespace
*/

public class CloudWorker {
  public static void main(String[] args) throws IOException{

    // Get the key and certificate from your environment or local machine
    String clientCertFile = "./certificate.pem";
    String clientCertPrivateKey = "./private.key";

    // Open the key and certificate as Input Streams
    InputStream clientCertInputStream = new FileInputStream(clientCertFile);
    InputStream clientKeyInputStream = new FileInputStream(clientCertPrivateKey);

    // Generate the sslContext using the Client Cert and Key
    SslContext sslContext = SimpleSslContextBuilder.forPKCS8(clientCertInputStream, clientKeyInputStream).build();

    // Specify the host and port of your Temporal Cloud Namespace
	  // Host and port format: namespace.unique_id.tmprl.cloud:port
    String namespace = System.getenv("TEMPORAL_CLOUD_NAMESPACE");
    String port = System.getenv("TEMPORAL_CLOUD_PORT");
    String hostPort = namespace + ".tmprl.cloud:" + port;

    // Specify the IP address, port, and SSL Context for the Service Stubs options
    WorkflowServiceStubsOptions stubsOptions = WorkflowServiceStubsOptions.newBuilder()
            .setSslContext(sslContext)
            .setTarget(hostPort)
            .build();

    // Generate the gRPC stubs using the options provided
    WorkflowServiceStubs service = WorkflowServiceStubs.newServiceStubs(stubsOptions);

    // Specify the namespace in the Client options
    WorkflowClientOptions options = WorkflowClientOptions.newBuilder()
            .setNamespace(namespace)
            .build();

    // Initialize the Temporal Client, passing in the gRPC stubs and Client optins
    WorkflowClient client = WorkflowClient.newInstance(service, options);

    // Initialize a WorkerFactory, passing in the Temporal Client (WorkflowClient)
    WorkerFactory factory = WorkerFactory.newInstance(client);

    // Create a new Worker
    Worker worker = factory.newWorker("backgroundcheck-tasks");

    // Register the Workflow by passing in the class to the worker
    worker.registerWorkflowImplementationTypes(BackgroundCheckBoilerplateWorkflowImpl.class);

    // Register the Activities by passing in an Activities object used for execution
    worker.registerActivitiesImplementations(new BackgroundCheckBoilerplateActivitiesImpl());

    // Start the Worker
    factory.start();
  }
}

/*
When specifying the Temporal Cloud Namespace, make sure to append the Account Id 
as it appears in the url of the Cloud UI.

Consider the following Namespace url: https://cloud.temporal.io/namespaces/backgroundcheck-app.1a23b/workflows, 
if your Namespace is "backgroundcheck-app" and your Account Id is "1a23b", then 
you would specify your Namespace as "backgroundcheck-app.1a23b".

The Temporal Cloud gRPC connection address includes your 
[Namesapce](/concepts/what-is-a-namespace) and a port number: `<Namespace>.<AccountId>.tmprl.cloud:<port>`.
For example: `https://backgroundcheck-app.1a23b.tmprl.cloud:1234`.
There is an option to copy the grPC endpoint address from the Temporal Cloud UI.

![Copy your gRPC endpoint from the UI](/img/copy-grpc-endpoint.png)
*/

/* @dacx
id: backgroundcheck-boilerplate-cloud-worker
title: Run a Temporal Cloud Worker
description: Provide your Namespace, Address, and certificate key pair to connect to Temporal Cloud.
label: Cloud Worker
lines: 2-79
tags:
- worker
- temporal cloud
- developer guide
- temporal client
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-cloud-worker-details
title: Cloud Worker details
description: When specifying the Temporal Cloud Namespace, make sure to append the Account Id as it appears in the url of the Cloud UI.
label: Cloud Worker details
lines: 81-95
tags:
- worker
- cloud certificate
@dacx */