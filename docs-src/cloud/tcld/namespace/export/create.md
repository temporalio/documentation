---

id: create
title: tcld namespace export s3 create
sidebar_label: create
description: How to create an export sink in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export s3 create` command allows users to create an export sink for the Namespace of a Temporal Cloud account.

**Example**

```bash
tcld namespace export s3 create --namespace <namespace_id> --sink-name <sink_name> --s3-bucket-name <bucket_name> --role-arn <role_arn>
```

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

_Required option_

**Example**

```bash
tcld namespace export s3 create --namespace <namespace_id> --sink-name <sink_name> --s3-bucket-name <bucket_name>
```

#### --sink-name

Provide a name for the export sink.

_Required option_

**Example**

```bash
tcld namespace export s3 create --sink-name <sink_name> --s3-bucket-name <bucket_name>
```

#### --role-arn

Provide role arn for the IAM Role.

_Required option_

#### --s3-bucket-name

Provide the name of an AWS S3 bucket that Temporal will send closed workflow histories to.

_Required option_

**Example**

```bash
tcld namespace export s3 create --s3-bucket-name <bucket_name>
```

#### --request-id

Specify a request identifier to use for the asynchronous operation.
If not specified, the server assigns a request identifier.

Alias: `-r`

#### --kms-arn

Provide the ARN of the KMS key to use for encryption. Note: If the KMS ARN needs to be added or updated, users should create the IAM Role with KMS or modify the created IAM Role accordingly. Providing it as part of the input won't help.
