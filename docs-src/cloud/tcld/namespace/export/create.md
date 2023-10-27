---

id: create
title: tcld namespace export create
sidebar_label: create
description: How to create an export sink in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export create` command allows users to create an export sink for the Namespace of a Temporal Cloud account.

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

**Example**

```bash
tcld namespace export create --namespace <namespace_id> --sink-name <sink_name> --s3-bucket-name <bucket_name>
```

#### --sink-name

Provide a name for the export sink.

**Example**

```bash
tcld namespace export create --sink-name <sink_name> --s3-bucket-name <bucket_name>
```

#### --role-arn

Provide role arn for the IAM Role.

**Example**

```bash
tcld namespace export create --role-arn <role_arn> --s3-bucket-name <bucket_name>
```

#### --s3-bucket-name

Provide the name of an AWS S3 bucket that Temporal will send closed workflow histories to.

**Example**

```bash
tcld namespace export create --s3-bucket-name <bucket_name>
```

#### --request-id

Specify a request identifier to use for the asynchronous operation.
If not specified, the server assigns a request identifier.

Alias: `-r`

**Example**

```bash
tcld namespace export create --request-id <request_id> --s3-bucket-name <bucket_name>
```

#### --kms-arn

Provide the ARN of the KMS key to use for encryption. Note: If the KMS ARN needs to be added or updated, users should create the IAM Role with KMS or modify the created IAM Role accordingly. Providing it as part of the input won't help.

**Example**

```bash
tcld namespace export create --kms-arn <kms_arn> --s3-bucket-name <bucket_name>
```
