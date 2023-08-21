---
id: how-to-configure-audit-logging
title: How to configure Audit Logging
sidebar_label: Configure Audit Logging
description: To configure Audit Logging, set up Amazon Kinesis and create an Audit Log sink.
tags:
  - how-to
  - temporal cloud
  - audit logging
---

To set up Audit Logging, you must have an Amazon Web Services (AWS) account and set up Kinesis Data Streams.

1. If you don't have an AWS account, follow the instructions from AWS in [Create and activate an AWS account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/).
2. To set up Kinesis Data Streams, open the [AWS Management Console](https://aws.amazon.com/console/), search for Kinesis, and start the setup process.

Be aware that Kinesis has a rate limit of 1,000 messages per second and quotas for both the number of records written and the size of the records.
For more information, see [Why is my Kinesis data stream throttling?](https://aws.amazon.com/premiumsupport/knowledge-center/kinesis-data-stream-throttling/)

### Create an Audit Log sink

1. In the Temporal Cloud UI, select **Settings**.
1. On the **Settings** page, select **Integrations**.
1. In the **Audit Logging** card, select **Configure Audit Logs**.
1. On the **Audit Logging** page, choose your **Access method** (either **Auto** or **Manual**).
   - **Auto:** Configure the AWS CloudFormation stack in your AWS account from the Cloud UI.
   - **Manual:** Use a generated AWS CloudFormation template to set up Kinesis manually.
1. In **Kinesis ARN**, paste the Kinesis ARN from your AWS account.
1. In **Role name**, provide a name for a new IAM Role.
1. In **Select an AWS region**, select the appropriate region for your Kinesis stream.

If you chose the **Auto** access method, continue with the following steps:

1. Select **Save and launch stack**.
1. In **Stack name** in the AWS CloudFormation console, specify a name for the stack.
1. In the lower-right corner of the page, select **Create stack**.

If you chose the **Manual** access method, continue with the following steps:

1. Select **Save and download template**.
1. Open the [AWS CloudFormation console](https://console.aws.amazon.com/cloudformation/).
1. Select **Create Stack**.
1. On the **Create stack** page, select **Template is ready** and **Update a template file**.
1. Select **Choose file** and specify the template you generated in step 1.
1. Select **Next** on this page and on the next two pages.
1. On the **Review** page, select **Create stack**.
