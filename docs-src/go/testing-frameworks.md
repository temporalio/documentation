---
id: testing-frameworks
title: Test frameworks
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Test frameworks
tags:
  - explanation-doc-type
  - go sdk
  - testing
---

The Temporal Go SDK provides a test framework to facilitate testing Workflow implementations.

This framework is suited for implementing unit tests as well as functional tests of the Workflow logic.

## Test setup

To run unit tests, we first define a test suite struct that absorbs both the basic suite functionality from [testify](https://pkg.go.dev/github.com/stretchr/testify/suite) via `suite.Suite` and the suite functionality from the Temporal test framework via `testsuite.WorkflowTestSuite`.

Because every test in this test suite will test our Workflow, we
add a property to our struct to hold an instance of the test environment. This allows us to initialize the test environment in a setup method.

For testing Workflows, we use a `testsuite.TestWorkflowEnvironment`.

```go
type UnitTestSuite struct {
        suite.Suite
        testsuite.WorkflowTestSuite

        env *testsuite.TestWorkflowEnvironment
}
```

Next, we implement a `SetupTest` method to set up a new test environment before each test.
Doing so ensures that each test runs in its own isolated sandbox.

```go
func (s *UnitTestSuite) SetupTest() {
        s.env = s.NewTestWorkflowEnvironment()
}
```

We also implement an `AfterTest` function where we assert that all the mocks we set up were indeed called by invoking `s.env.AssertExpectations(s.T())`.
Timeout for the entire test can be set using `SetTestTimeout` in the Workflow or Activity environment.

```go
func (s *UnitTestSuite) AfterTest(suiteName, testName string) {
        s.env.AssertExpectations(s.T())
}
```

Finally, we create a regular test function recognized by the `go test` command, and pass the struct to `suite.Run`.

```go
func TestUnitTestSuite(t *testing.T) {
        suite.Run(t, new(UnitTestSuite))
}
```
