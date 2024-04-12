package clientsample;

import io.temporal.workflow.Workflow;

public class YourWorkflowImpl implements YourWorkflow {
    @Override
    public String initiateWorkflow() {
        return "Your Workflow Results";
    }
}
