---
id: distributed-cron
title: Distributed CRON
---

import DistributedCron from '../shared/distributed-cron.md'

<DistributedCron docUrl="https://pkg.go.dev/go.temporal.io/sdk/internal#StartWorkflowOptions">

```go
	workflowOptions := client.StartWorkflowOptions{
		ID:           workflowID,
		TaskQueue:    "cron",
		CronSchedule: "* * * * *",
	}

	we, err := c.ExecuteWorkflow(context.Background(), workflowOptions, cron.SampleCronWorkflow)
```

You can [check our Go Samples](https://github.com/temporalio/samples-go/tree/master/cron) for example code.

</DistributedCron>
