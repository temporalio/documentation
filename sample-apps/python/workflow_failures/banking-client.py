import asyncio
import uuid

from data_obj import MoneyTransfer
from temporalio.client import Client
from workflow import MoneyTransferWorkflow


async def main():
    client = await Client.connect("localhost:7233")
    payment_details = MoneyTransfer(
        sender="85-150",
        receiver="43-812",
        reference_id=str(uuid.uuid4()),
        amount=250,
    )

    results = await client.execute_workflow(
        MoneyTransferWorkflow.run,
        payment_details,
        id="pay-invoice-701",
        task_queue="money-transfer",
    )
    print(results)
    return results


if __name__ == "__main__":
    asyncio.run(main())
