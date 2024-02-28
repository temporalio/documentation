/* dacx */
package backgroundcheckreplay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import io.temporal.testing.TestActivityExtension;


public class BackgroundCheckReplayActivitiesTest {

  // Use JUnit Extensions to simplify the creation of the test environment.
  // This creates an environment and registers Activities to a Worker for testing.
  // If you would rather set this up yourself, look into TestActivityEnvironment
  @RegisterExtension
  public static final TestActivityExtension activityExtension = TestActivityExtension.newBuilder()
      .setActivityImplementations(new BackgroundCheckReplayActivitiesImpl()).build();

  // Test the Activity in isolation from the Workflow
  @Test
  public void testSsnTraceActivity(BackgroundCheckReplayActivities activities) {
    String socialSecurityNumber = "111-22-3333";

    // Run the Activity in the test environment
    String result = activities.ssnTraceActivity(socialSecurityNumber);

    // Check for the expected return value
    assertEquals("pass", result);
  }

}
