import pytest
from temporalio.testing import ActivityEnvironment
from activities.ssntraceactivity_dacx import ssn_trace_activity


"""dacx
This is a Python using the [pytest](https://pytest.org) framework and the [ActivityEnvironment](https://python.temporal.io/temporalio.testing.ActivityEnvironment.html) class from the Temporal Python SDK.
It tests the `ssn_trace_activity` function from the activities module.
The function takes a social security number as input and returns a string indicating whether the SSN is valid or not.
The test checks if the function returns "pass" when given the SSN "55-55-555".
dacx"""


@pytest.mark.asyncio
async def test_ssn_trace_activity() -> str:
    activity_environment = ActivityEnvironment()
    expected_output = "pass"
    assert expected_output == await activity_environment.run(
        ssn_trace_activity, "55-55-555"
    )


""" @dacx
id: backgroundcheck-boilerplate-add-activity-tests
title: Add Activity function tests
description: How to test Activity code
label: Test Activity code
lines: 1-20
tags:
- testing
- developer guide
- python sdk
@dacx """
