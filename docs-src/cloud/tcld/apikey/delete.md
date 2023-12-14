---
id: delete
title: tcld apikey delete
sidebar_label: delete
description: How to delete an API Key in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld apikey delete` command deletes an API Key in Temporal Cloud.

`tcld apikey delete --id <id> [--resource-version <version>] [--request-id <request_id>]`

The following options control the behavior of the command.

#### --id

_Required option_

Specify the ID of the API Key to delete.

Alias: `-i`

**Example**

```bash
tcld apikey delete --id <apikey_id>
```

#### --resource-version

Specify the resource-version (etag) to update from.
If not set, the CLI will use the latest.

Alias: `-v`

**Example**

```bash
tcld apikey delete --id <apikey_id> --resource-version <version>
```

#### --request-id

Specify a request-id for the asynchronous operation.
If not set, the server will assign one.

Alias: `-r`

**Example**

```bash
tcld apikey delete --id <apikey_id> --request-id <request_id>
```
