---
id: what-is-a-local-activity
title: What is a Local Activity?
description: todo
---

An [Activity](#activity) that is invoked directly in the same process by Workflow code.

- Although a Local Activity consumes less resources than a normal [Activity](#activity), it is subject to shorter durations and a lack of rate limiting.

Some Activities are very short lived and do not need the queuing semantic, flow control, rate limiting and routing capabilities. For this case, Temporal supports a _local Activity_ feature. Local Activities are executed in the same worker process as the Workflow that invoked them. Consider using local Activities for functions that are:

- no longer than a few seconds
- do not require global rate limiting
- do not require routing to specific workers or pools of workers
- can be implemented in the same binary as the Workflow that invokes them

The main benefit of local Activities is that they are much more efficient in utilizing Temporal service resources and have much lower latency overhead compared to the usual Activity invocation.
