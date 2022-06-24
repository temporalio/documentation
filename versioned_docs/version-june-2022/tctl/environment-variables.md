---
id: environment-variables
title: Environment variables for tctl
sidebar_label: Environment variables
description: What are the environment variables for tctl?
tags:
  - reference
  - tctl
---

Setting environment variables for repeated parameters can shorten tctl commands.

### TEMPORAL_CLI_ADDRESS

Specify a host and port for the Frontend Service.
The default is `127.0.0.1:7233`.

### TEMPORAL_CLI_AUTHORIZATION_TOKEN

Specify a token to be used by the HTTP Basic Authorization plugin.

<!-- TODO: Add link to "Securing tctl" page or its equivalent when it exists. -->

### TEMPORAL_CLI_NAMESPACE

Specify a Namespace.
By setting this variable, you don't need to specify a `--namespace` modifier in a tctl command.
The default Namespace is `default`.

### TEMPORAL_CLI_PLUGIN_DATA_CONVERTER

Specify the name of the executable for a custom Data Converter plugin.

### TEMPORAL_CLI_PLUGIN_HEADERS_PROVIDER

Specify the name of the executable for a headers provider plugin.

### TEMPORAL_CLI_TLS_CA

Specify the path to a server Certificate Authority (CA) certificate file.

### TEMPORAL_CLI_TLS_CERT

Specify the path to a public X.509 certificate file for mutual TLS authentication.

### TEMPORAL_CLI_TLS_DISABLE_HOST_VERIFICATION

Set to disable verification of the server certificate (and thus host verification).

### TEMPORAL_CLI_TLS_KEY

Specify the path to a private key file for mutual TLS authentication.
If you set this variable, you must also set the `TEMPORAL_CLI_TLS_CERT` variable.

### TEMPORAL_CLI_TLS_SERVER_NAME

Specify an override for the name of the target server that is used for TLS host verification.
The name must be one of the DNS names listed in the server TLS certificate.
Setting this variable also enables host verification.

### TEMPORAL_CONTEXT_TIMEOUT

Specify a timeout for the context of an RPC call in seconds.
The default value is 5.
