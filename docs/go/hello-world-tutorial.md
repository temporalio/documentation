---
id: hello-world-tutorial
title: Build a Temporal "Hello World!" app from scratch in Go
sidebar_label: Go
tags:
  - helloworld
  - go
  - sdk
  - tutorial
---

<img class="docs-image-centered" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/astronaut-hello-go.jpg" />

:::note Tutorial information

- **Level:** ⭐ Temporal beginner
- **Time:** ⏱️ ~20 minutes
- **Goals:** 🙌
  - Learn how to set up, build, and test a Temporal application project from scratch using the [Go SDK](https://github.com/temporalio/sdk-go).
  - Become more familiar with core concepts and the application structure.

:::

## Overview

This tutorial focuses on the practicalities of building an application from scratch. To better understand _why_ you should use Temporal, we recommend that you follow the tutorial where you [run a Temporal money transfer application](/go/run-your-first-app-tutorial) to get a taste of its value propositions.

Before starting, make sure you have looked over the [tutorial prerequisites](/go/tutorial-prerequisites).

All of the code in this tutorial is available in the [hello-world Go template repository](https://github.com/temporalio/hello-world-project-template-go).

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/harbor-crane.png) Scaffold Go project

In a terminal, create a new project directory named _hello-world-project-template-go_, or something similar and `cd` into it.

From the root of your new project directory, initialize a new Go module. Make sure the module path (for example, `hello-world-project-template-go`) matches that of the directory in which you are creating the module. Then, add the Temporal Go SDK as a project dependency:

```bash
go mod init hello-world-project-template-go/app
go get go.temporal.io/sdk@latest
```

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/apps.png) "Hello World!" app

Now we are ready to build our Temporal Workflow application. Our app will consist of four pieces:

1. An Activity: An Activity is just a function that contains your business logic. Ours will simply format some text and return it.
2. A Workflow: Workflows are functions that organize Activity method calls. Our Workflow will orchestrate the call of a single Activity function.
3. A Worker: Workers host the Activity and Workflow code and execute the code piece by piece.
4. An initiator: To start a Workflow, we must send a signal to the Temporal server to tell it to track the state of the Workflow. We'll write a separate function to do this.

### Activity

First, let's define our Activity. Activities are meant to handle non-deterministic code that could result in unexpected results or errors. But for this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

