package clientsample;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface YourWorkflow {
    @WorkflowMethod String initiateWorkflow();
}
