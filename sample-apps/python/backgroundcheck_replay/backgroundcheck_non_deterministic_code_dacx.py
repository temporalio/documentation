import asyncio
from datetime import timedelta

from temporalio import workflow

with workflow.unsafe.imports_passed_through():
    from random import randint
    from ssntraceactivity import ssn_trace_activity

@workflow.defn()
class BackgroundCheckNonDeterministic:
    @workflow.run
    async def run(self, ssn: str) -> str:
        random_number = randint(1, 100)
        if random_number < 50:
            await asyncio.sleep(60)
            workflow.logger.info("Sleeping for 60 seconds")
        return await workflow.execute_activity(
            ssn_trace_activity,
            ssn,
            schedule_to_close_timeout=timedelta(seconds=5),
        )
