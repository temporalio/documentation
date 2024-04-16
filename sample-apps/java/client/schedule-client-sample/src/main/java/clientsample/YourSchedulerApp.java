package clientsample;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.client.WorkflowStub;
import io.temporal.client.schedules.Schedule;
import io.temporal.client.schedules.ScheduleClient;
import io.temporal.client.schedules.ScheduleOptions;
import io.temporal.client.schedules.ScheduleSpec;
import io.temporal.client.schedules.ScheduleActionStartWorkflow;
import io.temporal.serviceclient.WorkflowServiceStubs;
import java.util.Collections;

public class YourSchedulerApp {

    public static void main(String[] args) {

        // Create an instance that connects to a Temporal Service running on the local
        // machine, using the default port (7233)
        WorkflowServiceStubs service = WorkflowServiceStubs.newLocalServiceStubs();

        // Initialize the Schedule Client
        // This application uses the Client to communicate with the local Temporal Service
        ScheduleClient scheduleClient = ScheduleClient.newInstance(service);

        // Establish the Workflow Options
        WorkflowOptions workflowOptions = WorkflowOptions
            .newBuilder()
            .setWorkflowId("YourScheduledWorkflowId")
            .setTaskQueue("YourTaskQueue")
            .build();

        // Establish the Action that initiates Workflows
        ScheduleActionStartWorkflow startWorkflowAction = ScheduleActionStartWorkflow
            .newBuilder()
            .setWorkflowType(YourWorkflow.class)
            .setOptions(workflowOptions)
            .build();

        // Schedule a Workflow Execution every 3 minutes using Cron specifications
        ScheduleSpec spec = ScheduleSpec
            .newBuilder()
            .setCronExpressions(Collections.singletonList("*/3 * * * *"))
            .build();

        // Build the Schedule
        Schedule schedule = Schedule.newBuilder().setAction(startWorkflowAction).setSpec(spec).build();

        // Establish (empty) Schedule options
        ScheduleOptions scheduleOptions = ScheduleOptions.newBuilder().build();


        // Communicate the schedule through the Client to the Temporal Service
        scheduleClient.createSchedule("YourSchedule", schedule, scheduleOptions);

        System.out.println("Establishing the new schedule...");
        System.out.println("The new schedule appears at: http://localhost:8233/namespaces/default/schedules");
        System.out.println("Scheduled Workflow executions: http://localhost:8233/namespaces/default/workflows");
    }
}

