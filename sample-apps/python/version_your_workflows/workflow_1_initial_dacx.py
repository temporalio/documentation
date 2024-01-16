from datetime import timedelta

from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from activities import pre_patch_activity

"""dacx
In principle, the Python SDK's patching mechanism operates similarly to other SDKs in a "feature-flag" fashion. However, the "versioning" API now uses the concept of "patching in" code.

To understand this, you can break it down into three steps, which reflect three stages of migration:

- Running `pre_patch_activity` code while concurrently patching in `post_patch_activity`.
- Running `post_patch_activity` code with deprecation markers for `my-patch` patches.
- Running only the `post_patch_activity` code.

Let's walk through this process in sequence.

Suppose you have an initial Workflow version called `pre_patch_activity`:
dacx"""


@workflow.defn
class MyWorkflow:
    @workflow.run
    async def run(self) -> None:
        self._result = await workflow.execute_activity(
            pre_patch_activity,
            schedule_to_close_timeout=timedelta(minutes=5),
        )

    @workflow.query
    def result(self) -> str:
        return self._result


""" @dacx
id: how-to-use-the-python-sdk-patching-api-in-python
title: How to use the Python SDK Patching API
label: Python SDK Patching API
description: Heres a sample implementation of patching in new code using the Python SDK's patching API.
tags:
 - version
 - python sdk
 - code sample
lines: 8-20, 1-6, 23-30
@dacx """
