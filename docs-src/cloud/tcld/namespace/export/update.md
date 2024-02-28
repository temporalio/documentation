---
id: update
title: tcld namespace export s3 update
sidebar_label: update
description: How to update details of an export sink in the Namespace of a Temporal Cloud account using tcld.
tags:
  - tcld
  - cli reference
---

The `tcld namespace export s3 update` command allows users to modify the details of an existing export sink within the Namespace of a Temporal Cloud account.

**Example**

```bash
tcld namespace export s3 update --namespace <namespace_id> --sink-name <sink_name> --enabled true
```

The following modifiers control the behavior of the command.

#### --namespace

Specify a Namespace hosted on Temporal Cloud.
If not specified, the value of the environment variable $TEMPORAL_CLOUD_NAMESPACE is used.

Alias: `-n`

_Required option_

#### --sink-name

Provide the name of the export sink you wish to update.

_Required option_

#### --enabled

Specify whether the export is enabled or not.

#### --role-arn

Update the role ARN for the IAM Role.

#### --s3-bucket-name

Update the name of the AWS S3 bucket that Temporal will send closed workflow histories to.

#### --resource-version

Specify a resource version (ETag) to update from.
If not specified, the CLI will use the latest version.

Alias: `-v`

#### --kms-arn

Update the ARN of the KMS key used for encryption. Note: If the KMS ARN needs to be added or updated, users should create the IAM Role with KMS or modify the created IAM Role accordingly. Providing it as part of the input won't help.

#### --request-id

Specify a request identifier to use for the asynchronous operation.
If not specified, the server assigns a request identifier.

Alias: `-r`
