---
id: common-operations
title: Common CLI operations
description: Discover the common CLI operations.
sidebar_label: Common operations
tags:
  - cli
---

The following are some of the more common operations you can perform with the CLI.

### Start a Workflow

In another terminal, use the following commands to interact with the Server.
The following command starts a Workflow:

```shell
$ temporal workflow start \
  --task-queue hello-world \
  --type MyWorkflow \
  --workflow-id 123 \
  --input 456

Running execution:
  WorkflowId                                   123
  RunId       357074e4-0dd8-4c44-8367-d92536dd0943
  Type        MyWorkflow
  Namespace   default
  TaskQueue   hello-world
  Args        [456]
```

Shorthand options are available:

```shell
temporal workflow start -t hello-world --type MyWorkflow -w 123 -i 456
```

You can also list and describe Workflows:

```shell
$ temporal workflow list

  Status   WorkflowId     Name       StartTime
  Running         123  MyWorkflow  14 seconds ago

$ temporal workflow describe --workflow-id 123

{
  "executionConfig": {
    "taskQueue": {
      "name": "hello-world",
      "kind": "Normal"
    },
    "workflowExecutionTimeout": "0s",
    "workflowRunTimeout": "0s",
    "defaultWorkflowTaskTimeout": "10s"
  },
  "workflowExecutionInfo": {
    "execution": {
      "workflowId": "123",
      "runId": "357074e4-0dd8-4c44-8367-d92536dd0943"
    },
    "type": {
      "name": "MyWorkflow"
    },
    "startTime": "2023-04-15T06:42:31.191137Z",
    "status": "Running",
    "historyLength": "2",
    "executionTime": "2023-04-15T06:42:31.191137Z",
    "memo": {

    },
    "autoResetPoints": {

    },
    "stateTransitionCount": "1"
  },
  "pendingWorkflowTask": {
    "state": "Scheduled",
    "scheduledTime": "2023-04-15T06:42:31.191173Z",
    "originalScheduledTime": "2023-04-15T06:42:31.191173Z",
    "attempt": 1
  }
}
```

For more detailed output in JSON format, use the following command:

```shell
$ temporal workflow list --fields long --output json

[
  {
    "execution": {
      "workflow_id": "123",
      "run_id": "357074e4-0dd8-4c44-8367-d92536dd0943"
    },
    "type": {
      "name": "MyWorkflow"
    },
    "start_time": "2023-04-15T06:42:31.191137Z",
    "status": 1,
    "execution_time": "2023-04-15T06:42:31.191137Z",
    "memo": {},
    "task_queue": "hello-world"
  }
]
```

Filter out Workflows based on Workflow Type with [jq](https://stedolan.github.io/jq/):

```shell
$ temporal workflow list --fields long -o json | jq '.[].type.name'

"OtherWorkflow"
"MyWorkflow"
"MyWorkflow"
```

To count the number of Workflows, use the following command:

```shell
$ temporal workflow list --fields long -o json | jq '.[].type.name' | uniq -c

   1 "OtherWorkflow"
   2 "MyWorkflow"
```

To see the full range of Workflow-related commands, run `temporal workflow` or see the [Temporal CLI workflow command reference](/cli/workflow).

For a full list of available commands, run `temporal` or see [Available commands](#available-commands).

### Customize your environment variables

To communicate with a different Server, like a production Namespace on Temporal Cloud:

1. Create an environment named `prod`.
2. Pass `--env prod` to commands, like `temporal workflow list --env prod`.

To create a new environment and set its properties:

```shell
temporal env set prod.namespace production.f45a2
temporal env set prod.address production.f45a2.tmprl.cloud:7233
temporal env set prod.tls-cert-path /temporal/certs/prod.pem
temporal env set prod.tls-key-path /temporal/certs/prod.key
```

Check your settings:

```shell
$ temporal env get prod

  address        production.f45a2.tmprl.cloud:7233
  namespace      production.f45a2
  tls-cert-path  /temporal/certs/prod.pem
  tls-key-path   /temporal/certs/prod.key
```

Run a command to test the connection:

```shell
$ temporal workflow list --env prod
```

For a full list of properties, use `temporal env set -h`.

```shell
$ temporal env set -h

OPTIONS:
   Client Options:

   --address value                          The host and port (formatted as host:port) for the Temporal Frontend Service. [$TEMPORAL_CLI_ADDRESS]
   --codec-auth value                       Sets the authorization header on requests to the Codec Server. [$TEMPORAL_CLI_CODEC_AUTH]
   --codec-endpoint value                   Endpoint for a remote Codec Server. [$TEMPORAL_CLI_CODEC_ENDPOINT]
   --context-timeout value                  An optional timeout for the context of an RPC call (in seconds). (default: 5) [$TEMPORAL_CONTEXT_TIMEOUT]
   --env value                              Name of the environment to read environmental variables from. (default: "default")
   --grpc-meta value [ --grpc-meta value ]  Contains gRPC metadata to send with requests (format: key=value). Values must be in a valid JSON format.
   --namespace value, -n value              Identifies a Namespace in the Temporal Workflow. (default: "default") [$TEMPORAL_CLI_NAMESPACE]
   --tls-ca-path value                      Path to server CA certificate. [$TEMPORAL_CLI_TLS_CA]
   --tls-cert-path value                    Path to x509 certificate. [$TEMPORAL_CLI_TLS_CERT]
   --tls-disable-host-verification          Disables TLS host name verification if already enabled. (default: false) [$TEMPORAL_CLI_TLS_DISABLE_HOST_VERIFICATION]
   --tls-key-path value                     Path to private certificate key. [$TEMPORAL_CLI_TLS_KEY]
   --tls-server-name value                  Provides an override for the target TLS server name. [$TEMPORAL_CLI_TLS_SERVER_NAME]

   Display Options:

   --color value  when to use color: auto, always, never. (default: "auto")
```
