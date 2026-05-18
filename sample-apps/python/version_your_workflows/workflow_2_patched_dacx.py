from datetime import timedelta

from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from activities import post_patch_activity, pre_patch_activity

"""dacx
Using `patched` inserts a marker into the Workflow History.

![image](https://user-images.githubusercontent.com/6764957/139673361-35d61b38-ab94-401e-ae7b-feaa52eae8c6.png)

During replay, if a Worker encounters a history with that marker, it will fail the Workflow task when the Workflow code doesn't produce the same patch marker (in this case, `my-patch`). This ensures you can safely deploy code from `post_patch_activity` as a "feature flag" alongside the original version (`pre_patch_activity`).
dacx"""


@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self) -> None:
        if workflow.patched("my-patch"):
            self._result = await workflow.execute_activity(
                post_patch_activity,
                schedule_to_close_timeout=timedelta(minutes=5),
            )
        else:
            self._result = await workflow.execute_activity(
                pre_patch_activity,
                schedule_to_close_timeout=timedelta(minutes=5),
            )

    @workflow.query
    def result(self) -> str:
        return self._result


""" @dacx
id: patch-in-new-code
title: Patching in new code
label: Using patched for Workflow History markers
description: An introduction to the `patched` function in the Python SDK, which inserts a marker into the Workflow History to ensure safe deployment of new code versions.
tags:
 - patching
 - python sdk
 - workflow history
 - best practices
lines: 8-14, 17-30
@dacx """
