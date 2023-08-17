---
id: how-to-use-side-effects-in-php
title: How to use Side Effects in PHP
sidebar_label: Side Effects
description: Side Effects are used to execute non-deterministic code, such as generating a UUID or a random number, without compromising determinism in the Workflow.
tags:
    - side effect
    - workflow
---

Side Effects are used to execute non-deterministic code, such as generating a UUID or a random number, without compromising determinism in the Workflow. This is done by storing the results of the Side Effect into the Workflow [Event History](/workflows/#event-history).

A Side Effect doesn't re-execute during a Replay. Instead, it returns the recorded result from the Workflow Execution Event History.

Side Effects shouldn't fail. An exception that is thrown from the Side Effect causes failure and retry of the current Workflow Task.

An Activity or a Local Activity can also be used instead of a Side Effect, as its results are also persisted in Workflow Execution History.

:::note

You shouldn’t modify the Workflow state inside a Side Effect, because they're not re-executed during Replay. Side Effect functions should only return a value, and that value can be used in Workflow code to alter state.

:::

To use a Side Effect in PHP, use the `Workflow::sideEffect()` function in your Workflow Definition to run non-deterministic code and return a value.

```php
#[Workflow\WorkflowMethod]
public function run()
{
    $random = yield Workflow::sideEffect(fn()=> return random_int(0, 100));
    if ($random < 50) {
        // ...
    } else {
        // ...
    }
}
```
