/* dacx */
package backgroundcheckboilerplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.withSettings;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import io.temporal.testing.TestWorkflowEnvironment;
import io.temporal.testing.TestWorkflowExtension;
import io.temporal.worker.Worker;

/*
Temporal provides the `TestWorkflowEnvironment` and `TestWorkflowExtension` classes
to allow for testing Workflows. There are two ways to test Workflows; the first
is to test the Workflow code without invoking the real Activities by mocking
the Workflow's Activities and the second is to test the Workflow and its Activities
in their entirety. This section will focus on the first scenario while a following
section will cover the later. 

Testing your Workflows without invoking your Activities can be useful for testing 
Workflow specific logic without having to worry about the Activity invocation 
producing a side-effect or having any Activity downstream dependency, such as a 
microservice, be available during the duration of your testing.

As for the actual testing code, testing Workflows is similar to testing non-Temporal java code.

Some examples of things an Workflow can be tested for are:
- Exceptions thrown when invoking the Workflow Execution.
- Exceptions thrown when checking for the result of the Workflow Execution.
- Workflow return values. Check to ensure the return value is expected.

We can also perform a Workflow Replay test, and we'll provide detailed coverage of this topic in another section.
*/

public class BackgroundCheckBoilerplateWorkflowTest {

  // Use JUnit Extensions to simplify the creation of the test environment.
  // This creates an environment and registers the Workflow to a Worker for testing.
  // If you would rather set this up yourself, look into TestWorkflowEnvironment
  @RegisterExtension
  public static final TestWorkflowExtension testWorkflowExtension = TestWorkflowExtension
      .newBuilder().setWorkflowTypes(BackgroundCheckBoilerplateWorkflowImpl.class)
      .setDoNotStart(true).build();

  @Test
  public void testSuccessfulBackgroundCheckBoilerplateWithMocks(TestWorkflowEnvironment testEnv,
      Worker worker, BackgroundCheckBoilerplateWorkflow workflow) {
    
    // Create a mock object of your Activities
    BackgroundCheckBoilerplateActivities mockedActivities =
        mock(BackgroundCheckBoilerplateActivities.class, withSettings().withoutAnnotations());

    // Specify what value should be returned when a specific Activity is invoked.
    // Your Activity must have the same method name here as it would within your Workflow
    when(mockedActivities.ssnTraceActivity("555-55-5555")).thenReturn("pass");

    // Register the Workflow's Activities with the Worker provided by the Extension
    worker.registerActivitiesImplementations(mockedActivities);

    // Start the test environment
    testEnv.start();

    // Request execution of the backgroundCheck Workflow
    // This will execute your Workflow, calling the Mocked Activities in place
    // of your actual implementation of the Activities.
    String pass_output = workflow.backgroundCheck("555-55-5555");
  
    assertEquals("pass", pass_output);
  
  }
}

/* 
As for the code, first you register your Workflow with the `TestWorkflowExtension`.
This extension allows you to pass in a `TestWorklowEnvironment`, `Worker`, and 
an instance of your Workflow into your tests. To test your Workflow using mocked 
activities you then create a mocked  object of your Activity class to be used for 
testing. Then you mock the Activity method, in this case `ssNTraceAcvitity`, so 
that when when a specific value is passed to the Activity it returns a specific result. 
Then the mocked object is used to register the mocked Activities with the Worker
being used in the test environment. Then you start the test environment, invoke 
your Workflow as usual, passing in the specific value for your Activity so that 
the Activity returns the result you are expecting. Then you assert that the 
results are what you expected.

Doiong this allows you to test the Workflow code without having to worry
about actually invoking the Activity.
*/

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-tests
title: Testing Workflows
description: How to test your Temporal Application Workflows
label: Test framework details
lines: 4-73
tags:
- testing
- developer guide
- test framework
- java sdk
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-tests-details
title: Add Workflow method test using Mocks
description: Details about how to test Workflow code in isolation using Mocks
label: Test Workflow code details
tags:
- testing
- developer guide
- java sdk
lines: 75-90
@dacx */