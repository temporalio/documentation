---
id: web-ui
title: Temporal Web UI
sidebar_label: Web UI
description: The Temporal Web UI offers comprehensive Workflow management, debugging tools, and metadata access.
toc_max_heading_level: 4
keywords:
  - web-ui
tags:
  - Temporal Web UI
---

import { RelatedReadContainer, RelatedReadItem } from '@site/src/components';

The Temporal Web UI provides users with Workflow Execution state and metadata for debugging purposes. It ships with
every [Temporal CLI](/cli) release and [Docker Compose](https://github.com/temporalio/docker-compose) update and is
available with [Temporal Cloud](/cloud).

You can configure the Temporal Web UI to work in your own environment. See the
[UI configuration reference](/references/web-ui-configuration).

Web UI open source repos:

- [temporalio/ui](https://github.com/temporalio/ui)
- [temporalio/ui-server](https://github.com/temporalio/ui-server)

## Namespaces

All Namespaces in your self-hosted Temporal Service or Temporal Cloud account are listed under **Namespaces** in the
left section of the window. You can also switch Namespaces from the Workflows view by selecting from the Namespace
switcher at the top right corner of the window. After you select a Namespace, the Web UI shows the Recent Workflows page
for that Namespace. In Temporal Cloud, users can access only the Namespaces that they have been granted access to. For
details, see [Namespace-level permissions](/cloud/users#namespace-level-permissions).

## Workflows

The main Workflows page displays a table of all Workflow Executions within the retention period.

Users can list Workflow Executions by any of the following:

- [Status](/workflow-execution#workflow-execution-status)
- [Workflow ID](/workflow-execution/workflowid-runid#workflow-id)
- [Workflow Type](/workflow-definition#workflow-type)
- Start time
- End time
- Any other Default or Custom [Search Attribute](/search-attribute) that uses [List Filter](/list-filter)

For start time and end time, users can set their preferred date and time format as one of the following:

- UTC
- Local
- Relative

Select a Workflow Execution to view the Workflow Execution's History, Workers, Relationships, pending Activities and
Nexus Operations, Queries, and Metadata.

### Saved Views {#saved-views}

Saved Views let you save and reuse your frequently used visibility queries in the Temporal Web UI. Instead of recreating
complex filters every time, you can save them once and apply them with a single click.

Saved Views are stored locally in your browser and are available to you whenever you use the Temporal Web UI in this
browser. Each user will have their own private collection.

#### Apply a Saved View

By default, The Workflows page has several default Saved Views. You can also create your own Saved Views.

Click the name of a Saved View in the list to display the corresponding Workflows that match the query.

The Workflow List page will refresh with the results of the Saved View.

#### Create a Saved View

You can create a new Saved View from the Workflows page.

1. Create a Saved View by using the filter UI to build your criteria, or you can use the raw query editor to write
   custom query strings.
1. Your new view will appear in the Custom Views list as New View. Click the Save as New button to bring up the Save as
   View window. Name your Saved View. Names must be unique to each user and can contain a max of 255 characters.
1. Click Save. Your new view will appear in the Custom Views list

You can create up to 20 Saved Views. When you reach this limit, you'll need to delete some Saved Views before you can
save new ones.

#### Make Temporary Changes to a Saved View query

You can modify a Saved View temporarily without changing the saved criteria.

1. Select the Saved View you want to change.
1. Adjust the UI filters as needed.
1. The Workflows page will refresh with the results of the new query, without changing the Saved View.
1. If you want to keep your temporary changes, you can:
   - Click Save, which will replace the original Saved View with your modifications.
   - Click Edit, modify the name, and click Save, which will replace the original Saved View with your modifications and
     change the name.
   - Click Edit, modify the name, and click Create New, which will create a new Saved View with your new settings and a
     new name.

#### Rename a Saved View Query

You can rename an existing Saved View from the Workflows page.

1. Select the Saved View you want to change.
1. Click Edit.
1. In the Edit View dialog box, enter a new name for the Saved View.
1. Click Save to apply your changes and rename the existing Saved View, or click Create Copy to create a new Saved View
   with the new name.

#### Deleting Saved Views

You can delete a Saved View from the Workflows page, because it is no longer useful, or to create room for new Saved
Views.

1. Select the Saved View you want to delete. You can only delete queries you’ve created; you cannot delete the system
   defaults.
1. Click “Edit” and then "Delete this Saved View".

:::note Deleting Saved Views is permanent

Deleted queries cannot be recovered, so make sure you won't need them again. If you accidentally delete a Saved List,
you will need to recreate it.

:::

#### Share a Saved View

You can share a Saved View as a URL.

1. Select the Saved View you want to share.
1. Click the “Share” button to copy the URL for this Saved View to the clipboard. You can also copy the URL directly
   from the browser.

:::note Saved Views and time

Saved Views that use relative times will be shared with absolute time.

:::

## Task Failures View {#task-failures-view}

The Task Failures view is a pre-defined Saved View that displays Workflows that have a Workflow Task failure.
These Workflows are still running, but one of their Tasks has failed or timed out. 

The details of the Task Failures view displays the Workflow's ID, the Run ID, and the Workflow type. 
Clicking on any of the links in the details opens the Workflow page for that Workflow. 
On this page, you will find more information about the Task that failed and remaining pending tasks.
You can also cancel the Workflow by clicking the Request Cancellation button on this page.

Our system monitors Workflow task execution patterns in real-time. When a Workflow experiences five consecutive task failures or timeouts, it gets automatically flagged. The moment the Workflow recovers with a successful task, the flag clears. This smart threshold filters out minor glitches while surfacing Workflows with genuine problems.

### Activating Task Failures View {#activate-task-failures-view}

This is enabled by default for Temporal Cloud users. If you're self-hosting Temporal, you'll need to update the `system.numConsecutiveWorkflowTaskProblemsToTriggerSearchAttribute` [dynamic config](/references/dynamic-configuration).

Here's an example of how to make the config update for the dev server:

```command
temporal server start-dev \
 --dynamic-config-value system.numConsecutiveWorkflowTaskProblemsToTriggerSearchAttribute=5
```

`numConsecutiveWorkflowTaskProblemsToTriggerSearchAttribute` is the number of consecutive Workflow Task Failures required to trigger the `TemporalReportedProblems` search attribute. The default value is 5. If adding this search attribute causes strain on the visibility system, consider increasing this number.

To turn off the feature for a Namespace, set `numConsecutiveWorkflowTaskProblemsToTriggerSearchAttribute` to 0.

## History

A Workflow Execution History is a view of the [Events](/workflow-execution/event#event) and Event fields within the
Workflow Execution. Approximately [40 different Events](/references/events) can appear in a Workflow Execution's Event
History.

The top of the page lists the following execution metadata:

- Start Time, Close Time and Duration
- [Run Id](/workflow-execution/workflowid-runid#run-id)
- [Workflow Type](/workflow-definition#workflow-type)
- [Task Queue](/task-queue)
- Parent and Parent ID
- SDK
- [State Transitions](/workflow-execution#state-transition)
- [Billable Actions Count](/cloud/actions#actions-in-workflows) (Temporal Cloud only)

The Input and Results section displays the function arguments and return values for debugging purposes. Results are not
available until the Workflow finishes.

The History tab has the following views:

- Timeline: A chronological or reverse-chronological order of events with a summary. Clicking into an Event displays all
  details for that Event.
- All: View all History Events.
- Compact: A logical grouping of Activities, Signals and Timers.
- JSON: The full JSON code for the workflow.

### Download Event History

The entire Workflow Execution Event History, in JSON format, can be downloaded from this section.

### Workflow Actions

Workflow Executions can request a Cancellation, send a Signal or Update, or Reset and Terminate directly from the UI.
Start a new Workflow Execution with pre-filled values with the Start Workflow Like This One button.

### Relationships

Displays the full hierarchy of a Workflow Execution with all parent and child nodes displayed in a tree.

### Workers

Displays the Workers currently polling on the Workflow Task Queue with a count. If no Workers are polling, an error
displays.

### Pending Activities

Displays a summary of recently active and/or pending Activity Executions. Clicking a pending Activity directs the user
to the Pending Activities tab to view details.

### Call Stack

The screen shows the captured result from the [\_\_stack_trace](/sending-messages#stack-trace-query) Query. The Query is
performed when the tab is selected. It works only if a Worker is running and available to return the call stack. The
call stack shows each location where Workflow code is waiting.

### Queries

Lists all Queries sent to the Workflow Execution.

### Metadata

Displays User Metadata including static Workflow Summary and Details and dynamic Current Details. Lists all Events with
User Metadata data to give you a human-readable log of what's happening in your Workflow.

## Schedules

On Temporal Cloud and self-hosted Temporal Service Web UI, the Schedules page lists all the [Schedules](/schedule)
created on the selected Namespace.

Click a Schedule to see details, such as configured frequency, start and end times, and recent and upcoming runs.

:::tip Setting Schedules with Strings

Temporal Workflow Schedule Cron strings follow this format:

```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of the month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *
```

:::

To read more about Schedules, explore these links:

<RelatedReadContainer>
  <RelatedReadItem path="/develop/go/schedules" text="Schedules using the Go SDK" archetype="feature-guide" />
  <RelatedReadItem path="/develop/java/schedules" text="Schedules using the Java SDK" archetype="feature-guide" />
  <RelatedReadItem path="/develop/php/schedules" text="Schedules using the PHP SDK" archetype="feature-guide" />
  <RelatedReadItem path="/develop/python/schedules" text="Schedules using the Python SDK" archetype="feature-guide" />
  <RelatedReadItem
    path="/develop/typescript/schedules"
    text="Schedules using the TypeScript SDK"
    archetype="feature-guide"
  />
  <RelatedReadItem path="/develop/dotnet/schedules" text="Schedules using the .NET SDK" archetype="feature-guide" />
</RelatedReadContainer>

### Settings

On Temporal Cloud, **Settings** is visible only to Account Owner and Global Admin
[roles](/cloud/users#account-level-roles).

Click **Settings** to see and manage the list of users in your account and to set up integrations such as
[Observability](/cloud/metrics) and [Audit logging](/cloud/audit-logs).

On a self-hosted Temporal Service, manage your users, metrics, and logging in your
[server configuration](/references/configuration).

### Archive

On a self-hosted Temporal Service, Archive shows [Archived](/temporal-service/archival) data of your Workflow Executions
on the Namespace.

To see data in your self-hosted Temporal Service, you must have
[Archival set up and configured](/self-hosted-guide/archival).

For information and details on the Archive feature in Temporal Cloud, contact your Temporal representative.

### Codec Server

The Web UI can use a [Codec Server](/codec-server) with a custom Data Converter to decode inputs and return values. For
details, see [Securing your data](/production-deployment/data-encryption).

The UI supports a [Codec Server endpoint](/production-deployment/data-encryption#web-ui). For details on setting the
Codec Server endpoint, see [Codec Server setup](/production-deployment/data-encryption#codec-server-setup).
