/* dacx */
package backgroundcheckreplay.workers;

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
import backgroundcheckreplay.BackgroundCheckReplayActivitiesImpl;
import backgroundcheckreplay.BackgroundCheckReplayWorkflowImpl;
import backgroundcheckreplay.BackgroundCheckReplayNonDeterministicWorkflowImpl;
import java.io.IOException;


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
    worker.registerWorkflowImplementationTypes(BackgroundCheckReplayWorkflowImpl.class);

    // Register the Activities by passing in an Activities object used for execution
    worker.registerActivitiesImplementations(new BackgroundCheckReplayActivitiesImpl());

    // Start the Worker
    factory.start();
  }
}