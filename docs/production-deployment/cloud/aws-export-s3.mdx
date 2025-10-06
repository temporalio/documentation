---
id: aws-export-s3
title: Exporting Workflow Event History to AWS S3
sidebar_label: AWS Export to S3
description: Export Workflow History to AWS S3
slug: /cloud/export/aws-export-s3
toc_max_heading_level: 4
keywords:
  - explanation
  - how-to
  - operations
  - temporal cloud
  - term
  - verify
  - workflow history export
  - aws
tags:
  - AWS
  - Export Workflow History
  - Temporal Cloud
---

import * as Components from '@site/src/components';

## Prerequisites

Before configuring the Export Sink, ensure you have the following:

- An AWS S3 bucket.
   - The S3 bucket must reside in the same region as your Namespace.
- (Optional) An IAM role that has write permission to the above S3 bucket.
   - You can follow the automation in the UI to create the IAM role. Please pre-create the role if setting up Export via terraform/tcld.
- (Optional) A KMS ARN associated with the S3 bucket.

## Configure Workflow History export

There are multiple ways to configure export: through the [Temporal Cloud UI](#using-temporal-cloud-ui), [`tcld`](#using-tcld), or [`terraform`](#using-terraform).

### Using Temporal Cloud UI

You can use the Temporal Cloud UI to configure the Workflow History Export.

The Temporal Cloud UI provides two ways for configuring Workflow History Export:

- [Automated setup](#automated-setup) (recommended): The Cloud UI launches the AWS CloudFormation Console to create a stack with write permission to the S3 bucket.
- [Manual setup](#manual-setup): The Cloud UI provides a CloudFormation template for users to manually configure a CloudFormation stack.

:::info Why does Temporal Cloud provision multiple internal IAM roles to trust for Export?

Temporal Cloud creates multiple intermediary IAM roles for export operations for security purposes. 
The system randomly selects from these roles when writing to your storage sink, which provides several benefits:

- **Security isolation**: If one IAM role is compromised or needs to be decommissioned, other IAM roles remain available
- **Load distribution**: Avoids relying on a single IAM role, reducing security risk
- **Warm standby**: Keeps multiple IAM roles active to avoid potential throttling when switching between IAM roles
- **Reliability**: Provides resilience against cloud provider account-level issues that could affect a single IAM role

This approach prioritizes security and availability, ensuring robust export operations even if individual IAM roles encounter issues.
:::


The following steps guide you through setting up Workflow History Export using the Temporal Cloud UI.

![](/img/cloud/gcp/export-sink-ui.png)

:::tip

Don't forget to click **Create** at the end of your setup to confirm your export.

:::

#### Automated setup

You can use the automated setup to create a CloudFormation stack with write permission to your S3 bucket.
Make sure to verify the export setup before you save the configuration.

1. Open the Temporal Cloud UI and navigate to the Namespace you want to configure.
2. Select **Configure** from the **Export** card.
3. Provide the following information to configure the export sink and then select **Create and launch stack**:
   - Name: A name for the export sink.
   - AWS S3 Bucket Name: The name of the configured AWS S3 bucket to send Closed Workflow Histories to.
   - AWS Account ID: The AWS account ID.
   - Role Name: The name of the AWS IAM role to use for the CloudFormation stack that has write permission to the S3 bucket.
   - KMS ARN: (optional) The ARN of the AWS KMS key to use for encryption of the exported Workflow History.
4. You will be taken to the CloudFormation Console to create the stack with pre-populated information.
   - Review the information and then select **Create stack**.

#### Manual setup

You can manually configure a CloudFormation stack using the provided template.

1. Open the Temporal Cloud UI and navigate to the Namespace you want to configure.
2. Select **Configure** from the **Export** card.
3. Select **Manual** from **Access method**.
   - Enter the Template URL into your web browser to download your copy of the CloudFormation template.
   - Configure the CloudFormation template for your export sink.
   - Follow the steps in the [AWS documentation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-using-console-create-stack-template.html) by uploading the template to the CloudFormation console.

### Using `tcld`

Run the `tcld namespace export s3 create` command and provide the following information:

- `--namespace`: The Namespace to configure export for.
- `--sink-name`: The name of the export sink.
- `--role-arn`: The ARN of the AWS IAM role to use for the CloudFormation stack that has write permission to the S3 bucket.
- `--s3-bucket-name`: The name of the AWS S3 bucket.

For example:

```command
tcld namespace export s3 create --namespace "your-namespace.your-account" --sink-name "your-sink-name" --role-arn "arn:aws:iam::123456789012:role/test-sink" --s3-bucket-name "your-aws-s3-bucket-name"
```

Retrieve the status of this command by running the `tcld namespace export s3 get` command.

For example:

```command
tcld namespace export s3 get --namespace "your-namespace.your-account" --sink-name "your-sink-name"
```

The following is an example of the output:

```json
{
  "name": "your-sink-name",
  "resourceVersion": "a6442895-1c07-4da4-aaca-58d57d338345",
  "state": "Active",
  "spec": {
    "name": "your-sink-name",
    "enabled": true,
    "destinationType": "S3",
    "s3Sink": {
      "roleName": "your-export-test",
      "bucketName": "your-export-test",
      "region": "us-east-1",
      "kmsArn": "",
      "awsAccountId": "123456789012"
    }
  },
  "health": "Ok",
  "errorMessage": "",
  "latestDataExportTime": "0001-01-01T00:00:00Z",
  "lastHealthCheckTime": "2023-08-14T21:30:02Z"
}
```

### Using `terraform`

See the [terraform export support](https://registry.terraform.io/providers/temporalio/temporalcloud/latest/docs/resources/namespace_export_sink) for setup instructions.


### Next Steps

- [Verify export setup](/cloud/export#verify)
- [Monitor export progress](/cloud/export#monitor)
- [Work with exported files](/cloud/export#working-with-exported-files)
