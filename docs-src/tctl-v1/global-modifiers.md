---
id: global-modifiers
title: tctl v1.17 global modifiers
sidebar_label: Global modifiers
description: Global modifiers are provided before command modifiers.
tags:
  - operation-guide
  - tctl
---

You can supply the values for many of these modifiers by setting [environment variables](/tctl-v1/environment-variables) instead of including the modifiers in a tctl command.

### --address

Specify a host and port for the Frontend Service.
The default is `127.0.0.1:7233`.

### --auto_confirm

Automatically confirm all prompts.

### --context_timeout

Specify a timeout for the context of an RPC call in seconds.
The default value is 5.

### --data_converter_plugin

Specify the name of the executable for a headers provider plugin.

### --headers_provider_plugin

Specify the name of the executable for a custom Data Converter plugin.

### --help

Display help for tctl in the CLI.

Alias: `-h`

### --namespace

Specify a Namespace.
By using this modifier, you don't need to specify a `--namespace` modifier for a sub-command.
The default Namespace is `default`.

Alias: `--n`

### --tls_ca_path

Specify the path to a server Certificate Authority (CA) certificate file.

### --tls_cert_path

Specify the path to a public X.509 certificate file for mutual TLS authentication.
If you use this modifier, you must also use the `--tls_key_path` modifier.

### --tls_disable_host_verification

Disable verification of the server certificate (and thus host verification).

### --tls_key_path

Specify the path to a private key file for mutual TLS authentication.
If you use this modifier, you must also use the `--tls_cert_path` modifier.

### --tls_server_name

Specify an override for the name of the target server that is used for TLS host verification.
The name must be one of the DNS names listed in the server TLS certificate.
Specifying this modifier also enables host verification.

### --version

Display the version of tctl in the CLI.

### --codec_endpoint

The URL and port number for a Codec Server.
