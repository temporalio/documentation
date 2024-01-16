/* dacx */
package backgroundcheckboilerplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import io.temporal.testing.TestActivityExtension;

/*
Temporal provides the `TestActivityEnvironment` and `TestActivityExtension` classes
to allow for testing Activities outside the scope of a Workflow. Testing
Activities is similar to testing non-Temporal java code.

Some examples of things an Activity can be tested for are:
- Exceptions thrown when invoking the Activity Execution.
- Exceptions thrown when checking for the result of the Activity Execution.
- Activity return values. Check to ensure the return value is expected.

This example asserts that the expected value was returned by the invocation of the Activity.
*/


public class BackgroundCheckBoilerplateActivitiesTest {

  // Use JUnit Extensions to simplify the creation of the test environment.
  // This creates an environment and registers Activities to a Worker for testing.
  // If you would rather set this up yourself, look into TestActivityEnvironment
  @RegisterExtension
  public static final TestActivityExtension activityExtension = TestActivityExtension.newBuilder()
      .setActivityImplementations(new BackgroundCheckBoilerplateActivitiesImpl()).build();

  // Test the Activity in isolation from the Workflow
  @Test
  public void testSsnTraceActivity(BackgroundCheckBoilerplateActivities activities) {
    String socialSecurityNumber = "111-22-3333";

    // Run the Activity in the test environment
    String result = activities.ssnTraceActivity(socialSecurityNumber);

    // Check for the expected return value
    assertEquals("pass", result);
  }

}

/*
Temporal provides the `TestActivityExtension` class to simplify the creation of 
the test environment. Using this extension you provide your Activity 
to register with a Worker created by the testing framework to be used during testing. 
The extension provides a a stubbed Activity  object to each test as well as 
manage the lifecycle of the test environment.
If you require more granular control of the test environments, you can manually create
and destroy all these parts in methods annotated with `@BeforeEach` and `@AfterEach`
as defined by JUnit.

You annotate the method with @Test and test the results of the Activity via assertions.
*/

/* @dacx
id: backgroundcheck-boilerplate-add-activity-tests
title: Testing Activities
description: How to add a testing framework to your Temporal Application.
label: Test framework
lines: 4-44
tags:
- testing
- developer guide
- test framework
- java sdk
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-activity-tests-details
title: Add Activity method tests
description: How to test Activity code
label: Test Activity code
lines: 46-57
tags:
- testing
- developer guide
- java sdk
@dacx */