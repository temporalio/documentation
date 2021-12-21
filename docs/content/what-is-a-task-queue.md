---
id: what-is-a-task-queue
title: What is a Task Queue?
description: A Task Queue is a first-in, first-out queue that a Worker Process polls for Tasks.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

<!-- prettier-ignore -->
import * as WhatIsATask from './what-is-a-task.md'
import * as WhatIsAWorker from './what-is-a-worker.md'
import * as WhatIsAnActivityTask from './what-is-an-activity-task.md'
import * as WhatIsAWorkflowTask from './what-is-a-workflow-task.md'
import * as WhatIsTaskRouting from './what-is-task-routing.md'

A Task Queue is lightweight, dynamically allocated queue that one or more <preview page={WhatIsAWorker}>Workers</preview> poll for <preview page={WhatIsATask}>Tasks</preview>.

Each Task Queue is capable of queuing both <preview page={WhatIsAnActivityTask}>Activity Tasks</preview> and <preview page={WhatIsAWorkflowTask}>Workflow Tasks</preview>.

<CenteredImage
imagePath="/diagrams/task-queue.svg"
title="Task Queue component"
imageSize="75"
/>

Task Queues are very lightweight components.

- Task Queues do not require explicit registration but instead are created on demand when a Workflow Execution or Activity spawns or when a Worker Process subscribes to it.
- There is no limit to the number of Task Queues a Temporal Application can use or a Temporal Cluster can maintain.

Workers poll for Tasks in Task Queues via synchronous RPC.
This implementation offers several benefits:

- Worker Processes do not need to have any open ports, which is more secure.
- Worker Processes do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Worker Processes are down, messages simply persist in a Task Queue, waiting for the Worker Processes to recover.
- A Worker Processes polls for a message only when it has spare capacity, avoiding overloading itself.
- In effect, Task Queues enable load balancing across a large number of Worker Processes.
- Task Queues support server-side throttling, which enables you to limit the Task dispatching rate to the pool of Worker Processes while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call <preview page={WhatIsTaskRouting}>Task Routing</preview>, which is the routing of specific Tasks to specific Worker Processes or even a specific process.

All Workers listening to a given Task Queue must have identical registrations of Activities and/or Workflows.
The one exception is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.

<details>
  <summary>In what order does the Task Queue match Tasks? FIFO? LIFO? Random?</summary>
  
  Temporal offers no guarantees as to the order that Tasks are matched (popped) off the Task Queue.
  There are two kinds of matching channels ("sync match" and "async match") based on where the tasks are located.
  Tasks that fail to sync match will overflow to the persistence database, and be picked up in a separate channel.
  Temporal then selects from both channels at random.
  
  In effect, this means that Temporal tries to be LIFO for performance, but falls back to a pure random strategy in high load situations.
  
</details>
