---
id: search-attributes
title: How to use Search Attributes
description: Search Attributes enable complex List Filters to find the exact of Workflow Executions you are looking for.
sidebar_label: Search Attributes
tags:
  - guide-context
---

The typical method of retrieving a Workflow Execution is by its Workflow Id.

However, sometimes you'll want to retrieve one or more Workflow Executions based on another property. For example, imagine you want to get all Workflow Executions of a certain type that have failed within a time range, so that you can start new ones with the same arguments.

You can do this with [Search Attributes](/concepts/what-is-a-search-attribute/).

- [**Default** Search Attributes](/concepts/what-is-a-search-attribute/#default-search-attributes) like `WorkflowType`, `StartTime` and `ExecutionStatus` are automatically added to Workflow Executions.
- _Custom Search Attributes_ can contain their own domain-specific data (like `customerId` or `numItems`).
  - A few [generic Custom Search Attributes](/concepts/what-is-a-search-attribute/#custom-search-attributes) like `CustomKeywordField` and `CustomIntField` are created by default in Temporal's [Docker Compose](/clusters/quick-install/#docker-compose).

The steps to using custom Search Attributes are:

- Create a new Search Attribute in your Cluster using `tctl search-attribute create` or the Cloud UI.
- Set the value of the Search Attribute for a Workflow Execution:
  - On the Client by including it as an option when starting the Execution.
  - In the Workflow by calling `UpsertSearchAttributes`.
- Read the value of the Search Attribute:
  - On the Client by calling `DescribeWorkflow`.
  - In the Workflow by looking at `WorkflowInfo`.
- Query Workflow Executions by the Search Attribute using a [List Filter](/concepts/what-is-a-list-filter/):
  - [In `tctl`](/tctl-v1/workflow/list).
  - In code by calling `ListWorkflowExecutions`.

Here is how to query Workflow Executions:
