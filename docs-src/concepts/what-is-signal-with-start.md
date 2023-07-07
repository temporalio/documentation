---
id: what-is-signal-with-start
title: What is Signal-With-Start?
sidebar_label: Signal-With-Start
description: Signal-With-Start starts and Signals a Workflow Execution, or just Signals it if it already exists.
tags:
  - term
  - explanation
---

Signal-With-Start is a Client method that takes the following arguments:

- A Workflow Id
- Workflow input
- A [Signal](/concepts/what-is-a-signal) name
- Signal input

If there is a running Workflow Execution with the given Workflow Id, it will be Signaled.
Otherwise, a new Workflow Execution will be started and immediately Signaled.

How to Signal-With-Start in:

- [Go](/dev-guide/go/features#signal-with-start)
- [Java](/dev-guide/java/features#signal-with-start)
- [PHP](/dev-guide/php/features#signal-with-start)
- [Python](/dev-guide/python/features#signal-with-start)
- [TypeScript](/dev-guide/typescript/features#signal-with-start)