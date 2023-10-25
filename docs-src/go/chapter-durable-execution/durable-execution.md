---
id: durable-execution-intro
title: Introduction to developing for Durable Execution
description: The Durable Execution section of the Temporal Developer's guide covers advanced beginner concepts for working with Temporal, including testing your code, reviewing workflow event history, adding timers, and understanding determinism. Developing for durable execution is a core aspect of Temporal.
sidebar_label: Durable Execution
tags:
  - go sdk
  - developer-guide-doc-type
  - introduction-doc-type
---

When it comes to the Temporal Platform's ability to provide a Durable Execution, the SDK's ability to Replay a Workflow Execution is a major aspect of that.

:::competency Develop for a Durable Execution

This chapter of the Temporal Go SDK developer's guide introduces best practices to developing deterministic Workflows that can be Replayed, enabling a Durable Execution.

By the end of this section you will know the basic best practices for Workflow Definition development.

:::

This chapter relies on the Background Check use case and sample applications as a means to contextualize the information.
The section builds on the [Construct a new Temporal Application project]

The Durable Execution section of the Temporal Developer's guide covers advanced beginner concepts for working with Temporal, including testing your code, reviewing workflow event history, adding timers, and understanding determinism. Developing for durable execution is a core aspect of Temporal, and builds on the concepts introduced in our [Foundations](https://docs.temporal.io/dev-guide/go/foundations) guide.

For more information about Durable Execution, refer to our [blog about Building Reliable Distributed Systems in Node.js](https://temporal.io/blog/building-reliable-distributed-systems-in-node) and our [Temporal 102 course](https://learn.temporal.io/courses/temporal_102/).

In this section you can find the following:

<!-- - [How to retrieve Workflow Event History](/go/chapter-durable-execution/retrieve-event-history) -->

- [How to replay a Workflow Execution in Go](/go/chapter-durable-execution/how-to-replay-a-workflow-execution-in-go)
- [How to test Workflow Event History in Go](/go/generated/how-to-test-workflow-event-history-in-go)
- [Understand durability through Replays](/go/chapter-durable-execution/durability-through-replays)
- [Workflow Determinism](/go/chapter-durable-execution/workflow-determinism)
