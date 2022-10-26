---
id: global-modifiers
title: tctl v2.0.0-beta global modifiers
description: Global modifiers are provided before command modifiers.
sidebar_label: Global modifiers
tags:
  - tctl
---

Global modifiers are provided after `tctl` in the command structure but before the commands themselves.
For example:

```
tctl --address <value> workflow start --task-queue <value> ...
```

You can supply the values for many of these modifiers by setting [environment variables](/tctl-next/environment-variables) instead of including the modifiers in each tctl command.

### --address

Specify a host and port for the Frontend Service.
The default is `127.0.0.1:7233`.

Alias: `--ad`

### --auto-confirm

Automatically confirm all prompts.

### --context-timeout

Specify a timeout for the context of an RPC call in seconds.
The default value is 5.

Alias: `--ct`

### --data-converter-plugin

Specify the name of the executable for a custom Data Converter plugin.

Alias: `--dcp`

### --headers-provider-plugin

Specify the name of the executable for a headers provider plugin.

Alias: `--hpp`

### --help

Display help for tctl in the CLI.

Alias: `-h`

### --namespace

Specify a Namespace.
By using this modifier, you don't need to specify a `--namespace` modifier for a sub-command.
The default Namespace is `default`.

Alias: `--ns`

### --tls-ca-path

Specify the path to a server Certificate Authority (CA) certificate file.

### --tls-cert-path

Specify the path to a public X.509 certificate file for mutual TLS authentication.
If you use this modifier, you must also use the `--tls-key-path` modifier.

### --tls-disable-host-verification

Disable verification of the server certificate (and thus host verification).

### --tls-key-path

Specify the path to a private key file for mutual TLS authentication.
If you use this modifier, you must also use the `--tls-cert-path` modifier.

### --tls-server-name

Specify an override for the name of the target server that is used for TLS host verification.
The name must be one of the DNS names listed in the server TLS certificate.
Specifying this modifier also enables host verification.

### --version

Display the version of tctl in the CLI.

Alias: `-v`

### --codec-endpoint

The URL and port number for a Codec Server.
