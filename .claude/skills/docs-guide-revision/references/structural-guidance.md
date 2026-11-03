# Guides: Structural Guidance

Source: Temporal Notion, "Guides: Structural Guidance" (draft as of 2026-10-09). This is the authoritative guidance. SKILL.md summarizes it and resolves a few inconsistencies in its examples (Phase vs. Step naming, a duplicated paragraph, and dedented method snippets). The long code-splitting example from the original page is replaced here by `worked-example.md`, which has those issues fixed.

This page provides a template for Guide structure, and also explanations and examples of how to use the component parts.

## Metadata

Use the following template for your article's metadata:

```yaml
---
id:
title:
description:
sidebar_label:
toc_max_heading_level: 3
author:
tags:
---
```

Fill in the fields like this:

- id: A unique identifier for this article. Preferably a shortened version of the title, in kebab-case. Example: reliable-document-approvals
- title: The title that will appear at the top of the page. This can be a little longer than the id. The title should tell the user what the outcome of the guide will be, not the underlying technology or pattern. The title doesn't need to mention Temporal. Example: "Reliable document approvals with human-in-the-loop Workflows."
- description: A complete sentence describing the content of the guide. Again, focus on user outcomes, preferably starting with a verb. This text will appear on the card on the Guides page. Example: "Build durable human-in-the-loop Workflows that can recover even if the humans are delayed."
- sidebar_label: The version of the title that will appear in the left-nav sidebar, and also on the card on the Guides page. Try to keep it to three words. Example: "Reliable document approvals."
- toc_max_heading_level: set this to 3.
- author: Your name. For the moment, we hard-code this into the guides, but we plan to do more with this field in the future.
- tags: Keywords that can be used to classify the article.

## Introduction

The first section of every guide is the Introduction, which is usually one to three paragraphs long. No heading is needed; the fact that this is the first text the reader sees marks it as an introduction. The purpose of the introduction is to motivate the reader, set expectations, and summarize what the reader will do in the article. Your introduction should answer the following questions:

- What is the tutorial about? What software is involved and what does each component do (briefly)?
- What will the reader do or create in this tutorial? Are they setting up a server and then testing it? Are they building an app and deploying it? Be specific, as this provides the motivation readers need and gets them excited about the topic.
- What will the reader have accomplished when they're done? What will they be able to do that they couldn't do before?

Answering these questions in your introduction will also help you design a clear and reader-focused tutorial, as you'll align the content of your tutorial to the things you mention in the introduction. A good introduction lets the reader know what the rest of the article is about.

Keep the focus on the reader and what they will accomplish. Instead of using phrases like "we will learn how to," use phrases like "you will configure" or "you will build." This goes a long way to motivate the reader and get them excited about your topic. In addition, keep the focus on the problem the reader is solving rather than the technology.

Here's a three-paragraph structure for writing a good introduction:

- Paragraph 1: Outline the problem from the user's perspective. What's the pain point? What do they need to do that they can't?
- Paragraph 2: Outline the solution, also from the user's perspective. How does Temporal fix that problem?
- Paragraph 3: What the user will be able to do after using the Guide that they can't currently. Emphasize verbs, not nouns.

Here's an example, rewritten from an existing Guide. Paragraph 1 sets up the problem:

> Customer loyalty programs can be great for your business, but they're notoriously difficult to scale. Points have to accrue correctly across every purchase, tiers have to recalculate at the right moment, redemptions have to be consistent, and all of it has to hold up across years of customer interactions. Doing this with a shared database means locking, retry logic across services, and cron jobs that periodically recalculate who qualifies for what.

This example has three sentences: It starts with "X is good, but it has Y issue." It follows up with more specifics about the problem. It ends with an "obvious" or current solution to the problem, and why that won't work in this case.

Paragraph 2 outlines the solution. No details, but enough information so the reader can decide if the solution is right for them:

