---
id: how-to-continue-as-new-in-php
title: How to Continue-As-New in PHP
sidebar_label: Continue-As-New
---

Workflows that need to rerun periodically could naively be implemented as a big **while** loop with a sleep where the entire logic of the Workflow is inside the body of the **while** loop.
The problem with this approach is that the history for that Workflow will keep growing to a point where it reaches the maximum size enforced by the service.

**ContinueAsNew** is the low level construct that enables implementing such Workflows without the risk of failures down the road.
The operation atomically completes the current execution and starts a new execution of the Workflow with the same **Workflow Id**.
The new execution will not carry over any history from the old execution.

To trigger this behavior, use `Workflow::continueAsNew` or `Workflow::newContinueAsNewStub` method:

```php
#[Workflow\WorkflowMethod]
public function periodic(string $name, int $value = 0)
{
    for ($i = 0; $i < 100; $i++) {
        // do something
        $value++;
    }

    // maintain $value counter between runs
    return Workflow::newContinueAsNewStub(self::class)->periodic($name, $value);
}
```
