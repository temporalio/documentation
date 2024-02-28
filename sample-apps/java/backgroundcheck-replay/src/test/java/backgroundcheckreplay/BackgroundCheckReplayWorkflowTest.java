/* dacx */
package backgroundcheckreplay;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.withSettings;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.RegisterExtension;
import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

import java.io.File;


import io.temporal.testing.TestWorkflowEnvironment;
import io.temporal.testing.TestWorkflowExtension;
import io.temporal.worker.Worker;
import io.temporal.testing.WorkflowReplayer;

public class BackgroundCheckReplayWorkflowTest {

  // Use JUnit Extensions to simplify the creation of the test environment.
  // This creates an environment and registers the Workflow to a Worker for testing.
  // If you would rather set this up yourself, look into TestWorkflowEnvironment
  @RegisterExtension
  public static final TestWorkflowExtension testWorkflowExtension = TestWorkflowExtension
      .newBuilder().setWorkflowTypes(BackgroundCheckReplayWorkflowImpl.class)
      .setDoNotStart(true).build();

  @Test
  public void testSuccessfulBackgroundCheckBoilerplateWithMocks(TestWorkflowEnvironment testEnv,
      Worker worker, BackgroundCheckReplayWorkflow workflow) {
    
    // Create a mock object of your Activities
    BackgroundCheckReplayActivities mockedActivities =
        mock(BackgroundCheckReplayActivities.class, withSettings().withoutAnnotations());

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

  /*
  Add the Replay test to the set of application tests.
  The Replayer is available from the `io.temporal.testing` package in the SDK.
  Register the Workflow Definition and then specify an existing Event History to compare to.

  Run the tests in the test directory (`mvn test` or `./gradlew test`).
  If the Workflow Definition and the Event History are incompatible then the test fails.
  */  

  @Test
  public void testSuccessfulReplayFromFile(TestWorkflowEnvironment testEnv, Worker worker,
      BackgroundCheckReplayWorkflow workflow) throws Exception {

    File eventHistoryFile = new File("backgroundcheck_workflow_event_history.json");

    assertDoesNotThrow(() -> WorkflowReplayer.replayWorkflowExecution(eventHistoryFile,
        BackgroundCheckReplayWorkflowImpl.class));

  }
}

/* @dacx
id: add-replay-test-to-background-check-workflow
title: Add a Replay test
description: Define the code needed to run a Worker Process in Go.
label: Add Replay test
lines: 66-75
tags:
- testing
- replay test
- replayer
@dacx */