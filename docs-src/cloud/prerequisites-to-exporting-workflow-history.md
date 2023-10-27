---
id: prerequisites-to-exporting-workflow-history
title: Prerequisites
sidebar_label: Prerequisites
description: Prerequisites to exporting the Workflow History include, setting up an S3 bucket, an AWS Account ID, and an optional server-side encryption..
  - temporal cloud
  - workflow history export
  - prerequisites
---

Before configuring the Export Sink, please complete the following steps in AWS:

1. The AWS S3 bucket name to be used for exporting the Workflow History.
   1. The S3 bucket must reside in the same region as your Namespace.
2. The AWS Account ID that owns the S3 bucket.
3. (optional) The KMS ARN associated with the S3 bucket.
