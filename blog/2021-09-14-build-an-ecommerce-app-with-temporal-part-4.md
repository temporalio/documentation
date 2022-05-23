---
tags:
  - temporal
  - community
  - go-ecommerce-tutorial
posted_on_: 2021-09-14T00:00:00Z
slug: build-an-ecommerce-app-with-temporal-part-4-rest-api
title: 'Building an eCommerce web app with Temporal, Part 4: REST API'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.9.1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!--truncate-->

## Introduction

In [Part 1](/blog/build-an-ecommerce-app-with-temporal-part-1/), [Part 2](/blog/build-an-ecommerce-app-with-temporal-part-2-reminder-emails/), and [Part 3](/blog/build-an-ecommerce-app-with-temporal-part-3-testing), you built and tested a shopping cart with an abandoned cart email notification using long-lived Workflows.
Workflows, Activities, and Temporal's testing utilities make it easy to build and maintain features that involve external services and time, like sending an email reminder when a user hasn't touched their cart in a while.

Thus far, you've worked only with the Temporal SDK via [starters](/go/hello-world-tutorial/#workflow-starter) and [unit tests](/go/how-to-test-workflow-definitions-in-go), which invoke the Temporal SDK directly.

In this blog post, I'll demonstrate how you can build a RESTful API on top of Temporal Workflows, so you can create web apps and mobile apps that store data in Temporal.

## API Setup

For this tutorial, I'll be using [httpx](https://github.com/bojanz/httpx) along with [mux](https://github.com/gorilla/mux) for routing and [handlers](https://github.com/gorilla/handlers) for CORS.

```go
package main

import (
	"context"
	"github.com/bojanz/httpx"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

func main() {
	var err error

	// Set up CORS for frontend
	var cors = handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))

	http.Handle("/", cors(r))
	server := httpx.NewServer(":"+HTTPPort, http.DefaultServeMux)
	server.WriteTimeout = time.Second * 240

	err = server.Start()
	if err != nil {
		log.Fatal(err)
	}
}
```

