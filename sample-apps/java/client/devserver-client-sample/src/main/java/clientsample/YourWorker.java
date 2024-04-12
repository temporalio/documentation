package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class YourWorker {
    public static void initiateWorker(String[] args) {
        // Create a stub that accesses a Temporal Service on the local development machine
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // A Workflow Client can start, Signal, and Query a Workflow Execution, etc
        WorkflowClient client = WorkflowClient.newInstance(service);
        
        // A Workflow Factory creates Workers
        WorkerFactory factory = WorkerFactory.newInstance(client);
        
        // A Worker listens to one task queue, processing Workflows and Activities
        Worker worker = factory.newWorker("YourTaskQueue");

        // Register a Workflow implementation with this Worker
        // The implementation must be known at runtime to dispatch Workflow tasks
        worker.registerWorkflowImplementationTypes(YourWorkflowImpl.class);

        // Start all registered Workers. The Workers will start polling
        factory.start();
    }
}
