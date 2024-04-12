package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowStub;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class YourCallerApp {

    public static void main(String[] args) {
        // Create Developer Server local service stub
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // Create a new Workflow Client
        WorkflowClient client = WorkflowClient.newInstance(service);

        // Establish the Workflow Options
        WorkflowOptions options = WorkflowOptions
            .newBuilder()
            .setTaskQueue("YourTaskQueue")
            .build();

        // Build the Workflow stub for dynamic invocation
        YourWorkflow workflowStub = client.newWorkflowStub(YourWorkflow.class, options);

        // Run the Workflow and wait for the results string
        String results = workflowStub.initiateWorkflow();
        System.out.println(results);
        System.exit(0);
    }
}

