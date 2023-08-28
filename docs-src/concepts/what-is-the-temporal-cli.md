---
id: what-is-the-temporal-cli
title: What is the Temporal CLI?
description: The Temporal CLI is the most recent version of Temporal's command-line tool.
sidebar_label: Temporal CLI
tags:
  - term
  - cli
---

:::note

The release of Temporal Server v1.22 deprecates `tctl`.
To correct errors in env and command names, refer to the [CLI release notes](https://github.com/temporalio/cli/releases/tag/v0.9.0).

:::

The command-line tool Temporal CLI includes a distribution of a Temporal Cluster, comprising the [Temporal Server](/concepts/what-is-the-temporal-server), SQLite persistence, and the [Temporal Web UI](/concepts/what-is-the-temporal-web-ui).

### Available commands

- [temporal activity](/cli/activity/)
- [temporal batch](/cli/batch/)
- [temporal env](/cli/env/)
- [temporal operator](/cli/operator/)
- [temporal schedule](/cli/schedule/)
- [temporal server](/cli/server)
- [temporal task-queue](/cli/task-queue/)
- [temporal workflow](/cli/workflow/)

## Installation

### cURL

Run the following command to install Temporal CLI using cURL:

`curl -sSf https://temporal.download/cli.sh | sh`

### Homebrew

Run the following command to install Temporal CLI using Homebrew:

`brew install temporal`

### Manual

Follow these steps to manually install Temporal CLI:

1. Download the version for your OS and architecture:
   - [Linux amd64](https://temporal.download/cli/archive/latest?platform=linux&arch=amd64)
   - [Linux arm64](https://temporal.download/cli/archive/latest?platform=linux&arch=arm64)
   - [macOS amd64](https://temporal.download/cli/archive/latest?platform=darwin&arch=amd64)
   - [macOS arm64](https://temporal.download/cli/archive/latest?platform=darwin&arch=arm64) (Apple silicon)
   - [Windows amd64](https://temporal.download/cli/archive/latest?platform=windows&arch=amd64)
   - [Windows arm64](https://temporal.download/cli/archive/latest?platform=windows&arch=arm64)
2. Extract the downloaded archive.
3. Add the `temporal` binary to your PATH (use `temporal.exe` for Windows).

## Starting the Temporal Server

To start the Temporal Server, run the following command:

```bash
temporal server start-dev
```

This launches a server on `localhost:7233` and a web interface at <http://localhost:8233>.

By default, data isn't persisted.
If you want to save Workflows, use the `--db-filename` flag:

```bash
temporal server start-dev --db-filename temporal.db
```

## Interacting with the Server

In another terminal, use the following commands to interact with the Server.
The following command starts a Workflow:

```bash
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

```bash
temporal workflow start -t hello-world --type MyWorkflow -w 123 -i 456
```

You can also list and describe Workflows:

```bash
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

```bash
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

Filter out Workflows based on Type with [jq](https://stedolan.github.io/jq/):

```bash
$ temporal workflow list --fields long -o json | jq '.[].type.name'

"OtherWorkflow"
"MyWorkflow"
"MyWorkflow"
```

To count the number of Workflows, use the following command:

```bash
$ temporal workflow list --fields long -o json | jq '.[].type.name' | uniq -c

   1 "OtherWorkflow"
   2 "MyWorkflow"
```

To see the full range of Workflow-related commands, run `temporal workflow` or visit [CLI ▶️ workflow](/cli/workflow).

For a full list of available commands, run `temporal` or visit [Available commands](#available-commands).

## Environments

To communicate with a different Server, like a production Namespace on Temporal Cloud:

1. Create an environment named `prod`.
2. Pass `--env prod` to commands, like `temporal workflow list --env prod`.

To create a new environment and set its properties:

```bash
temporal env set prod.namespace production.f45a2
temporal env set prod.address production.f45a2.tmprl.cloud:7233
temporal env set prod.tls-cert-path /temporal/certs/prod.pem
temporal env set prod.tls-key-path /temporal/certs/prod.key
```

Check your settings:

```bash
$ temporal env get prod

  address        production.f45a2.tmprl.cloud:7233
  namespace      production.f45a2
  tls-cert-path  /temporal/certs/prod.pem
  tls-key-path   /temporal/certs/prod.key
```

Run a command to test the connection:

```bash
$ temporal workflow list --env prod
```

For a full list of properties, use `temporal env set -h`.

```bash
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

## Server configuration

View the full list of CLI configuration options with the `--help` flag:

```bash
temporal server start-dev --help
```

### Namespace registration

Namespaces are pre-registered at startup for immediate use.
Customize pre-registered Namespaces with the following command:

```bash
temporal server start-dev --namespace foo --namespace bar
```

Register Namespaces with `namespace create`:

```bash
temporal operator namespace create foo
```

### Enable or disable Temporal UI

By default, the Temporal UI starts with Temporal CLI.
Disable the UI with:

```bash
temporal server start-dev --headless
```

### Dynamic configuration

Advanced Temporal CLI configuration requires a dynamic configuration file.

To set values on the command line, use `--dynamic-config-value KEY=JSON_VALUE`.
For example, enable the Search Attribute cache:

```bash
temporal server start-dev --dynamic-config-value system.forceSearchAttributesCacheRefreshOnRead=false
```

This setting makes created Search Attributes immediately available.

## Environmental variables

Configure system environment with Temporal CLI environmental variables.
Use the table below as reference:

| Variable                                     | Definition                                                                | Client Option                   |
| -------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------- |
| `TEMPORAL_CLI_ADDRESS`                       | Host and port (formatted as host:port) for the Temporal Frontend Service. | --address                       |
| `TEMPORAL_CLI_CODEC_AUTH`                    | Sets the authorization header for requests to Codec Server.               | --codec-auth                    |
| `TEMPORAL_CLI_CODEC_ENDPOINT`                | Endpoint for remote Codec Server.                                         | --codec-endpoint                |
| `TEMPORAL_CONTEXT_TIMEOUT`                   | Optional timeout for RPC call context (in seconds). Default: 5.           | --context-timeout               |
| `TEMPORAL_CLI_NAMESPACE`                     | Namespace in Temporal Workflow. Default: "default".                       | --namespace                     |
| `TEMPORAL_CLI_TLS_CA`                        | Path to server CA certificate.                                            | --tls-ca-path                   |
| `TEMPORAL_CLI_TLS_CERT`                      | Path to x509 certificate.                                                 | --tls-cert-path                 |
| `TEMPORAL_CLI_TLS_DISABLE_HOST_VERIFICATION` | Disables TLS host name verification. Default: false.                      | --tls-disable-host-verification |
| `TEMPORAL_CLI_TLS_KEY`                       | Path to private certificate key.                                          | --tls-key-path                  |
| `TEMPORAL_CLI_TLS_SERVER_NAME`               | Override for target TLS server name.                                      | --tls-server-name               |

## Auto-completion

Enable auto-completion using the following commands.

### zsh auto-completion

<!-- TODO: add more information about zsh to make comparable to bash section -->

Add the following code snippet to your `~/.zshrc` file:

```sh
source <(temporal completion zsh)
```

If you're running auto-completion from the terminal, run:

```sh
echo 'source <(temporal completion zsh)' >> ~/.zshrc
```

After setting the variable, run:

`source ~/.zshrc`.

### Bash auto-completion

Install []`bash-completion`](https://github.com/scop/bash-completion#installation) and add the software to your `~/.bash_profile`.

To utilize aliases, add them to `~/.bash_profile` as needed.

```bash
alias t='temporal'
alias tw='temporal workflow'
alias ts='temporal server start-dev'
alias tsdb='temporal server start-dev --db-filename ~/temporal.db'

# send process to background so you can continue using the terminal
alias tsbg='temporal server start-dev &> /dev/null & disown'
```
