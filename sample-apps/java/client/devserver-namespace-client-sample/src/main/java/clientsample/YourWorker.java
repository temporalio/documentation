package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.worker.Worker;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.worker.WorkerFactory;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class YourWorker {
    public static void initiateWorker(String[] args) {
        // Create the local Service stub
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // Fetch the Namespace name as an environmental variable
        String namespace = System.getenv("TEMPORAL_DEVELOPMENT_SERVER_NAMESPACE");
        if (namespace == null || namespace.isEmpty()) {
            System.err.println("Error: Environmental variable TEMPORAL_DEVELOPMENT_SERVER_NAMESPACE could not be retrieved");
            System.exit(1);
        }

        // Add the Namespace as a Client Option
        WorkflowClientOptions clientOptions = WorkflowClientOptions
            .newBuilder()
            .setNamespace(namespace)
            .build();

        // Create Client with Client Options
        WorkflowClient client = WorkflowClient.newInstance(service, clientOptions);

        // A Workflow Factory creates Workers
        WorkerFactory factory = WorkerFactory.newInstance(client);
        
        // A Worker listens to one task queue, processing Workflows and Activities
        Worker worker = factory.newWorker("YourTaskQueue");

        // Register a Workflow implementation with this Worker
        // The implementation must be known at runtime to dispatch Workflow tasks
        worker.registerWorkflowImplementationTypes(YourWorkflowImpl.class);

        // Start all registered workers. The workers will start polling
        factory.start();
    }
}
