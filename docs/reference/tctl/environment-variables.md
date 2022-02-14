---
id: environment-variables
title: Environment variables for tctl
description: What are the environment variables for tctl?
tags:
  - reference
  - tctl
---

Setting environment variables for repeated parameters can shorten tctl commands.

- **TEMPORAL_CLI_ADDRESS** - The host and port for the Temporal frontend service. The default is `127.0.0.1:7233`.
- **TEMPORAL_CLI_NAMESPACE** - The Workflow Namespace, so you don't need to specify a `--namespace` option. The default namespace is `default`.
- **TEMPORAL_CLI_TLS_CA** - The path to the server Certificate Authority certificate file.
- **TEMPORAL_CLI_TLS_CERT** - The path to the public X.509 certificate file for mutual TLS authentication.
- **TEMPORAL_CLI_TLS_KEY** - The path to the private key file for mutual TLS authentication.
- **TEMPORAL_CLI_AUTHORIZATION_TOKEN** - Used by the HTTP Basic Authorization plugin. <!-- TODO: Add link to "Securing tctl" page or its equivalent when it exists. -->
