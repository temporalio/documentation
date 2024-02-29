---
id: validate
title: tcld namespace export s3 validate
sidebar_label: validate
description: How to validates export sinks in a Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export s3 validate` command allows users to validate an export sink from the Namespace of a Temporal Cloud account.

**Example**

```bash
tcld namespace export s3 validate --namespace <namespace_id> --sink-name <sink_name> --s3-bucket-name <bucket_name> --role-arn <role_arn>
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

#### --role-arn

Provide role arn for the IAM Role.

_Required option_

#### --s3-bucket-name

Update the name of the AWS S3 bucket that Temporal will send closed workflow histories to.

#### --kms-arn

Update the ARN of the KMS key used for encryption. Note: If the KMS ARN needs to be added or updated, users should create the IAM Role with KMS or modify the created IAM Role accordingly. Providing it as part of the input won't help.
