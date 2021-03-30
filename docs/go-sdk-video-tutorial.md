---
id: go-sdk-video-tutorial
title: SDK Video Tutorial
description: Video tutorial to help you build your first Workflow using Go SDK
---

import { ResponsivePlayer } from '../src/components'

<ResponsivePlayer url='https://www.youtube.com/watch?v=Wo0y_Ce3d4I' />

Source code:

```go
// activity.go
package activities

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

```go
package activities

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

```go
package workflows

import (
	"time"

	"github.com/samarabbas/tutorial-go-sdk/activities"
	"go.temporal.io/sdk/workflow"
	"go.uber.org/zap"
)

// Greetings is the implementation for Temporal Workflow
func Greetings(ctx workflow.Context) error {
	logger := workflow.GetLogger(ctx)
	logger.Info("Workflow Greetings started")

	ao := workflow.ActivityOptions{
		ScheduleToStartTimeout: time.Hour,
		StartToCloseTimeout:    time.Hour,
	}
	ctx = workflow.WithActivityOptions(ctx, ao)

	var user string
	err := workflow.ExecuteActivity(ctx, activities.GetUser).Get(ctx, &user)
	if err != nil {
		return err
	}

	err = workflow.ExecuteActivity(ctx, activities.SendGreeting, user).Get(ctx, nil)
	if err != nil {
		return err
	}

	logger.Info("Greetings Workflow complete", zap.String("user", user))
	return nil
}
```

```go
// main.go
package main

import (
    "github.com/uber-go/tally"
    "go.uber.org/zap"

	"github.com/samarabbas/tutorial-go-sdk/activities"
	"github.com/samarabbas/tutorial-go-sdk/workflows"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic(err)
	}

	logger.Info("Zap logger created")
	scope := tally.NoopScope

	// The client is a heavyweight object that should be created once
	serviceClient, err := client.NewClient(client.Options{
		HostPort:     client.DefaultHostPort,
		Namespace:   client.DefaultNamespace,
		MetricsScope: scope,
	})
	if err != nil {
		logger.Fatal("Unable to start worker", zap.Error(err))
	}

	worker := worker.New(serviceClient, "tutorial_tq", worker.Options{
		Logger: logger,
	})

	worker.RegisterWorkflow(workflows.Greetings)
	worker.RegisterActivity(activities.GetUser)
	worker.RegisterActivity(activities.SendGreeting)

	err = worker.Start()
	if err != nil {
		logger.Fatal("Unable to start worker", zap.Error(err))
	}

	select {}
}
```

The video has outdated `tctl` CLI commands from Temporal v0.20. Commands as of Temporal v1.7:

```bash
# run workers
docker run --network=host --rm temporalio/tctl:latest wf start --tq tutorial_tq -w Greet_Temporal_1 --wt Greetings --et 3600 --wtt 10

# describe task list
docker run --network=host --rm temporalio/tctl:latest tq describe --tq tutorial_tq
```
