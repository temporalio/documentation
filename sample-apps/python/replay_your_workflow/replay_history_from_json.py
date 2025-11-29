import asyncio
import json

from temporalio.client import Client, WorkflowHistory
from temporalio.worker import Replayer
from your_workflow import YourWorkflow


async def main():
    # Connect client
    await Client.connect("localhost:7233")

    # Read the JSON file into memory
    with open("test_replayer_complete_history.json", "r") as f:
        history_json = json.load(f)

        # Convert the JSON to a WorkflowHistory object
        history = WorkflowHistory.from_json("replay-workflow-id", history_json)

        # Replay the workflow using the Replayer
        replayer = Replayer(workflows=[YourWorkflow])
        results = await replayer.replay_workflow(history, raise_on_replay_failure=False)
        print(results)


if __name__ == "__main__":
    asyncio.run(main())
