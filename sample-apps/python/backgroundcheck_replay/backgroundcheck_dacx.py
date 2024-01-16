import asyncio
from datetime import timedelta

from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from ssntraceactivity import ssn_trace_activity

"""dacx
In the following sample, we add a couple of logging statements and a Timer to the Workflow code to see how this affects the Event History.

Use the `asyncio.sleep()` API to cause the Workflow to sleep for a minute before the call to execute the Activity.
The Temporal Python SDK offers deterministic implementations to the following API calls:
- [workflow.now()](https://python.temporal.io/temporalio.workflow.html#now)
- [workflow.random()](https://python.temporal.io/temporalio.workflow.html#random)
- [workflow.time_ns()](https://python.temporal.io/temporalio.workflow.html#time_ns)
- [workflow.time()](https://python.temporal.io/temporalio.workflow.html#time)
- [workflow.uuid4()](https://python.temporal.io/temporalio.workflow.html#uuid4)

Use the `workflow.logger` API to log from Workflows to avoid seeing repeated logs from the Replay of the Workflow code.
dacx"""
@workflow.defn()
class BackgroundCheck:
    @workflow.run
    async def run(self, ssn: str) -> str:
        random_number = workflow.random().randint(1, 100)
        if random_number < 50:
            await asyncio.sleep(60)
            workflow.logger.info("Sleeping for 60 seconds")
        return await workflow.execute_activity(
            ssn_trace_activity,
            ssn,
            schedule_to_close_timeout=timedelta(seconds=5),
        )
"""dacx
After updating your Workflow code to include the logging and Timer, run your tests again.
You should expect to see the `TestReplayWorkflowHistoryFromFile` test fail.
This is because the code we added creates new Events and alters the Event History sequence.

To get this test to pass, we must get an updated Event History JSON file.
[Start a new Workflow](/python/backgroundcheck-boilerplate-start-workflow) and after it is complete [download the Event History as a JSON object](/python/chapter-durable-execution/retrieve-event-history).

:::info Double check Task Queue names

Reminder that this guide jumps between several sample applications using multiple Task Queues.
Make sure you are starting Workflows on the same Task Queue that the Worker is listening to.
And, always make sure that all Workers listening to the same Task Queue are registered with the same Workflows and Activities.

:::

If you inspect the new Event History, you will see two new Events in response to the `asyncio.sleep()` API call which send the [StartTimer Command](/references/commands#starttimer) to the Server:

- `TimerStarted`
- `TimerFired`

However, it is also important to note that you don't see any Events related to logging.
And if you were to remove the Sleep call from the code, there wouldn't be a compatibility issue with the previous code.
This is to highlight that only certain code changes within Workflow code is non-deterministic.
The basic thing to remember is that if the API call causes a [Command](/references/commands) to create Events in the Workflow History that takes a new path from the existing Event History then it is a non-deterministic change.

This becomes a critical aspect of Workflow development when there are running Workflows that have not yet completed and rely on earlier versions of the code.

Practically, that means non-deterministic changes include but are not limited to the following:

- Adding, removing, reordering an Activity call inside a Workflow Execution
- Switching the Activity Type used in a call to `ExecuteActivity`
- Adding or removing a Timer
- Altering the execution order of Activities or Timers relative to one another

The following are a few examples of changes that do not lead to non-deterministic errors:

- Modifying non-Command generating statements in a Workflow Definition, such as logging statements
- Changing attributes in the `ActivityOptions`
- Modifying code inside of an Activity Definition
dacx"""

""" @dacx
id: add-sleep-for-one-minute
title: Add a call to sleep
description: Add a call to sleep for one minute to the beginning of the Workflow.
label: Add sleep call
lines: 1-34
tags:
- timer
- sleep
- logger
@dacx """

""" @dacx
id: inspect-the-new-event-history
title: Inspect the new Event History
description: After making changes to the code, we must update the Event History JSON file to get tests to pass.
label: Inspect new Event History
lines: 35-75
tags:
- tests
- replay
- event history
@dacx """
