---
id: what-is-the-temporal-cli
title: What is the Temporal CLI?
description: The Temporal CLI is the most recent version of Temporal's command-line tool.
sidebar_label: Temporal CLI
tags:
  - term
  - cli
---

> ⚠️ Temporal CLI's API is still subject to change. ⚠️

This documentation reflects the release of the [single-binary Temporal CLI](https://github.com/temporalio/cli).
This tool was formerly known as `tctl next`.

---

The Temporal CLI is a command-line tool that serves as a distribution of the [Temporal Server](/concepts/what-is-the-temporal-server) and [Temporal Web UI](/concepts/what-is-the-temporal-web-ui).
The tool runs as a single process with zero runtime dependencies, and supports persistence to disk and in-memory mode through SQLite.

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

Temporal CLI can be installed through several different methods. While most of them can be used across all operating systems, please note that Homebrew is macOS-exclusive.

### cURL

Run the following command to install the latest version of Temporal CLI.

`curl -sSf https://temporal.download/cli.sh | sh`

### Homebrew

Run the following command in a new terminal window to install CLI for macOS.

`brew install temporal`

### GitHub releases

Download and extract the latest release from [GitHub releases](https://github.com/temporalio/cli/releases).

### CDN

To install the Temporal CLI from CDN:

1. Select the binary with the corresponding platform and architecture of your system.
2. Download the binary.
3. Extract the downloaded archive.
4. Add the `temporal` binary to your system PATH.

## Starting the Temporal Server

Run the command provided below to start the Temporal Server.
This will automatically start the Web UI.

```bash
temporal server start-dev
```

At this point you should have a server running on `localhost:7233` and a web interface at <http://localhost:8233>.
A default Namespace has also been created.

Run individual commands to interact with the local Temporal server.

```bash
temporal operator namespace list
temporal workflow list
```

## Configuration

Use the help flag to see a full list of CLI options:

```bash
temporal server start-dev --help
```

Configure the environment with `env` commands:

```bash
temporal env set [environment options]
```

### Environmental variables

The Temporal CLI hosts a set of Client Options that can be used to configure the system environment.
Use the provided table as a reference for the Temporal CLI environmental variables.

| Variable   | Definition   | Client Option |
|---|---|---|
| `TEMPORAL_CLI_ADDRESS`  | The host and port (formatted as host:port) for the Temporal Frontend Service.   | --address |
| `TEMPORAL_CLI_CODEC_AUTH` | Sets the authorization header on requests to the Codec Server.  | --codec-auth |
| `TEMPORAL_CLI_CODEC_ENDPOINT` | Endpoint for a remote Codec Server. | --codec-endpoint |
| `TEMPORAL_CONTEXT_TIMEOUT` | An optional timeout for the context of an RPC call (in seconds). Default value: 5 | --context-timeout |
| `TEMPORAL_CLI_NAMESPACE` | Identifies a Namespace in the Temporal Workflow. Default value: "default". | --namespace |
| `TEMPORAL_CLI_TLS_CA` | Path to server CA certificate. | --tls-ca-path |
| `TEMPORAL_CLI_TLS_CERT` | Path to x509 certificate. | --tls-cert-path |
| `TEMPORAL_CLI_TLS_DISABLE_HOST_VERIFICATION` | Disables TLS host name verification if already enabled. Default value: false. | --tls-disable-host-verification |
| `TEMPORAL_CLI_TLS_KEY` | Path to private certificate key. | --tls-key-path |   
| `TEMPORAL_CLI_TLS_SERVER_NAME` | Provides an override for the target TLS server name. | --tls-server-name |               

### Namespace registration

Namespaces are pre-registered at startup so they're available to use right away.
To customize the pre-registered namespaces, start the server with:

```bash
temporal server start-dev --namespace foo --namespace bar
```

You can also register Namespaces with the following command:

```bash
temporal operator namespace create foo
```

### Persistence modes

By default, `temporal server start-dev` runs in an in-memory mode.

To persist the state to a file on disk, use `--db-filename`:

```bash
temporal server start-dev --db-filename my_test.db
```

### Enable or disable Temporal UI

By default, the Temporal UI is started with Temporal CLI. The UI can be disabled via a runtime flag:

```bash
temporal server start-dev --headless
```

To build without static UI assets, use the `headless` build tag when running `go build`.

<!--TODO: add go example -->

### Dynamic configuration

Advanced configuration of the Temporal CLI requires the use of a dynamic configuration file.
This file is created outside of the Temporal CLI; it is usually located with the service's config files.

Dynamic configuration values can also be set via `--dynamic-config-value KEY=JSON_VALUE`.
For example, to disable the search attribute cache, run:

```bash
temporal server start-dev --dynamic-config-value system.forceSearchAttributesCacheRefreshOnRead=true
```

This setting makes created search attributes immediately available for use.

## Auto-completion

The Temporal CLI has the capability to auto-complete commands.

Running `temporal completion SHELL` will output the related completion SHELL code.

### zsh auto-completion

<!-- TODO: add more information about zsh to make comparable to bash section -->

Add the following code snippet to your `~/.zshrc` file:

```sh
source <(temporal completion zsh)
```

If you're running auto-completion from the terminal, run the command below:

```sh
echo 'source <(temporal completion zsh)' >> ~/.zshrc
```

After setting the variable, run:

`source ~/.zshrc`.

### Bash auto-completion

Bash auto-completion relies on `bash-completion`.

Install the software with the steps provided [here](https://github.com/scop/bash-completion#installation), or use your preferred package manager on your operating system.

#### Linux installation

Use any of the following package managers to install `bash-completion`:
`apt install bash-completion`
`pacman -S bash-completion`
`yum install bash-completion`

Verify that `bash-completion` is installed by running `type _init_completion`.

To install the software on Alpine Linux, run:

```bash
apk update
apk add bash-completion
source /etc/profile.d/bash_completion.sh
```

Finally, enable completion for Temporal by adding the following code to your bash file:

```
echo 'source <(temporal completion bash)' >>~/.bashrc
source ~/.bashrc
```

#### macOS installation

Install `bash-completion` through Homebrew:
`brew install bash-completion@2`

Add the provided code snippet to your `~/.bashrc` file:

```sh
[[ -r "/usr/local/etc/profile.d/bash_completion.sh" ]] && . "/usr/local/etc/profile.d/bash_completion.sh"
```

Verify that `bash-completion` is installed by running `type _init_completion`.

Enable completion for Temporal by adding the following code to your bash file:

```
echo 'source <(temporal completion bash)' >> ~/.bashrc
source ~/.bashrc
```

## Development

The Temporal CLI can be compiled and executed from your system.

To compile the source code into an executable, run:

```bash
go build -o dist/temporal ./cmd/temporal
```

To compile the documentation, run:

```bash
go build -o dist/temporal-docgen ./cmd/temporal-docgen
```

To run all tests:

```bash
go test ./...
```

## Known Issues

- When consuming Temporal as a library in go mod, you may want to replace grpc-gateway with a fork to address URL escaping issue in UI. See <https://github.com/temporalio/temporalite/pull/118>

- When running the executables from the Releases page in macOS you will want to allowlist `temporal` binary in `Security & Privacy` settings:

<!--
- [Environment variables for tctl](/tctl-next/environment-variables) -->
