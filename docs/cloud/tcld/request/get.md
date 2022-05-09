---
id: get
title: tcld request get
sidebar_label: get
description: How to get the status of an asynchronous request in Temporal Cloud using tcld.
tags:
  - reference
  - tcld
---

The `tcld request get` command gets the status of the specified request in Temporal Cloud.

`tcld request get --request-id <request_id>`

The following modifiers control the behavior of the command.

### `--namespace`

Specify a Namespace hosted on Temporal Cloud. If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace get --namespace <namespace_id> --request-id <request_id>
```

### `--request`

_Required modifier_

Specify a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace get --request-id <request_id>
```
