---
id: worker
title: Temporal CLI worker command reference
sidebar_label: worker
description: Learn how to read or modify state associated with a Worker, such as Worker Deployments.
toc_max_heading_level: 4
keywords:
  - worker
  - worker deployment
  - worker list
  - worker describe
tags:
  - Temporal CLI
---

{/* NOTE: This is an auto-generated file. Any edit to this file will be overwritten.
This file is generated from https://github.com/temporalio/cli/blob/main/internal/commandsgen/commands.yml via internal/cmd/gen-docs */}

This page provides a reference for the `temporal` CLI `worker` command. The flags applicable to each subcommand are presented in a table within the heading for the subcommand. Refer to [Global Flags](#global-flags) for flags that you can use with every subcommand.

## deployment

Deployment commands perform operations on Worker Deployments:

```
temporal worker deployment [command] [options]
```

For example:

```
temporal worker deployment list
```

Lists the Deployments in the client's namespace.

Arguments can be Worker Deployment Versions associated with
a Deployment, specified using the Deployment name and Build ID.

For example:

```
temporal worker deployment set-current-version \
         --deployment-name YourDeploymentName --build-id YourBuildID
```

Sets the current Deployment Version for a given Deployment.

### delete

Remove a Worker Deployment given its Deployment Name.
A Deployment can only be deleted if it has no Version in it.

```
temporal worker deployment delete [options]
```

For example, setting the user identity that removed the deployment:

```
temporal worker deployment delete \
    --name YourDeploymentName \
    --identity YourIdentity

```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name`, `-d` | Yes | **string** Name for a Worker Deployment. |

### delete-version

Remove a Worker Deployment Version given its fully-qualified identifier.
This is rarely needed during normal operation
since unused Versions are eventually garbage collected.
The client can delete a Version only when all of the following conditions
are met:
  - It is not the Current or Ramping Version for this Deployment.
  - It has no active pollers, i.e., none of the task queues in the
  Version have pollers.
  - It is not draining. This requirement can be ignored with the option
`--skip-drainage`.
```
temporal worker deployment delete-version [options]
```

For example, skipping the drainage restriction:

```
temporal worker deployment delete-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --skip-drainage
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--skip-drainage` | No | **bool** Ignore the deletion requirement of not draining. |

### describe

Describe properties of a Worker Deployment, such as the versions
associated with it, routing information of new or existing tasks
executed by this deployment, or its creation time.

```
temporal worker deployment describe [options]
```

For example, to describe a deployment `YourDeploymentName` in the default
namespace:

```
temporal worker deployment describe \
    --name YourDeploymentName
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name`, `-d` | Yes | **string** Name for a Worker Deployment. |

### describe-version

Describe properties of a Worker Deployment Version, such as the task
queues polled by workers in this Deployment Version, or drainage
information required to safely decommission workers, or user-provided
metadata, or its creation/modification time.

```
temporal worker deployment describe-version [options]
```

For example, to describe a deployment version  in a deployment
`YourDeploymentName`, with Build ID `YourBuildID`, and in the default
namespace:

```
temporal worker deployment describe-version \
    --deployment-name YourDeploymentName --build-id YourBuildID
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--report-task-queue-stats` | No | **bool** Report stats for task queues that are present in this version. |

### list

List existing Worker Deployments in the client's namespace.

```
temporal worker deployment list [options]
```

For example, listing Deployments in YourDeploymentNamespace:

```
temporal worker deployment list \
    --namespace YourDeploymentNamespace
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### manager-identity

Manager Identity commands change the `ManagerIdentity` of a Worker Deployment:

```
temporal worker deployment manager-identity [command] [options]
```

When present, `ManagerIdentity` is the identity of the user that has the 
exclusive right to make changes to this Worker Deployment. Empty by default.
When set, users whose identity does not match the `ManagerIdentity` will not
be able to change the Worker Deployment.

This is especially useful in environments where multiple users (such as CLI
users and automated controllers) may interact with the same Worker Deployment.
`ManagerIdentity` allows different users to communicate with one another about
who is expected to make changes to the Worker Deployment.

The current Manager Identity is returned with `describe`:
```
 temporal worker deployment describe \
    --deployment-name YourDeploymentName
```

#### set

Set the `ManagerIdentity` of a Worker Deployment given its Deployment Name.

When present, `ManagerIdentity` is the identity of the user that has the 
exclusive right to make changes to this Worker Deployment. Empty by default.
When set, users whose identity does not match the `ManagerIdentity` will not
be able to change the Worker Deployment.

This is especially useful in environments where multiple users (such as CLI
users and automated controllers) may interact with the same Worker Deployment.
`ManagerIdentity` allows different users to communicate with one another about
who is expected to make changes to the Worker Deployment.

```
temporal worker deployment manager-identity set [options]
```

For example:

```
temporal worker deployment manager-identity set \
   --deployment-name DeploymentName \
   --self \
   --identity YourUserIdentity # optional, populated by CLI if not provided
```

Sets the Manager Identity of the Deployment to the identity of the user making 
this request. If you don't specifically pass an identity field, the CLI will 
generate your identity for you.

For example:
```
temporal worker deployment manager-identity set \
   --deployment-name DeploymentName \
   --manager-identity NewManagerIdentity
```

Sets the Manager Identity of the Deployment to any string.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--deployment-name` | No | **string** Name for a Worker Deployment. Required. |
| `--manager-identity` | No | **string** New Manager Identity. Required unless --self is specified. |
| `--self` | No | **bool** Set Manager Identity to the identity of the user submitting this request. Required unless --manager-identity is specified. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm set Manager Identity. |

#### unset

Unset the `ManagerIdentity` of a Worker Deployment given its Deployment Name.

When present, `ManagerIdentity` is the identity of the user that has the 
exclusive right to make changes to this Worker Deployment. Empty by default.
When set, users whose identity does not match the `ManagerIdentity` will not
be able to change the Worker Deployment.

This is especially useful in environments where multiple users (such as CLI
users and automated controllers) may interact with the same Worker Deployment.
`ManagerIdentity` allows different users to communicate with one another about
who is expected to make changes to the Worker Deployment.

```
temporal worker deployment manager-identity unset [options]
```

For example:

```
temporal worker deployment manager-identity unset \
   --deployment-name YourDeploymentName
```

Clears the Manager Identity field for a given Deployment.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--deployment-name` | No | **string** Name for a Worker Deployment. Required. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm unset Manager Identity. |

### set-current-version

Set the Current Version for a Deployment.
When a Version is current, Workers of that Deployment Version will receive
tasks from new Workflows, and from existing AutoUpgrade Workflows that
are running on this Deployment.

If not all the expected Task Queues are being polled by Workers in the
new Version the request will fail. To override this protection use
`--ignore-missing-task-queues`. Note that this would ignore task queues
in a deployment that are not yet discovered, leading to inconsistent task
queue configuration.

```
temporal worker deployment set-current-version [options]
```

For example, to set the Current Version of a deployment
`YourDeploymentName`, with a version with Build ID `YourBuildID`, and
in the default namespace:

```
temporal worker deployment set-current-version \
    --deployment-name YourDeploymentName --build-id YourBuildID
```

The target of set-current-version can also be unversioned workers:

```
temporal worker deployment set-current-version \
    --deployment-name YourDeploymentName --unversioned
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--allow-no-pollers` | No | **bool** Override protection and set version as current even if it has no pollers. |
| `--build-id` | No | **string** Build ID of the Worker Deployment Version. Required unless --unversioned is specified. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--ignore-missing-task-queues` | No | **bool** Override protection to accidentally remove task queues. |
| `--unversioned` | No | **bool** Set unversioned workers as the target version. Cannot be used with --build-id. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm set Current Version. |

### set-ramping-version

Set the Ramping Version and Percentage for a Deployment.

The Ramping Version can be set using deployment name and build ID,
or set to unversioned workers using the --unversioned flag.

The Ramping Percentage is a float with values in the range [0, 100].
A value of 100 does not make the Ramping Version Current, use
`set-current-version` instead.

To remove a Ramping Version use the flag `--delete`.

If not all the expected Task Queues are being polled by Workers in the
new Ramping Version the request will fail. To override this protection use
`--ignore-missing-task-queues`. Note that this would ignore task queues
in a deployment that are not yet discovered, leading to inconsistent task
queue configuration.

```
temporal worker deployment set-ramping-version [options]
```

For example, to set the Ramping Version of a deployment
`YourDeploymentName`, with a version with Build ID `YourBuildID`, with
10 percent of tasks redirected to this version, and
using the default namespace:

```
temporal worker deployment set-ramping-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --percentage 10.0
```

And to remove that ramping:
```
temporal worker deployment set-ramping-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --delete
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--allow-no-pollers` | No | **bool** Override protection and set version as ramping even if it has no pollers. |
| `--build-id` | No | **string** Build ID of the Worker Deployment Version. Required unless --unversioned is specified. |
| `--delete` | No | **bool** Delete the Ramping Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--ignore-missing-task-queues` | No | **bool** Override protection to accidentally remove task queues. |
| `--percentage` | No | **float** Percentage of tasks redirected to the Ramping Version. Valid range [0,100]. |
| `--unversioned` | No | **bool** Set unversioned workers as the target version. Cannot be used with --build-id. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm set Ramping Version. |

### update-version-metadata

Update metadata associated with a Worker Deployment Version.

For example:

```
 temporal worker deployment update-version-metadata \
    --deployment-name YourDeploymentName --build-id YourBuildID \
    --metadata bar=1 \
    --metadata foo=true
```

The current metadata is also returned with `describe-version`:
```
 temporal worker deployment describe-version \
    --deployment-name YourDeploymentName --build-id YourBuildID \
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--build-id` | Yes | **string** Build ID of the Worker Deployment Version. |
| `--deployment-name` | Yes | **string** Name of the Worker Deployment. |
| `--metadata` | No | **string[]** Set deployment metadata using `KEY="VALUE"` pairs. Keys must be identifiers, and values must be JSON values. For example: `YourKey={"your": "value"}` Can be passed multiple times. |
| `--remove-entries` | No | **string[]** Keys of entries to be deleted from metadata. Can be passed multiple times. |

## describe

Look up information of a specific worker.

```
temporal worker describe --namespace YourNamespace --worker-instance-key YourKey
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--worker-instance-key` | Yes | **string** Worker instance key to describe. |

## list

Get a list of workers to the specified namespace.

```
temporal worker list --namespace YourNamespace --query 'TaskQueue="YourTaskQueue"'
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--limit` | No | **int** Maximum number of workers to display. |
| `--query`, `-q` | No | **string** Content for an SQL-like `QUERY` List Filter. |

## Global Flags

The following options can be used with any command.

| Flag | Required | Description | Default |
|------|----------|-------------|--------|
| `--address` | No | **string** Temporal Service gRPC endpoint. | `localhost:7233` |
| `--api-key` | No | **string** API key for request. |  |
| `--client-authority` | No | **string** Temporal gRPC client :authority pseudoheader. |  |
| `--client-connect-timeout` | No | **duration** The client connection timeout. 0s means no timeout. |  |
| `--codec-auth` | No | **string** Authorization header for Codec Server requests. |  |
| `--codec-endpoint` | No | **string** Remote Codec Server endpoint. |  |
| `--codec-header` | No | **string[]** HTTP headers for requests to codec server. Format as a `KEY=VALUE` pair. May be passed multiple times to set multiple headers. |  |
| `--color` | No | **string-enum** Output coloring. Accepted values: always, never, auto. | `auto` |
| `--command-timeout` | No | **duration** The command execution timeout. 0s means no timeout. |  |
| `--config-file` | No | **string** File path to read TOML config from, defaults to `$CONFIG_PATH/temporalio/temporal.toml` where `$CONFIG_PATH` is defined as `$HOME/.config` on Unix, `$HOME/Library/Application Support` on macOS, and `%AppData%` on Windows. _(Experimental)_ |  |
| `--disable-config-env` | No | **bool** If set, disables loading environment config from environment variables. _(Experimental)_ |  |
| `--disable-config-file` | No | **bool** If set, disables loading environment config from config file. _(Experimental)_ |  |
| `--env` | No | **string** Active environment name (`ENV`). | `default` |
| `--env-file` | No | **string** Path to environment settings file. Defaults to `$HOME/.config/temporalio/temporal.yaml`. |  |
| `--grpc-meta` | No | **string[]** HTTP headers for requests. Format as a `KEY=VALUE` pair. May be passed multiple times to set multiple headers. Can also be made available via environment variable as `TEMPORAL_GRPC_META_[name]`. |  |
| `--identity` | No | **string** The identity of the user or client submitting this request. Defaults to "temporal-cli:$USER@$HOST". |  |
| `--log-format` | No | **string-enum** Log format. Accepted values: text, json. | `text` |
| `--log-level` | No | **string-enum** Log level. Default is "info" for most commands and "warn" for `server start-dev`. Accepted values: debug, info, warn, error, never. | `info` |
| `--namespace`, `-n` | No | **string** Temporal Service Namespace. | `default` |
| `--no-json-shorthand-payloads` | No | **bool** Raw payload output, even if the JSON option was used. |  |
| `--output`, `-o` | No | **string-enum** Non-logging data output format. Accepted values: text, json, jsonl, none. | `text` |
| `--profile` | No | **string** Profile to use for config file. _(Experimental)_ |  |
| `--time-format` | No | **string-enum** Time format. Accepted values: relative, iso, raw. | `relative` |
| `--tls` | No | **bool** Enable base TLS encryption. Does not have additional options like mTLS or client certs. This is defaulted to true if api-key or any other TLS options are present. Use --tls=false to explicitly disable. |  |
| `--tls-ca-data` | No | **string** Data for server CA certificate. Can't be used with --tls-ca-path. |  |
| `--tls-ca-path` | No | **string** Path to server CA certificate. Can't be used with --tls-ca-data. |  |
| `--tls-cert-data` | No | **string** Data for x509 certificate. Can't be used with --tls-cert-path. |  |
| `--tls-cert-path` | No | **string** Path to x509 certificate. Can't be used with --tls-cert-data. |  |
| `--tls-disable-host-verification` | No | **bool** Disable TLS host-name verification. |  |
| `--tls-key-data` | No | **string** Private certificate key data. Can't be used with --tls-key-path. |  |
| `--tls-key-path` | No | **string** Path to x509 private key. Can't be used with --tls-key-data. |  |
| `--tls-server-name` | No | **string** Override target TLS server name. |  |

