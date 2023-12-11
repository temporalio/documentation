---
id: how-to-handle-workflow-logic-requirements-in-typescript
title: How to handle Workflow logic requirements in TypeScript
sidebar_label: Workflow logic requirements
description: Workflow logic needs to be deterministic. The TypeScript SDK helps provide this by using a sandbox to run Workflows.
tags:
  - developer-guide
  - sdk
  - typescript
---

Workflow logic is constrained by [deterministic execution requirements](/concepts/what-is-a-workflow-definition#deterministic-constraints).
Therefore, each language is limited to the use of certain idiomatic techniques.
However, each Temporal SDK provides a set of APIs that can be used inside your Workflow to interact with external (to the Workflow) application code.

In the Temporal TypeScript SDK, Workflows run in a deterministic sandboxed environment.
The code is bundled on Worker creation using Webpack, and can import any package as long as it does not reference Node.js or DOM APIs.

:::note

If you **must** use a library that references a Node.js or DOM API and you are certain that those APIs are not used at runtime, add that module to the [ignoreModules](https://typescript.temporal.io/api/interfaces/worker.BundleOptions#ignoremodules) list.

:::

In the TypeScript SDK, you can safely use non-deterministic methods and rely on the sandbox to replace non-deterministic code with deterministic versions. However side effects and access to external state must be done through Activities because Activity outputs are recorded in the Event History and can read deterministically by the Workflow.

This limitation also means that Workflow code cannot directly import the [Activity Definition](/concepts/what-is-an-activity-definition).
[Activity Types](/concepts/what-is-an-activity-definition#activity-type) can be imported, so they can be invoked in a type-safe manner.

To make the Workflow runtime deterministic, functions like `Math.random()`, `Date`, and `setTimeout()` are replaced by deterministic versions.
