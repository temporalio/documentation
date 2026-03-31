export type BuildStep = {
  num: string;
  title: string;
  file: string;
  language: string;
  code: string;
  note: string;
};

export const buildSteps: BuildStep[] = [
  {
    num: 'Step 1 of 6',
    title: 'Define the Workflow with state',
    file: 'order_workflow.py',
    language: 'python',
    code: `from dataclasses import dataclass
from temporalio import workflow

@workflow.defn
class OrderWorkflow:
    def __init__(self) -> None:
        self._status: str = "pending"
        self._approved: bool = False
        self._priority: int = 3

    @workflow.run
    async def run(self, order_id: str) -> str:
        # handlers wired below as class methods
        await workflow.wait_condition(lambda: self._approved)
        return f"Order {order_id} processed with priority {self._priority}"`,
    note: `Start with a class that holds state. These instance variables are what Signals will write to, Queries will read from, and Updates will validate and change. The run method blocks on wait_condition and resumes automatically when a Signal sets _approved to True.`,
  },
  {
    num: 'Step 2 of 6',
    title: 'Add a Signal handler',
    file: 'order_workflow.py',
    language: 'python',
    code: `@workflow.defn
class OrderWorkflow:
    ...

    @workflow.signal
    async def approve(self) -> None:
        """Fire-and-forget: caller gets no response."""
        self._approved = True
        self._status = "approved"

    @workflow.signal
    async def cancel(self, reason: str) -> None:
        """Signals can carry input arguments."""
        self._status = f"cancelled: {reason}"
        raise asyncio.CancelledError(reason)`,
    note: `Signal handlers are one-way. The caller sends a signal and keeps moving with no return value and no confirmation of when the handler ran. Use signals when you want to push an event into a Workflow without waiting for acknowledgment.`,
  },
  {
    num: 'Step 3 of 6',
    title: 'Add a Query handler',
    file: 'order_workflow.py',
    language: 'python',
    code: `@workflow.defn
class OrderWorkflow:
    ...

    @workflow.query
    def get_status(self) -> str:
        """Read-only. Must NOT be async."""
        return self._status

    @workflow.query
    def get_details(self) -> dict:
        """Queries can return complex types."""
        return {
            "status": self._status,
            "approved": self._approved,
            "priority": self._priority,
        }`,
    note: `Query handlers must be regular synchronous functions, not async. They read state and return it. They must not change anything. If no Worker is running when a query is sent, it fails immediately because queries are not buffered.`,
  },
  {
    num: 'Step 4 of 6',
    title: 'Add an Update handler with a validator',
    file: 'order_workflow.py',
    language: 'python',
    code: `@workflow.defn
class OrderWorkflow:
    ...

    @workflow.update
    async def set_priority(self, priority: int) -> str:
        """Request-response: caller waits for the return value."""
        self._priority = priority
        return f"Priority set to {priority}"

    @set_priority.validator
    def validate_priority(self, priority: int) -> None:
        """Validator runs BEFORE the handler.
        Raise here to reject without touching state."""
        if not (1 <= priority <= 5):
            raise ValueError(
                f"Priority must be 1-5, got {priority}"
            )`,
    note: `The validator runs first. If it raises, the Update is rejected and no state is changed. The caller gets the exception as an error. The handler only runs if the validator passes. This makes Updates safe for operations that need validated input before changing anything.`,
  },
  {
    num: 'Step 5 of 6',
    title: 'Start the Workflow and send a Signal',
    file: 'client.py',
    language: 'python',
    code: `import asyncio
from temporalio.client import Client
from order_workflow import OrderWorkflow

async def main():
    client = await Client.connect("localhost:7233")

    # Start the Workflow (blocks at wait_condition immediately)
    handle = await client.start_workflow(
        OrderWorkflow.run,
        "order-123",
        id="order-wf-123",
        task_queue="orders",
    )
    print(f"Started: {handle.id}")

    # Send a Signal (returns as soon as the server accepts it)
    await handle.signal(OrderWorkflow.approve)
    print("Signal sent")

asyncio.run(main())`,
    note: `The Workflow starts and parks at wait_condition(lambda: self._approved). The approve signal sets _approved = True, which unblocks the condition and lets the Workflow finish. The client does not wait for the signal to be processed. It only confirms the server accepted it.`,
  },
  {
    num: 'Step 6 of 6',
    title: 'Query state and send an Update',
    file: 'client.py',
    language: 'python',
    code: `async def main():
    client = await Client.connect("localhost:7233")
    handle = client.get_workflow_handle("order-wf-123")

    # Query the Workflow's current state (synchronous read)
    status = await handle.query(OrderWorkflow.get_status)
    print(f"Status: {status}")  # "pending" or "approved"

    # Send an Update (caller waits for result or rejection)
    try:
        result = await handle.execute_update(
            OrderWorkflow.set_priority, 3
        )
        print(f"Update result: {result}")
        # "Priority set to 3"
    except Exception as e:
        print(f"Update rejected: {e}")
        # ValueError: "Priority must be 1-5, got 6"

asyncio.run(main())`,
    note: `Queries return the current state without touching anything. Updates wait for a result. If the validator rejects the input (priority 6 in this case), execute_update raises on the client and the Workflow state is never modified. You can also get a workflow handle at any time with just the workflow ID, without needing the original start call.`,
  },
];
