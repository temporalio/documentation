---
id: sdk-video-tutorial
title: Go SDK Video Tutorial
description: Video tutorial to help you build your first Workflow using Go SDK
---

import { ResponsivePlayer } from '../../src/components'

## 15 Minute Simple Tutorial

<ResponsivePlayer url='https://www.youtube.com/watch?v=Wo0y_Ce3d4I' />

:::note `tctl` CLI commands

The video has outdated `tctl` CLI commands from Temporal v0.20.
"Task lists" have been renamed to "task queues" and "domains" renamed to "namespaces" [since v0.28](https://docs.temporal.io/cadence-to-temporal/).
We update the commands used accordingly below.
You can also check the [`tctl` docs](https://docs.temporal.io/devtools/tctl).

:::

<details>
<summary> Initial (single file) source code
</summary>

```go
// main.go

package main

import (
    "github.com/uber-go/tally"
    "go.uber.org/zap"
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

    worker.RegisterWorkflow(MyWorkflow)
    worker.RegisterActivity(MyActivity)

    err = worker.Start()
    if err != nil {
        logger.Fatal("Unable to start worker", zap.Error(err))
    }

    select {}
}

func MyWorkflow(ctx workflow.Context) error {
    logger := workflow.GetLogger(ctx)
    logger.Info("Workflow MyWorkflow started")
    return nil
}

func MyActivity(ctx context.Context) error {
    logger := workflow.GetLogger(ctx)
    logger.Info("MyActivity activity started")
    return nil
}

```

Once you are ready, you can run:

```bash
go run main.go
docker run --network=host --rm temporalio/tctl:latest tq describe --tq tutorial_tq
```

</details>

<details>
<summary> Source code for the final application
</summary>

```go
// activities/get_user.go
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
// activities/send_greeting.go
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
// workflows/greeting.go
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

Once you are ready, you can run:

```bash
# start workers
go run main.go

# start workflow
docker run --network=host --rm temporalio/tctl:latest wf start --tq tutorial_tq -w Greet_Temporal_1 --wt Greetings --et 3600 --wtt 10

# list workflow executions
docker run --network=host --rm temporalio/tctl:latest wf list

# list single workflwo
docker run --network=host --rm temporalio/tctl:latest wf show -w Greet_Samar_1
```

</details>

## 3 Hour Intro Workshop

> [Slides](https://sagikazarmark.hu/slides/workshops/temporal-intro/), [GitHub](https://github.com/sagikazarmark/temporal-intro-workshop)

<ResponsivePlayer url='https://www.youtube.com/watch?v=UwdGmdTO3Ts' />

Covering:

- [00:00:00](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=0s) - Intro to Mark and how he found Temporal
- [00:06:30](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=390s) - The Orchestration and Long Running Process problem
- [00:28:30](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=1710s) - What is Temporal?
- [00:46:00](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=2760s) - Workshop Intro
- [00:47:25](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=2845s) - Intro to Workflows and Workers
- [00:53:40](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=3220s) - Example 1/2: Basic Workflow
- [01:02:45](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=3765s) - Example 3/4: Testing
- [01:15:30](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=4530s) - Workflow Determinism
- [01:19:50](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=4790s) - Example 5: Context, Side Effects, and Timers
- [01:29:45](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=5385s) - Example 6/7: Signals and Queries, and Go SDK Selectors
- [01:48:50](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=6530s) - Workflow Replay and misc topics
- [02:02:15](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=7335s) - Intro to Activities
- [02:04:30](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=7470s) - Example 8: Activity Execution and Timeouts
- [02:20:00](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=8400s) - Activity Q&A
- [02:30:00](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=9000s) - Retries and ActivityInfo
- [02:35:00](https://www.youtube.com/watch?v=UwdGmdTO3Ts&t=9300s) - Further Reading
