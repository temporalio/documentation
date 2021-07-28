---
id: what-is-a-worker
title: What is a Worker?
description: A Worker Process is responsible for listening on a Task Queue, dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Server with the results.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'
import CenteredImage from "../components/CenteredImage.js"
import LanguageLinkTabs from '../components/LanguageLinkTabs.js'

> In day-to-day conversations, the term Worker is used to denote a Worker Process.

A Worker Process is responsible for listening on a [Task Queue](#), dequeueing a [Task](#), executing your code in response to a Task, and responding to the [Temporal Server](#) with the results.
More formally, a Worker Process is a process that implements the [Task Queue Protocol](#) and the [Task Execution Protocol](#).

Temporal application developers are responsible for developing and operating Worker Processes.
An application can have as many Worker Processes as needed to meet scalability and reliability requirements.

<CenteredImage
imagePath="/diagrams/worker-entity-relationship.svg"
imageSize="75"
title="Worker Process as a component"
/>

A Worker Process is a Workflow Worker Process if that process implements the [Workflow Task Queue Protocol](#) and executes the [Workflow Task Execution Protocol](#) to make progress on a [Workflow Execution](#).
A Workflow Worker Process can listen on an arbitrary number of Workflow Task Queues and can execute an arbitrary number of Workflow Tasks.

A Worker Process is an Activity Worker Process if that process implements the [Activity Task Queue Protocol](#) and executes the [Activity Task Processing Protocol](#) to make progress on an [Activity Execution](#).
An Activity Worker Process can listen on an arbitrary number of Activity Task Queues and can execute an arbitrary number of Activity Tasks.

A Worker Process can be both a Workflow Worker Process and an Activity Worker Process.

<CenteredImage
imagePath="/diagrams/worker-process-and-task-queues.svg"
imageSize="75"
title="Worker Process as a meta model"
/>

<RelatedReadList
readliststring="
What is a Task?#?e|
What is a Task Queue?#?e|
How to operate Worker Processes?#?og|
How to develop a Worker Process in Go?/docs/content/how-to-develop-a-worker-process-in-go?dg|
How to develop a Worker Process in Java?/docs/content/how-to-develop-a-worker-process-in-java?dg|
How to develop a Worker Process in Node.js?/docs/content/how-to-develop-a-worker-process-in-node?dg|
How to develop a Worker Process in PHP?/docs/content/how-to-develop-a-worker-process-in-php?dg"
/>
