---
slug: temporal-cloud-limits-sheet
title: What are the Temporal Cloud default limits?
sidebar_label: Default limits
description: This section describes many of the default settings and limits that apply to Workflow Executions in Temporal Cloud.
tags:
  - error
  - warn
  - limits
---

This section describes many of the default settings and limits that apply to application operations in Temporal Cloud.

Some of these default limits are configurable by sending a [ticket](/cloud/support#support-ticket) to our support team.

### What is the maximum length for identifiers?

Identifiers such as Workflow Id, Workflow Type, and Task Queue names have a maximum length of 1,000 characters in UTF-8 format.

This default limit is configurable by creating a [support ticket](/cloud/support#support-ticket).

### What is the gRPC limit for each message received?

Each gRPC message received has a limit of 4 MB.
This limit applies to all gRPC endpoints across the Temporal Platform.

### What is the limit for History transaction size?

The `DefaultTransactionSizeLimit` is configured at 4 MB, representing the maximum allowable transaction size for persisting Event Histories.

### What are the default limits at the Namespace level?

At the Namespace level, Temporal Cloud sets the following default limits:

- Actions per second: 200 (with spikes to 400)
- Certificates: 32 KB payload or 16 certificates, whichever is smaller
- Concurrent Task pollers: 2,000 (configurable; maximum of 100,000)

### What are the concurrecy limits?

If a Workflow Execution has 2,000 incomplete Activities, Signals, Child Workflows, or external Workflow Cancellation requests, additional Commands of that type will fail to be applied to that Workflow Execution:

- `ScheduleActivityTask`
- `SignalExternalWorkflowExecution`
- `StartChildWorkflowExecution`
- `RequestCancelExternalWorkflowExecution`

These default limits are configurable by creating a [support ticket](/cloud/support#support-ticket).

[Batch jobs](/cli/batch) are limited to one job running at a time per Namespace.

### What is the limit on the number of Signals received per Workflow Execution?

10,000 Signals per Workflow Execution is the default limit and is set on the Namespace level.

### What are the default limits for users and Namespaces at the account level?

At the account level, Temporal Cloud sets the following default limits:

- Users: 100
- Namespaces: 10

### How much data does the Prometheus endpoint retain?

The Prometheus endpoint retains 30 days of data.
This limit is set on the account level.

### What is the default Retention Period in your Temporal Cloud Account?

Temporal Cloud sets the default [Retention Period](/clusters#retention-period) to 30 days, and it is configurable in the Temporal Web UI per Namespace.
You can set the Retention Period between 1 and 90 days.

### What are the default maximum numbers of Custom Search Attributes?

The default maximum number of [Custom Search Attributes](/visibility#custom-search-attributes) of each type in Temporal Cloud, you can create per Namespace, are:

- `bool`: 20
- `double`: 20
- `datetime`: 20
- `int`: 20
- `keyword`: 20
- `text`: 5

For more information on limits on the number and size of custom Search Attributes you can create, see [Custom Search Attributes limits](/visibility#custom-search-attributes).

### What are constraints for Custom Search Attribute in Temporal Cloud?

When creating custom Search Attributes in Temporal Cloud, the attribute names must adhere to the following constraints:

- Maximum characters: 64
- Allowed characters: `[a-zA-Z0-9.,:-_\/ ]`.

For more information on limits on the number and size of custom Search Attributes you can create, see [Custom Search Attributes limits](/visibility#custom-search-attributes).

### Are there any limitations on List Filters?

Yes, the `ORDER BY` operator isn't supported in List Filters in Temporal Cloud.

This means that custom ordering of Workflows with Cloud Visibility features isn't possible. Lists of Workflows are still ordered by a default ordering rule, but be aware that this rule might change.
