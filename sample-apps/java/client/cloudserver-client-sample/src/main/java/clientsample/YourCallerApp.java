// @@@SNIPSTART javasdk-build-caller-app-using-temporal-cloud
package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowStub;

import io.temporal.serviceclient.SimpleSslContextBuilder;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.serviceclient.WorkflowServiceStubsOptions;

import io.grpc.netty.shaded.io.netty.handler.ssl.SslContext;

import java.io.InputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;

import java.lang.System;

import javax.net.ssl.SSLException;

public class YourCallerApp {

    private static String getenv(String envName) {
        String value = System.getenv(envName);
        if (value == null || value.isEmpty()) {
            System.err.println("Error: Environmental variable " + envName + " could not be retrieved.");
            System.exit(1);
        }
        return value;
    }

    public static void main(String[] args) {
        // Populate connection pre-requisites from environmental variables
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

             // Create a stub that accesses a Temporal Service
            WorkflowServiceStubs serviceStub = WorkflowServiceStubs.newServiceStubs(stubsOptions);

            // Set the Client options
            WorkflowClientOptions clientOptions = WorkflowClientOptions
                .newBuilder()
                .setNamespace(namespace)
                .build();

            // Initialize the Temporal Client
            // This application uses the Client to communicate with the Temporal Service
            WorkflowClient client = WorkflowClient.newInstance(serviceStub, clientOptions);

            // A Worker listens to one Task QueueFileInputStream
            // This Worker processes both Workflows and Activities
            WorkflowOptions options = WorkflowOptions
                .newBuilder()
                .setTaskQueue("YourTaskQueue")
                .build();

            // Build the Workflow stub for dynamic invocation
            YourWorkflow workflow = client.newWorkflowStub(YourWorkflow.class, options);

            // Run the Workflow and wait for the results
            String results = workflow.initiateWorkflow();
            System.out.println(results);
        } catch (FileNotFoundException e) {
            System.out.println(e.getMessage());
        } catch (SSLException e) {
            System.out.println(e.getMessage());
        }

        System.exit(0);
    }
}
// @@@SNIPEND
