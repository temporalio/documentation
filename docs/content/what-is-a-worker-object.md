---
id: what-is-a-worker-object
title: What is a Worker Object?
description: A Worker Object is a component that listens on a set of Task Queues and processes Tasks.
tags:
  - explanation
---

import RelatedRead from '../components/RelatedRead.js'
import CenteredImage from "../components/CenteredImage.js"
import DetermineHeader from '../components/DetermineHeader.js'

<DetermineHeader
hLevel={props.hLevel}
hText={props.hText}
/>

A Worker Object is a component that listens on a set of Task Queues and processes Tasks.
Processing a Task includes looking up the full execution instructions for the Task and executing those instructions.

<CenteredImage
imagePath="/diagrams/worker-object-and-executions.svg"
imageSize="50"
/>

<br/>

Applications developers may operate as many Worker Objects within a Worker Process as needed to meet your scalability and reliability requirements.
Additionally, a Worker object may be configured to become multi-threaded to handle multiple Tasks concurrently.

<RelatedRead
text="When to scale Worker Objects"
goTo="#"
/>

Which Task Queues the Worker listens to depends on the following two things:

1. The Task Queue name parameter it is given
2. The Workflow Types and Activity Types it is registered with.

If a Worker Object is started and registered with both Workflow Types and Activity Types, then a Worker Object starts up to two sub-objects, a Workflow Worker Object and an Activity Worker Object.

The Workflow Worker Object listens on two Workflow Task Queues:

- Workflow Task Queue
- Sticky Workflow Task Queue

The Activity Worker object listens on one Activity Task Queue:

- Activity Task Queue

If no Workflows are registered, then the Worker will not listen to a Workflow Task Queue or a Sticky Task Queue and it will not start a Workflow Worker.

If no Activities are registered, then the Worker will not listen to an Activity Task Queue, and it will not start an Activity Worker.
