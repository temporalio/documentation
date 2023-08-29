---
id: introduction-to-typescript-sdk
title: Introduction to the Temporal TypeScript SDK
description: The Temporal TypeScript SDK provides the benefits of both the Temporal programming model and the ease of writing in JavaScript or TypeScript.
sidebar_label: TypeScript SDK
tags:
  - guide-context
---

Welcome to the Temporal TypeScript SDK developer's guide!

After almost two years of development, the Temporal TypeScript SDK was first released in June 2022.
Ever since, the SDK has been enabling JavaScript and TypeScript developers to build Temporal Applications.

This SDK and its contributors have crafted a developer experience that provides the benefits of both the Temporal programming model and the ease of writing in JavaScript or TypeScript.

## What TypeScript programming skills and experiences are useful when using the TypeScript SDK?

You can start working with the SDK with only JavaScript knowledge.
Temporal abstracts a lot of the complexity of distributed systems, but to unlock its full potential, having a broad base of knowledge will help you design more efficient and resilient systems.

- Core JavaScript or TypeScript knowledge
  - Required: Understanding of modern ECMAScript features (such as promises and async/await).
  - Useful: Proficiency in TypeScript, including understanding type annotations, interfaces, and generics.
  - Useful: Familiarity with Node.js because the SDK uses the Node.js runtime. 
- Tools
  - Required: Package managers, such as npm, pnpm, or yarn.
  - Useful: Source control systems (such as Git) and source control platforms (such as GitHub, GitLab, or Bitbucket).
- Testing and production
  - Useful: Unit testing, integration testing, debugging, and performance profiling tools.
  - Useful: CI/CD practices and tools.
- Distributed systems
  - Useful: Event-driven architecture, eventual consistency, partitioning, and replication.
  - Useful: Stateful versus stateless processes.

## Where is the Temporal TypeScript SDK API reference?

For the complete API reference, see [typescript.temporal.io](https://typescript.temporal.io/).

## Where can I find code samples?

Code samples are integrated into this developer’s guide.
You can find those code samples in the [temporalio/documentation-samples-typescript](https://github.com/temporalio/documentation-samples-typescript) repository on GitHub.

Additional TypeScript code samples are in the [temporalio/samples-typescript](https://github.com/temporalio/samples-typescript) repository.

## What are other resources for learning how to use the TypeScript SDK?

Further resources for learning how to use the SDK include the following:

- [TypeScript 101 with TypeScript](https://t.mp/ts-101): Our free introductory course.
- [Building Reliable Distributed Systems in Node.js](https://temporal.io/blog/building-reliable-distributed-systems-in-node): An introduction to Temporal and its value through a sample web app, [temporal.menu](https://temporal.menu/).
- The [TypeScript SDK](https://www.youtube.com/playlist?list=PLl9kRkvFJrlTavecydpk9r6cF7qBmQJvb) YouTube playlist.
- Tutorials
  - [Build a subscription workflow with Temporal and TypeScript](https://learn.temporal.io/tutorials/typescript/subscriptions/)
  - [Choose Your Own Adventure Bot walkthrough in TypeScript](https://learn.temporal.io/tutorials/typescript/chatbot/)
- Blog posts
  - [How Durable Execution Works](https://temporal.io/blog/building-reliable-distributed-systems-in-node-js-part-2)
  - [Temporal for VS Code](https://temporal.io/blog/temporal-for-vs-code)
  - [Using Temporal as a Node.js Task Queue](https://temporal.io/blog/using-temporal-as-a-node-task-queue)
  - [Caching API Requests with Long-Lived Workflows](https://temporal.io/blog/caching-api-requests-with-long-lived-workflows)
  - [REST APIs for every Temporal Workflow in one line of code](https://temporal.io/blog/temporal-rest)
  - [1.0.0 release of the Temporal TypeScript SDK](https://temporal.io/blog/typescript-1-0-0)
  - [How we use V8 isolates to enforce Workflow determinism](https://temporal.io/blog/intro-to-isolated-vm)

## How to contribute to the Temporal TypeScript SDK

We'd love your help in improving the Temporal TypeScript SDK.
Please review our [contribution guidelines](https://github.com/temporalio/sdk-typescript/blob/main/CONTRIBUTING.md).
