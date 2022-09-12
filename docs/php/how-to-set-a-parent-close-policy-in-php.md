---
id: how-to-set-a-parent-close-policy-in-php
title: How to set a Parent Close Policy in PHP
sidebar_label: Parent Close Policy
description: Create an instance of `ChildWorkflowOptions` and use `withParentClosePolicy()` method to apply the options to a new child workflow object.
tags:
  - php
  - developer-guide
  - how-to
---

In PHP, a [Parent Close Policy](/concepts/what-is-a-parent-close-policy) is set via the `ChildWorkflowOptions` object and `withParentClosePolicy()` method.
The possible values can be obtained from the [`ParentClosePolicy`](https://github.com/temporalio/sdk-php/blob/master/src/Workflow/ParentClosePolicy.php) class.

- `POLICY_TERMINATE`
- `POLICY_ABANDON`
- `POLICY_REQUEST_CANCEL`

Then `ChildWorkflowOptions` object is used to create a new child workflow object:

```php
$child = Workflow::newUntypedChildWorkflowStub(
    'child-workflow',
    ChildWorkflowOptions::new()
        ->withParentClosePolicy(ParentClosePolicy::POLICY_ABANDON)
);

yield $child->start();
```

In the snippet above we:

1. Create a new untyped child workflow stub with `Workflow::newUntypedChildWorkflowStub`.
2. Provide `ChildWorkflowOptions` object with Parent Close Policy set to `ParentClosePolicy::POLICY_ABANDON`.
3. Start Child Workflow Execution asynchronously using `yield` and method `start()`.

We need `yield` here to ensure that a Child Workflow Execution starts before the parent closes.
