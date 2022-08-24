---
id: side-effects
title: Side Effects
description: Side Effects are a method of execution to produce nondeterministic code.
sidebar_label: Side Effects
tags:
  - guide-context
---

A Side Effect is a method of execution to produce nondeterministic code; such as, generating a UUID or a random number.
By implementing Side Effect into your Workflow Execution, you can execute the provided function once and records its result into the Workflow Execution [Event History](../concepts/what-is-an-event-history).

A Side Effect does not re-execute during a Replay. Instead, it returns the recorded result from the Workflow Execution Event History.
Side Effects should not fail, because failure results in the Side Effect function executing more than once. If there’s a chance of failure, use an Activity.

:::note

You shouldn’t modify the Workflow state inside a Side Effect. Instead, use the return value.

:::
