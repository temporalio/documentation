---
id: update-codec-server
title: tcld namespace update-codec-server
sidebar_label: update-codec-server
description: How to update the Codec Server configuration with tcld.
tags:
  - tcld
  - cli-reference
---

The `tcld namespace update-codec-server` command updates the configuration of a codec server for Temporal Cloud, which allows payloads to be decodec through a remote endpoint.

Alias: `ucs`

The following modifiers control the behavior of the command.

#### --namespace

_Required modifier._

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace update-codec-server --namespace <namespace_id> --endpoint <http_url>
```

#### --endpoint

_Required modifier._

Specify an endpoint to decode payloads for all users interacting with this Namespace.
Endpoints must be valid https URLs.

Alias: `-e`

**Example**

```bash
tcld namespace update-codec-server --namespace <namespace_id> --endpoint <https_url>
```

#### --pass-access-token

Enables a user access token to be passed with the remote endpoint.
This is set to `false` by default.

Alias: `--pat`

**Example**

```bash
tcld namespace update-codec-server --namespace <namespace_id> --endpoint <https_url> --pass-access-token <bool>
```

#### --include-credentials

Enables the inclusion of cross-origin credentials.
This is set to `false` by default.

Alias: `--ic`

**Example**

```bash
tcld namespace update-codec-server --namespace <namespace_id> --endpoint <https_url> --include-credentials true
```
