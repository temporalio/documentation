import asyncio

from temporalio import workflow

"""dacx
To Continue-As-New in Python, call the [`continue_as_new()`](https://python.temporal.io/temporalio.workflow.html#continue_as_new) function from inside your Workflow, which will stop the Workflow immediately and Continue-As-New.
dacx"""

"""dacx
To set a Timer in Python, call the [`asyncio.sleep()`](https://docs.python.org/3/library/asyncio-task.html#sleeping) function and pass the duration in seconds you want to wait before continuing.
dacx"""


@workflow.defn
class LoopingWorkflow:
    @workflow.run
    async def run(self, iteration: int) -> None:
        if iteration == 5:
            return
        await asyncio.sleep(10)
        workflow.continue_as_new(iteration + 1)


""" @dacx
id: how-to-continue-as-new-in-python
title: How to Continue-As-New in Python
label: Continue-As-New
description: To Continue-As-New in Python, call the continue_as_new() function from inside your Workflow, which will stop the Workflow immediately and Continue-As-New.
tags:
 - continue-as-new
 - python sdk
 - code sample
lines: 5-7, 14-21
@dacx """

""" @dacx
id: how-to-set-timers-in-python
title: How to set Timers in Python
label: Timers
description: To set a Timer in Python, call the asyncio.sleep() function and pass the duration in seconds you want to wait before continuing.
tags:
 - timer
 - sleep
 - python sdk
 - code sample
lines: 9-11, 20
@dacx """
