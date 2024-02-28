/* dacx */
package backgroundcheckreplay;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;


// Workflow Interfaces must be annotated with @WorkflowInterface
@WorkflowInterface
public interface BackgroundCheckReplayWorkflow {

  // The Workflow Method within the interface must be annotated with @WorkflowMethod
  @WorkflowMethod
  public String backgroundCheck(String socialSecurityNumber);

}