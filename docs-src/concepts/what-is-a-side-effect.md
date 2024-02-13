---
id: what-is-a-side-effect
title: What is a Side Effect?
sidebar_label: Side Effect
description: A Side Effect is a way to execute a short, non-deterministic code snippet, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.
tags:
  - term
  - explanation
---

:::note

Side Effects are included in the Go, Java, and PHP SDKs.
They are not included in other SDKs, as [Local Activities](/concepts/what-is-a-local-activity) fit the same use case and are slighly less resource intensive.

:::

A Side Effect is a way to execute a short, non-deterministic code snippet, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.

A Side Effect does not re-execute upon replay, but instead returns the recorded result.

Do not ever have a Side Effect that could fail, because failure could result in the Side Effect function executing more than once.
If there is any chance that the code provided to the Side Effect could fail, use an Activity.
