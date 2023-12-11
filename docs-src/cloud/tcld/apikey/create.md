---
id: create
title: tcld apikey create
sidebar_label: create
description: How to create an API Key in Temporal Cloud using tcld. Remember to copy the secret immediately as it cannot be retrieved again.
tags:
  - tcld
  - cli reference
---

The `tcld apikey create` command creates an API Key in Temporal Cloud.

`tcld apikey create --name <name> --description <description> --duration <duration> --expiry <expiry> --request-id <request_id>`

The following options control the behavior of the command.

#### --name

_Required option_

Specify the display name of the API Key.

Alias: `-n`

**Example**

```bash
tcld apikey create --name <name>
```

#### --description

Specify a description for the API Key.

Alias: `-desc`

**Example**

```bash
tcld apikey create --name <name> --description "Your API Key"
```

#### --duration

Specify the duration from now when the API Key will expire.
This will be ignored if the expiry flag is set.

Example format: `24h` (default: 0s).

Alias: `-d`

**Example**

```bash
tcld apikey create --name <name> --duration 24h
```

#### --expiry

Specify the absolute timestamp (RFC3339) when the API Key will expire.

Example: `2023-11-28T09:23:24-08:00`.

Alias: `-e`

**Example**

```bash
tcld apikey create --name <name> --expiry '2023-11-28T09:23:24-08:00'
```

#### --request-id

Specify a request-id for the asynchronous operation.
If not set, the server will assign one.

Alias: `-r`

**Example**

```bash
tcld apikey create --name <name> --request-id <request_id>
```
