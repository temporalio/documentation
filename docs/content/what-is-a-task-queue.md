---
id: what-is-a-task-queue
title: What is a Task Queue?
<<<<<<< HEAD
description: todo
=======
description: A Task Queue is a first in, first out queue that a Worker Process polls for Tasks.
>>>>>>> reorg Task Queue content for Temporal Explained
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

<!-- prettier-ignore -->
import * as WhatIsATask from './what-is-a-task.md'
import * as WhatIsAWorker from './what-is-a-worker.md'
import * as WhatIsAnActivityTask from './what-is-an-activity-task.md'
import * as WhatIsAWorkflowTask from './what-is-a-workflow-task.md'

A Task Queue is a first in, first out queue that a <preview page={WhatIsAWorker}>Worker</preview> polls for <preview page={WhatIsATask}>Tasks</preview>.

Each Task Queue is capable of queuing both <preview page={WhatIsAnActivityTask}>Activity Tasks</preview> and <preview page={WhatIsAWorkflowTask}>Workflow Tasks</preview>.

<CenteredImage
imagePath="/diagrams/task-queue.svg"
title="Task Queues component"
imageSize="75"
/>

Task Queues are very lightweight components.
There is no limit to the number of Task Queues a Temporal Application can use or a Temporal Cluster can maintain.
Task Queues do not require explicit registration but instead are created on demand when a Workflow Execution or Activity spawns or when a Worker Process subscribes to it.

Task Queues offer many advantages over synchronous RPC:

- Worker Processes do not need to have any open ports, which is more secure.
- Worker Processes do not need to advertise themselves through DNS or any other network discovery mechanism.
- When all Worker Processes are down, messages simply persist in a Task Queue, waiting for the Worker Processes to recover.
- A Worker Processes polls for a message only when it has spare capacity, avoiding overloading itself.
- Task Queues enable a sort of automatic load balancing across a large number of Worker Processes.
- Task Queues support server side throttling, which enables you to limit the Task dispatching rate to the pool of Worker Processes while still supporting Task dispatching at higher rates when spikes happen.
- Task Queues enable what we call [Task Routing](#task-routing), which is the routing of specific Tasks to specific Worker Processes or even a specific process.

All Workers listening to a given Task Queue must have identical registrations of Activities and/or Workflows.
The one exception to this is during a Server upgrade, where it is okay to have registration temporarily misaligned while the binary rolls out.
