---
tags:
  - temporal
  - community
  - go-ecommerce-tutorial
posted_on_: 2021-07-14T00:00:00Z
slug: build-an-ecommerce-app-with-temporal-part-3-testing
title: 'Building an eCommerce web app with Temporal, Part 3: Testing'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.9.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--truncate-->

## Introduction

In [Part 1](/blog/build-an-ecommerce-app-with-temporal-part-1) and [Part 2](/blog/build-an-ecommerce-app-with-temporal-part-2-reminder-emails), you built out a shopping cart with an abandoned cart email notification using long-lived Workflows.
Using Workflows and Activities, you can easily build features that would be tricky in a traditional RESTful API, like sending an email reminder when a user hasn't touched their cart in a while.

Temporal Workflows do more than make working with time easy, they also make your code easier to test.
Temporal provides testing utilities that help you stub out external services and programmatically advance time, which lets you [unit test your Workflows](/blog/descript-case-study/#to-code-or-not-to-code).
In this blog post, I'll demonstrate how to use Temporal's testing utilities to write fast unit tests for the shopping cart from Part 1 and Part 2.

## 30 Minute Video Version

We recorded this blogpost in video form for those who prefer that, or you can choose to read on below.

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=-GKxFDQSlEU' />

## Testing Setup

Below is a basic setup for testing a Temporal Workflow using `go test` and [Testify](https://github.com/stretchr/testify) based on [Temporal's Go testing docs](/go/how-to-test-workflow-definitions-in-go).
You can find the full source code for the test suite in the `workflow_test.go` file.

```go
package app

import (
	"context"
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"

	"go.temporal.io/sdk/activity"
	"go.temporal.io/sdk/testsuite"
	"go.temporal.io/sdk/client"

	"time"
)

type UnitTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite

	env *testsuite.TestWorkflowEnvironment
}

func (s *UnitTestSuite) SetupTest() {
	// You are responsible for calling `NewTestWorkflowEnvironment()` to initialize
	// Temporal's testing utilities, but you can also add any other setup you need
	// in this function.
	s.env = s.NewTestWorkflowEnvironment()
}

func (s *UnitTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

func TestUnitTestSuite(t *testing.T) {
	suite.Run(t, new(UnitTestSuite))
}
```

The most important property is the `env` property, which is an instance of [Temporal's `TestWorkflowEnvironment` struct](https://pkg.go.dev/go.temporal.io/temporal/internal#TestWorkflowEnvironment).
A `TestWorkflowEnvironment` provides utilities for testing Workflows, including executing Workflows, mocking Activities, and Signaling and Querying test Workflows.

The [testify package](https://github.com/stretchr/testify) also provides utilities for organizing tests, including setting up and tearing down test suites using `SetupTest()` and `AfterTest()`.
For example, you can define multiple test suites as shown below.

```go
type UnitTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite

	env *testsuite.TestWorkflowEnvironment
}

func (s *UnitTestSuite) SetupTest() {
	s.env = s.NewTestWorkflowEnvironment()
}

func (s *UnitTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}

type IntegrationTestSuite struct {
	suite.Suite
	testsuite.WorkflowTestSuite

	env *testsuite.TestWorkflowEnvironment
}

func (s *IntegrationTestSuite) SetupTest() {
	s.env = s.NewTestWorkflowEnvironment()
}

func (s *IntegrationTestSuite) AfterTest(suiteName, testName string) {
	s.env.AssertExpectations(s.T())
}
```

## Querying Workflows in tests

Remember that, in this app, a shopping cart is a Workflow.
To get the current state of the shopping cart, you send a Query to the Workflow, and to update the cart you send a Signal to the Workflow.

The below code shows how you can use `env.QueryWorkflow()` to send a Query to the shopping cart Workflow.

```go
func (s *UnitTestSuite) Test_QueryCart() {
	cart := CartState{Items: make([]CartItem, 0)}

	s.env.ExecuteWorkflow(CartWorkflow, cart)

  // Note that `ExecuteWorkflow()` is blocking: the Workflow is done by the time
  // the test gets to this line.
	s.True(s.env.IsWorkflowCompleted())

  // Send a query to the Workflow and assert that the shopping cart is still empty
	res, err := s.env.QueryWorkflow("getCart")
	s.NoError(err)
	err = res.Get(&cart)
	s.NoError(err)
	s.Equal(0, len(cart.Items))
}
```

Note that the above code Queries the Workflow _after the Workflow is done_.
In order to interact with the Workflow via Queries and Signals while the Workflow is running, you should use the test environment's `RegisterDelayedCallback()` function as shown below.
Make sure you call `RegisterDelayedCallback()` _before_ `ExecuteWorkflow()`, otherwise Temporal will execute the entire Workflow without executing the callback.

```go
func (s *UnitTestSuite) Test_IntermediateQuery() {
	cart := CartState{Items: make([]CartItem, 0)}

  // Register a callback to execute after 1 millisecond elapses in the Workflow.
	s.env.RegisterDelayedCallback(func() {
		res, err := s.env.QueryWorkflow("getCart")
		s.NoError(err)
		err = res.Get(&cart)
		s.NoError(err)
		s.Equal(len(cart.Items), 0)
	}, time.Millisecond*1)

	s.env.ExecuteWorkflow(CartWorkflow, cart)

	s.True(s.env.IsWorkflowCompleted())
}
```

You can Query a Workflow after it is completed, but you can't Signal a Workflow after it is completed.

## Signaling Workflows in tests

So in order to Signal a Workflow from your tests, you need to use `RegisterDelayedCallback()`.
Just remember that Signaling is asynchronous, so you need to add a separate `RegisterDelayedCallback()` to read the result of your Signal using a Query.
For example, below is a test case for the `AddToCart()` method.

```go
func (s *UnitTestSuite) Test_AddToCart() {
	cart := CartState{Items: make([]CartItem, 0)}

  // First callback at 1ms: query to make sure the cart is empty, and signal to add an item.
	s.env.RegisterDelayedCallback(func() {
		res, err := s.env.QueryWorkflow("getCart")
		s.NoError(err)
		err = res.Get(&cart)
		s.NoError(err)
		s.Equal(len(cart.Items), 0)

		update := AddToCartSignal{
			Route: RouteTypes.ADD_TO_CART,
			Item: CartItem{ProductId: 1, Quantity: 1},
		}
		s.env.SignalWorkflow("cartMessages", update)
	}, time.Millisecond*1)

  // Second callback at 2ms: query to make sure the item is in the cart
  // This needs to be a separate callback, `s.Equal(1, len(cart.Items))` would
  // fail if it were in the 1ms callback.
	s.env.RegisterDelayedCallback(func() {
		res, err := s.env.QueryWorkflow("getCart")
		s.NoError(err)
		err = res.Get(&cart)
		s.NoError(err)

    s.Equal(1, len(cart.Items))
    s.Equal(1, cart.Items[0].Quantity)
	}, time.Millisecond*2)

	s.env.ExecuteWorkflow(CartWorkflow, cart)

	s.True(s.env.IsWorkflowCompleted())
}
```
### Sending multiple Signals to Workflows in tests

Similarly, if you want to send a Query to check the state of the Workflow between Signals, you should put the Query in a separate `RegisterDelayedCallback()` call.
You can move any Queries that don't have any Signals after them to after the `ExecuteWorkflow()` call.
For example, below is a test case for the `RemoveFromCart()` method.

```go
func (s *UnitTestSuite) Test_RemoveFromCart() {
	cart := CartState{Items: make([]CartItem, 0)}

	// Add 2 items to the cart
	s.env.RegisterDelayedCallback(func() {
		update := AddToCartSignal{
			Route: RouteTypes.ADD_TO_CART,
			Item: CartItem{ProductId: 1, Quantity: 2},
		}
		s.env.SignalWorkflow("cartMessages", update)
	}, time.Millisecond*1)

	// Query the current state and then remove 1 item from the cart
	s.env.RegisterDelayedCallback(func() {
		res, err := s.env.QueryWorkflow("getCart")
		s.NoError(err)
		err = res.Get(&cart)
		s.NoError(err)
		s.Equal(len(cart.Items), 1)
		s.Equal(cart.Items[0].Quantity, 2)

		update := AddToCartSignal{
			Route: RouteTypes.REMOVE_FROM_CART,
			Item: CartItem{ProductId: 1, Quantity: 1},
		}
		s.env.SignalWorkflow("cartMessages", update)
	}, time.Millisecond*2)

	s.env.ExecuteWorkflow(CartWorkflow, cart)

	s.True(s.env.IsWorkflowCompleted())

	// Since there's no more Signals, no need to put this Query in a
	// `RegisterDelayedCallback()` call.
	res, err := s.env.QueryWorkflow("getCart")
	s.NoError(err)
	err = res.Get(&cart)
	s.NoError(err)
	s.Equal(1, len(cart.Items))
	s.Equal(cart.Items[0].Quantity, 1)
}
```

This covers testing the basic functionality of adding items to and removing items from the shopping cart.
But what about testing more sophisticated features, like testing that the Workflow sends an abandoned cart email after 10 minutes?

## Mocking Activities and Controlling Time

Temporal's test environment makes it easy to mock Activities, replacing them with a stubbed out function.
For example, the below test asserts that sending a checkout Signal calls the `CreateStripeCharge` Activity with the correct receipt email using the test environment's `OnActivity()` function.

```go
func (s *UnitTestSuite) Test_Checkout() {
	cart := CartState{Items: make([]CartItem, 0)}

	var a *Activities
	sendTo := ""

	s.env.OnActivity(a.CreateStripeCharge, mock.Anything, mock.Anything).Return(
		func(_ context.Context, cart CartState) (error) {
			sendTo = cart.Email
			return nil
		})

	// Add a product to the cart
	s.env.RegisterDelayedCallback(func() {
		update := AddToCartSignal{
			Route: RouteTypes.ADD_TO_CART,
			Item: CartItem{ProductId: 1, Quantity: 1},
		}
		s.env.SignalWorkflow("cartMessages", update)
	}, time.Millisecond*1)

	// Check out
	s.env.RegisterDelayedCallback(func() {
		res, err := s.env.QueryWorkflow("getCart")
		s.NoError(err)
		err = res.Get(&cart)
		s.NoError(err)
		s.Equal(len(cart.Items), 1)
		s.Equal(cart.Items[0].Quantity, 1)

		update := CheckoutSignal{
			Route: RouteTypes.CHECKOUT,
			Email: "test@temporal.io",
		}
		s.env.SignalWorkflow("cartMessages", update)
	}, time.Millisecond*2)

	// Workflow should be completed after checking out
	s.env.RegisterDelayedCallback(func() {
		s.True(s.env.IsWorkflowCompleted())
	}, time.Millisecond*3)

	s.env.ExecuteWorkflow(CartWorkflow, cart)

	s.Equal(sendTo, "test@temporal.io")
}
```

What about testing the abandoned cart email?
Normally, testing the abandoned cart email is tricky because it involves waiting for 10 minutes.
The key insight is that Temporal's test environment advances time internally, and time in the test environment is **not** [wall-clock time](https://en.wikipedia.org/wiki/Elapsed_real_time).
For example, Temporal Workflows time out after [10 years by default](/concepts/what-is-a-workflow-execution-timeout), so the previous examples would run for over a decade if the test environment used wall-clock time!

The `RegisterDelayedCallback()` function ties into the test environment's internal notion of time.
Calling `RegisterDelayedCallback(fn, time.Minute*5)` does **not** tell the test environment to wait for 5 minutes of wall-clock time.
That means testing the abandoned cart email is easy: mock out the `SendAbandonedCartEmail()` activity and use `RegisterDelayedCallback()` with the `abandonedCartTimeout` as shown below.

```go
func (s *UnitTestSuite) Test_AbandonedCart() {
	cart := CartState{Items: make([]CartItem, 0)}

	var a *Activities

	sendTo := ""
	s.env.OnActivity(a.SendAbandonedCartEmail, mock.Anything, mock.Anything).Return(
		func(_ context.Context, _sendTo string) (error) {
			sendTo = _sendTo
			return nil
		})

	// Add a product to the cart
	s.env.RegisterDelayedCallback(func() {
		update := AddToCartSignal{
			Route: RouteTypes.ADD_TO_CART,
			Item: CartItem{ProductId: 1, Quantity: 1},
		}
		s.env.SignalWorkflow("cartMessages", update)

		updateEmail := UpdateEmailSignal{
			Route: RouteTypes.UPDATE_EMAIL,
			Email: "abandoned_test@temporal.io",
		}
		s.env.SignalWorkflow("cartMessages", updateEmail)
	}, time.Millisecond*1)

	// Wait for 10 mins and make sure abandoned cart email has been sent. The extra
	// 2ms is because signals are async, so the last change to the cart happens at 2ms.
	s.env.RegisterDelayedCallback(func() {
		s.Equal(sendTo, "abandoned_test@temporal.io")
	}, abandonedCartTimeout + time.Millisecond*2)

	s.env.ExecuteWorkflow(CartWorkflow, cart)

	s.True(s.env.IsWorkflowCompleted())
}
```

## Moving On

Temporal's testing environment makes unit testing Workflows easy.
Sending Signals and Queries to the currently running Workflow is straightforward with `RegisterDelayedCallback()`.
Most importantly, Temporal's testing environment provides utilities for mocking Activities and testing logic that executes after a delay.
That makes it to unit test Workflows that depend on external services or Workflows that involve long timeouts.
In the next blog post in this series, you'll learn how to build a RESTful API on top of a Temporal Workflow.
