---
id: side-effect
title: SideEffect
---

`workflow.SideEffect` is useful for short, nondeterministic code snippets, such as getting a random
value or generating a UUID.
It executes the provided function once and records its result into the Workflow history.
`workflow.SideEffect` does not re-execute upon replay, but instead returns the recorded result.
It can be seen as an "inline" Activity.

Something to note about `workflow.SideEffect` is that, unlike the Temporal guarantee of at-most-once execution for Activities, there is no such guarantee with `workflow.SideEffect`.
Under certain failure conditions, `workflow.SideEffect` can end up executing a function more than once.

If a `SideEffect` fails, the [Workflow Task](/docs/content/what-is-a-workflow-task) fails.
After the timeout, Temporal reschedules and then re-executes the Workflow Task, giving `SideEffect` another chance to succeed.
Do not return any data from `SideEffect` other than through its recorded return value.

The following sample demonstrates how to use `SideEffect`:

```go
encodedRandom := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
        return rand.Intn(100)
})

var random int
encodedRandom.Get(&random)
if random < 50 {
        ....
} else {
        ....
}
```