> A scalable solution is to give each customer their own dedicated, durable account — one that holds state, enforces business rules, responds to purchases and redemptions in real time, and never needs a cron job to stay current. In Temporal terms, each customer has a Workflow: a persistent, running process identified by their customer ID. It holds the account's points balance, tier status, and activity history in memory. When a purchase happens, a Signal adds the points. When a customer redeems at checkout, an Update validates and applies the redemption synchronously. When a mobile app needs to display the current balance, a Query reads the state without touching the database. Tier upgrades happen as part of normal business logic, not from a nightly job. The Workflow runs for as long as the customer relationship does — years if needed — and resets its internal history automatically to stay within platform limits.

This paragraph shows the solution. Basically, a Workflow solves the durability problem. There's quick mentions of Signals, Updates, and Queries, but that just adds color to the solution, and we could do without them if need be.

Paragraph 3 makes a promise to the reader: this is what you'll get out of this guide.

> With this guide, you'll build a loyalty system where:
>
> - **Each customer account is independent and durable:** state is held per-customer, survives infrastructure failures, and picks up exactly where it left off
> - **Tier upgrades happen in real time:** business rules run in the Workflow itself, triggered by point accruals — no scheduler, no batch job
> - **Redemptions are consistent:** synchronous Updates validate and apply changes atomically, with the response going back to the caller
> - **In-memory Balance reads:** Queries read in-memory state without generating Events or hitting a database
> - **The Workflow runs for the life of the customer:** Continue-As-New keeps history size in check so nothing needs to be migrated or restarted
> - **Failures are isolated:** a notification failing doesn't roll back a point accrual; each concern fails independently

This paragraph starts with "with this guide, you will…" You're stating the benefit to the reader, the tangible outcome they'll have at the end. The word that comes after "will" should be a strong verb: build, create, improve, fix, diagnose, troubleshoot. Avoid phrases like "you'll learn," "you'll know" or "you'll see how to." The Guide doesn't care if readers learn anything or just follow it robotically. Either way, they'll get the same result. Note that the language is imperative: "you will." Don't hedge your bets with "should" or "if." It's a straightforward proposition: follow the guide, get the result.

You don't need a bullet list of benefits. If the only benefit is "you'll have a transaction system that doesn't fail," then say that. If there are multiple benefits, great; don't hide them.

Things not to do in the intro:

- Sell Temporal. That includes mentions of how Temporal solves this problem better than our competitors, pointing out that this solution is only possible because of a cool Temporal feature, or even upselling an OSS customer on Cloud. It's a natural inclination, but unnecessary. The majority of people who'll use a guide are already customers; therefore, we don't need to sell them.
- Establish your credibility. It's common to want to tell the reader why your solution will work, or why you're qualified to give it. This is a page on Temporal's docs; that's all the credibility you need.

## Background

As a general rule, keep background to a minimum. You want as little between the reader and their solution as possible. However, Temporal solutions can be complicated, and some background information is necessary.

- Link to Design patterns whenever possible for theoretical discussion, to avoid duplicate content.
- Keep the background related to the specific solution of the Guide as much as possible.

Here's an example from the same existing guide:

> Although "Workflow" is a Temporal SDK primitive, when we talk about an "entity workflow," we're describing an architectural pattern. An entity workflow represents something that persists over time — a customer, a device, an order, a bank account. Contrast this with a "process workflow," which has a definite end. The key distinction is that an entity is a thing, whereas a process workflow does a thing. For more information about the Entity Workflow pattern, see [Entity Workflow Pattern](https://docs.temporal.io/design-patterns/entity-workflow).
>
> In the loyalty points use case, each customer has their own Entity Workflow. The Workflow holds the points balance and tier status. External services send Signals to add points after a purchase, send Updates to redeem points at checkout, and send Queries to display the current balance in a mobile app. The Workflow runs for as long as the customer account exists.

The reader needs to know what an entity workflow is to understand this pattern, but it's defined in Temporal terms. There's a link to the Design Patterns section where readers can learn more if they want. The second paragraph specifically describes how the entity workflow pattern works in this specific example.

