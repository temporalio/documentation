---
id: go-quick-start
title: Quick Start
---

This topic helps you install the Temporal server and implement a workflow.

## Install Temporal Server Locally

To run samples locally you need to run Temporal server locally using [instructions](/docs/install-temporal-server/).

## Start with an empty directory

Create directory for the project

```
mkdir tutorial-go-sdk
```

```
cd tutorial-go-sdk
```

## Initialize Go Modules and SDK Package Dependency

Initialize Go modules

```
> go mod init github.com/temporalio/tutorial-go-sdk
go: creating new go.mod: module github.com/temporalio/tutorial-go-sdk
```

Add dependency to Temporal Go SDK

```bash
> go get go.temporal.io/sdk@latest
go: downloading go.temporal.io/sdk v0.29.0
go: go.temporal.io/sdk upgrade => v0.29.0
```

## Implement Activities

### Get User Activity

Create file get_user.go

```go
package main

import (
	"context"

	"go.temporal.io/sdk/activity"
)

// GetUser is the implementation for Temporal activity
func GetUser(ctx context.Context) (string, error) {
	logger := activity.GetLogger(ctx)
	logger.Info("GetUser activity called")
	return "Temporal", nil
}
```

### Send Greeting Activity

Create file send_greeting.go

```go
package main

import (
	"context"
	"fmt"

	"go.temporal.io/sdk/activity"
)

// SendGreeting is the implementation for Temporal activity
func SendGreeting(ctx context.Context, user string) error {
	logger := activity.GetLogger(ctx)
	logger.Info("SendGreeting activity called")

	fmt.Printf("Greeting sent to user: %v\n", user)
	return nil
}
```

## Implement Greetings Workflow

Create file greetings.go

<!--START greeting-workflow-->
```go
// GreetingSample workflow definition.
// This greetings sample workflow executes 3 activities in sequential.
// It gets greeting and name from 2 different activities,
// and then pass greeting and name as input to a 3rd activity to generate final greetings.
func GreetingSample(ctx workflow.Context) (string, error) {
	logger := workflow.GetLogger(ctx)

	ao := workflow.ActivityOptions{
		StartToCloseTimeout:    time.Minute,
		ScheduleToStartTimeout: time.Minute,
	}
	ctx = workflow.WithActivityOptions(ctx, ao)

	var a *Activities

	var greetResult string
	err := workflow.ExecuteActivity(ctx, a.GetGreeting).Get(ctx, &greetResult)
	if err != nil {
		logger.Error("Get greeting failed.", "Error", err)
		return "", err
	}

	// Get Name.
	var nameResult string
	err = workflow.ExecuteActivity(ctx, a.GetName).Get(ctx, &nameResult)
	if err != nil {
		logger.Error("Get name failed.", "Error", err)
		return "", err
	}

	// Say Greeting.
	var sayResult string
	err = workflow.ExecuteActivity(ctx, a.SayGreeting, greetResult, nameResult).Get(ctx, &sayResult)
	if err != nil {
		logger.Error("Marshalling failed with error.", "Error", err)
		return "", err
	}

	logger.Info("GreetingSample completed.", "Result", sayResult)
	return sayResult, nil
}
```
<!--END-->

## Host Workflows and Activities inside Worker

Create file main.go

```go
package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	// The client is a heavyweight object that should be created once
	clientOptions := client.Options{HostPort: "localhost:7233"}
	serviceClient, err := client.NewClient(clientOptions)

	if err != nil {
		log.Fatalf("Unable to create client.  Error: %v", err)
	}

	w := worker.New(serviceClient, "tutorial_tq", worker.Options{})

	w.RegisterWorkflow(Greetings)
	w.RegisterActivity(GetUser)
	w.RegisterActivity(SendGreeting)

	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalf("Unable to start worker.  Error: %v", err)
	}
}
```

## Start Worker

Run your worker app which hosts workflow and activity implementations

```bash
> go run *.go
2020-07-31T16:06:13.245-0700	INFO	tutorial-go-sdk/main.go:16	Zap logger created
2020/07/31 16:06:13 INFO  No logger configured for temporal client. Created default one.
2020/07/31 16:06:13 INFO  Started Worker Namespace default TaskQueue tutorial_tq WorkerID 56116@local@
```

## Start workflow execution

```bash
> docker run --network=host --rm temporalio/tctl:0.29.0 wf start --tq tutorial_tq -w Greet_Temporal_1 --wt Greetings --et 3600
Started Workflow Id: Greet_Temporal_1, run Id: 2666b82a-c706-45e2-8d8e-ae84a5b4e892
```

## Workflow Completes Execution

```
2020/07/31 16:08:09 INFO  Workflow Greetings started Namespace default TaskQueue tutorial_tq WorkerID 56116@local@ WorkflowType Greetings WorkflowID Greet_Temporal_1 RunID 2666b82a-c706-45e2-8d8e-ae84a5b4e892
2020/07/31 16:08:09 DEBUG ExecuteActivity Namespace default TaskQueue tutorial_tq WorkerID 56116@local@ WorkflowType Greetings WorkflowID Greet_Temporal_1 RunID 2666b82a-c706-45e2-8d8e-ae84a5b4e892 ActivityID 5 ActivityType GetUser
2020/07/31 16:08:09 INFO  GetUser activity called Namespace default TaskQueue tutorial_tq WorkerID 56116@local@ ActivityID 5 ActivityType GetUser WorkflowType Greetings WorkflowID Greet_Temporal_1 RunID 2666b82a-c706-45e2-8d8e-ae84a5b4e892
2020/07/31 16:08:09 DEBUG ExecuteActivity Namespace default TaskQueue tutorial_tq WorkerID 56116@local@ WorkflowType Greetings WorkflowID Greet_Temporal_1 RunID 2666b82a-c706-45e2-8d8e-ae84a5b4e892 ActivityID 11 ActivityType SendGreeting
2020/07/31 16:08:09 INFO  SendGreeting activity called Namespace default TaskQueue tutorial_tq WorkerID 56116@local@ ActivityID 11 ActivityType SendGreeting WorkflowType Greetings WorkflowID Greet_Temporal_1 RunID 2666b82a-c706-45e2-8d8e-ae84a5b4e892
Greeting sent to user: Temporal
2020/07/31 16:08:09 INFO  Greetings workflow complete Namespace default TaskQueue tutorial_tq WorkerID 63248@local@ WorkflowType Greetings WorkflowID Greet_Temporal_1 RunID 6bfa9a98-7dee-44b1-8473-6f7117fae930 user Temporal
```

## Try Go SDK Samples

Check [Go SDK Samples](https://github.com/temporalio/go-samples)
and try simple Temporal usage scenario.
