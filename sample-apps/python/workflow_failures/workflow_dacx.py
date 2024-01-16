from datetime import timedelta

from temporalio import workflow
from temporalio.common import RetryPolicy

with workflow.unsafe.imports_passed_through():
    from activities import deposit, refund, withdraw
    from data_obj import MoneyTransfer
"""dacx
To cancel a Workflow Execution, you can set the `RetryPolicy`'s `maximum_attempts` a desired number which will cause the Workflow Execution to cancel after the predermine attempt. 
You can also set the `RetryPolicy`'s `non_retryable_error_types` to a list of error types that you want to cancel the Workflow Execution.
dacx"""


@workflow.defn
class MoneyTransferWorkflow:
    @workflow.run
    async def run(self, details: MoneyTransfer):
        try:
            withdraw_output = await workflow.execute_activity(
                withdraw,
                details,
                retry_policy=RetryPolicy(
                    initial_interval=timedelta(seconds=1),
                    maximum_interval=timedelta(minutes=1),
                    backoff_coefficient=2,
                    maximum_attempts=500,
                    non_retryable_error_types=["Exception"],
                ),
                start_to_close_timeout=timedelta(seconds=5),
            )
            deposit_output = await workflow.execute_activity(
                deposit,
                details,
                retry_policy=RetryPolicy(
                    initial_interval=timedelta(seconds=1),
                    maximum_interval=timedelta(minutes=1),
                    backoff_coefficient=2,
                    maximum_attempts=500,
                    non_retryable_error_types=["Exception"],
                ),
                start_to_close_timeout=timedelta(seconds=5),
            )
        except Exception:
            try:
                refund_output = await workflow.execute_activity(
                    refund,
                    details,
                    start_to_close_timeout=timedelta(seconds=5),
                )
                return f"Transfer failed. Money returned to sender: {refund_output}"
            except Exception as refund_error:
                return f"Transfer failed. Error refunding money: {refund_error}"

        return f"""Transfer complete.
            Withdraw: {withdraw_output}
            Deposit: {deposit_output}"""


""" @dacx
id: how-to-cancel-a-workflow-execution-in-python
title: How to Cancel a Workflow Execution in Python
label: Cancel a Workflow Execution
description: Cancel a Workflow Execution with Retry Policies.
tags:
 - workflow execution
 - retry policy
 - python sdk
 - code sample
lines: 4, 9-12. 15-31
@dacx """
