---
id: create
title: tcld namespace create
sidebar_label: create
description: How to create information about a Namespace in Temporal Cloud using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace create` command creates a Temporal [Namespace](/concepts/what-is-a-namespace) in Temporal Cloud.

Alias: `c`

`tcld namespace create`

The following modifiers control the behavior of the command.

#### --request-id

The request identifier to use for the asynchronous operation.
If not set, the server assigns an identifier.

Alias: `-r`

#### --ca-certificate

_Required modifier unless `--ca-certificate-file` is specified_

A base64-encoded CA certificate.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `-c`

#### --namespace

_Required modifier_

Specify the name of the Namespace to create.

Alias: `-n`

#### --region

_Required modifier_

The region to create the Namespace in.

Valid options: `ap-northeast-1` | `ap-southeast-1` | `ap-southeast-2` | `ca-central-1` | `eu-central-1` | `eu-west-1` | `eu-west-2` | `us-east-1` | `us-west-2`

Alias: `--re`

#### --retention-days

The number of days that data about closed Workflow Executions will be retained (default: 30).

Alias: `--rd`

#### --ca-certificate-file

_Required modifier unless `--ca-certificate` is specified_

A path to a CA certificate PEM file.

If both `--ca-certificate` and `--ca-certificate-file` are specified, only `--ca-certificate` is used.

Alias: `--cf`

#### --certificate-filter-file

_Required modifier unless `--certificate-filter-input` is specified_

Path to a JSON file that defines the certificate filters to be applied to the Namespace.
The specified filters replace any existing filters.

Sample JSON: `{ "filters": [ { "commonName": "test1" } ] }`

If both `--certificate-filter-file` and `--certificate-filter-input` are specified, the command returns an error.

Alias: `--cff`

#### --certificate-filter-input

_Required modifier unless `--certificate-filter-file` is specified_

A JSON string that defines the certificate filters to be applied to the Namespace.
The specified filters replace any existing filters.

Sample JSON: `{ "filters": [ { "commonName": "test1" } ] }`

If both `--certificate-filter-input` and `--certificate-filter-file` are specified, the command returns an error.

Alias: `--cfi`

#### --search-attribute

_Required modifier; can be specified more than once_

A custom Search Attribute in the form `_name_=_type_`.

Valid values for _type_: `Bool` | `Datetime` | `Double` | `Int` | `Keyword` | `Text`

Alias: `--sa`

#### --user-namespace-permission

_Can be specified more than once_

A [Namespace-level permission](/cloud/#namespace-level-permissions) for a user in the form `_email_=_permission_`.

Valid values for _permission_: `Admin` | `Write` | `Read`

Alias: `-p`

**Example**

```bash
tcld namespace create --namespace <namespace_id> --region us-west-2 --retention-days 60 --certificate-filter-input '{"filters": [{"commonName": "test1"}]}' --user-namespace-permission "user@example.com=Admin" --search-attribute "customer_id=Int" --search-attribute "customer_name=Text"
```
