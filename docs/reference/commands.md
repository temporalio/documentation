---
id: commands
title: Command reference
description: A Command is a requested action issued by a Worker to the Temporal Cluster, after the Worker has finished completing the execution of a Workflow Task.
tags:
  - reference
  - explanation
---

<!-- prettier-ignore -->
import * as WhatIsAWorkflowTask from '../content/what-is-a-workflow-task.md'
import * as WhatIsAWorker from '../content/what-is-a-worker.md'
import * as WhatIsATemporalCluster from '../content/what-is-a-temporal-cluster.md'
import * as WhatIsAWorkflowExecution from '../content/what-is-a-workflow-execution.md'
import * as WhatIsAnEventHistory from '../content/what-is-an-event-history.md'
import * as WhatIsAnEvent from '../content/what-is-an-event.md'

### What is a Command?

A Command is a requested action issued by a <preview page={WhatIsAWorker}>Worker</preview> to the <preview page={WhatIsATemporalCluster}>Temporal Cluster</preview> after the Worker has finished completing the execution of a <preview page={WhatIsAWorkflowTask}>Workflow Task</preview>.

The action that the Cluster takes is recorded in the <preview page={WhatIsAWorkflowExecution}>Workflow Execution's</preview> <preview page={WhatIsAnEventHistory}>Event History</preview> as an <preview page={WhatIsAnEvent}>Event</preview>.

During the execution of a Workflow Task there may be several Commands that are generated.
The Commands are batched and sent to the Cluster as part of the Workflow Task completion request, after the Workflow Task has progressed as far as it can.

### CompleteWorkflowExecution

- Description: This Command is triggered when the last Workflow Task of the Workflow Execution has finished executing successfully.
  Often this is when the last line of code in a Workflow Definition has been execution.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionComplete](/docs/reference/events/#workflowexecutioncompleted)

### ContinueAsNewWorkflowExecution

- Description: This Command is triggered when there is a call to ContinueAsNew from within the Workflow.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionContinuedAsNew](docs/reference/events/#workflowexecutioncontinuedasnew)

### FailWorkflowExecution

- Description: This Command is triggered when the Workflow Execution returns an error or an exception is thrown.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionFailed](/docs/reference/events/#workflowexecutionfailed)

### CancelWorkflowExecution

- Description: This Command is triggered when the Workflow Execution has accepted the Cancellation Request.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [WorkflowExecutionCanceled](/docs/reference/events/#workflowexecutioncanceled)

### StartChildWorkflowExecution

- Description: This Command is triggered by a call to spawn a Child Workflow Execution.
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [ChildWorkflowExecutionStarted](/docs/reference/events/#childworkflowexecutionstarted)

### SignalExternalWorkflowExecution

- Description: This Command is triggered by a call to Signal another Workflow Execution.
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [SignalExternalWorkflowExecutionInitiated](/docs/reference/events/#signalexternalworkflowexecutioninitiated)

### RequestCancelExternalWorkflowExecution

- Description: This Command is triggered by a call to request cancellation of another Workflow Execution.
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [RequestCancelExternalWorkflowExecutionInitiated](/docs/reference/events/#requestcancelexternalworkflowexecutioninitiated)

### ScheduleActivityTask

- Description: This Command is triggered by a call to execute an Activity.
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [ActivityTaskScheduled](/docs/reference/events/#activitytaskscheduled)

### RequestCancelActivityTask

- Description: This Command is triggered by a call to request the cancellation of an Activity Task.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [ActivityTaskCancelRequested](/docs/reference/events/#activitytaskcancelrequested)

### StartTimer

- Description: This Command is triggered by a call to start a Timer.
- Awaitable: Yes, a Workflow Execution can await on the action resulting from this Command.
- Corresponding Event: [TimerStarted](/docs/reference/events/#timerstarted)

### CancelTimer

- Description: This Command is triggered by a call to cancel a Timer.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [TimerCanceled](/docs/reference/events/#timercanceled)

### RecordMarker

- Description: This Command is triggered by the SDK.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [MarkerRecorded](/docs/reference/events/#markerrecorded)

### UpsertWorkflowSearchAttributes

- Description: This Command is triggered by a call to "upsert" Workflow Search Attributes.
- Awaitable: No, a Workflow Execution can not await on the action resulting from this Command.
- Corresponding Event: [UpsertWorkflowSearchAttributes](/docs/reference/events/#upsertworkflowsearchattributes)
