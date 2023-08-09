---
id: testing-workflows
title: Testing Workflows
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Test Workflows
tags:
  - developer-guide-doc-type
  - go sdk
  - testing
  - testing-guide-doc-type
  - workflows
---

When running unit tests on Workflows, we want to test the Workflow logic in isolation.
The simplest test case we can write is to have the test environment execute the Workflow and then evaluate the results.

```go
func (s *UnitTestSuite) Test_SimpleWorkflow_Success() {
        s.env.ExecuteWorkflow(SimpleWorkflow, "test_success")

        s.True(s.env.IsWorkflowCompleted())
        s.NoError(s.env.GetWorkflowError())
}
```

Calling `s.env.ExecuteWorkflow(...)` executes the Workflow logic and any invoked Activities inside the test process. The first parameter of `s.env.ExecuteWorkflow(...)` contains the Workflow functions, and any subsequent parameters contain values for custom input parameters declared by the Workflow.

> Note that unless the Activity invocations are mocked or Activity implementation replaced (see [Activity mocking and overriding](#activity-mocking-and-overriding)), the test environment will execute the actual Activity code including any calls to outside services.

After executing the Workflow in the above example, we assert that the Workflow ran through completion via the call to `s.env.IsWorkflowComplete()`. We also assert that no errors were returned by asserting on the return value of `s.env.GetWorkflowError()`.
If our Workflow returned a value, we could have retrieved that value via a call to `s.env.GetWorkflowResult(&value)` and had additional asserts on that value.

### Query tests

`TestWorkflowEnvironment` instances have a [`QueryWorkflow()` method](https://pkg.go.dev/go.temporal.io/temporal/internal#TestWorkflowEnvironment.QueryWorkflow) that lets you query the state of the currently running Workflow.
For example, suppose you have a Workflow that lets you query the progress of a long running task as shown below.

```go
func ProgressWorkflow(ctx workflow.Context, percent int) error {
	logger := workflow.GetLogger(ctx)

	err := workflow.SetQueryHandler(ctx, "getProgress", func(input []byte) (int, error) {
		return percent, nil
	})
	if err != nil {
		logger.Info("SetQueryHandler failed.", "Error", err)
		return err
	}

	for percent = 0; percent<100; percent++ {
                // Important! Use `workflow.Sleep()`, not `time.Sleep()`, because Temporal's
                // test environment doesn't stub out `time.Sleep()`.
		workflow.Sleep(ctx, time.Second*1)
	}

	return nil
}
```

This Workflow tracks the current progress of a task in percentage terms, and increments the percentage by 1 every second.
Below is how you would write a test case that queries this Workflow.
Note that you should always query the Workflow either after `ExecuteWorkflow()` is done or in a `RegisterDelayedCallback()` callback, otherwise you'll get a `runtime error` panic.

```go
func (s *UnitTestSuite) Test_ProgressWorkflow() {
	value := 0

	// After 10 seconds plus padding, progress should be 10.
	// Note that `RegisterDelayedCallback()` doesn't actually make your test wait for 10 seconds!
	// Temporal's test framework advances time internally, so this test should take < 1 second.
	s.env.RegisterDelayedCallback(func() {
		res, err := s.env.QueryWorkflow("getProgress")
		s.NoError(err)
		err = res.Get(&value)
		s.NoError(err)
		s.Equal(10, value)
	}, time.Second*10+time.Millisecond*1)

	s.env.ExecuteWorkflow(ProgressWorkflow, 0)

	s.True(s.env.IsWorkflowCompleted())

	// Once the workflow is completed, progress should always be 100
	res, err := s.env.QueryWorkflow("getProgress")
	s.NoError(err)
	err = res.Get(&value)
	s.NoError(err)
	s.Equal(value, 100)
}
```

:::note

`RegisterDelayedCallback` can also be used to send [Signals](/concepts/what-is-a-signal).
When using "Signal-With-Start", set the delay to `0`.
:::
