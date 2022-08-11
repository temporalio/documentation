---
id: list
title: tcld namespace accepted-client-ca list
sidebar_label: list
description: How to list the client CA certificates for a Namespace in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld namespace accepted-client-ca list` command lists the client CA certificates that are currently configured for a [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

`tcld namespace accepted-client-ca list`

Alias: `l`

The following modifier controls the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace accepted-client-ca list --namespace <namespace_id>
```
