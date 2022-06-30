---
id: versioning
title: Versioning
---

The definition code of a Temporal Workflow must be deterministic because Temporal uses event sourcing
to reconstruct the Workflow state by replaying the saved history event data on the Workflow
definition code. This means that any incompatible update to the Workflow definition code could cause
a non-deterministic issue if not handled correctly.

## Workflow::getVersion()

Consider the following Workflow definition:

```php
public function myWorkflow(string $data)
{
    $myActivity = Workflow::newActivityStub(
        MyActivityInterface::class,
        ActivityOptions::new()
            ->withScheduleToStartTimeout(60)
    );

    $result1 = yield $myActivity->activityA($data);
    $result2 = yield $myActivity->activityB($result1);

    return $result2;
}
```

Now let's say we have replaced `ActivityA` with `ActivityC`, and deployed the updated code. If there
is an existing Workflow execution that was started by the original version of the Workflow code, where
`ActivityA` had already completed and the result was recorded to history, the new version of the Workflow
code will pick up that Workflow execution and try to resume from there. However, the Workflow **will fail**
because the new code expects a result for `ActivityC` from the history data, but instead it gets the
result for `ActivityA`. This causes the Workflow to fail on the non-deterministic error.

Thus we use `Workflow::getVersion()`.

```php
$myActivity = Workflow::newActivityStub(
    MyActivityInterface::class,
    ActivityOptions::new()
        ->withScheduleToStartTimeout(60)
);

$v = yield Workflow::getVersion('Step1', Workflow::DEFAULT_VERSION, 1);

if ($v === Workflow::DEFAULT_VERSION) {
    $result1 = yield $myActivity->activityA($data);
} else {
    $result1 = yield $myActivity->activityC($data);
}

$result2 = yield $myActivity->activityB($result1);

return $result2;
```

When `Workflow::getVersion()` is run for the new Workflow execution, it records a marker in the Workflow
history so that all future calls to `GetVersion` for this change Id--`Step 1` in the example--on this
Workflow execution will always return the given version number, which is `1` in the example.

If you make an additional change, such as replacing ActivityC with ActivityD, you need to
add some additional code:

```php
$v = yield Workflow::getVersion('Step1', Workflow::DEFAULT_VERSION, 2);

if ($v === Workflow::DEFAULT_VERSION) {
    $result1 = yield $myActivity->activityA($data);
} elseif ($v === 1) {
    $result1 = yield $myActivity->activityC($data);
} else {
    $result1 = yield $myActivity->activityD($data);
}
```

Note that we have changed `maxSupported` from 1 to 2. A Workflow that had already passed this
`GetVersion()` call before it was introduced will return `DEFAULT_VERSION`. A Workflow that was run
with `maxSupported` set to 1, will return 1. New Workflows will return 2.

After you are sure that all of the Workflow executions prior to version 1 have completed, you can
remove the code for that version. It should now look like the following:

```php
$v = yield Workflow::getVersion('Step1', 1, 2);

if ($v === 1) {
    $result1 = yield $myActivity->activityC($data);
} else {
    $result1 = yield $myActivity->activityD($data);
}
```

You'll note that `minSupported` has changed from `DEFAULT_VERSION` to `1`. If an older version of the
Workflow execution history is replayed on this code, it will fail because the minimum expected version
is 1. After you are sure that all of the Workflow executions for version 1 have completed, then you
can remove 1 so that your code would look like the following:

```php
yield Workflow::getVersion('Step1', 2, 2);

$result1 = yield $myActivity->activityD($data);
```

Note that we have preserved the call to `GetVersion()`. There are two reasons to preserve this call:

1. This ensures that if there is a Workflow execution still running for an older version, it will
   fail here and not proceed.
2. If you need to make additional changes for `Step1`, such as changing ActivityD to ActivityE, you
   only need to update `maxVersion` from 2 to 3 and branch from there.

You only need to preserve the first call to `GetVersion()` for each `changeID`. All subsequent calls to
`GetVersion()` with the same change Id are safe to remove. If necessary, you can remove the first
`GetVersion()` call, but you need to ensure the following:

- All executions with an older version are completed.
- You can no longer use `Step1` for the changeId. If you need to make changes to that same part in
  the future, such as change from ActivityD to ActivityE, you would need to use a different changeId
  like `Step1-fix2`, and start minVersion from DefaultVersion again. The code would look like the
  following:

```php
$v = yield Workflow::getVersion('Step1-fix2', Workflow::DEFAULT_VERSION, 1);

if ($v === Workflow::DEFAULT_VERSION) {
    $result1 = yield $myActivity->activityD($data);
} else {
    $result1 = yield $myActivity->activityE($data);
}
```

Upgrading a Workflow is straightforward if you don't need to preserve your currently running
Workflow executions. You can simply terminate all of the currently running Workflow executions and
suspend new ones from being created while you deploy the new version of your Workflow code, which does
not use `GetVersion()`, and then resume Workflow creation. However, that is often not the case, and
you need to take care of the currently running Workflow executions, so using `GetVersion()` to update
your code is the method to use.

However, if you want your currently running Workflows to proceed based on the current Workflow logic,
but you want to ensure new Workflows are running on new logic, you can define your Workflow as a
new `WorkflowType`, and change your start path (calls to `StartWorkflow()`) to start the new Workflow
type.

## Sanity checking

The Temporal client SDK performs a sanity check to help prevent obvious incompatible changes.
The sanity check verifies whether a Command made in replay matches the event recorded in history,
in the same order. The Command is generated by calling any of the following methods:

- Workflow::executeActivity()
- Workflow::executeChildWorkflow()
- Workflow::timer()
- Workflow::sideEffect()
- Workflow::newActivityStub() execute
- Workflow::newChildWorkflowStub() start and signal
- Workflow::newExternalWorkflowStub() start and signal

Adding, removing, or reordering any of the above methods triggers the sanity check and results in
a non-deterministic error.

The sanity check does not perform a thorough check. For example, it does not check on the Activity's
input arguments or the timer duration. If the check is enforced on every property, then it becomes
too restricted and harder to maintain the Workflow code. For example, if you move your Activity code
from one package to another package, that changes the `ActivityType`, which technically becomes a different
Activity. But, we don't want to fail on that change, so we only check the function name part of the
`ActivityType`.
