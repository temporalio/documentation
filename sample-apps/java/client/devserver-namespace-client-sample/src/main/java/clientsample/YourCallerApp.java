// @@@SNIPSTART javasdk-build-caller-app-using-local-client-custom-namespace
package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowClientOptions;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowStub;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class YourCallerApp {

    public static void main(String[] args) {
        // Create an instance that connects to a Temporal Service running on the local
        // machine, using the default port (7233).
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

        // Initialize the Temporal Client
        // This application uses the Client to communicate with the Temporal Service
        WorkflowClient client = WorkflowClient.newInstance(service, clientOptions);

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
// @@@SNIPEND
