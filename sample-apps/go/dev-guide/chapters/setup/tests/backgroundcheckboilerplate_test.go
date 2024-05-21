// dacx
package setup

import (
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
	"go.temporal.io/sdk/testsuite"

	"documentation-samples-go/dev-guide/chapters/setup/activities"
	"documentation-samples-go/dev-guide/chapters/setup/workflows"
)

/*
**How to add a Testing Framework and Tests for the Workflow and Activity.**

Each Temporal SDK has a testing suite that can be used in conjunction with a typical language specific testing framework.
In the Temporal Go SDK, the `testsuite` package (https://pkg.go.dev/go.temporal.io/sdk/testsuite)  provides a test environment in which the Workflow and Activity code may be run for test purposes.
*/

// UnitTestSuite is a struct that wraps around the testing suites
type UnitTestSuite struct {
	// Add testify test suite package
	suite.Suite
	// Add the Temporal Go SDK Workflow test suite
	testsuite.WorkflowTestSuite
}

/*
In this example, we use a custom struct that absorbs both the testing functionality from testify (https://pkg.go.dev/github.com/stretchr/testify/suite) via `suite.Suite` and the testing functionality from the Temporal test framework via `testsuite.WorkflowTestSuite`.
Next we create a regular test function recognized by the `go test` command, and pass an instance of the struct to `suite.Run`.
*/

// Test_BackgroundCheckApplication runs the full set of tests in this application.
func Test_BackgroundCheckApplication(t *testing.T) {
	s := &UnitTestSuite{}
	suite.Run(t, s)
}

/*
We can test Workflow code for the following conditions:

- Workflow status. For example, did the Workflow reach a completed status?
- Workflow returned an error. Did the Workflow function return an error?
- Error when checking for a result of a Workflow. Is there an error in getting the result returned by the Workflow?
- Workflow return value. If the Workflow did return something other than an error, is it what you expected it to be?

We can also perform a Workflow Replay test, and we'll provide detailed coverage of this topic in another section.
*/

const ssn string = "555-55-5555"

// Test_BackgroundCheckWorkflow tests the BackgroundCheck Workflow function
func (s *UnitTestSuite) Test_BackgroundCheckWorkflow() {
	// Initialize a Temporal Go SDK Workflow test environment.
	// The best practice is to create a new environment for each Workflow test.
	// Doing so ensures that each test runs in its own isolated sandbox.
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
	s.Equal(ssnTraceResult, result)
}

/*
Calling `env.ExecuteWorkflow(...)` executes the Workflow logic and any invoked Activities inside the test process.
The first parameter of `env.ExecuteWorkflow(...)` contains a reference to Workflow function and any parameters that the Workflow needs.

The call to `env.OnActivity` is important, because if this call is not made to "mock" the execution or another function is used to replace it, the test environment will execute the actual Activity code including any calls to outside services.

After executing the Workflow in the above example, we assert that the Workflow ran through completion via the call to `env.IsWorkflowComplete()`.
We also assert that no errors were returned by asserting on the return value of `env.GetWorkflowError()`.

If our Workflow returned a value, we could have retrieved that value via a call to `s.env.GetWorkflowResult(&value)` and had additional asserts on that value.
*/

/*
We can test Activity code for the following conditions:

- Error when invoking the Activity Execution.
- Error when checking for the result of the Activity Execution.
- Activity return values. Check to ensure the return value is expected.
*/

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
	// Check for the expected return value.
	s.Equal("pass", result)
}

/* @dacx
id: backgroundcheck-boilerplate-add-test-framework
title: Add a testing framework
description: How to add a testing framework to your Temporal Application.
label: Test framework
lines: 2-28, 35-39
tags:
- testing
- developer guide
- test framework
- go sdk
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-test-framework-details
title: Add a testing framework details
description: How to add a testing framework to your Temporal Application.
label: Test framework details
lines: 30-33
tags:
- testing
- developer guide
- test framework
- go sdk
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-tests
title: Add Workflow function tests
description: How to test Workflow code
label: Test Workflow code
tags:
- testing
- developer guide
- go sdk
lines: 41-74
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-workflow-test-details
title: Add Workflow function test details
description: Details about how to test Workflow code
label: Test Workflow code details
tags:
- testing
- developer guide
- go sdk
lines: 76-86
@dacx */

/* @dacx
id: backgroundcheck-boilerplate-add-activity-tests
title: Add Activity function tests
description: How to test Activity code
label: Test Activity code
lines: 88-111
tags:
- testing
- developer guide
- go sdk
@dacx */
