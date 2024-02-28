import asyncio
import json

from temporalio.client import Client


async def main():
    client = await Client.connect("localhost:7233")
    workflows = client.list_workflows()  # You can filter Workflows here
    async for history in workflows.map_histories():
        history_json = history.to_json()
        with open("test_replayer_complete_history.json", "a") as f:
            f.write(json.dumps(history_json, indent=4))
        print("History written to file")


if __name__ == "__main__":
    asyncio.run(main())
