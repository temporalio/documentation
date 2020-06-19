---
id: use-cases-periodic
title: Periodic Execution
sidebar_label: Periodic Execution
---

## Motivation

Periodic execution of business logic, also known as a **distributed cron** engine.

Typical examples of periodic service execution include:

- Monthly report generation.
- Weekly newsletter delivery.
- Daily loyalty point accumulation per customer.
- Once-per-minute health checks of a production deployment.

## Benefits

Temporal provides guaranteed execution, sophisticated error handling, flexible retry policies, and visibility into execution history for periodic workflow executions.

Scalability is another crucial advantage of using Temporal for periodic execution. Many use cases require periodic execution for a large number of entities. At Uber, some applications run recurring workflows for each customer. Imagine 100+ million parallel cron jobs that don't require a separate batch processing framework.


## Example

You can specify a [cron expression](https://en.wikipedia.org/wiki/Cron#CRON_expression) when starting a workflow. The snippet below schedules hourly executions of a sample workflow:

```go
workflowOptions := client.StartWorkflowOptions{
    ID:           "someWorkflowID",
    TaskList:     "cron",
    CronSchedule: "0 * * * *",
}

we, err := c.ExecuteWorkflow(cxt, workflowOptions, cron.SampleCronWorkflow)
```

`CronSchedule` uses the standard cron specification.

## Next Steps

Learn more about cron jobs in Temporal:

- [A full example in Go](https://github.com/temporalio/temporal-go-samples/tree/master/cron)
- [Go SDK docs](go-distributed-cron.md)
- [Java SDK docs](java-distributed-cron.md)
