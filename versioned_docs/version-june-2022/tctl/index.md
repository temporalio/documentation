---
id: index
title: What is tctl?
description: tctl is a command-line tool that you can use to interact with a Temporal Cluster.
tags:
  - operation-guide
  - tctl
---

This documentation reflects tctl version 1.16.

The Temporal CLI (tctl) is a command-line tool that you can use to interact with a Temporal Cluster.
It can perform [Namespace](/concepts/what-is-a-namespace) operations (such as register, update, and describe) and [Workflow](/concepts/what-is-a-workflow) operations (such as start
Workflow, show Workflow History, and Signal Workflow).

- [How to install tctl](/tctl/how-to-install-tctl)
- [Environment variables for tctl](/tctl/environment-variables)
- [How to use tctl](/tctl/how-to-use-tctl)
- [How to add a custom Search Attribute to a Cluster using tctl](/tctl/how-to-add-a-custom-search-attribute-to-a-cluster-using-tctl)

## tctl commands

- [`tctl activity`](/tctl/activity/)
- [`tctl admin`](/tctl/admin/)
- [`tctl batch`](/tctl/batch/)
- [`tctl cluster`](/tctl/cluster/)
- [`tctl dataconverter`](/tctl/dataconverter/)
- [`tctl namespace`](/tctl/namespace/)
- [`tctl taskqueue`](/tctl/taskqueue/)
- [`tctl workflow`](/tctl/workflow/)

## Global modifiers

You can supply the values for many of these modifiers by setting [environment variables](/tctl/environment-variables) instead of including the modifiers in a tctl command.

### `--address`

Specify a host and port for the Frontend Service.
The default is `127.0.0.1:7233`.

Alias: `--ad`

### `--auto_confirm`

Automatically confirm all prompts.

### `--context_timeout`

Specify a timeout for the context of an RPC call in seconds.
The default value is 5.

Alias: `--ct`

### `--data_converter_plugin`

Specify the name of the executable for a headers provider plugin.

Alias: `--dcp`

### `--headers_provider_plugin`

Specify the name of the executable for a custom Data Converter plugin.

Alias: `--hpp`

### `--help`

Display help for tctl in the CLI.

Alias: `-h`

### `--namespace`

Specify a Namespace.
By using this modifier, you don't need to specify a `--namespace` modifier for a sub-command.
The default Namespace is `default`.

Alias: `--ns`

### `--tls_ca_path`

Specify the path to a server Certificate Authority (CA) certificate file.

### `--tls_cert_path`

Specify the path to a public X.509 certificate file for mutual TLS authentication.

### `--tls_disable_host_verification`

Disable verification of the server certificate (and thus host verification).

### `--tls_key_path`

Specify the path to a private key file for mutual TLS authentication.
If you use this modifier, you must also use the `--tls-cert-path` modifier.

### `--tls_server_name`

Specify an override for the name of the target server that is used for TLS host verification.
The name must be one of the DNS names listed in the server TLS certificate.
Specifying this modifier also enables host verification.

### `--version`

Display the version of tctl in the CLI.

Alias: `-v`
