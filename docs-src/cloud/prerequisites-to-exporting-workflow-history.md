---
id: prerequisites-to-exporting-workflow-history
title: Prerequisites
sidebar_label: Prerequisites
description: Prerequisites to exporting the Workflow History include, setting up an S3 bucket, an AWS Account ID, and an optional server-side encryption.
  - temporal cloud
  - workflow history export
  - prerequisites
---

Before configuring the Export Sink, ensure you have the following:

1. An AWS Account with write permission to an S3 bucket.
2. An AWS S3 bucket.
   1. The S3 bucket must reside in the same region as your Namespace.
3. (optional) A KMS ARN associated with the S3 bucket.
