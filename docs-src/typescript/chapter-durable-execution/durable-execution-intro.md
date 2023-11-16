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

When it comes to the Temporal Platform's ability to durably execute code, the SDK's ability to [Replay](/dev-guide/why-use-a-temporal-sdk#replays) a Workflow Execution is a major aspect of that.
This chapter introduces the development patterns which enable that.

:::competency Develop for a Durable Execution

This chapter of the Temporal TypeScript SDK developer's guide introduces best practices to developing deterministic Workflows that can be Replayed, enabling a [Durable Execution](/concepts/what-is-durable-execution).

By the end of this section you will know basic best practices for Workflow Definition development.

Learning objectives:

- Identify SDK API calls that map to Events
- Recognize non-deterministic Workflow code
- Explain how Workflow code execution progresses

The information in this chapter is also available in the [Temporal 102 course](https://learn.temporal.io/courses/temporal_102/).

:::

<!--
This chapter builds on the [Construct a new Temporal Application project](/typescript/chapter-project-setup/project-setup-introduction) chapter and relies on the Background Check use case and sample applications as a means to contextualize the information.
-->

This chapter walks through the following sequence:

- Retrieve a Workflow Execution's Event History
- Add a Replay test to your application
- Intrinsic non-deterministic logic
- Non-deterministic code changes
