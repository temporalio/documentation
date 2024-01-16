/* dacx */
package backgroundcheckboilerplate;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
in their entirety. This section will focus on the second scenario while a previous
section will cover the first. 

As for the actual testing code, testing Workflows is similar to testing non-Temporal java code.

Some examples of things an Workflow can be tested for are:
- Exceptions thrown when invoking the Workflow Execution.
- Exceptions thrown when checking for the result of the Workflow Execution.
- Workflow return values. Check to ensure the return value is expected.

We can also perform a Workflow Replay test, and we'll provide detailed coverage of this topic in another section.
*/


public class BackgroundCheckBoilerplateWorkflowIntegrationTest {

  // Use JUnit Extensions to simplify the creation of the test environment.
  // This creates an environment and registers the Workflow to a Worker for testing.
  // If you would rather set this up yourself, look into TestWorkflowEnvironment
  @RegisterExtension
  public static final TestWorkflowExtension testWorkflowExtension = TestWorkflowExtension
      .newBuilder().setWorkflowTypes(BackgroundCheckBoilerplateWorkflowImpl.class).setDoNotStart(true).build();

  @Test
  public void testSuccessfulBackgroundCheckBoilerplate(TestWorkflowEnvironment testEnv, Worker worker,
      BackgroundCheckBoilerplateWorkflow workflow) {

    // Register the Workflow's Activities with the Worker provided by the Extension
    worker.registerActivitiesImplementations(new BackgroundCheckBoilerplateActivitiesImpl());

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

/*
This example tests a complete Workflow by invoking the Activities the Workflow
calls. This is, in reality, an integration test. Integration testing is useful
for ensuring the complete success of your entire Workflow. However, note that
any downstream dependencies of the Activities, such as microservice or databases,
must be online for the testing. Furthermore, any mutations the Activity would typically
perform as part of its regular execution will be performed as part of testing.
We recommend either having an entirely separate testing environment for testing
your Workflows, or testing your Workflow and Activity code in isolation, as
detailed in prior sections in this guide. 

As for the code, first you register your Workflow with the `TestWorkflowExtension`.
This extension allows you to pass in a `TestWorkflowEnvironment`, `Worker`, and 
an instance of your Workflow into your tests. From there you register your Activities
with the Worker, start the test environment, and invoke your Workflow as you would 
typically. Then you assert that the results are what you expected.
*/

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-integration-tests
title: Testing Workflow and Activity together (Integration Testing)
description: How to test the integration between your Workflows and Activities
label: Test framework
lines: 4-57
tags:
- testing
- developer guide
- test framework
- java sdk
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-integration-tests-details
title: Add Workflow Integration tests
description: How to test the integration between Workflows and Activities
label: Test Workflow Integration
tags:
- testing
- developer guide
- java sdk
lines: 59-75
@dacx */