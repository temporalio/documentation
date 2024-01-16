import asyncio
import dataclasses

from temporalio.client import Client
from temporalio.worker import Worker
from temporalio.worker.workflow_sandbox import (
    SandboxedWorkflowRunner,
    SandboxRestrictions,
)

from backgroundcheck_replay.backgroundcheck_dacx import BackgroundCheck
from backgroundcheck_replay.backgroundcheck_non_deterministic_code_dacx import (
    BackgroundCheckNonDeterministic,
)
from ssntraceactivity import ssn_trace_activity


async def main():
    """
    This is a Worker that run non-deterministic code, unrestricted.
    It is not recommended to use this in production.
    """
    client = await Client.connect(
        "localhost:7233", namespace="backgroundcheck_namespace"
    )
    """
    The restrictions below are to allow the random module to be used in the Workflow.
    """
    unrestricted_backgroundcheck = dataclasses.replace(
        SandboxRestrictions.default,
        invalid_module_members=SandboxRestrictions.invalid_module_members_default.with_child_unrestricted(
            "random",
        ),
    )
    """
    The Worker will use the SandboxedWorkflowRunner to run the Workflows.
    """
    worker = Worker(
        client,
        task_queue="backgroundcheck-boilerplate-task-queue-local",
        workflows=[BackgroundCheck, BackgroundCheckNonDeterministic],
        activities=[ssn_trace_activity],
        workflow_runner=SandboxedWorkflowRunner(
            restrictions=unrestricted_backgroundcheck
        ),
    )

    await worker.run()


if __name__ == "__main__":
    asyncio.run(main())
