---
id: operator
title: Temporal CLI operator command reference
sidebar_label: operator
description: Operator commands in Temporal allow actions on Namespaces, Search Attributes, Clusters and Nexus Endpoints using specific subcommands. Execute with "temporal operator [command] [subcommand] [options]".
toc_max_heading_level: 4
keywords:
  - cli reference
  - cluster
  - cluster health
  - cluster list
  - cluster remove
  - cluster upsert
  - command-line-interface-cli
  - describe
  - namespace
  - namespace create
  - namespace delete
  - namespace describe
  - namespace list
  - nexus
  - nexus endpoint
  - nexus endpoint create
  - nexus endpoint delete
  - nexus endpoint get
  - nexus endpoint list
  - nexus endpoint update
  - operator
  - search attribute
  - search attribute create
  - search attribute list
  - search attribute remove
  - system
  - temporal cli
  - update
tags:
  - Temporal CLI
---

{/* NOTE: This is an auto-generated file. Any edit to this file will be overwritten.
This file is generated from https://github.com/temporalio/cli/blob/main/internal/commandsgen/commands.yml via internal/cmd/gen-docs */}

This page provides a reference for the `temporal` CLI `operator` command. The flags applicable to each subcommand are presented in a table within the heading for the subcommand. Refer to [Global Flags](#global-flags) for flags that you can use with every subcommand.

## cluster

Perform operator actions on Temporal Services (also known as Clusters).

```
temporal operator cluster [subcommand] [options]
```

For example to check Service/Cluster health:

```
temporal operator cluster health
```

### describe

View information about a Temporal Cluster (Service), including Cluster Name,
persistence store, and visibility store. Add `--detail` for additional info:

```
temporal operator cluster describe [--detail]
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--detail` | No | **bool** Show history shard count and Cluster/Service version information. |

### health

View information about the health of a Temporal Service:

```
temporal operator cluster health
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### list

Print a list of remote Temporal Clusters (Services) registered to the local
Service. Report details include the Cluster's name, ID, address, History Shard
count, Failover version, and availability:

```
temporal operator cluster list [--limit max-count]
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--limit` | No | **int** Maximum number of Clusters to display. |

### remove

Remove a registered remote Temporal Cluster (Service) from the local Service.

```
temporal operator cluster remove \
    --name YourClusterName
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name` | Yes | **string** Cluster/Service name. |

### system

Show Temporal Server information for Temporal Clusters (Service): Server
version, scheduling support, and more. This information helps diagnose
problems with the Temporal Server.

The command defaults to the local Service. Otherwise, use the
`--frontend-address` option to specify a Cluster (Service) endpoint:

```
temporal operator cluster system \
    --frontend-address "YourRemoteEndpoint:YourRemotePort"
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### upsert

Add, remove, or update a registered ("remote") Temporal Cluster (Service).

```
temporal operator cluster upsert [options]
```

For example:

```
temporal operator cluster upsert \
    --frontend-address "YourRemoteEndpoint:YourRemotePort"
    --enable-connection false
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--enable-connection` | No | **bool** Set the connection to "enabled". |
| `--enable-replication` | No | **bool** Set the replication to "enabled". |
| `--frontend-address` | Yes | **string** Remote endpoint. |

## namespace

Manage Temporal Cluster (Service) Namespaces:

```
temporal operator namespace [command] [command options]
```

For example:

```
temporal operator namespace create \
    --namespace YourNewNamespaceName
```

### create

Create a new Namespace on the Temporal Service:

```
temporal operator namespace create \
    --namespace YourNewNamespaceName \
    [options]
```

Create a Namespace with multi-region data replication:

```
temporal operator namespace create \
    --global \
    --namespace YourNewNamespaceName
```

Configure settings like retention and Visibility Archival State as needed.
For example, the Visibility Archive can be set on a separate URI:

```
temporal operator namespace create \
    --retention 5d \
    --visibility-archival-state enabled \
    --visibility-uri YourURI \
    --namespace YourNewNamespaceName
```

Note: URI values for archival states can't be changed once enabled.

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--active-cluster` | No | **string** Active Cluster (Service) name. |
| `--cluster` | No | **string[]** Cluster (Service) names for Namespace creation. Can be passed multiple times. |
| `--data` | No | **string[]** Namespace data as `KEY=VALUE` pairs. Keys must be identifiers, and values must be JSON values. For example: `YourKey={"your": "value"}` Can be passed multiple times. |
| `--description` | No | **string** Namespace description. |
| `--email` | No | **string** Owner email. |
| `--global` | No | **bool** Enable multi-region data replication. |
| `--history-archival-state` | No | **string-enum** History archival state. Accepted values: disabled, enabled. |
| `--history-uri` | No | **string** Archive history to this `URI`. Once enabled, can't be changed. |
| `--retention` | No | **duration** Time to preserve closed Workflows before deletion. |
| `--visibility-archival-state` | No | **string-enum** Visibility archival state. Accepted values: disabled, enabled. |
| `--visibility-uri` | No | **string** Archive visibility data to this `URI`. Once enabled, can't be changed. |

### delete

Removes a Namespace from the Service.

```
temporal operator namespace delete [options]
```

For example:

```
temporal operator namespace delete \
    --namespace YourNamespaceName
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--yes`, `-y` | No | **bool** Request confirmation before deletion. |

### describe

Provide long-form information about a Namespace identified by its ID or name:

```
temporal operator namespace describe \
    --namespace-id YourNamespaceId
```

or

```
temporal operator namespace describe \
    --namespace YourNamespaceName
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--namespace-id` | No | **string** Namespace ID. |

### list

Display a detailed listing for all Namespaces on the Service:

```
temporal operator namespace list
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### update

Update a Namespace using properties you specify.

```
temporal operator namespace update [options]
```

Assign a Namespace's active Cluster (Service):

```
temporal operator namespace update \
    --namespace YourNamespaceName \
    --active-cluster NewActiveCluster
```

Promote a Namespace for multi-region data replication:

```
temporal operator namespace update \
    --namespace YourNamespaceName \
    --promote-global
```

You may update archives that were previously enabled or disabled. Note: URI
values for archival states can't be changed once enabled.

```
temporal operator namespace update \
    --namespace YourNamespaceName \
    --history-archival-state enabled \
    --visibility-archival-state disabled
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--active-cluster` | No | **string** Active Cluster (Service) name. |
| `--cluster` | No | **string[]** Cluster (Service) names. |
| `--data` | No | **string[]** Namespace data as `KEY=VALUE` pairs. Keys must be identifiers, and values must be JSON values. For example: `YourKey={"your": "value"}` Can be passed multiple times. |
| `--description` | No | **string** Namespace description. |
| `--email` | No | **string** Owner email. |
| `--history-archival-state` | No | **string-enum** History archival state. Accepted values: disabled, enabled. |
| `--history-uri` | No | **string** Archive history to this `URI`. Once enabled, can't be changed. |
| `--promote-global` | No | **bool** Enable multi-region data replication. |
| `--replication-state` | No | **string-enum** Replication state. Accepted values: normal, handover. |
| `--retention` | No | **duration** Length of time a closed Workflow is preserved before deletion. |
| `--visibility-archival-state` | No | **string-enum** Visibility archival state. Accepted values: disabled, enabled. |
| `--visibility-uri` | No | **string** Archive visibility data to this `URI`. Once enabled, can't be changed. |

## nexus

These commands manage Nexus resources.

Nexus commands follow this syntax:

```
temporal operator nexus [command] [subcommand] [options]
```

### endpoint

These commands manage Nexus Endpoints.

Nexus Endpoint commands follow this syntax:

```
temporal operator nexus endpoint [command] [options]
```

#### create

Create a Nexus Endpoint on the Server.

A Nexus Endpoint name is used in Workflow code to invoke Nexus Operations.
The endpoint target may either be a Worker, in which case
`--target-namespace` and `--target-task-queue` must both be provided, or
an external URL, in which case `--target-url` must be provided.

This command will fail if an Endpoint with the same name is already
registered.

```
temporal operator nexus endpoint create \
  --name your-endpoint \
  --target-namespace your-namespace \
  --target-task-queue your-task-queue \
  --description-file DESCRIPTION.md
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--description` | No | **string** Nexus Endpoint description. You may use Markdown formatting in the Nexus Endpoint description. |
| `--description-file` | No | **string** Path to the Nexus Endpoint description file. The contents of the description file may use Markdown formatting. |
| `--name` | Yes | **string** Endpoint name. |
| `--target-namespace` | No | **string** Namespace where a handler Worker polls for Nexus tasks. |
| `--target-task-queue` | No | **string** Task Queue that a handler Worker polls for Nexus tasks. |
| `--target-url` | No | **string** An external Nexus Endpoint that receives forwarded Nexus requests. May be used as an alternative to `--target-namespace` and `--target-task-queue`. _(Experimental)_ |

#### delete

Delete a Nexus Endpoint from the Server.

```
temporal operator nexus endpoint delete --name your-endpoint
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name` | Yes | **string** Endpoint name. |

#### get

Get a Nexus Endpoint by name from the Server.

```
temporal operator nexus endpoint get --name your-endpoint
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name` | Yes | **string** Endpoint name. |

#### list

List all Nexus Endpoints on the Server.

```
temporal operator nexus endpoint list
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

#### update

Update an existing Nexus Endpoint on the Server.

A Nexus Endpoint name is used in Workflow code to invoke Nexus Operations.
The Endpoint target may either be a Worker, in which case
`--target-namespace` and `--target-task-queue` must both be provided, or
an external URL, in which case `--target-url` must be provided.

The Endpoint is patched; existing fields for which flags are not provided
are left as they were.

Update only the target task queue:

```
temporal operator nexus endpoint update \
  --name your-endpoint \
  --target-task-queue your-other-queue
```

Update only the description:

```
temporal operator nexus endpoint update \
  --name your-endpoint \
  --description-file DESCRIPTION.md
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--description` | No | **string** Nexus Endpoint description. You may use Markdown formatting in the Nexus Endpoint description. |
| `--description-file` | No | **string** Path to the Nexus Endpoint description file. The contents of the description file may use Markdown formatting. |
| `--name` | Yes | **string** Endpoint name. |
| `--target-namespace` | No | **string** Namespace where a handler Worker polls for Nexus tasks. |
| `--target-task-queue` | No | **string** Task Queue that a handler Worker polls for Nexus tasks. |
| `--target-url` | No | **string** An external Nexus Endpoint that receives forwarded Nexus requests. May be used as an alternative to `--target-namespace` and `--target-task-queue`. _(Experimental)_ |
| `--unset-description` | No | **bool** Unset the description. |

## search-attribute

Create, list, or remove Search Attributes fields stored in a Workflow
Execution's metadata:

```
temporal operator search-attribute create \
    --name YourAttributeName \
    --type Keyword
```

Supported types include: Text, Keyword, Int, Double, Bool, Datetime, and
KeywordList.

If you wish to delete a Search Attribute, please contact support
at https://support.temporal.io.

### create

Add one or more custom Search Attributes:

```
temporal operator search-attribute create \
    --name YourAttributeName \
    --type Keyword
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name` | Yes | **string[]** Search Attribute name. |
| `--type` | Yes | **string-enum[]** Search Attribute type. Accepted values: Text, Keyword, Int, Double, Bool, Datetime, KeywordList. |

### list

Display a list of active Search Attributes that can be assigned or used with
Workflow Queries. You can manage this list and add attributes as needed:

```
temporal operator search-attribute list
```

Use [global flags](#global-flags) to customize the connection to the Temporal Service for this command.

### remove

Remove custom Search Attributes from the options that can be assigned or used
with Workflow Queries.

```
temporal operator search-attribute remove \
    --name YourAttributeName
```

Remove attributes without confirmation:

```
temporal operator search-attribute remove \
    --name YourAttributeName \
    --yes
```

Use the following options to change the behavior of this command. You can also use any of the [global flags](#global-flags) that apply to all subcommands.

| Flag | Required | Description |
|------|----------|-------------|
| `--name` | Yes | **string[]** Search Attribute name. |
| `--yes`, `-y` | No | **bool** Don't prompt to confirm removal. |

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

