---
id: introduction-to-typescript-sdk
title: Introduction to the Temporal TypeScript SDK developer's guide
description: The Temporal TypeScript SDK provides the benefits of both the Temporal programming model and the ease of writing in JavaScript or TypeScript.
sidebar_label: TypeScript SDK
tags:
  - guide-context
---

Welcome to the Temporal TypeScript SDK developer's guide!

After almost two years of development, the Temporal TypeScript SDK was first released on July 26, 2022.
Ever since, the SDK has been enabling JavaScript and TypeScript developers to build [Temporal Applications](/concepts/what-is-a-temporal-application).

This SDK and its contributors have crafted a developer experience that provides the benefits of both the Temporal programming model and the ease of writing in JavaScript or TypeScript.

## What programming skills and experiences are useful when using the TypeScript SDK?

You can start working with the SDK with only JavaScript knowledge.
Temporal abstracts a lot of the complexity of distributed systems, but to unlock its full potential, having a broad base of knowledge will help you design more efficient and resilient systems.

- Core JavaScript or TypeScript knowledge
  - Required
    - JavaScript syntax and structure, including variable declarations using `let`, `const`, and `var`.
    - Basic data types, such as `number`, `string`, `boolean`, `null`, and `undefined`.
    - Operators and control statements.
    - Basic input/output (I/O).
    - Familiarity with defining classes, constructors, properties, and methods.
    - Knowledge of how to use `import` and `export` for module-based development, which is crucial for organizing larger Temporal applications.
    - Familiarity with function declarations, arrow functions, and function types.
    - Understanding of modern ECMAScript features such as promises and async/await.
    - Knowledge of how to configure TypeScript projects using `tsconfig.json`, especially if you need to adjust settings specific to your Temporal project or integrate with other tools.
  - Useful
    - Proficiency in TypeScript, including understanding type annotations, interfaces, and generics.
    - Familiarity with object-oriented programming concepts like inheritance, encapsulation, and polymorphism.
    - Understanding of composite types like `Array<T>`, `Promise<T>`, and `{ [key: string]: T}`.
    - Basic understanding of decorators.
    - Familiarity with Node.js because the SDK uses the Node.js runtime. 
- Tools
  - Required
    - Package managers, such as npm, pnpm, or yarn.
    - An integrated development environment, such as Visual Studio Code (VS Code) or WebStorm, both of which also have built-in debuggers.
  - Useful
    - Testing tools, such as Jest or Mocha and Chai.
    - Source control systems (such as Git) and source control platforms (such as GitHub, GitLab, or Bitbucket).
- Other useful knowledge
  - Testing and production
    - Unit testing, integration testing, debugging, and performance profiling tools.
    - CI/CD practices and tools.
  - Distributed systems
    - Event-driven architecture, eventual consistency, partitioning, and replication.
    - Stateful versus stateless processes.

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