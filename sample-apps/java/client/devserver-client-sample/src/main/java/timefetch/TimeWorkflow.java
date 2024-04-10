package timefetch;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface TimeWorkflow {
    @WorkflowMethod String getTime();
}
