from datetime import timedelta

from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from activities import post_patch_activity

"""dacx
Now, you want to update your code to run `post_patch_activity` instead. This represents your desired end state.
dacx"""

"""dacx
**Problem: You cannot deploy `post_patch_activity` directly until you're certain there are no more running Workflows created using the `pre_patch_activity` code, otherwise you are likely to cause a non-deterministic error.**

Instead, you'll need to deploy `post_patched_activity` and use the [patched](https://python.temporal.io/temporalio.workflow.html#patched) function to determine which version of the code to execute.

Implementing patching involves three steps:

1. Use [patched](https://python.temporal.io/temporalio.workflow.html#patched) to patch in new code and run it alongside the old code.
2. Remove the old code and apply [deprecate_patch](https://python.temporal.io/temporalio.workflow.html#deprecate_patch).
3. Once you're confident that all old Workflows have finished executing, remove `deprecate_patch`.
dacx"""

"""dacx
You can safely deploy `post_patch_activity` once all Workflows labeled my-patch or earlier are finished, based on the previously mentioned assertion.
dacx"""


@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self) -> None:
        self._result = await workflow.execute_activity(
            post_patch_activity,
            schedule_to_close_timeout=timedelta(minutes=5),
        )

    @workflow.query
    def result(self) -> str:
        return self._result


""" @dacx
id: how-to-use-the-python-sdk-patching-api-final-in-python
title: Review the final Python SDK Patching API implementation
label: Final Python SDK patching API implementation
description: Heres a sample implementation of the final patching in new code using the Python SDK's patching API.
tags:
 - version
 - python sdk
 - code sample
lines: 8-10, 1-6, 29-36
@dacx """

""" @dacx
id: addressing-deployment-challenges-with-python-sdk-patching-api
title: Addressing deployment challenges with the Patching API
label: Deployment challenges and solutions
description: A guide on how to handle deployment challenges using the Python SDK's patching API, ensuring seamless transitions between old and new code versions.
tags:
 - deployment
 - python sdk
 - patching
 - best practices
lines: 12-22, 29-36
@dacx """

""" @dacx
id: deploying-post-patch-activity-safely
title: Safe Deployment of post_patch_activity
label: Deploy new code
description: Guidelines for safely deploying post_patch_activity by ensuring that all related Workflows are completed.
tags:
 - deployment safety
 - python sdk
 - workflow completion
 - best practices
lines: 24-26, 29-36
@dacx """
