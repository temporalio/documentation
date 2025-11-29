# Temporal Go SDK | Scheduled Workflows feature | example app

## Steps to run this sample:

1) Run a [Temporal service](https://docs.temporal.io/dev-guide/go/foundations#run-a-development-server).
2) Run the following command to start the worker
```
go run schedule/worker/main.go
```
3) Run the following command to start the example
```
go run schedule/create/main_dacx.go
```
1) Check the Schedule at [http://localhost:8233](http://localhost:8233/namespaces/default/schedules).