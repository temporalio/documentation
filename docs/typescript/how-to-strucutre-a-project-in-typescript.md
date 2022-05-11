---
id: how-to-strucutre-a-project-in-typescript
title: How to structure a project in Typescript
sidebar_label: Structure a project
description: Structure a project
tags:
  - developer-guide
  - sdk
  - typescript
---

A typical Temporal project written in TypeScript consists of the following components:

- Workflows
- Activities
- Worker that executes Workflows and Activities
- A script to execute a Workflow (using a Temporal Client)

Activities cannot be in the same file as Workflows and must be separately registered.
Activities may be retried repeatedly, so you may need to use [idempotency keys](https://stripe.com/blog/idempotency) for critical side effects.