## Target Audience

This feature will be implemented with tags. There's no need for a text description.

## Prerequisites

List the software and access levels that a reader will need to accomplish this guide. If this guide builds on another, you can link to an existing guide as a prerequisite.

- Required software and infrastructure: This will usually include a Temporal server, a Temporal SDK (specify the version number), and a code environment (specify the version of the language). You can link to the [Quickstarts](https://docs.temporal.io/quickstart) to help readers set up their local environment.
- Resource and access privileges: Specify the role or permissions a Temporal Cloud user will need, and the access level a local user will need. Unless the guide is Cloud-only, always specify both.
- Required concepts: List the Temporal concepts that a reader will need to complete the guide. Try not to go overboard here; a few primitives is enough. Include links to the appropriate [Encyclopedia](https://docs.temporal.io/encyclopedia) pages in the Docs.
- Operational considerations: Briefly mention any Temporal limits or constraints that readers should consider before undertaking this guide. Pay particular attention to any factors that would cause an increase in billing for the customer. Refer to the [pricing](https://docs.temporal.io/pricing) pages if necessary.

Here's an example of useful prerequisites. It includes everything that readers need, but doesn't go into too much detail:

> **Prerequisites**
>
> This guide requires Python, a Temporal Worker, and either a local development server or Temporal Cloud.
>
> **Required software and infrastructure**
>
> - Python 3.9 or later
> - Temporal Python SDK (`temporalio`) version 1.7.0 or later (required for `@workflow.init`, `workflow.all_handlers_finished`, and Workflow Updates)
> - A running Temporal Server, either via the [Temporal CLI](https://docs.temporal.io/cli) for local development or [Temporal Cloud](https://temporal.io/cloud) for production
> - `pip` or `uv` for Python dependency management
>
> **Resources and access privileges**
>
> - Temporal Cloud account with Namespace Admin role, or local development server access via `temporal server start-dev`
> - Write access to your Worker deployment environment
>
> **Required concepts**
>
> You should be familiar with the following before proceeding:
>
> - [Temporal Workflows](https://docs.temporal.io/workflows): The durable, stateful functions that Temporal orchestrates
> - [Temporal Activities](https://docs.temporal.io/activities): The functions that perform side effects such as API calls and database writes
> - [Temporal Workers](https://docs.temporal.io/workers): The processes that host and execute Workflow and Activity code
> - [Temporal Task Queues](https://docs.temporal.io/task-queues): The named queues that route work from the Temporal Server to Workers
>
> **Operational considerations**
>
> Before implementing this pattern, keep the following constraints in mind:
>
> **Event History limits.** Temporal enforces a hard limit of 51,200 Events and 50 MB per Workflow Execution, with warnings starting around 10,000 Events. Each Signal generates approximately 4 Events; each Activity execution approximately 11. A loyalty entity processing 100 point accruals per day (each triggering one Activity) generates roughly 1,500 Events per day — plan your Continue-As-New threshold accordingly.
>
> **Payload size limits.** Individual payloads for Workflow and Activity inputs and outputs are limited to 2 MB. If the serialized entity state approaches this limit, store large data externally and reference it by identifier.
>
> **Workflow Determinism.** Activities can include non-deterministic code, but the Workflow itself must remain deterministic. Use `workflow.now()` instead of `datetime.now()`, `workflow.random()` instead of `random`, and `workflow.uuid4()` instead of `uuid.uuid4()`. All I/O must be performed in Activities.
>
> **Signal delivery guarantees.** Temporal delivers Signals at least once. Include a deduplication key in Signal payloads and make your Signal processing logic idempotent.

## Architecture Diagrams

Fold these in with the implementation steps. See Mermaid Diagram guidance. [Content to come]

## Implementation

The implementation, or "steps," should be the meat of the Guide. The prerequisites and background are important, but most readers are going to be focused on solving their immediate problem. Which means they'll most likely skip straight to the steps. We want readers to understand what they're doing, not just follow the tutorial blindly. There are two principles that will help with that:

- Progressive disclosure: In short, tell the reader only what they need to know for the specific step they're on. Each step should accomplish one part of the overall task, and that thing should be clear to the reader. They know before they type any code, so they're not forced to trust us. And after, they understand what they just did, how that fits into the whole task, and what comes next.
- Just-in-time learning: Because readers are likely to skip the background section and jump to the steps, provide any background they absolutely need to know at the point where they need to know it, not before. Readers are more likely to understand context if they can immediately apply it to something they're actively working on.

### Breaking up code blocks

Large code blocks are kryptonite for learning. They're hard to read, hard to comprehend outside of a code environment, and they take up a bunch of visual space. Bottom line: big code blocks encourage the reader to simply copy-paste without understanding what the code actually does.

The trick to teaching through code is to build incrementally. Have the reader build the application in the same way that you would build it. Treat every line of code as a learning opportunity. Never include code that the user has to "take on faith" and assume that we're not giving them faulty or malicious code.

Practice the Code Sandwich technique to break up the blocks. If you've got well-commented code, move the comments from the code to the text itself, and then rework them to complete sentences. In our current format, we have a long code block followed by a paragraph explaining the most important parts of the block. That requires the reader to scroll back to look at the code in question. By breaking up the block, you put the most important explanation right next to the code you're talking about.

You can leave out the comments when you're explaining the code in text, but you should definitely leave them in the actual code files we give users.

For an example of how to break up code files, see `worked-example.md`.

### Transitions

Each step should be framed with a brief introductory sentence and a closing transition sentence that describes what the reader accomplished and where they are going next. Transitions guide the reader and provide important context for instructions, commands, and output. To avoid repetition, vary the language used for these sentences so that it does not reiterate the step titles.

Here's an example of a transition that carries readers across a step heading:

> The Worker connects to the Temporal Server and begins polling. It will continue running until you stop the process. With the Worker waiting, you're set from the Temporal side, and you're ready for the Entity Workflow to take action.
>
> **Step 5: Write client code to interact with the entity**
>
> The client code starts Entity Workflows, sends Signals, executes Updates, and runs Queries. In production this typically lives in an API server or background service.

Note that the end of Step 4 tells the reader what they've accomplished, and what the next task is. The heading summarizes what's happening in Step 5, and the first paragraph of Step 5 provides more detail about exactly how that task will be accomplished.

Framing each step in this way helps readers learn and motivates them to keep going.

## Outcomes

Conclusions, whether you call them "Summary" or "Outcomes" or something else, tend to be difficult to write. The instinct is to follow the old adage "tell them what you'll tell them, tell them, then tell them what you've told them." The problem is, following that advice leads to saying the same thing three times.

Instead, look back at the Introduction. As defined here, the last paragraph of the introduction starts with "in this Guide you will…" That sentence makes a promise. The Conclusion reminds the reader of that promise, and indicates that it was fulfilled. You can then spend a sentence or two explaining the techniques you used in fulfilling that promise, because that would have been too technical for the Introduction. Finally, to add value to the Guide as a resource, suggest how this pattern can be applied to other, similar use cases. That way, the Guide isn't a one-and-done.

Here's an example from a published Guide, which is good as it is:

> You've built a loyalty account system where each customer is an independent, self-managing process. Points accrue consistently, tier upgrades happen in real time, redemptions can't be double-spent, and the account keeps running through deployments, restarts, and schema changes. The approach isn't specific to loyalty programs — any domain object with a long lifecycle and ongoing interactions can be modeled the same way: user profiles, IoT devices, subscription accounts, open orders. The loyalty implementation here gives you the full blueprint.

## Related Resources

Be consistent: if one Guide has them, they all should. And if we're going to use them, there should be several links. The Loyalty Program Guide has a good example. There are links to the appropriate section of the Design Patterns, to the concepts used in the Guide, and to the language-specific sections used.
