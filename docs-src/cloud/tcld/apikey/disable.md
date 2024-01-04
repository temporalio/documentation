---
id: disable
title: tcld apikey disable
sidebar_label: disable
description: How to disable an API Key in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld apikey disable` command disables an API Key in Temporal Cloud.

`tcld apikey disable --id <id> [--resource-version <version>] [--request-id <request_id>]`

The following options control the behavior of the command.

#### --id

_Required option_

Specify the ID of the API Key to disable.

Alias: `-i`

**Example**

```bash
tcld apikey disable --id <apikey_id>
```

#### --resource-version

Specify the resource-version (etag) to update from. If not set, the CLI will use the latest.

Alias: `-v`

**Example**

```bash
tcld apikey disable --id <apikey_id> --resource-version <version>
```

#### --request-id

Specify a request-id for the asynchronous operation. If not set, the server will assign one.

Alias: `-r`

**Example**

```bash
tcld apikey disable --id <apikey_id> --request-id <request_id>
```
