// dacx
package durability

import (
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/testsuite"
	"go.temporal.io/sdk/worker"

	"documentation-samples-go/dev-guide/chapters/durability/activities"
	"documentation-samples-go/dev-guide/chapters/durability/workflows"
)

// UnitTestSuite is a struct that wraps around the testing suites
type UnitTestSuite struct {
	// Add testify test suite package
	suite.Suite
	// Add the Temporal Go SDK Workflow test suite
	testsuite.WorkflowTestSuite
}

// Test_BackgroundCheckApplication runs the full set of tests in this application
func Test_BackgroundCheckApplication(t *testing.T) {
	s := &UnitTestSuite{}
	suite.Run(t, s)
}

const ssn string = "555-55-5555"

// Test_BackgroundCheckWorkflow tests the BackgroundCheck Workflow function
func (s *UnitTestSuite) Test_BackgroundCheckWorkflow() {
	// Initialize a Temporal Go SDK Workflow test environment
	// The best practice is to create a new environment for each Workflow test
	// Doing so ensures that each test runs in its own isolated sandbox
	env := s.NewTestWorkflowEnvironment()
	// Mock the Activity Execution for the Workflow
	ssnTraceResult := "pass"
	env.OnActivity(activities.SSNTraceActivity, mock.Anything, ssn).Return(&ssnTraceResult, nil)
	// Run the Workflow in the test environment
	env.ExecuteWorkflow(workflows.BackgroundCheck, ssn)
	// Check that the Workflow reach a completed status
	s.True(env.IsWorkflowCompleted())
	// Check whether the Workflow returned an error
	s.NoError(env.GetWorkflowError())
	// Check that no error is returned while getting the result
	// And check for the expected value of the Workflow result
	var result string
	s.NoError(env.GetWorkflowResult(&result))
	s.Equal(result, ssnTraceResult)
}

// Test_SSNTraceActivity tests the SSNTraceActivity function
func (s *UnitTestSuite) Test_SSNTraceActivity() {
	// Create a test environment
	env := s.NewTestActivityEnvironment()
	// Register Activity with the enviroment
	env.RegisterActivity(activities.SSNTraceActivity)
	// Run the Activity in the test enviroment
	future, err := env.ExecuteActivity(activities.SSNTraceActivity, ssn)
	// Check there was no error on the call to execute the Activity
	s.NoError(err)
	// Check that there was no error returned from the Activity
	var result string
	s.NoError(future.Get(&result))
	// Check for the expected return value
	s.Equal("pass", result)
}

/*
Add the Replay test to the set of application tests.
The Replayer is available from the `go.temporal.io/sdk/worker` package in the SDK.
Register the Workflow Definition and then specify an existing Event History to compare to.

Run the tests in the test directory (`go test`).
If the Workflow Definition and the Event History are incompatible then the test fails.
*/

// TestReplayWorkflowHistoryFromFile tests for Event History compatability.
func (s *UnitTestSuite) TestReplayWorkflowHistoryFromFile() {
	// Create a new Replayer
	replayer := worker.NewWorkflowReplayer()
	// Register the Workflow with the Replayer
	replayer.RegisterWorkflow(workflows.BackgroundCheck)
	// Compare the current Workflow code against the existing Event History
	// This call fails unless updated to use 'backgroundcheck_workflow_event_history_with_timer.json'
	err := replayer.ReplayWorkflowHistoryFromJSONFile(nil, "backgroundcheck_workflow_event_history.json")
	s.NoError(err)
}

/* @dacx
id: add-replay-test-to-background-check-workflow
title: Add a Replay test
description: Define the code needed to run a Worker Process in Go.
label: Add Replay test
lines: 71-90
tags:
- testing
- replay test
- replayer
@dacx */
