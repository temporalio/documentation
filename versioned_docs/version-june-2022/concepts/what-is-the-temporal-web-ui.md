---
id: what-is-the-temporal-web-ui
title: What is the Temporal Web UI?
sidebar_label: Temporal Web UI
description: The Temporal Web UI
tags:
  - term
  - web-ui
---

:::info Upgrade available

Temporal Web UI v2 is now generally available.

Temporal Web UI v1 is being deprecated on September 30, 2022.

:::

The Temporal Web UI is a GUI that provides users with Workflow Execution state and metadata and is intended to be used to debug execution issues.
It ships with every [docker-compose](/application-development-guide#docker-compose) update and is available with [Temporal Cloud](/cloud).

You can configure the Temporal Web UI to work in your own environment.
See the [UI configuration reference](/references/ui-configuration).

Web UI open source repos:

- [temporalio/ui](https://github.com/temporalio/ui)
- [temporalio/ui-server](https://github.com/temporalio/ui-server)

The Web UI is packed with several features.

### Namespace selection

Users can switch between Namespaces by clicking the Namespace Switcher icon in the left navigation.
Clicking the Namespace Switcher reveals a side panel where users can search for a Namespace or select a Namespace from the list.
After a Namespace is selected, the user is redirected to the Recent Workflows page for that Namespace.
In Temporal Cloud, users can access only Namespaces that they have been granted access to.

### Recent Workflows

The Recent Workflows page lists the most recent 1,000 Workflow Executions in the past 24 hours, by default.
Users can list Workflow Executions by any of the following:

- [Workflow ID](/concepts/what-is-a-workflow-id)
- [Workflow Type](/concepts/what-is-a-workflow-type)
- Status
- Date & Time—users can set their preferred date & time format as one of the following:
  - UTC
  - Local
  - Relative
- A [List Filter](/concepts/what-is-a-list-filter)

Select a Workflow Execution to see a breakdown of the Workflow Execution's History, Workers, and pending Activities.

#### History

This is a view of the [Events](/concepts/what-is-an-event) and Event fields that make up the Workflow Execution.
Approximately [40 different Events](/references/events) can appear in a Workflow Execution's Event History.
The top of the page lists the following execution metadata:

- [Workflow Type](/concepts/what-is-a-workflow-type)
- [Run ID](/concepts/what-is-a-run-id)
- Start Time and Close Time
- [Task Queue](/concepts/what-is-a-task-queue)
- Parent and Parent ID
- State Transitions

The Input and Results section displays the function arguments and return values for debugging purposes.
Results are not available until the Workflow finishes.

The Recent Events tab has the following views:

- Timeline: A chronological or reverse-chronological order of events with a summary.
  Clicking into an Event displays all details for that Event.
  Clicking “Expand all” displays all Event details.
  Similarly, clicking “Collapse all” collapses the table and displays only the summary.
- Compact: A logical grouping of Activities, Signals and Timers.
- JSON: The full JSON code for the workflow.

#### Download Event History

The entire Workflow Execution Event History, in JSON format, can be downloaded from this screen.

#### Terminate Workflow

Workflow Executions can be Terminated directly from the UI.
A custom note can be logged from the UI when that happens.

#### Workers

Displays the Workers currently polling on the Workflow Task Queue with a count.
If no Workers are polling, an error displays.

#### Pending Activities

Displays a summary of recently active and/or pending Activity Executions.
Clicking a pending Activity directs the user to the Pending Activities tab to view details.

#### Stack Trace

The screen shows the captured result from the [\_\_stack_trace](/workflows#stack-trace-query) Query.
The Query is performed when the tab is selected.
It works only if a Worker is running and available to return the stack trace.

#### Queries

Lists all Queries sent to the Workflow Execution.

### Settings

Displays the following information:

- Description of the Namespace.
- Owner: Namespace owner.
- Global?: Whether the Namespace is a Global Namespace
- Retention Period: Namespace Retention Period
- History Archival: Whether History Archival is enabled
- Visibility Archival: Whether Visibility Archival is enabled
- Failover Version: Namespace Failover Version
- Clusters: Cluster information

### Archival

[Archival](/concepts/what-is-archival) feature information.

### Import Event History

Navigate to `/import` to import an Event History in JSON format and populate a Workflow details page.

### Data Encoder

The Web UI can use the same Data Converter that Workers use for inputs and return values.
The UI supports both a Remote Codec endpoint and/or the tctl plugin port.
