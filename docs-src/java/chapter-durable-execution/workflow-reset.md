---
id: workflow-reset
title: Workflow Reset
description: One option when handling an non-deterministic error is to reset the Workflow to a point prior to the Event where the non-deterministic error occurred, allowing for the Workflow to continue.
sidebar_label: workflow-reset
tags:
  - java sdk
  - developer-guide-doc-type
  - event history
  - determinism
  - workflow reset
---

One way of fixing a Workflow that is blocked by a non-deterministic error is to
reset the Workflow to an earlier state and allowing it to progress. However, this
will only work if you have removed the source of the non-deterministic error. Also,
resetting a Workflow to a certain state will discard any progress the Workflow
may have made after that point, so be certain this is the action you wish to take.

### Resetting via the Web UI

Let's say you decided you don't need the Timer in this current Workflow and
decided to delete it. Once you have deployed your change, you would go to
the currently blocked Workflow in the Web-UI and select **Reset** from the dropdown
in the top right.

![Select the Workflow Reset Option](/img/java/select-reset-web-ui.png)

Next you'll see a list of available points where the Workflow can be reset to.
The only valid option would be to reset the Worklfow to the first `WorkflowTaskCompleted`
with event ID 4 as it is before the `WorkflowTaskFailed` event. You should also
always include a reason why you are resetting this event. The reason will be
persisted in the Event History and may be useful to others who inspect why the
Workflow was reset.

![Workflow Reset Points](/img/java/select-event-reset-web-ui.png)

Once you've reset the Workflow you'll notice that the Workflow terminated and
the Web UI provided a link to a new Workflow execution. The Event History up until
the point you chose was copied over and executed.

![Workflow Terminated and Reset](/img/java/event-terminated-and-reset.png)

After the Timer has fired the Workflow should execute to completion without any
more errors. If you scroll down in the Web UI you'll see the new Event History,
including the `WorkflowTaskFailed` event that was used as the reset point, along
with the reason you reset the workflow.

![New Event History Success with Reset](/img/java/new-event-history-success-with-reset.png)

### Resetting via the CLI

The following `temporal` command is the equivalent of doing it in the Web UI

```bash
$ temporal workflow reset \
	--workflow-id my-workflow-id \
	--event-id 4 \
	--reason "Non-deterministic Error"
```
