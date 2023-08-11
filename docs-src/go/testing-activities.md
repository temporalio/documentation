---
id: testing-activities
title: Testing Activities
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Test Activities
tags:
  - guide-context
---

An Activity can be tested with a mock Activity environment, which provides a way to mock the Activity context, listen to Heartbeats, and cancel the Activity.
This behavior allows you to test the Activity in isolation by calling it directly, without needing to create a Worker to run the Activity.

## Mock and override Activities

When running unit tests on Workflows, we want to test the Workflow logic in isolation. Additionally, we want to inject Activity errors during our test runs. The test framework provides two mechanisms that support these scenarios: Activity mocking and Activity overriding. Both of these mechanisms allow you to change the behavior of Activities invoked by your Workflow without the need to modify the actual Workflow code.

Let's take a look at a test that simulates a test that fails via the "Activity mocking" mechanism.

```go
func (s *UnitTestSuite) Test_SimpleWorkflow_ActivityFails() {
        s.env.OnActivity(SimpleActivity, mock.Anything, mock.Anything).Return(
          "", errors.New("SimpleActivityFailure"))
        s.env.ExecuteWorkflow(SimpleWorkflow, "test_failure")

        s.True(s.env.IsWorkflowCompleted())

        err := s.env.GetWorkflowError()
        s.Error(err)
        var applicationErr *temporal.ApplicationError
        s.True(errors.As(err, &applicationErr))
        s.Equal("SimpleActivityFailure", applicationErr.Error())
}
```

This test simulates the execution of the Activity `SimpleActivity` that is invoked by our Workflow `SimpleWorkflow` returning an error. We accomplish this by setting up a mock on the test environment for the `SimpleActivity` that returns an error.

```go
s.env.OnActivity(SimpleActivity, mock.Anything, mock.Anything).Return(
  "", errors.New("SimpleActivityFailure"))
```

With the mock set up we can now execute the Workflow via the `s.env.ExecuteWorkflow(...)` method and assert that the Workflow completed successfully and returned the expected error.

Simply mocking the execution to return a desired value or error is a pretty powerful mechanism to isolate Workflow logic.
However, sometimes we want to replace the Activity with an alternate implementation to support a more complex test scenario.
Let's assume we want to validate that the Activity gets called with the correct parameters.

```go
func (s *UnitTestSuite) Test_SimpleWorkflow_ActivityParamCorrect() {
        s.env.OnActivity(SimpleActivity, mock.Anything, mock.Anything).Return(
          func(ctx context.Context, value string) (string, error) {
                s.Equal("test_success", value)
                return value, nil
        })
        s.env.ExecuteWorkflow(SimpleWorkflow, "test_success")

        s.True(s.env.IsWorkflowCompleted())
        s.NoError(s.env.GetWorkflowError())
}
```

In this example, we provide a function implementation as the parameter to `Return`.
This allows us to provide an alternate implementation for the Activity `SimpleActivity`.
The framework will execute this function whenever the Activity is invoked and pass on the return value from the function as the result of the Activity invocation.

Additionally, the framework will validate that the signature of the "mock" function matches the signature of the original Activity function.

Since this can be an entire function, there is no limitation as to what we can do here. In this example, we assert that the `value` param has the same content as the value param we passed to the Workflow.
