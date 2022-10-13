---
id: side-effects
title: Side Effects
description: A Side Effect is used to produce nondeterministic code, such as generating a UUID or a random number.
sidebar_label: Side Effects
tags:
  - guide-context
---

Side Effects are used to execute nondeterministic code, such as generating a UUID or a random number, without compromising deterministic in the Workflow. This is done by storing the nondeterministic results of the Side Effect into the Workflow [Event History](/workflows/#event-history).

A Side Effect does not re-execute during a Replay. Instead, it returns the recorded result from the Workflow Execution Event History.

Side Effects should not fail. An exception that is thrown from the Side Effect causes failure and retry of the current Workflow Task.

An Activity or a Local Activity may also be used instead of a Side effect, as its result is also persisted in Workflow Execution History.

:::note

You shouldn’t modify the Workflow state inside a Side Effect function, because it is not reexecuted during Replay. Side Effect function should be used to return a value.

:::
