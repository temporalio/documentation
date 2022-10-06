---
id: side-effects
title: Side Effects
description: Side Effects are a method of execution to produce nondeterministic code.
sidebar_label: Side Effects
tags:
  - guide-context
---

A Side Effect is a method of execution to produce nondeterministic code, such as generating a UUID or a random number.
Using a Side Effect in your Workflow Execution, you can execute the provided function once and record its result into the Workflow Execution [Event History](/workflows/#event-history).

A Side Effect does not re-execute during a Replay. Instead, it returns the recorded result from the Workflow Execution Event History.
Side Effects should not fail. An exception that is thrown from the Side Effect causes failure and retry of the current Workflow Task.

An Activity or a Local Activity may also be used instead of a Side effect, as its result is also persisted in Workflow Execution History.

:::note

You shouldn’t modify the Workflow state inside a Side Effect function, because it is not reexecuted during Replay. Side Effect function should be... free of side-effects and only return a value.

:::