The API endpoints will use [Temporal Client methods](https://docs.temporal.io/go/workflows#how-to-start-a-workflow) to create Workflows, and execute Signals and Queries.
For the purposes of this app, HTTP GET requests execute Queries, HTTP PUT or PATCH requests send Signals, and HTTP POST requests create new Workflows.

```go
// Create a new cart
r.Handle("/cart", http.HandlerFunc(CreateCartHandler)).Methods("POST")
// Get the state of an existing cart
r.Handle("/cart/{workflowID}", http.HandlerFunc(GetCartHandler)).Methods("GET")

// Add a new item to the cart
r.Handle("/cart/{workflowID}/add", http.HandlerFunc(AddToCartHandler)).Methods("PUT")
// Remove an item from the cart
r.Handle("/cart/{workflowID}/remove", http.HandlerFunc(RemoveFromCartHandler)).Methods("PUT")
// Update the cart's associated email address
r.Handle("/cart/{workflowID}/email", http.HandlerFunc(UpdateEmailHandler)).Methods("PUT")
// Check out
r.Handle("/cart/{workflowID}/checkout", http.HandlerFunc(CheckoutHandler)).Methods("PUT")
```

In this case, the API server and the [Worker](/concepts/what-is-a-worker) are separate processes.
The API server is just an intermediary between the Temporal server and your API server's clients.
The event history representing the cart is stored in the Temporal server.

## Handler Functions

First, let's take a look at the `POST /cart` endpoint. Since we've chosen to represent an individual shopping cart as a Workflow, the `CreateCartHandler()` function will create a new Workflow using `ExecuteWorkflow()`.
For the purposes of this app, we need to make sure each `POST /cart` call creates a Workflow creates a unique `workflowID`.

```go
func CreateCartHandler(w http.ResponseWriter, r *http.Request) {
  // In production you should use uuids or something similar, but the
  // current time is enough for this example. Make sure the Workflow ID
  // is unique every time the user creates a new cart!
	workflowID := "CART-" + fmt.Sprintf("%d", time.Now().Unix())

	options := client.StartWorkflowOptions{
		ID:        workflowID,
		TaskQueue: "CART_TASK_QUEUE",
	}

	cart := app.CartState{Items: make([]app.CartItem, 0)}
	we, err := temporal.ExecuteWorkflow(context.Background(), options, app.CartWorkflow, cart)
	if err != nil {
		WriteError(w, err)
		return
	}

  // Return the `workflowID` so clients can use it with other endpoints
	res := make(map[string]interface{})
	res["cart"] = cart
	res["workflowID"] = we.GetID()

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(res)
}
```

Now you have a `POST /cart` endpoint that creates a new empty cart, and returns the `workflowID` that uniquely identifies this Workflow.

The next endpoint is `GET /cart/{workflowID}`, which returns the current state of the cart with the given `WorkflowID`.
Below is the `GetCartHandler()` function, which gets the `workflowID` from the URL and executes a Query for the current state of the cart.

```go
func GetCartHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	response, err := temporal.QueryWorkflow(context.Background(), vars["workflowID"], "", "getCart")
	if err != nil {
		WriteError(w, err)
		return
	}
	var res interface{}
	if err := response.Get(&res); err != nil {
		WriteError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(res)
}
```

## PUT Requests and Signals

For this app, HTTP PUT requests correspond to Temporal Signals.
That means, in addition to the `workflowID`, you need to send Signal arguments.
Remember that `shared.go` contains an [`AddToCartSignal` struct](https://github.com/temporalio/temporal-ecommerce/blob/5c4e0142e3571398d972c80b3fa7cdbe7a5db42b/shared.go#L64-L67) which is what the [cart Workflow's Signal handler expects](https://github.com/temporalio/temporal-ecommerce/blob/5c4e0142e3571398d972c80b3fa7cdbe7a5db42b/workflow.go#L52-L71):

```go
type AddToCartSignal struct {
	Route string
	Item  CartItem
}
```

The `PUT /cart/{workflowID}/add` handler needs to convert the HTTP request body into an `AddToCartSignal` as shown below.

```go
func AddToCartHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	var item app.CartItem
	err := json.NewDecoder(r.Body).Decode(&item)
	if err != nil {
		WriteError(w, err)
		return
	}

	update := app.AddToCartSignal{Route: app.RouteTypes.ADD_TO_CART, Item: item}

	err = temporal.SignalWorkflow(context.Background(), vars["workflowID"], "", "ADD_TO_CART_CHANNEL", update)
	if err != nil {
		WriteError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := make(map[string]interface{})
	res["ok"] = 1
	json.NewEncoder(w).Encode(res)
}
```

The `PUT /cart/{workflowID}/remove` and `PUT /cart/{workflowID}/email` handlers are almost identical, except they send `RemoveFromCartSignal` and `UpdateEmailSignal`, not `AddToCartSignal`.

```go
func UpdateEmailHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)

	var body UpdateEmailRequest
	err := json.NewDecoder(r.Body).Decode(&body)
	if err != nil {
		WriteError(w, err)
		return
	}

	updateEmail := app.UpdateEmailSignal{Route: app.RouteTypes.UPDATE_EMAIL, Email: body.Email}

	err = temporal.SignalWorkflow(context.Background(), vars["workflowID"], "", "UPDATE_CART_CHANNEL", updateEmail)
	if err != nil {
		WriteError(w, err)
		return
	}

	w.WriteHeader(http.StatusOK)
	res := make(map[string]interface{})
	res["ok"] = 1
	json.NewEncoder(w).Encode(res)
}
```

## Moving On

You can build a RESTful API on top of Temporal by making HTTP POST requests create Workflows, GET requests execute Queries, and PUT requests execute Signals.
This isn't the only way you can build a RESTful API with Temporal, but this pattern works well if you use long-lived Workflows to store user data.
Because all of the work of updating your shopping cart happens in the Worker process, you can scale your API servers independently of your Worker processes, and rely on the Temporal server to handle the distributed computing.
