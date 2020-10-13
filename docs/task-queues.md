---
id: task-queues
title: Task Queues
---

When a Workflow invokes an Activity, it sends the `ScheduleActivityTask` [Command](/docs/glossary/#command) to the Temporal service. As a result, the service updates the Workflow state and dispatches an [Activity Task](/docs/glossary/#activity-task) to a Worker that implements the Activity.

Instead of calling the Worker directly, an intermediate queue is used. So the service adds an Activity Task to this queue and a Worker receives the Task using a long poll request.

Temporal calls this queue used to dispatch Activity Tasks an Activity Task Queue.

Similarly, when a Workflow needs to handle an external event, a Command Task is created.
A Command Task Queue is used to deliver it to the Worker.

While Temporal Task Queues are queues, they have some differences from commonly used queuing technologies. The main one is that they do not require explicit registration and are created on demand. The number of Task Queues is not limited. A common use case is to have a Task Queue per Worker process and use it to deliver Activity tasks to the process. Another use case is to have a Task Queue per pool of Workers.

There are multiple advantages of using a Task Queue to deliver Tasks instead of invoking an Activity Worker through a synchronous RPC:

- Worker doesn't need to have any open ports, which is more secure.
- Worker doesn't need to advertise itself through DNS or any other network discovery mechanism.
- When all Workers are down, messages are persisted in a Task Queue waiting for the Workers to recover.
- A Worker polls for a message only when it has spare capacity, so it never gets overloaded.
- Automatic load balancing across a large number of Workers.
- Task Queues support server side throttling. This allows you to limit the Task dispatch rate to the pool of Workers and still supports adding a Task with a higher rate when spikes happen.
- Task Queues can be used to route a request to specific pools of Workers or even a specific process.

All Workers processing from a given Task Queue should have identical registration of Activities/Workflows, with the exception being during upgrades where it is okay to temporarily have them misaligned while your binary rolls out.
