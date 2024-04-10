package timefetch;

import io.temporal.client.WorkflowClient;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class TimeWorker {
    public static void runWorker(String[] args) {
        // Create Developer Server local service stub
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // A Workflow Client can start, Signal, and Query a Workflow Execution
        WorkflowClient client = WorkflowClient.newInstance(service);
        
        // A Workflow Factory creates workers
        WorkerFactory factory = WorkerFactory.newInstance(client);
        
        // A Worker listens to one task queue, processing workflows and activities
        Worker worker = factory.newWorker("TimeFetchQueue");

        // Register a Workflow implementation with this worker
        // The implementation must be known at runtime to dispatch workflow tasks
        worker.registerWorkflowImplementationTypes(TimeWorkflowImpl.class);

        // Register Activity Types from the Activity vendor with the worker
        // Each activity is stateless and thread-safe, so use a single shared instance
        worker.registerActivitiesImplementations(new TimeActivitiesImpl());

        // Start all registered workers. The workers will start polling
        factory.start();
    }
}