In the Go SDK, an Activity function is just like any other [exported Go function](https://tour.golang.org/basics/3).

Create activity.go in the project root and add the following code:

<!--SNIPSTART hello-world-project-template-go-activity-->
[activity.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/activity.go)
```go
package app

import (
	"fmt"
)

func ComposeGreeting(name string) (string, error) {
	greeting := fmt.Sprintf("Hello %s!", name)
	return greeting, nil
}
```
<!--SNIPEND-->

### Workflow

Next is our Workflow. Workflow functions are where you configure and organize the execution of Activity functions. Again, the Workflow function is defined like any other Go function. Our Workflow just calls `ComposeGreeting()` and returns the result.

Create workflow.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-workflow-->
[workflow.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/workflow.go)
```go
package app

import (
	"time"

	"go.temporal.io/sdk/workflow"
)

func GreetingWorkflow(ctx workflow.Context, name string) (string, error) {
	options := workflow.ActivityOptions{
		StartToCloseTimeout: time.Second * 5,
	}
	ctx = workflow.WithActivityOptions(ctx, options)
	var result string
	err := workflow.ExecuteActivity(ctx, ComposeGreeting, name).Get(ctx, &result)
	return result, err
}
```
<!--SNIPEND-->

### Task Queue

[Task Queues](/concepts/what-is-a-task-queue) are how the Temporal server supplies information to Workers. When you start a Workflow, you tell the server which Task Queue the Workflow and/or Activities use as an information queue. We will configure our Worker to listen to the same Task Queue that our Workflow and Activities use. Since the Task Queue name is used by multiple things, let's create shared.go and define our Task Queue name there:

<!--SNIPSTART hello-world-project-template-go-shared-->
[shared.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/shared.go)
```go
package app

const GreetingTaskQueue = "GREETING_TASK_QUEUE"
```
<!--SNIPEND-->

### Worker

Our [Worker](/concepts/what-is-a-worker) hosts Workflow and Activity functions and executes them one at a time. The Worker is instructed to execute a specific function via information it pulls from the Task Queue. After it runs the code, it communicates the results back to the server.

Create worker/main.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-worker-->
[worker/main.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/worker/main.go)
```go
package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	"hello-world-project-template-go/app"
)

func main() {
	// Create the client object just once per process
	c, err := client.NewClient(client.Options{})
	if err != nil {
		log.Fatalln("unable to create Temporal client", err)
	}
	defer c.Close()
	// This worker hosts both Workflow and Activity functions
	w := worker.New(c, app.GreetingTaskQueue, worker.Options{})
	w.RegisterWorkflow(app.GreetingWorkflow)
	w.RegisterActivity(app.ComposeGreeting)
	// Start listening to the Task Queue
	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("unable to start Worker", err)
	}
}
```
<!--SNIPEND-->

### Workflow starter

There are two ways to start a Workflow, via the Temporal CLI or Temporal SDK. In this tutorial we use the SDK to start the Workflow which is how most Workflows are started in live environments. Additionally, the call to the Temporal server can be made [synchronously or asynchronously](/go/workflows/#how-to-start-a-workflow). Here we do it synchronously, so you will see the caller wait for the result of the Workflow.

Create start/main.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-start-workflow-->
[start/main.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/start/main.go)
```go
package main

import (
	"context"
	"fmt"
	"log"

	"go.temporal.io/sdk/client"

	"hello-world-project-template-go/app"
)

func main() {
	// Create the client object just once per process
	c, err := client.NewClient(client.Options{})
	if err != nil {
		log.Fatalln("unable to create Temporal client", err)
	}
	defer c.Close()
	options := client.StartWorkflowOptions{
		ID:        "greeting-workflow",
		TaskQueue: app.GreetingTaskQueue,
	}
	name := "World"
	we, err := c.ExecuteWorkflow(context.Background(), options, app.GreetingWorkflow, name)
	if err != nil {
		log.Fatalln("unable to complete Workflow", err)
	}
	var greeting string
	err = we.Get(context.Background(), &greeting)
	if err != nil {
		log.Fatalln("unable to get Workflow result", err)
	}
	printResults(greeting, we.GetID(), we.GetRunID())
}

func printResults(greeting string, workflowID, runID string) {
	fmt.Printf("\nWorkflowID: %s RunID: %s\n", workflowID, runID)
	fmt.Printf("\n%s\n\n", greeting)
}
```
<!--SNIPEND-->

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/check.png) Test the app

Let's add a simple unit test to our application to make sure things are working as expected. Create workflow_test.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-workflow-test-->
[workflow_test.go](https://github.com/temporalio/hello-world-project-template-go/blob/master/workflow_test.go)
```go
package app

import (
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.temporal.io/sdk/testsuite"
)

func Test_Workflow(t *testing.T) {
	testSuite := &testsuite.WorkflowTestSuite{}
	env := testSuite.NewTestWorkflowEnvironment()
	// Mock activity implementation
	env.OnActivity(ComposeGreeting, mock.Anything).Return("Hello World!", nil)
	env.ExecuteWorkflow(GreetingWorkflow, "World")
	require.True(t, env.IsWorkflowCompleted())
	require.NoError(t, env.GetWorkflowError())
	var greeting string
	require.NoError(t, env.GetWorkflowResult(&greeting))
	require.Equal(t, "Hello World!", greeting)
}
```
<!--SNIPEND-->

Add the required `testify` packages to your `go.mod` file by running the following:

```
go get github.com/stretchr/testify/mock
go get github.com/stretchr/testify/require
go mod tidy
```

Run this command from the project root to execute the unit tests:

```
go test
```

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/running.png) Run the app

To run the app we need to start the Workflow and the Worker. You can start them in any order, but run each command from a separate terminal window.

To start the Worker run this command from the project root:

```
go run worker/main.go
```

To start the Workflow run this command from the project root:

```
go run start/main.go
```

<img alt="Celebratory confetti" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/confetti.png" />

**Congratulations** you have successfully built a Temporal application from scratch!

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/wisdom.png) Lore check

Great work! You now know how to build a Temporal Workflow application using the Go SDK. Let's do a quick review to make sure you remember some of the more important pieces.

![One](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/one.png) &nbsp;&nbsp; **What are the minimum four pieces of a Temporal Workflow application?**

1. An Activity function.
2. A Workflow function.
3. A Worker to host the Activity and Workflow code.
4. A frontend to start the Workflow.

![Two](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/two.png) &nbsp;&nbsp; **How does the Temporal server get information to the Worker?**

It adds the information to a Task Queue.

![Three](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/three.png) &nbsp;&nbsp; **True or false, Temporal Activity and Workflow functions are just normal Go functions?**

True
