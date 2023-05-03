---
id: what-is-the-temporal-cli
title: What is the Temporal CLI?
description: The Temporal CLI is the most recent version of Temporal's command-line tool.
sidebar_label: Temporal CLI
tags:
  - term
  - cli
---

The Temporal CLI is a command-line tool that includes a distribution of a Temporal Cluster ([Temporal Server](/concepts/what-is-the-temporal-server), persistence (SQLite), and the [Temporal Web UI](/concepts/what-is-the-temporal-web-ui)).

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

Temporal CLI can be installed through [several different methods](/clusters/how-to-install-temporal-cli).

## Starting the Temporal Server

Run the following command to start the Temporal Server.
This command also starts the Web UI.

```bash
temporal server start-dev
```

At this point you should have a server running on `localhost:7233` and a web interface at <http://localhost:8233>.

By default, it doesn’t persist your data—if you start a Workflow, Ctrl-C, and run the command again, your Workflow will be gone.

If you'd like your Workflows to be saved, use the `--db-filename` flag:

```bash
temporal server start-dev --db-filename temporal.db
```

## Interacting with the Server

In another terminal, you can run commands to interact with the Server. This command starts a Workflow:

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

The shorthand options are:

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

When listing, you can get more Workflow fields and output in JSON:

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

Filter out just the type with [jq](https://stedolan.github.io/jq/):

```bash
$ temporal workflow list --fields long -o json | jq '.[].type.name'

"OtherWorkflow"
"MyWorkflow"
"MyWorkflow"
```

And count how many Workflows of each type you have:

```bash
$ temporal workflow list --fields long -o json | jq '.[].type.name' | uniq -c

   1 "OtherWorkflow"
   2 "MyWorkflow"
```

To see what else you can do to Workflows, run `temporal workflow` or visit [CLI ▶️ workflow](/cli/workflow).

To see the list of top-level commands, run `temporal` or visit [Available commands](#available-commands).

## Environments

So far, the CLI has been talking to the Server at the default address, `localhost:7233`. To talk to another Server, like a production namespace on Temporal Cloud:

1. Create an environment named `prod`.
2. Pass `--env prod` to commands, like `temporal workflow list --env prod`.

To create a new environment, start setting its properties:

```bash
temporal env set prod.namespace production.f45a2
temporal env set prod.address production.f45a2.tmprl.cloud:7233
temporal env set prod.tls-cert-path /temporal/certs/prod.pem
temporal env set prod.tls-key-path /temporal/certs/prod.key
```

Check that you set them correctly:

```bash
$ temporal env get prod

  address        production.f45a2.tmprl.cloud:7233
  namespace      production.f45a2
  tls-cert-path  /temporal/certs/prod.pem
  tls-key-path   /temporal/certs/prod.key
```

If they’re correct, then this shouldn’t log a connection error:

```bash
$ temporal workflow list --env prod
```

For the full list of properties you can set, see the below options:

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

For example, to set `--codec-endpoint`, you would do:

```bash
$ temporal env set prod.codec-endpoint localhost:3000
```

## Server configuration

Use the help flag to see a full list of CLI options:

```bash
temporal server start-dev --help
```

### Namespace registration

Namespaces are pre-registered at startup so they're available to use immediately.
To customize the pre-registered namespaces, start the server with the following:

```bash
temporal server start-dev --namespace foo --namespace bar
```

You can also register Namespaces with the following command:

```bash
temporal operator namespace create foo
```

### Enable or disable Temporal UI

By default, the Temporal UI is started with Temporal CLI. The UI can be disabled via a runtime flag:

```bash
temporal server start-dev --headless
```

### Dynamic configuration

Advanced configuration of the Temporal CLI requires the use of a dynamic configuration file.
This file is created outside the Temporal CLI; it is usually located with the service's config files.

Dynamic configuration values can also be set via `--dynamic-config-value KEY=JSON_VALUE`.
For example, to enable the Search Attribute cache (disabled by default), run the following:

```bash
temporal server start-dev --dynamic-config-value system.forceSearchAttributesCacheRefreshOnRead=false
```

This setting makes created Search Attributes immediately available for use.

## Environmental variables

The Temporal CLI hosts a set of Client Options that can be used to configure the system environment.
Use the following table as a reference for the Temporal CLI environmental variables.

| Variable                                     | Definition                                                                        | Client Option                   |
| -------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------- |
| `TEMPORAL_CLI_ADDRESS`                       | The host and port (formatted as host:port) for the Temporal Frontend Service.     | --address                       |
| `TEMPORAL_CLI_CODEC_AUTH`                    | Sets the authorization header on requests to the Codec Server.                    | --codec-auth                    |
| `TEMPORAL_CLI_CODEC_ENDPOINT`                | Endpoint for a remote Codec Server.                                               | --codec-endpoint                |
| `TEMPORAL_CONTEXT_TIMEOUT`                   | An optional timeout for the context of an RPC call (in seconds). Default value: 5 | --context-timeout               |
| `TEMPORAL_CLI_NAMESPACE`                     | Identifies a Namespace in the Temporal Workflow. Default value: "default".        | --namespace                     |
| `TEMPORAL_CLI_TLS_CA`                        | Path to server CA certificate.                                                    | --tls-ca-path                   |
| `TEMPORAL_CLI_TLS_CERT`                      | Path to x509 certificate.                                                         | --tls-cert-path                 |
| `TEMPORAL_CLI_TLS_DISABLE_HOST_VERIFICATION` | Disables TLS host name verification if already enabled. Default value: false.     | --tls-disable-host-verification |
| `TEMPORAL_CLI_TLS_KEY`                       | Path to private certificate key.                                                  | --tls-key-path                  |
| `TEMPORAL_CLI_TLS_SERVER_NAME`               | Provides an override for the target TLS server name.                              | --tls-server-name               |

## Auto-completion

The Temporal CLI has the capability to auto-complete commands.

Running `temporal completion SHELL` outputs the related completion SHELL code.

### zsh auto-completion

<!-- TODO: add more information about zsh to make comparable to bash section -->

Add the following code snippet to your `~/.zshrc` file:

```sh
source <(temporal completion zsh)
```

If you're running auto-completion from the terminal, run the following command:

```sh
echo 'source <(temporal completion zsh)' >> ~/.zshrc
```

After setting the variable, run the following command:

`source ~/.zshrc`.

### Bash auto-completion

Bash auto-completion relies on `bash-completion`.

Install the software with the steps provided in the [bash-completion README](https://github.com/scop/bash-completion#installation), or use your preferred package manager on your operating system.

For more information, see [the Bash Completion page on Repology](https://repology.org/project/bash-completion/versions).

### Aliases

You can also add aliases to your `~/.bash_profile` such as:

```bash
alias t='temporal'
alias tw='temporal workflow'
alias ts='temporal server start-dev'
alias tsdb='temporal server start-dev --db-filename ~/temporal.db'

# send process to background so you can continue using the terminal
alias tsbg='temporal server start-dev &> /dev/null & disown'
```
