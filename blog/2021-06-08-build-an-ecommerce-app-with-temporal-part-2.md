---
tags:
  - temporal
  - community
  - go-ecommerce-tutorial
posted_on_: 2021-06-08T00:00:00Z
slug: build-an-ecommerce-app-with-temporal-part-2-reminder-emails
title: 'Building an eCommerce web app with Temporal, Part 2: Reminder Emails'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.9.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--truncate-->

## Introduction

In [Part 1](https://docs.temporal.io/blog/build-an-ecommerce-app-with-temporal-part-1), you built out a simple shopping cart app using a long-living Workflow to track the state of the cart.
Instead of storing the cart in a database, Temporal lets you represent the cart as a function invocation, using Signals to update the cart and Queries to get the state of the cart.

```go
func CartWorkflowExample(ctx workflow.Context, state CartState) error {
	logger := workflow.GetLogger(ctx)

	err := workflow.SetQueryHandler(ctx, "getCart", func(input []byte) (CartState, error) {
		return state, nil
	})
	if err != nil {
		logger.Info("SetQueryHandler failed.", "Error", err)
		return err
	}

	channel := workflow.GetSignalChannel(ctx, "cartMessages")
	selector := workflow.NewSelector(ctx)

	selector.AddReceive(channel, func(c workflow.ReceiveChannel, _ bool) {
		var signal interface{}
		c.Receive(ctx, &signal)
		state.Items = append(state.Items, CartItem{ProductId: 0, Quantity: 1})
	})

	for {
		selector.Select(ctx)
	}

	return nil
}
```

The long-living Workflow pattern doesn't offer any substantial benefits in this simple CRUD app.
However, some tasks are trivial to handle using the long-living Workflow pattern than in a traditional web application setup.
As an example, let's take a look at implementing an abandoned cart email notification system.

## Checking for an abandoned cart

In eCommerce, an [_abandoned_ shopping cart](https://www.optimizely.com/optimization-glossary/shopping-cart-abandonment/#:~:text=Shopping%20cart%20abandonment%20is%20when,process%20before%20completing%20the%20purchase.&text=This%20rate%20will%20identify%20what,don't%20complete%20the%20purchase.) is a shopping cart that has items, but the user hasn't added
any new items or checked out after a few hours.
The following is an example of an abandoned cart email that I recently received with an offer to incentivize checkout.

<img src="https://codebarbarian-images.s3.amazonaws.com/shopping-cart.jpg" />

In a traditional web app architecture, abandoned cart notifications are tricky.
You need to use a job queue like [Celery](https://en.wikipedia.org/wiki/Celery_(software\)) in Python or [Machinery](https://github.com/RichardKnop/machinery) in GoLang.
Then, you would schedule a job that checks if the cart is abandoned, and reschedule that job every time the cart is updated.

With Temporal, you don't need a separate job queue. Instead, you define a _Selector_ with two event handlers: one that responds to a Workflow signal and one that responds to a timer.
By creating a new Selector on each iteration of the `for` loop, you're telling Temporal to handle the next update cart signal it receives or send an abandoned cart email if it doesn't receive a signal for `abandonedCartTimeout`.
Calling `Select()` on a Selector blocks the Workflow until there's either a signal or `abandonedCartTimeout` elapses.

```go
func CartWorkflow(ctx workflow.Context, state CartState) error {
	logger := workflow.GetLogger(ctx)

	err := workflow.SetQueryHandler(ctx, "getCart", func(input []byte) (CartState, error) {
		return state, nil
	})
	if err != nil {
		logger.Info("SetQueryHandler failed.", "Error", err)
		return err
	}

	channel := workflow.GetSignalChannel(ctx, "cartMessages")
	sentAbandonedCartEmail := false

	for {
    // Create a new Selector on each iteration of the loop means Temporal will pick the first
    // event that occurs each time: either receiving a signal, or responding to the timer.
		selector := workflow.NewSelector(ctx)
		selector.AddReceive(channel, func(c workflow.ReceiveChannel, _ bool) {
			var signal interface{}
			c.Receive(ctx, &signal)

			// Handle signals for updating the cart
		})

    // If the user doesn't update the cart for `abandonedCartTimeout`, send an email
    // reminding them about their cart. Only send the email once.
		if !sentAbandonedCartEmail && len(state.Items) > 0 {
			selector.AddFuture(workflow.NewTimer(ctx, abandonedCartTimeout), func(f workflow.Future) {
				sentAbandonedCartEmail = true
				ao := workflow.ActivityOptions{
					StartToCloseTimeout:   10 * time.Second,
				}

				ctx = workflow.WithActivityOptions(ctx, ao)

        // More on SendAbandonedCartEmail in the next section
				err := workflow.ExecuteActivity(ctx, SendAbandonedCartEmail, state.Email).Get(ctx, nil)
				if err != nil {
					logger.Error("Error sending email %v", err)
					return
				}
			})
		}

		selector.Select(ctx)
	}

	return nil
}
```

Temporal's [GO SDK Selectors](https://docs.temporal.io/go/selectors/) make it easy to orchestrate asynchronous signals in the Workflow logic, like responding to either user input or an abandoned cart timeout.
You do not need to implement a job queue, write a separate worker, or handle rescheduling jobs.
All you need to do is create a new Selector after every signal and use `AddFuture()` to defer code that needs to happen after the associated timeout is selected.
Temporal does the hard work of persisting and distributing the state of your Workflow for you.

Next, let's take a closer look at Activities and the `ExecuteActivity()` call above that is responsible for sending the abandoned cart email.

## Sending emails from an Activity

You can think of Activities as an abstraction for side effects in Temporal.
[Workflows should be pure, idempotent functions](https://docs.temporal.io/go-create-workflows/#implementation) to allow Temporal to re-run a Workflow to recreate the Workflow's state.
Any side effects, like HTTP requests to the [Mailgun API](https://thecodebarbarian.com/sending-emails-using-the-mailgun-api.html), should be in an Activity.

For example, the following blob of code contains the implementation of the `SendAbandonedCartEmail()` function.
It loads Mailgun keys from environment variables and sends an HTTP request to the Mailgun API using [Mailgun's official Go library](https://github.com/mailgun/mailgun-go).
The function takes two parameters: the Workflow context and the email as a string.

```go
import (
	"context"
	"fmt"
	"github.com/mailgun/mailgun-go"
)

var (
	mailgunDomain = os.Getenv("MAILGUN_DOMAIN")
	mailgunKey    = os.Getenv("MAILGUN_PRIVATE_KEY")
)

func SendAbandonedCartEmail(_ context.Context, email string) error {
	mg := mailgun.NewMailgun(mailgunDomain, mailgunKey)
	m := mg.NewMessage(
		"noreply@"+mailgunDomain, // Sender
		"You've abandoned your shopping cart!", // Subject
		"Go to http://localhost:8080 to finish checking out!", // Placeholder email copy
		email, // Recipient
	)
	_, _, err := mg.Send(m)
	if err != nil {
		fmt.Println("Mailgun err: " + err.Error())
	}

	return err
}
```

As a reminder, the code below is the `ExecuteActivity()` call from the cart Workflow.
The third parameter to `ExecuteActivity()` becomes the second parameter to `SendAbandonedCartEmail()`:

```go
workflow.ExecuteActivity(ctx, SendAbandonedCartEmail, state.Email).Get(ctx, nil)
```

The `ExecuteActivity()` function also exposes some neat options.
For example, since [Temporal automatically retries failed activities](https://docs.temporal.io/concepts/what-is-a-retry-policy), it would automatically retry the `SendAbandonedCart()` Activity for up to 5 times if `SendAbandonedCart()` returns an error.
You can configure how long Temporal will take while attempting to execute your Activity (including setting a retry policy), with `ScheduleToCloseTimeout`:

```go
ao := workflow.ActivityOptions{
	StartToCloseTimeout: time.Minute,
	ScheduleToCloseTimeout: time.Minute * 5,
	RetryPolicy: &temporal.RetryPolicy{
	  InitialInterval:    time.Second,
	  BackoffCoefficient: 2.0,
	  MaximumInterval:    time.Minute,
	  MaximumAttempts:    5,
	},
}

ctx = workflow.WithActivityOptions(ctx, ao)

err := workflow.ExecuteActivity(ctx, SendAbandonedCartEmail, state.Email).Get(ctx, nil)
```

## Moving on

Long-living Workflows in Temporal are excellent for scheduled tasks.
You can build durable time-based logic, like checking whether the user hasn't modified their shopping cart for a given period of time without using a job queue.
In the next post, we'll look at patterns for unit testing Temporal Workflows.
