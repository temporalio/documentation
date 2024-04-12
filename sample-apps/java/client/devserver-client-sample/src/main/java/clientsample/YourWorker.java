package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class YourWorker {
    public static void initiateWorker(String[] args) {
        // Create Developer Server local service stub
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // A Workflow Client can start, Signal, and Query a Workflow Execution, etc
        WorkflowClient client = WorkflowClient.newInstance(service);
        
        // A Workflow Factory creates workers
        WorkerFactory factory = WorkerFactory.newInstance(client);
        
        // A Worker listens to one task queue, processing workflows and activities
        Worker worker = factory.newWorker("YourTaskQueue");

        // Register a Workflow implementation with this worker
        // The implementation must be known at runtime to dispatch workflow tasks
        worker.registerWorkflowImplementationTypes(YourWorkflowImpl.class);

        // Start all registered workers. The workers will start polling
        factory.start();
    }
}
