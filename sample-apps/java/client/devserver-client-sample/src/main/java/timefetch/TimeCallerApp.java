package timefetch;

import java.io.BufferedOutputStream;
import java.io.PrintStream;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowStub;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class TimeCallerApp {
    static {
        // Enable print statements
        System.setOut(new PrintStream(new BufferedOutputStream(System.out), true));
        System.setErr(new PrintStream(new BufferedOutputStream(System.err), true));
    }

    public static void main(String[] args) {
        // Create Developer Server local service stub
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // Create a new Workflow Client
        WorkflowClient client = WorkflowClient.newInstance(service);

        // Establish the Workflow Options
        WorkflowOptions options = WorkflowOptions
            .newBuilder()
            .setTaskQueue("TimeFetchQueue")
            .build();

        // Build the Workflow stub for dynamic invocation
        TimeWorkflow workflowStub = client.newWorkflowStub(TimeWorkflow.class, options);

        // Run the Workflow and wait for the results string
        System.out.println("It may take time to fetch the information. Please be patient.");
        System.out.println("You can track the Workflow progress with the Web UI.");
        String results = workflowStub.getTime();
        System.out.println(results);
        System.exit(0);
    }
}

