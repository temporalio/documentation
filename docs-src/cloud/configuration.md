---
id: configuration
title: Defaults, limits, and settings - Temporal Cloud
sidebar_label: Configuration
description: Learn more about Temporal Cloud defaults, limits, and configurable settings.
tags:
  - temporal cloud
  - defaults
  - limits
  - configuration
  - settings
---

Temporal Cloud has many operational features, and many of them can be customized.
These features fall into the following three main categories:

- At the Temporal Cloud Account level
- At the Namespace level
- Within the programming model itself

## Account level

The following aspects apply at the Temporal Cloud Account level (per account).

### Users

**How many users can I add?**

300 users across all Namespaces.
To increase this number, open a [support ticket](/cloud/support-create-ticket).

### Namespaces

**How many namespaces can I create?​**

The initial limit is 10 Namespaces.

As Namespaces get created and start being used (Workflows get created in them), this limit gets automatically and incrementally raised up to 100.
To further extend the limit beyond 100, open a [support ticket](/cloud/support-create-ticket).

### Retained Prometheus endpoint data

**How much metrics data does the Prometheus endpoint retain?​**

The Prometheus endpoint retains 30 days of data.

### Supported operators in List Filters

**Which operators aren't supported in Temporal Cloud?**

The `ORDER BY` operator isn't supported in List Filters in Temporal Cloud.

This means that custom ordering of Workflows with Temporal Cloud Visibility isn't possible.
Lists of Workflows are still ordered by a default ordering rule, but be aware that this rule might change.

## Namespace level

The following aspects apply at the Namespace level (per Namespace).

### Throughput

**What is the limit of Actions per second?**

The throughput of a Namespace is measured in Actions per second (APS).

The default limit is 200 APS with the ability to spike to 400 APS.

The APS limit is automatically adjusted based on the actual usage over the trailing 7 days.
The lowest APS limit that ever gets set is 200 APS.

When a higher initial limit is required, open a [support ticket](/cloud/support-create-ticket).

### Certificates

**What are the certificate limits?**

Temporal Cloud limits each Namespace to a total of 32 KB or 16 certificates, whichever is reached first.

### Concurrent Task pollers

**Is there a limit to concurrent Task pollers?**

Temporal Cloud limits each Namespace to 2,000 concurrent Task pollers.

When a higher initial limit is required, open a [support ticket](/cloud/support-create-ticket).

### Default Retention Period

**What is the default Retention Period?**

The [Retention Period](/concepts/what-is-a-retention-period) is set per Namespace.

Temporal Cloud sets the default Retention Period to 30 days.
This is configurable in the Temporal Web UI.

[Navigate to your list of Namespaces](https://cloud.temporal.io/namespaces), choose the Namespace you want to update, and select edit:

![Choose your Namespace and select Edit](/img/cloud-guide/edit-namespace-option.png)

![Update the Retention Period](/img/cloud-guide/edit-retention-period.png)

You can set the Retention Period between 1 and 90 days.

### Batch jobs

**How many batch jobs can run at a time?**

A Namespace can have just one [Batch job](/cli/batch) running at a time.

### Number of Custom Search Attributes

**How many custom Search Attributes are allowed per Namespace?**

There is a limit to the number of custom Search Attributes per attribute type per Namespace:

| Search Attribute type | Limit         |
| --------------------- | ------------- |
| Bool                  | 20            |
| Datetime              | 20            |
| Double                | 20            |
| Int                   | 20            |
| Keyword               | 20            |
| KeywordList           | Not supported |
| Text                  | 5             |

### Custom Search Attribute names

**What constraints are there for Custom Search Attribute names in Temporal Cloud?**

When creating custom Search Attributes in Temporal Cloud, the attribute names must adhere to the following constraints:

- Maximum characters: 64
- Allowed characters: `[a-zA-Z0-9.,:-_\/ ]`.

For more information on custom Search Attributes see [Custom Search Attributes limits](/visibility#custom-search-attributes).

## Programming model level

The following aspects apply at the programming model level.

### Identifier length limit

**What is the maximum length for identifiers?**

Identifiers such as Workflow Id, Workflow Type, and Task Queue names have a maximum length of 1,000 characters in UTF-8 format.

To change this limit, open a [support ticket](/cloud/support-create-ticket).

### Per message gRPC limit

**What is the gRPC limit for each message received?**

Each gRPC message received has a limit of 4 MB.
This limit applies to all gRPC endpoints across the Temporal Platform.

### Event History transaction size limit

**What is the size limit for an Event History transaction?**

An Event History transaction encompasses a set of operations such as initiating a new Workflow, scheduling an Activity, processing a Signal, or starting a Child Workflow. These operations create Events that are then logged in the Event History. The default transaction size limit restricts the total size of Events that can be accommodated within a single transaction.

The size limit for any given [Event History](/concepts/what-is-an-event-history) transaction is 4 MB.
This isn't configurable.

### Per Workflow Execution concurrency limits

**How many incomplete concurrent Actions can a Workflow Execution have?**

If a Workflow Execution has 2,000 incomplete Activities, Signals, Child Workflows, or external Workflow Cancellation requests, additional [Commands](/concepts/what-is-a-command) of that type will fail to be applied to that Workflow Execution:

- `ScheduleActivityTask`
- `SignalExternalWorkflowExecution`
- `StartChildWorkflowExecution`
- `RequestCancelExternalWorkflowExecution`

### Per Workflow Execution Signal limit

**What is the limit on the total number of Signals received per Workflow Execution?**

A single Workflow Execution may receive up to 10,000 Signals.
After that limit is reached, no more Signals will be processed for that Workflow Execution.
