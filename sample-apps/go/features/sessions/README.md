# Temporal Go SDK | Worker Sessions feature | example app

This application showcases the use of the Session APIs available in the Temporal Go SDK.

You can find information about usage and code structure in the code comments.

# How to run

1. Make sure you have a Temporal Cluster running or Temporal Cloud to connect to.
See the [Dev guide](https://docs.temporal.io/application-development/foundations#run-a-development-cluster) for the most up-to-date development option.

2. Start the Worker

```
go run sessions/worker/main_dacx.go
```

3. Start the Workflow

```
go run sessions/gateway/main_dacx.go
```

4. Either in your browser or via a cURL command, go to `http://localhost:8091/start`.
