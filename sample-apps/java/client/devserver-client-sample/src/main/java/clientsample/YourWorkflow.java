package clientsample;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

// An empty Workflow for demonstration only
@WorkflowInterface
public interface YourWorkflow {
    @WorkflowMethod String initiateWorkflow();
}
