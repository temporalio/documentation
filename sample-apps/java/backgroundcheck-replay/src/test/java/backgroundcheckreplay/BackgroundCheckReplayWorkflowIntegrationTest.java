/* dacx */
package backgroundcheckreplay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import io.temporal.testing.TestWorkflowEnvironment;
import io.temporal.testing.TestWorkflowExtension;
import io.temporal.worker.Worker;


public class BackgroundCheckReplayWorkflowIntegrationTest {

  // Use JUnit Extensions to simplify the creation of the test environment.
  // This creates an environment and registers the Workflow to a Worker for testing.
  // If you would rather set this up yourself, look into TestWorkflowEnvironment
  @RegisterExtension
  public static final TestWorkflowExtension testWorkflowExtension = TestWorkflowExtension
      .newBuilder().setWorkflowTypes(BackgroundCheckReplayWorkflowImpl.class).setDoNotStart(true).build();

  @Test
  public void testSuccessfulBackgroundCheckBoilerplate(TestWorkflowEnvironment testEnv, Worker worker,
      BackgroundCheckReplayWorkflow workflow) {

    // Register the Workflow's Activities with the Worker provided by the Extension
    worker.registerActivitiesImplementations(new BackgroundCheckReplayActivitiesImpl());

    // Start the test environment
    testEnv.start();

    // Request execution of the backgroundCheck Workflow
    // This will execute your entire Workflow, along with every Activity the
    // Workflow calls
    String output = workflow.backgroundCheck("555-22-3333");

    // Check for the expected return value
    assertEquals("pass", output);
  }
}
