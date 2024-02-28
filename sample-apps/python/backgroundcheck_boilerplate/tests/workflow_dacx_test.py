import uuid

import pytest

from temporalio.testing import WorkflowEnvironment
from temporalio.worker import Worker

from activities.ssntraceactivity_dacx import ssn_trace_activity
from workflows.backgroundcheck_dacx import BackgroundCheck

"""dacx
Each Temporal SDK has a testing suite that can be used in conjunction with a typical language specific testing framework.
In the Temporal Python SDK, the testing package (https://python.temporal.io/temporalio.testing.html) provides a test environment in which the Workflow and Activity code may be run for test purposes.
dacx"""

"""dacx
The `BackgroundCheck` Workflow code checks the following conditions:

1. It receives a social security number and a unique ID as input parameters.
2. It starts a new Activity `ssn_trace_activity` with the input SSN.
3. It waits for the Activity to complete and returns the result.
4. If the Activity returns "pass", it logs a message indicating that the background check passed.
5. If the Activity returns "fail", it raises an exception indicating that the background check failed.

We can also perform a Workflow Replay test, and we'll provide detailed coverage of this topic in another section.
dacx"""


@pytest.mark.asyncio
async def test_execute_workflow():
    task_queue_name = str(uuid.uuid4())
    async with await WorkflowEnvironment.start_time_skipping() as env:
        async with Worker(
            env.client,
            task_queue=task_queue_name,
            workflows=[BackgroundCheck],
            activities=[ssn_trace_activity],
        ):
            assert "pass" == await env.client.execute_workflow(
                BackgroundCheck.run,
                "555-55-5555",
                id=str(uuid.uuid4()),
                task_queue=task_queue_name,
            )


"""dacx
This is a unit test written in Python using the pytest library.

The test checks the `execute_workflow` method of the `BackgroundCheck` Workflow.

The test creates a new `WorkflowEnvironment` and a `Worker` with a Task Queue and the `BackgroundCheck` Workflow and `ssn_trace_activity` activity.

Then, it executes the `BackgroundCheck.run` method with a social security number and a unique ID, and asserts that the result is equal to "pass".

The test is marked with `@pytest.mark.asyncio` to indicate that it is an asynchronous test.
dacx"""

""" @dacx
id: backgroundcheck-boilerplate-add-test-framework
title: Add a testing framework
description: How to add a testing framework to your Temporal Application.
label: Test framework
lines: 11-14
tags:
- testing
- developer guide
- test framework
- python sdk
@dacx """

""" @dacx
id: backgroundcheck-boilerplate-add-test-framework-details
title: Add a testing framework details
description: How to add a testing framework to your Temporal Application.
label: Test framework details
lines: 16-26
tags:
- testing
- developer guide
- test framework
- go sdk
@dacx """

""" @dacx
id: backgroundcheck-boilerplate-add-workflow-tests
title: Add Workflow function tests
description: How to test Workflow code
label: Test Workflow code
tags:
- testing
- developer guide
- go sdk
lines: 47-57, 1-9, 29-44
@dacx """
