---
id: what-integrations-are-supported-by-export
title: Supported integrations for Workflow History Export
sidebar_label: Supported integrations
description: Workflow History Export supports Amazon Simple Storage Service (S3).
tags:
  - temporal cloud
  - operations
---

The Workflow History Export feature allows users to export Closed Workflow Histories to Amazon Simple Storage Service (S3)](https://docs.aws.amazon.com/s3/) as the destination.
The exported file is in serialized [proto format](https://github.com/temporalio/api/blob/master/temporal/api/export/v1/message.proto).

You can enable Workflow History Export per Namespace in Temporal Cloud.
