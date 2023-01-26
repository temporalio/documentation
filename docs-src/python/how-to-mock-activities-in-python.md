---
id: how-to-mock-activities-in-python
title: How to mock Activities in Python
sidebar_label: Mock Activities for testing
description: Mock Activities for testing in Python.
tags:
  - python
  - how-to
  - testing
---

Provide mock Activity implementations to the Worker.

```python
import uuid
from temporalio.client import Client
from temporalio.worker import Worker

# Import your Activity Definition and real implementation
from hello.hello_activity import (
    ComposeGreetingInput,
    GreetingWorkflow,
    compose_greeting,
)

# Define your mocked Activity implementation
@activity.defn(name="compose_greeting")
async def compose_greeting_mocked(input: ComposeGreetingInput) -> str:
    return f"{input.greeting}, {input.name} from mocked activity!"

async def test_mock_activity(client: Client):
    task_queue_name = str(uuid.uuid4())
    # Provide the mocked Activity implementation to the Worker
    async with Worker(
        client,
        task_queue=task_queue_name,
        workflows=[GreetingWorkflow],
        activities=[compose_greeting_mocked],
    ):
        # Execute your Workflow as usual
        assert "Hello, World from mocked activity!" == await client.execute_workflow(
            GreetingWorkflow.run,
            "World",
            id=str(uuid.uuid4()),
            task_queue=task_queue_name,
        )
```

The mocked Activity implementation should have the same signature as the real implementation (including the input and output types) and the same name.
When the Workflow invokes the Activity, it invokes the mocked implementation instead of the real one, allowing you to test your Workflow isolated.
