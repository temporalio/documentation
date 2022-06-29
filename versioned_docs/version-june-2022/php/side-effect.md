---
id: side-effect
title: SideEffect
---

`Workflow::sideEffect` is useful for short, nondeterministic code snippets, such as getting a random
value or generating a UUID. It executes the provided function once and records its result into the
Workflow history. `Workflow::sideEffect` does not re-execute upon replay, but instead returns the
recorded result. It can be seen as an "inline" Activity.

Something to note about `Workflow::sideEffect`
is that, unlike the Temporal guarantee of at-most-once execution for Activities, there is no such
guarantee with `Workflow::sideEffect` . Under certain failure conditions, `Workflow::sideEffect` can
end up executing a function more than once.

The only way to fail `sideEffect` is to throw an exception, which causes a workflow task failure. After the
timeout, Temporal reschedules and then re-executes the workflow task, giving `SideEffect` another chance
to succeed. Do not return any data from `sideEffect` other than through its recorded return value.

The following sample demonstrates how to use `SideEffect`:

```php
use Temporal\Workflow;

#[Workflow\WorkflowInterface]
class MyWorkflow
{
    #[Workflow\WorkflowMethod]
    public function run()
    {
        $random = yield Workflow::sideEffect(fn()=> return random_int(0, 100));
        if ($random < 100) {
            // ...
        } else {
            // ...
        }
    }
}
```
