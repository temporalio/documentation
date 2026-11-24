---
id: client-environment-configuration
title: Client environment configuration reference
sidebar_label: Environment configuration
description: Environment variables that configure Temporal SDK Clients and the Temporal CLI, with each one's TOML key, CLI flag, and the clients that read it.
toc_max_heading_level: 4
tags:
  - Reference
---

:::info

For how to use these variables with TOML configuration files and profiles, see [Environment configuration](/develop/environment-configuration).

:::

Environment variables configure how a [Temporal Client](/encyclopedia/temporal-client) or the Temporal CLI connects to the Temporal Service.
Most variables have a matching key in a TOML configuration file and a matching CLI flag.

When the same setting comes from more than one source, the client uses the first one it finds in this order:

1. A CLI flag passed on the command line.
2. An environment variable.
3. A value in a TOML configuration file.

Each variable on this page lists its **TOML key**, its **CLI flag**, and the clients that read it.
`Read by: every client` means every SDK and the Temporal CLI.

## Configuration file variables

### `TEMPORAL_CONFIG_FILE`

Path to the TOML configuration file.
The default is `temporal.toml` in a platform-specific directory.

- TOML key: none
- CLI flag: `--config-file`
- Read by: every client

### `TEMPORAL_PROFILE`

Name of the configuration profile to load.
The default is `default`.

- TOML key: none
- CLI flag: `--profile`
- Read by: every client

## Connection variables

### `TEMPORAL_ADDRESS`

Host and port of the Temporal Frontend Service, such as `localhost:7233`.

- TOML key: `profile.<name>.address`
- CLI flag: `--address`
- Read by: every client

### `TEMPORAL_NAMESPACE`

Temporal Namespace to connect to.

- TOML key: `profile.<name>.namespace`
- CLI flag: `--namespace`
- Read by: every client

### `TEMPORAL_API_KEY`

API key for authentication.
When you set an API key, the client enables TLS by default.

- TOML key: `profile.<name>.api_key`
- CLI flag: `--api-key`
- Read by: every client

### `TEMPORAL_CLIENT_AUTHORITY`

Overrides the `:authority` gRPC header.
Only the Go SDK reads this variable.
The Temporal CLI has a global `--client-authority` flag, but the flag doesn't read this variable or the TOML key.

- TOML key: `profile.<name>.authority`
- CLI flag: none
- Read by: Go

## TLS variables

### `TEMPORAL_TLS`

Set to `true` to enable TLS or `false` to disable it.
The TOML key inverts the value, so `disabled = true` turns TLS off.

- TOML key: `profile.<name>.tls.disabled`
- CLI flag: `--tls`
- Read by: every client

### `TEMPORAL_TLS_CLIENT_CERT_PATH`

Path to the client's public TLS certificate.
Don't set it together with `TEMPORAL_TLS_CLIENT_CERT_DATA`.

- TOML key: `profile.<name>.tls.client_cert_path`
- CLI flag: `--tls-cert-path`
- Read by: every client

### `TEMPORAL_TLS_CLIENT_CERT_DATA`

PEM data for the client's public TLS certificate.
Don't set it together with `TEMPORAL_TLS_CLIENT_CERT_PATH`.

- TOML key: `profile.<name>.tls.client_cert_data`
- CLI flag: `--tls-cert-data`
- Read by: every client

### `TEMPORAL_TLS_CLIENT_KEY_PATH`

Path to the client's private TLS key.
Don't set it together with `TEMPORAL_TLS_CLIENT_KEY_DATA`.

- TOML key: `profile.<name>.tls.client_key_path`
- CLI flag: `--tls-key-path`
- Read by: every client

### `TEMPORAL_TLS_CLIENT_KEY_DATA`

PEM data for the client's private TLS key.
Don't set it together with `TEMPORAL_TLS_CLIENT_KEY_PATH`.

- TOML key: `profile.<name>.tls.client_key_data`
- CLI flag: `--tls-key-data`
- Read by: every client

### `TEMPORAL_TLS_SERVER_CA_CERT_PATH`

Path to the Certificate Authority (CA) certificate that verifies the server.
Don't set it together with `TEMPORAL_TLS_SERVER_CA_CERT_DATA`.

