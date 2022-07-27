---
tags:
  - temporal
  - community
  - go-ecommerce-tutorial
posted_on_: 2021-05-18T00:00:00Z
slug: build-an-ecommerce-app-with-temporal-part-1
title: 'Build an eCommerce App With Temporal, Part 1: Getting Started'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.9.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--truncate-->

## Introduction

Temporal promises to help you build invincible apps.
To make this possible, new design patterns are introduced that are very different from the ones used in a traditional web app architecture.

Instead of letting your API endpoints talk to a database over the network, they would instead call in-memory _Workflows_ that store state internally.
Temporal handles persisting the state of your Workflows and distributes your Workflow between Workers as necessary.
You, as the developer are responsible for implementing [Workflows](https://docs.temporal.io/go/workflows) and [Activities](https://docs.temporal.io/application-development-guide/#develop-activities) as normal Go code.
Meanwhile, Temporal handles the data persistence and horizontal scaling for you.

In this blog post, I'll demonstrate how to build a shopping cart using long-living Workflows.
You can find the [full source code for this shopping cart on GitHub](https://github.com/temporalio/temporal-ecommerce).

## Shopping cart Workflow

In a traditional web app architecture, a user's shopping cart is stored as a row or document in a database.
While you can store shopping carts in a separate database using Temporal, you have another option: you can represent a shopping cart as a long-living Workflow.

A Workflow is a Go function that takes 2 parameters: a Temporal Workflow context `ctx` and an arbitrary `value`.
It can run for an arbitrarily long period of time, as Temporal can handle pausing and restarting the Workflow.
Lastly, it is able to share its state via _queries_ and modify its state in response to _signals_.

The following is a simplified shopping cart that adds a new product to the cart every time it receives an `updateCart` signal.

```go
package app

import (
	"go.temporal.io/sdk/workflow"
)

type (
	CartItem struct {
		ProductId int
		Quantity  int
	}

	CartState struct {
		Items []CartItem
		Email string
	}
)

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
		// Can also use `Receive()` instead of a selector, but we'll be making further
		// use of selectors in part 2 of this series.
		selector.Select(ctx)
	}

	return nil
}
```

To run a Workflow, you need to create a Worker process.
A Temporal _Worker_ listens for events on a queue and has a list of registered Workflows that it can run in response to messages on the queue.
Below is the largely-boilerplate `worker/main.go` file:

<!--SNIPSTART temporal-ecommerce-worker-->
<!--SNIPEND-->

In order to see this shopping cart Workflow in action, you can create a _starter_ that sends queries and signals to modify the shopping cart.

<!--SNIPSTART temporal-ecommerce-starter-->
<!--SNIPEND-->

## Adding and removing elements from the cart

In order to support adding and removing elements from the cart, the Workflow needs to respond to different types of signals.
Signals are a way to notify Workflows of external events.
The following code listens to a Signal channel for messages that either add or remove items from a shopping cart.

```go
channel := workflow.GetSignalChannel(ctx, "cartMessages")
selector := workflow.NewSelector(ctx)

selector.AddReceive(channel, func(c workflow.ReceiveChannel, _ bool) {
	var signal interface{}
	c.Receive(ctx, &signal)

	var routeSignal RouteSignal
	err := mapstructure.Decode(signal, &routeSignal)
	if err != nil {
		logger.Error("Invalid signal type %v", err)
		return
	}

	switch {
	case routeSignal.Route == RouteTypes.ADD_TO_CART:
		var message AddToCartSignal
		err := mapstructure.Decode(signal, &message)
		if err != nil {
			logger.Error("Invalid signal type %v", err)
			return
		}

		AddToCart(&state, message.Item)
	case routeSignal.Route == RouteTypes.REMOVE_FROM_CART:
		var message RemoveFromCartSignal
		err := mapstructure.Decode(signal, &message)
		if err != nil {
			logger.Error("Invalid signal type %v", err)
			return
		}

		RemoveFromCart(&state, message.Item)
})

for {
	selector.Select(ctx)
}
```

All the `AddToCart()` and `RemoveFromCart()` functions need to do is modify the `state.Items` array.
Temporal is responsible for persisting and distributing `state`.

<!--SNIPSTART temporal-ecommerce-add-and-remove-->
<!--SNIPEND-->

## Next up

Temporal introduces a new way of building web applications; instead of storing a shopping cart in a database, you can represent a shopping cart as a long-living Workflow.
For simple CRUD applications like this shopping cart app, this pattern doesn't really make things significantly easier.
In the next post, we'll look at a case where Temporal's long-living Workflows shine: sending a reminder email if the user abandons their cart.

> Update: You can now [find Part 2 here](https://docs.temporal.io/blog/build-an-ecommerce-app-with-temporal-part-2-reminder-emails/)!
