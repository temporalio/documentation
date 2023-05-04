---
id: create
title: tcld namespace create
sidebar_label: create
description: How to create information about a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
---

The `tcld namespace create` command creates a Temporal [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

Alias: `c`

`tcld namespace create`

The following modifiers control the behavior of the command.

### `--request-id`

The request-id to use for the asynchronous operation, if not set the server will assign one (optional).

Alias: `-r`

### `--ca-certificate`

The base64 encoded ca certificate.

Alias: `-c`

### `--namespace`

Specify the namespace hosted on Temporal Cloud. If not specified, the value of the environment variable `$TEMPORAL_CLOUD_NAMESPACE` is used.

Alias: `-n`

### `--region`

Create namespace in this Region.

Valid options: `ap-northeast-1` | `ap-southeast-1` | `ap-southeast-2` | `ca-central-1` | `eu-central-1` | `eu-west-1` | `eu-west-2` | `us-east-1` | `us-west-2`

Alias: `--re`

### `--retention-days`

The retention of the namespace in days (default: 30).

Alias: `--rd`

### `--ca-certificate-file`

The path to the CA certificate file.

Alias: `--cf`

### `--certificate-filter-file`

Path to a JSON file that defines the certificate filters that will be added to the namespace.

Sample JSON: `{ "filters": [ { "commonName": "test1" } ] }`

Alias: `--cff`

### `--certificate-filter-input`

JSON that defines the certificate filters that will be added to the namespace.

Sample JSON: `{ "filters": [ { "commonName": "test1" } ] }`

Alias: `--cfi`

### `--search-attribute`

Flag can be used multiple times.

Valid values: `name=type`

Valid options: `Keyword` | `Text` | `Int` | `Double` | `Datetime` | `Bool`

Alias: `--sa`

### `--user-namespace-permission`

Flag can be used multiple times.

Value must be `email=permission`

Valid permissions: `Admin` | `Write` | `Read`

Alias: `-p`

**Example**

```bash
tcld namespace create my-namespace --region us-west-2 --retention-days 60 --certificate-filter-input '{"filters": [{"commonName": "test1"}]}' --user-namespace-permission "user@example.com=Admin" --search-attribute "customer_id=Int" --search-attribute "customer_name=Text"
```