- TOML key: `profile.<name>.tls.server_ca_cert_path`
- CLI flag: `--tls-ca-path`
- Read by: every client

### `TEMPORAL_TLS_SERVER_CA_CERT_DATA`

PEM data for the CA certificate that verifies the server.
Don't set it together with `TEMPORAL_TLS_SERVER_CA_CERT_PATH`.

- TOML key: `profile.<name>.tls.server_ca_cert_data`
- CLI flag: `--tls-ca-data`
- Read by: every client

### `TEMPORAL_TLS_SERVER_NAME`

Overrides the server name sent for Server Name Indication (SNI) in the TLS handshake.

- TOML key: `profile.<name>.tls.server_name`
- CLI flag: `--tls-server-name`
- Read by: every client

### `TEMPORAL_TLS_DISABLE_HOST_VERIFICATION`

Set to `true` to skip verifying the server's hostname against its certificate.
This exposes the connection to man-in-the-middle attacks, so use it only for testing.
Not every SDK applies this setting.

- TOML key: `profile.<name>.tls.disable_host_verification`
- CLI flag: `--tls-disable-host-verification`
- Read by: every client

## gRPC metadata variables

### `TEMPORAL_GRPC_META_*`

Sets a gRPC header on every request.
The part of the name after `_META_` becomes the header key, lowercased with underscores replaced by hyphens.
For example, `TEMPORAL_GRPC_META_SOME_KEY` sets the `some-key` header.

- TOML key: `profile.<name>.grpc_meta`
- CLI flag: `--grpc-meta`
- Read by: every client except CLI

## Codec Server variables

### `TEMPORAL_CODEC_ENDPOINT`

Endpoint of a remote [Codec Server](/codec-server).
SDKs that read this variable don't apply the codec by default, so set it mainly for the Temporal CLI.

- TOML key: `profile.<name>.codec.endpoint`
- CLI flag: `--codec-endpoint`
- Read by: every client except Java

### `TEMPORAL_CODEC_AUTH`

Authorization header value sent to the remote Codec Server.

- TOML key: `profile.<name>.codec.auth`
- CLI flag: `--codec-auth`
- Read by: every client except Java

## `temporal env` preset variables

The Temporal CLI has a second configuration mechanism alongside TOML configuration files.
`temporal env` stores named key-value presets in `temporal.yaml`.
The variables in this section select which preset the CLI reads.

Both mechanisms work.
The `temporal config` command that manages TOML configuration files is experimental, and `temporal env` is not.

### `TEMPORAL_ENV`

Name of the active `temporal env` preset.
The default is `default`.

- TOML key: none
- CLI flag: `--env`
- Read by: Temporal CLI

### `TEMPORAL_ENV_FILE`

Path to the preset file.
The default is `temporal.yaml` in the CLI configuration directory.

- TOML key: none
- CLI flag: `--env-file`
- Read by: Temporal CLI

## Legacy TLS variables

The Temporal CLI still reads an older set of TLS variable names.
A legacy variable overrides the matching value from the configuration file and from the current variable.
Legacy variables have no CLI flag or TOML key of their own.
Use the current variable named in each entry instead.

### `TEMPORAL_TLS_CERT`

Superseded by `TEMPORAL_TLS_CLIENT_CERT_PATH`.

- Read by: Temporal CLI

### `TEMPORAL_TLS_CERT_DATA`

Superseded by `TEMPORAL_TLS_CLIENT_CERT_DATA`.

- Read by: Temporal CLI

### `TEMPORAL_TLS_KEY`

Superseded by `TEMPORAL_TLS_CLIENT_KEY_PATH`.

- Read by: Temporal CLI

### `TEMPORAL_TLS_KEY_DATA`

Superseded by `TEMPORAL_TLS_CLIENT_KEY_DATA`.

- Read by: Temporal CLI

### `TEMPORAL_TLS_CA`

Superseded by `TEMPORAL_TLS_SERVER_CA_CERT_PATH`.

- Read by: Temporal CLI

### `TEMPORAL_TLS_CA_DATA`

Superseded by `TEMPORAL_TLS_SERVER_CA_CERT_DATA`.

- Read by: Temporal CLI
