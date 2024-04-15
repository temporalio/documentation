package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.worker.Worker;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.worker.WorkerFactory;
import io.temporal.serviceclient.WorkflowServiceStubs;

import io.temporal.serviceclient.SimpleSslContextBuilder;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;

import io.grpc.netty.shaded.io.netty.handler.ssl.SslContext;

import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import java.lang.System;

import javax.net.ssl.SSLException;

public class YourWorker {

    private static String getenv(String envName) {
        String value = System.getenv(envName);
        if (value == null || value.isEmpty()) {
            System.err.println("Error: Environmental variable " + envName + " could not be retrieved.");
            System.exit(1);
        }
        return value;
    }

    public static void initiateWorker(String[] args) {
        // Populate prerequisites from environmental variables
        String namespace = getenv("TEMPORAL_CLOUD_NAMESPACE");
        String gRPCEndpoint = getenv("TEMPORAL_CLOUD_GRPC_ENDPOINT");
        String clientKeyPath = getenv("TEMPORAL_MTLS_PRIVATE_KEY_PATH");
        String clientCertPath = getenv("TEMPORAL_MTLS_CERT_PATH");

        try {
            // Generate an SSL context
            InputStream clientCertInputStream = new FileInputStream(clientCertPath);
            InputStream clientKeyInputStream = new FileInputStream(clientKeyPath);
            SslContext sslContext = SimpleSslContextBuilder.forPKCS8(clientCertInputStream, clientKeyInputStream).build();

            // Set the Service Stub options (SSL context and gRPC endpoint)
            WorkflowServiceStubsOptions stubsOptions = WorkflowServiceStubsOptions
                .newBuilder()
                .setSslContext(sslContext)
                .setTarget(gRPCEndpoint)
                .build();

            // Create a stub that accesses a Temporal Service on Temporal Cloud
            WorkflowServiceStubs serviceStub = WorkflowServiceStubs.newServiceStubs(stubsOptions);

            // Set the Client options
            WorkflowClientOptions clientOptions = WorkflowClientOptions
                .newBuilder()
                .setNamespace(namespace)
                .build();

            // Initialize the Temporal Client
            WorkflowClient client = WorkflowClient.newInstance(serviceStub, clientOptions);

            // A WorkerFactory creates Workers
            WorkerFactory factory = WorkerFactory.newInstance(client);
        
            // A Worker listens to one Task Queue
            // This Worker processes both Workflows and Activities
            Worker worker = factory.newWorker("YourTaskQueue");

            // Register a Workflow implementation with this Worker
            // The implementation must be known at runtime to dispatch Workflow tasks
            worker.registerWorkflowImplementationTypes(YourWorkflowImpl.class);

            // Start all registered Workers. The Workers will start polling
            factory.start();
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
        } catch (SSLException e) {
            System.out.println(e.getMessage());
        }
    }
}
