---
id: workflow-patching-introduction
title: Introduction to Workflow Updates
sidebar_label: Introduction
description: Discusses the importance of patching workflow code in Temporal, focusing on maintaining determinism in long-running workflows.
tags:
  - guide-temporal
  - workflow-updates
---

Making updates to running Workflow happens, and patching Workflow code is a technique you can use that allows for continuous development and fixes while upholding the crucial principle of determinism, ensuring that Workflows remain predictable and reliable throughout their lifecycle.

When updating Workflow code in Temporal, a key challenge is to maintain determinism.
Determinism in Workflow systems ensures that a workflow, when replayed with the same inputs, will always produce the same outputs.
This is crucial for the reliability and predictability of Workflows, especially when they're long-running and subject to updates.
