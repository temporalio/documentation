---
slug: how-to-productionize-workflows
title: An opinionated guide to productionizing Workflows
tags:
  - production-readiness
  - how-to
date: 2023-03-31T00:00:00Z
---

You've learned about [Temporal](/temporal), checked out our samples, written a few [Workflows](/workflows), and now you're ready to productionize.
In this article, we outline some techniques you can employ to ensure that your Workflows are ready for the future.

<!-- truncate -->

## Future-proofing your Payloads

One of the easiest things you can do to future-proof your Workflows is to ensure that the inputs and outputs of your Workflows and [Activities](/activities) are ready for changes.
The first step is to use one object, struct, or similar for each input and output.

For example, rather than defining your Workflow like this—

```typescript
export async function myWorkflow(foo: string): Promise<string>;
```

—define it like this:

```typescript
type MyWorkflowInput = { foo: string };
type MyWorkflowOuptut = { result: string };
export async function myWorkflow(
  foo: MyWorkflowInput,
): Promise<MyWorkflowOutput>;
```

By using this technique, you can add fields in a way that will be compatible with existing [Event Histories](/workflows#event-history) (assuming you use a [Payload Converter](/dataconversion#payload-converter) that can deserialize older [Payloads](/dataconversion#payload), such as JSON).
We recommend doing this for all your Workflows and Activities in production.

You can go even farther by defining your inputs and outputs using [Protocol Buffers (protobuf)](https://protobuf.dev/) or another interface definition language (IDL).
We support protobuf with built-in converters.

## Dealing with very long-lived or very event-heavy Workflows

If you know that your Workflow will live for a very long time or generates a large volume of [Events](/workflows#event), you need to deal with the Event [limits](/workflows#limits) and [Continue-As-New](/workflows#continue-as-new) at some point.

One technique to prepare for this eventuality (and at the same time make your life easier when you need to make changes to the [Workflow Definition](/workflows#workflow-definition)) is to structure your Workflow as an "entity Workflow."

### Make all non-transient state serializable

You already defined your Workflow input as an object or struct like we mentioned in the previous section, right?
If you didn't, do that.

The struct should be capable of representing all state that your Workflow cares about.
Because it is also your Workflow input, it must be serializable.

In practice, this often ends up looking like a state machine.

### Continue-As-New on demand

Set up a mechanism to force your Workflow to Continue-As-New on demand.
The easiest way to do this is to define a Signal handler that continues the Workflow when received.
Be sure that all previously received Signals have been processed and that all running [Child Workflows](/workflows#child-workflow) have been waited on or otherwise dealt with.

The newly started Workflow then unpacks the state in the input and can "resume" the Workflow according to your business logic.

A huge benefit of this approach is that you avoid making patches to running Workflows.
Instead, tell them all to continue onto a new [Task Queue](/workers#task-queue) with [Workers](/workers) that have the updated Workflow code.

## When and how to make changes to your Workflow code

When you have an understanding of the importance of writing deterministic Workflow code, you might find yourself grappling with the best way to make changes to that code.

Three approaches are available to you at this time: Task Queue–based versioning, Workflow Name–based versioning, and the Patch and GetVersion APIs.
Each approach has merits and demerits.
(We're also [working toward](https://github.com/temporalio/proposals/blob/master/versioning/worker-versions.md) making Task Queue–based versioning a first-class concept built into Temporal, but that's not quite ready.)

The fundamental recommendation here is to use [Task Queue–based versioning](#task-queuebased-versioning) whenever you can, and use the [Patch and GetVersion APIs](#patch-and-getversion-apis) if your Workflows live long enough that you cannot afford to wait for them to complete before changing their behavior.

### Task Queue–based versioning

In this approach, after you make changes to your Workflow code, deploy your Workers pointed at a new Task Queue instead of the existing one.
For example, if you were targeting the Task Queue `tq-v1`, you'd now target `tq-v2` or similar.
You must also update whatever sources are starting new Workflows to point at the new Task Queue name.
Leave your old Workers running, possibly reducing the number of instances, until no more open Workflows are on `tq-v1`.
Then you can decommission all of them.

**Advantages**

- Conceptually simple.
- Robust.
  Changes are isolated from each other in a way that makes mistakes unlikely.

**Disadvantages**

- Operationally complex (need to keep old Workers alive and change the Task Queue that clients point to).
  This approach can result in multiple sets of old Workers, especially with long-running Workflows.
- Can't be used to fix a bug in currently running or open Workflows.

### Patch and GetVersion APIs

By using functions available in our SDKs, you can branch in your Workflow code based on whether the Workflow is running with newer or older code.
The APIs take slightly different forms depending on the language you're using.
For details, see the language-specific links in [Workflow Versioning](/workflows#workflow-versioning).

**Advantages**

- Don't need to change where Workflow starters are pointing.
- Lets you change the yet-to-be-executed behavior of currently open Workflows while remaining compatible with existing Event Histories.
  The behavior of new Workflows always takes the "new" path.

**Disadvantages**

- Conceptually complex.
- Cognitive burden of needing to understand how both the "old" and "new" code paths work.
- If used indefinitely on the same Workflow Definition, can lead to a mess of branching.
