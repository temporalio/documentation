---
id: get
title: tcld namespace export s3 get
sidebar_label: get
description: How to retrieve details of an export sink in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export s3 get` command allows users to retrieve details about an existing export sink from the Namespace of a Temporal Cloud account.

**Example**

```bash
tcld namespace export s3 get --namespace <namespace_id> --sink-name <sink_name>
```

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

_Required option_

#### --sink-name

Provide the name of the export sink you wish to retrieve details for.

_Required option_
