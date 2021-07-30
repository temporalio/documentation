---
id: what-is-temporal
title: What is Temporal?
description: Temporal is a scalable and reliable runtime for Temporal Workflow Executions.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

Temporal is a scalable and reliable runtime for Temporal Workflow Executions.

**Temporal's tenth rule**

> Any sufficiently complex distributed system contains an ad-hoc, informally-specified, bug-ridden, slow implementation of half of temporal.io.

<CenteredImage
imagePath="/diagrams/temporal-intro.svg"
imageSize="50"
title="The Temporal system"
legendstring="π?Workflow Execution"
/>

A Temporal Workflow Execution (π) executes a Temporal Workflow Definition, also called a Temporal Workflow Function, your application code, exactly once and to completion—whether your code executes for seconds, minutes, hours, days, months, or years, in the presence of arbitrary load and arbitrary failures.

A Temporal Application is a set of Temporal Workflow Executions (Π). Each Temporal Workflow Execution has exclusive access to its local state, executes concurrently to all other Workflow Executions, and communicates with other Workflow Executions and the environment via message passing.

Workflow Executions are lightweight components.
A Temporal Application can consist of thousands to hundreds of thousands of Workflow Executions.
A Workflow Execution consumes few compute resources; in fact, if a Workflow Execution is suspended, such as when it is in a waiting state, the Workflow Execution consumes no compute resources at all.

The Temporal runtime consists of the Temporal Server and Worker processes.
A Temporal SDK provides users with the APIs they need to write Workflow Definitions as well as the APIs to invoke Workflow Executions and invoke Worker processes.
