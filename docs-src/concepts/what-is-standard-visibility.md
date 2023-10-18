---
id: what-is-standard-visibility
title: What is standard Visibility?
sidebar_label: Standard Visibility
description: Standard Visibility, within the Temporal Platform, is the subsystem and APIs that list Workflow Executions by a predefined set of filters.
tags:
  - explanation
  - filtered-lists
  - visibility
---

Standard Visibility, within the Temporal Platform, is the subsystem and APIs that list Workflow Executions by a predefined set of filters.

Open Workflow Executions can be filtered by a time constraint and either a Workflow Type, Workflow Id, or Run Id.

Closed Workflow Executions can be filtered by a time constraint and either a Workflow Type, Workflow Id, Run Id, or Execution Status (Completed, Failed, Timed Out, Terminated, Canceled, or Continued-As-New).

[Search Attributes](https://docs.temporal.io/visibility#search-attribute) are not supported with Standard Visibility.

Support for standard Visibility is deprecated beginning with Temporal Server v1.21.
For updates, check [Supported databases](/cluster-deployment-guide#supported-databases).
