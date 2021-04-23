---
id: java-side-effect
title: SideEffect
---

Workflow code must be deterministic. This is important so Temporal can replay your workflow to the point of failure
and continue its execution. Workflow code that includes arbitrary side effects (for example getting a random
number or generating a random UUID, etc), can cause unpredictable results during replay.

Being able to add some non-deterministic code inside your workflow is in some cases important, and you can do that
using `Workflow.sideEffect`.

The following sample demonstrates how to use it:

```java
// implementation of the @WorkflowMethod
public void execute() {
    int randomInt = Workflow.sideEffect( int.class, () -> {
        Random random = new SecureRandom();
        return random.nextInt();
    });
    
    String randomUUID = Workflow.sideEffect(String.class, UUID.randomUUID()::toString);
    
    if(randomInt % 2 == 0) {
        // ... 
    } else {
        // ... 
    }    
}
```

The result of `Workflow.sideEffect` is recorded into the workflow history, meaning that during
a replay it will be returned from the history without executing it's code again.

Note that you shouldn't modify the workflow state inside `Workflow.sideEffect`.
For that you should only use the `Workflow.sideEffect` return value.

Temporal Java SDK provide deterministic methods to generate a random number, or a random UUID as well:

```java
// implementation of the @WorkflowMethod
public void execute() {
    int randomInt = Workflow.newRandom().nextInt();
    
    String randomUUID = Workflow.randomUUID().toString();
    
    // ...
}
```
