---
id: what-is-the-temporal-cli
title: What is the Temporal CLI?
description: The Temporal CLI is the most recent version of Temporal's command-line tool.
sidebar_label: Temporal CLI
tags:
  - term
  - cli
---

The Temporal CLI, evolving from its precursor [tctl](/concepts/what-is-the-temporal-cli), serves as a command-line interface that provides developers with direct access to a Temporal Cluster.
It's a powerful tool for managing, monitoring, and debugging Temporal Applications.
With the Temporal CLI, developers can start Workflows, Signal or cancel them, and Query Workflow state, directly from their terminal.
This interface also facilitates administrative tasks such as Namespace management.

The CLI encapsulates complex operations into simpler command-line inputs, making it an indispensable component of a developer’s toolkit when working with the Temporal ecosystem.
Its design philosophy emphasizes ease of use and efficiency, catering to both quick inspections and more complex batch operations, thereby streamlining the development and operational processes for durable applications.

:::note

When upgrading from `tctl` to Temporal CLI, make sure to update your environment variables and use updated commands.
For details, see [CLI release notes](https://github.com/temporalio/cli/releases/).

:::

The Temporal CLI includes a distribution of a Temporal Cluster, comprised of the [Temporal Server](/concepts/what-is-the-temporal-server), SQLite persistence, and the [Temporal Web UI](/concepts/what-is-the-temporal-web-ui).

### Command set

- [temporal activity](/cli/activity/)
- [temporal batch](/cli/batch/)
- [temporal env](/cli/env/)
- [temporal operator](/cli/operator/)
- [temporal schedule](/cli/schedule/)
- [temporal server](/cli/server)
- [temporal task-queue](/cli/task-queue/)
- [temporal workflow](/cli/workflow/)

### Namespace registration

Namespaces are pre-registered at startup for immediate use.
Customize pre-registered Namespaces with the following command:

```shell
temporal server start-dev --namespace foo --namespace bar
```

Register Namespaces with `namespace create`:

```shell
temporal operator namespace create foo
```

### Enable or disable Temporal UI

By default, the Temporal UI starts with Temporal CLI.
To disable the UI, use the `--headless` modifier:

```shell
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
The following table lists and describes the environment variables you can set for Temporal CLI.

| Variable                                 | Definition                                                                | Client Option                   |
| ---------------------------------------- | ------------------------------------------------------------------------- | ------------------------------- |
| `TEMPORAL_ADDRESS`                       | Host and port (formatted as host:port) for the Temporal Frontend Service. | --address                       |
| `TEMPORAL_CODEC_AUTH`                    | Sets the authorization header for requests to Codec Server.               | --codec-auth                    |
| `TEMPORAL_CODEC_ENDPOINT`                | Endpoint for remote Codec Server.                                         | --codec-endpoint                |
| `TEMPORAL_CONTEXT_TIMEOUT`               | Optional timeout for RPC call context (in seconds). Default: 5.           | --context-timeout               |
| `TEMPORAL_NAMESPACE`                     | Namespace in Temporal Workflow. Default: "default".                       | --namespace                     |
| `TEMPORAL_TLS_CA`                        | Path to server CA certificate.                                            | --tls-ca-path                   |
| `TEMPORAL_TLS_CERT`                      | Path to x509 certificate.                                                 | --tls-cert-path                 |
| `TEMPORAL_TLS_DISABLE_HOST_VERIFICATION` | Disables TLS host name verification. Default: false.                      | --tls-disable-host-verification |
| `TEMPORAL_TLS_KEY`                       | Path to private certificate key.                                          | --tls-key-path                  |
| `TEMPORAL_TLS_SERVER_NAME`               | Override for target TLS server name.                                      | --tls-server-name               |

## Proxy support

Temporal CLI provides support for users who are operating behind a proxy.
This feature ensures seamless communication even in network-restricted environments.

#### Setting up proxy support

If you are behind a proxy, you'll need to instruct the Temporal CLI to route its requests via that proxy.
You can achieve this by setting the `HTTPS_PROXY` environment variable.

```command
export HTTPS_PROXY=<host>:<port>
```

Replace `<host>` with the proxy's hostname or IP address, and `<port>` with the proxy's port number.

Once set, you can run the Temporal CLI commands as you normally would.

:::note

Temporal CLI uses the gRPC library which natively supports HTTP CONNECT proxies. The gRPC library checks for the `HTTPS_PROXY` (and its case-insensitive variants) environment variable to determine if it should route requests through a proxy.

:::

In addition to `HTTPS_PROXY`, gRPC also respects the `NO_PROXY` environment variable.
This can be useful if there are specific addresses or domains you wish to exclude from proxying.

For more information, see [Proxy](https://github.com/grpc/grpc-go/blob/master/Documentation/proxy.md) in the gRPC documentation.

## Auto-completion

Enable auto-completion using the following commands.

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

Install [bash-completion](https://github.com/scop/bash-completion#installation) and add the software to `~/.bash_profile`.

To use aliases, add them to `~/.bash_profile` as needed.

```bash
alias t='temporal'
alias tw='temporal workflow'
alias ts='temporal server start-dev'
alias tsdb='temporal server start-dev --db-filename ~/temporal.db'

# send process to background so you can continue using the terminal
alias tsbg='temporal server start-dev &> /dev/null & disown'
```
