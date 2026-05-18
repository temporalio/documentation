package clientsample;

import io.temporal.workflow.Workflow;

// An empty Workflow for demonstration only
public class YourWorkflowImpl implements YourWorkflow {
    @Override
    public String initiateWorkflow() {
        return "Your Workflow Results";
    }
}
