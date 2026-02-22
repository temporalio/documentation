---
id: enriching-ui
title: Enriching the user interface - TypeScript SDK
sidebar_label: Enriching the UI
description: Add contextual information to workflows and events in the Temporal UI using the TypeScript SDK.
toc_max_heading_level: 3
keywords:
  - ui enrichment
  - workflow context
  - static summary
  - static details
  - activity summary
  - timer summary
tags:
  - UI Enrichment
  - TypeScript SDK
  - Temporal SDKs
---

Temporal supports adding context to Workflows and Events with metadata. 
This helps users identify and understand Workflows and their operations.

## Adding Summary and Details to Workflows

### Starting a Workflow

When starting a Workflow, you can provide a static summary and details to help identify the workflow in the UI:

```typescript
import { Client } from '@temporalio/client';

const client = new Client();

// Start a workflow with static summary and details
const handle = await client.workflow.start(yourWorkflow, {
  args: ['workflow input'],
  taskQueue: 'your-task-queue',
  workflowId: 'your-workflow-id',
  staticSummary: 'Order processing for customer #12345',
  staticDetails: 'Processing premium order with expedited shipping'
});
```

`staticSummary` is a single-line description that appears in the workflow list view, limited to 200 bytes.
`staticDetails` can be multi-line and provides more comprehensive information that appears in the workflow details view, with a larger limit of 20K bytes.

The input format is standard Markdown excluding images, HTML, and scripts.

You can also use the `execute` method with the same parameters:

```typescript
const result = await client.workflow.execute(yourWorkflow, {
  args: ['workflow input'],
  taskQueue: 'your-task-queue',
  workflowId: 'your-workflow-id',
  staticSummary: 'Order processing for customer #12345',
  staticDetails: 'Processing premium order with expedited shipping'
});
```

### Inside the Workflow

Within a Workflow, you can get and set the _current workflow details_. 
Unlike static summary/details set at Workflow start, this value can be updated throughout the life of the Workflow. 
Current Workflow details also takes Markdown format (excluding images, HTML, and scripts) and can span multiple lines.

```typescript
import { getCurrentDetails, setCurrentDetails } from '@temporalio/workflow';

export async function yourWorkflow(input: string): Promise<string> {
  // Get the current details
  const currentDetails = getCurrentDetails();
  console.log(`Current details: ${currentDetails}`);
  
  // Set/update the current details
  setCurrentDetails('Updated workflow details with new status');
  
  return 'Workflow completed';
}
```

### Adding Summary to Activities and Timers

You can attach a `summary` to activities by using `executeWithOptions` when calling them:

```typescript
import { proxyActivities } from '@temporalio/workflow';
import type * as activities from './activities';

const { yourActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '10 seconds'
});

export async function yourWorkflow(input: string): Promise<string> {
  // Execute an activity with a summary using executeWithOptions
  const result = await yourActivity.executeWithOptions(
    {
      staticSummary: 'Processing user data'
    },
    [input] // Note: arguments must be passed as an array
  );
  
  return result;
}
```

Similarly, you can attach a `summary` to timers within a workflow:

```typescript
import { sleep } from '@temporalio/workflow';

export async function yourWorkflow(input: string): Promise<string> {
  // Create a timer with a summary
  await sleep('5 minutes', { summary: 'Waiting for payment confirmation' });
  
  return 'Timer completed';
}
```

The input format for `summary` is a string, and limited to 200 bytes.

## Viewing Summary and Details in the UI

Once you've added summaries and details to your Workflows, Activities, and Timers, you can view this enriched information in the Temporal Web UI.
Navigate to your Workflow's details page to see the metadata displayed in two key locations:

### Workflow Overview Section

At the top of the workflow details page, you'll find the workflow-level metadata:

- **Summary & Details** - Displays the static summary and static details set when starting the workflow
- **Current Details** - Displays the dynamic details that can be updated during workflow execution

All Workflow details support standard Markdown formatting (excluding images, HTML, and scripts), allowing you to create rich, structured information displays.

### Event History

Individual events in the Workflow's Event History display their associated summaries when available. 

Workflow, Activity and Timer summaries appear in purple text next to their corresponding Events, providing immediate context without requiring you to expand the event details. 
When you do expand an Event, the summary is also prominently displayed in the detailed view.
