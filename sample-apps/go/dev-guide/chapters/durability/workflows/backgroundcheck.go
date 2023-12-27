// dacx
package workflows

import (
	"time"

	"go.temporal.io/sdk/workflow"

	"documentation-samples-go/dev-guide/chapters/durability/activities"
)

/*
In the following sample, we add a couple of logging statements and a Timer to the Workflow code to see how this affects the Event History.

Use the `workflow.Sleep()` API to cause the Workflow to sleep for a minute before the call to execute the Activity.
The Temporal SDK offers both a `workflow.StartTimer()` API, and a `workflow.Sleep()` API that enables you to add time based logic to your Workflow code.

Use the `workflow.GetLogger` API to log from Workflows to avoid seeing repeated logs from the Replay of the Workflow code.
*/

// BackgroundCheck is your custom Workflow Definition.
func BackgroundCheck(ctx workflow.Context, param string) (string, error) {
	// highlight-start
	// Sleep for 1 minute
	workflow.GetLogger(ctx).Info("Sleeping for 1 minute...")
	err := workflow.Sleep(ctx, 60*time.Second)
	if err != nil {
		return "", err
	}
	workflow.GetLogger(ctx).Info("Finished sleeping")
	// highlight-end
	// Define the Activity Execution options
	// StartToCloseTimeout or ScheduleToCloseTimeout must be set
	activityOptions := workflow.ActivityOptions{
		StartToCloseTimeout: 10 * time.Second,
	}
	ctx = workflow.WithActivityOptions(ctx, activityOptions)
	// Execute the Activity synchronously (wait for the result before proceeding)
	var ssnTraceResult string
	err = workflow.ExecuteActivity(ctx, activities.SSNTraceActivity, param).Get(ctx, &ssnTraceResult)
	if err != nil {
		return "", err
	}
	// Make the results of the Workflow available
	return ssnTraceResult, nil
}

/*
After updating your Workflow code to include the logging and Timer, run your tests again.
You should expect to see the `TestReplayWorkflowHistoryFromFile` test fail.
This is because the code we added creates new Events and alters the Event History sequence.

To get this test to pass, we must get an updated Event History JSON file.
[Start a new Workflow](/go/chapter-project-setup/backgroundcheck-boilerplate-start-workflow) and after it is complete [download the Event History as a JSON object](/go/chapter-durable-execution/retrieve-event-history).

:::info Double check Task Queue names

Reminder that this guide jumps between several sample applications using multiple Task Queues.
Make sure you are starting Workflows on the same Task Queue that the Worker is listening to.
And, always make sure that all Workers listening to the same Task Queue are registered with the same Workflows and Activities.

:::

If you inspect the new Event History, you will see two new Events in response to the `workflow.Sleep()` API call which send the [StartTimer Command](/references/commands#starttimer) to the Server:

- `TimerStarted`
- `TimerFired`

However, it is also important to note that you don't see any Events related to logging.
And if you were to remove the Sleep call from the code, there wouldn't be a compatability issue with the previous code.
This is to highlight that only certain code changes within Workflow code is non-deterministic.
The basic thing to remember is that if the API call causes a [Command](/references/commands) to create Events in the Workflow History that takes a new path from the existing Event History then it is a non-deterministic change.

This becomes a critical aspect of Workflow development when there are running Workflows that have not yet completed and rely on earlier versions of the code.

Practially, that means non-deterministic changes include but are not limited to the following:

- Adding or removing an Activity
- Switching the Activity Type used in a call to `ExecuteActivity`
- Adding or removing a Timer
- Altering the execution order of Activities or Timers relative to one another

The following are a few examples of changes that do not lead to non-deterministic errors:

- Modifying non-Command generating statements in a Workflow Definition, such as logging statements
- Changing attributes in the `ActivityOptions`
- Modifying code inside of an Activity Definition
*/

/* @dacx
id: add-sleep-for-one-minute
title: Add a call to sleep
description: Add a call to sleep for one minute to the beginning of the Workflow.
label: Add sleep call
lines: 2-46
tags:
- timer
- sleep
- logger
@dacx */

/* @dacx
id: inspect-the-new-event-history
title: Inspect the new Event History
description: After making changes to the code, we must update the Event History JSON file to get tests to pass.
label: Inspect new Event History
lines: 48-88
tags:
- tests
- replay
- event history
@dacx */
