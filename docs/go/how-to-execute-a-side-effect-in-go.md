---
id: how-to-execute-a-side-effect-in-go
title: How to execute a Side Effect in Go
sidebar_label: Side Effect
description: Use the SideEffect API from the `go.temporal.io/sdk/workflow` package to execute a Side Effect directly in your Workflow.
tags:
  - developer-guide
  - go
---

Use the [`SideEffect`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SideEffect) API from the `go.temporal.io/sdk/workflow` package to execute a [Side Effect](/concepts/what-is-a-side-effect) directly in your Workflow.

Pass it an instance of `context.Context` and the function to execute.

The SideEffect API returns a Future, an instance of [`converter.EncodedValue`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SideEffect).

Use the `Get` method on the Future to retrieve the result of the Side Effect.

#### Correct implementation

The following example demonstrates the correct way to use `SideEffect`:

```go
encodedRandom := workflow.SideEffect(ctx, func(ctx workflow.Context) interface{} {
  return rand.Intn(100)
})

var random int
encodedRandom.Get(&random)
// ...
}
```

#### Incorrect implementation

The following example demonstrates how NOT to use `SideEffect`:

```go
// Warning: This is an incorrect example.
// This code is nondeterministic.
var random int
workflow.SideEffect(func(ctx workflow.Context) interface{} {
       random = rand.Intn(100)
       return nil
})
// random will always be 0 in replay, so this code is nondeterministic.
```

On replay the provided function is not executed, the random number will always be 0, and the Workflow Execution could take a different path, breaking determinism.
