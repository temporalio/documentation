---
id: how-to-use-a-side-effect-in-go
title: How to use a Side Effect in Go
sidebar_label: Side Effect
description: A Side Effect is a method of execution to produce nondeterministic code.
tags:
  - go
  - developer-guide
---

To use a Side Effect in Go, set the [`SideEffect()`](https://pkg.go.dev/go.temporal.io/sdk/workflow#SideEffect) function in your Workflow Execution and return the nondeterministic code.

```go
encodedRandom := SideEffect(func(ctx workflow.Context) interface{} {
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

The only way to fail Side Effect is to panic, which causes Workflow Task failure. The Workflow Task after Timeout is rescheduled and re-executed giving Side Effect another chance to succeed. Be careful to not return any data from the Side Effect function any other way than through its recorded return value.

Do not use `SideEffect()` to modify closures. Always retrieve result from Side Effect's encoded return value.

```go
// Will not run.
// Do not use.
var random int
workflow.SideEffect(func(ctx workflow.Context) interface{} {
       random = rand.Intn(100)
       return nil
})
// random will always be 0 in replay, thus this code is non-deterministic
if random < 50 {
       ....
} else {
       ....
}
```
