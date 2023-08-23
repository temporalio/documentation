---
slug: temporal-platform-limits-sheet
title: What are the Temporal Platform limits?
sidebar_label: Upgrade policy
description: Basic upgrade policy for customers of Temporal Cloud
tags:
  - error
  - warn
  - limits
---

This section describes many of the default settings and limits that apply to associated parameters in Temporal Cloud.

Some of these default limits are configurable by sending a [support ticket](/cloud/support#support-ticket) to our support team.

### What is the maximum length for identifiers?

Identifiers such as Workflow Id, Workflow Type, and Task Queue names have a maximum length of 1000 characters in UTF-8 format.

This default limit is configurable by creating a [support ticket](/cloud/support#support-ticket).

### What is the gRPC limit for each message received?

Each gRPC message received has a limit of 4 MB.

### What is the maximum limit for an Event batch size?

The `DefaultTransactionSizeLimit` is configured at 4 MB, representing the maximum allowable transaction size for persisting Event Histories.

### What are the default limits at the Namespace level in Temporal Cloud?

At the Namespace level, Temporal Cloud sets the following default limits:

- Actions per second: 200 (with spikes to 400)
- Certificates: 32 KB payload or 16 certificates, whichever is smaller
- Concurrent Task pollers: 2,000 (configurable; maximum of 100,000)

### What is the Concurrent Action limit?

If the concurrent running count of certain Action Commands exceeds 2,000, they will fail. These commands include:

- `ScheduleActivityTask`
- `SignalExternalWorkflowExecution`
- `RequestCancelExternalWorkflowExecution`
- `StartChildWorkflowExecution`

This default limit is configurable by creating a [support ticket](/cloud/support#support-ticket).

### What are the default limits for users and Namespaces at the account level in Temporal Cloud?

At the account level, Temporal Cloud sets the following default limits:

- Users: 100
- Namespaces: 10

### What is the limit for Prometheus endpoint Retention Period?

The Prometheus endpoint Retention Period is 1 month.

### What is the default retention period in Temporal Cloud?

Temporal Cloud sets the default Retention Period to 30 days and is configurable in the Temporal Web UI.

### What is the limit on the number of Signals received per Workflow Execution in Temporal Cloud?

The number of Signals received per Workflow Execution to 10,000.

### What are the default limits for Custom Search Attributes in Temporal Cloud?

The default limits for Custom Search Attributes in Temporal Cloud (maximum per type) are:

- `bool`: 20
- `double`: 20
- `datetime`: 20
- `int`: 20
- `keyword`: 20
- `text`: 5

### Are there any limitations on List Filters in Temporal Cloud?

Yes, the `ORDER BY` operator isn't supported in List Filters in Temporal Cloud.

This means that custom ordering of Workflows with Cloud Visibility features isn't possible. Lists of Workflows are still ordered by a default ordering rule, but be aware that this rule might change.
