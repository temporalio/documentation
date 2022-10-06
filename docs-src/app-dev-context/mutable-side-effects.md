---
id: mutable-side-effects
title: Mutable Side Effects
description: Mutable Side Effects are a method of execution to produce nondeterministic code.
sidebar_label: Mutable Side Effects
tags:
  - guide-context
---

Mutable Side Effects execute the provided function once, and then it looks up the History of the value with the given Workflow ID.

- If there is no existing value, then it records the function result as a value with the given Workflow ID on the History.
- If there is an existing value, then it compares whether the existing value from the History has changed from the new function results, by calling the equals function.
  - If the values are equal, then it returns the value without recording a new Marker Event
  - If the values aren't equal, then it records the new value with the same ID on the History.

:::note

During a Workflow Execution, every new Side Effect call results in a new Marker recorded on the Workflow History; whereas Mutable Side Effects only records a new Marker on the Workflow History if the value for the Side Effect ID changes or is set the first time.

During a Replay, Mutable Side Effects will not execute the function again. Instead, it returns the exact same value that was returned during the Workflow Execution.

:::
