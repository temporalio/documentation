---
id: what-is-a-side-effect
title: What is a Side Effect?
description: A Side Effect is a way to execute short, nondeterministic code snippets, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.
tags:
  - explanation
---

A Side Effect is a way to execute short, nondeterministic code snippets, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.

A Side Effect does not re-execute upon replay, but instead returns the recorded result.

Do not ever have a Side Effect that could fail, as this could result in the Side Effect function executing more than once.
If there is any chance that the code provided to the Side Effect could fail, use an Activity.
