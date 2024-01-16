# Temporal Go SDK | Workflow Cancellation feature | example app

To run this sample, make sure you have a [local development Cluster is running](https://docs.temporal.io/application-development/foundations#run-a-development-cluster).

From the root of this package, start a Worker:

```bash
go run worker/main.go
```

From another terminal, start the Workflow Execution:

```bash
go run starter/main.go
```

Cancel the Workflow Execution:

```bash
go run cancel/main.go
```
