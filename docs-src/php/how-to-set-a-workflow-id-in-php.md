---
id: how-to-set-a-workflow-id-in-php
title: How to set a Workflow Id in PHP
sidebar_label: Workflow Id
---

The following code example grabs the `userID` as an input and uses it to start the Workflow. The `userID` is used as Workflow Id. You can use this to cancel your Workflow later.

```php
#[WorkflowInterface]
interface SubscriptionWorkflowInterface
{
    #[WorkflowMethod]
    public function subscribe(string $userID);
}
```

The following code example, uses the input parameter `userID` as the Workflow Id.

```php
#[WorkflowInterface]
interface SubscriptionWorkflowInterface
{
    #[WorkflowMethod]
    public function subscribe(
        string $userID
    );
}
```

You can also set the Workflow Id as a constant, for example:

```php
public const WORKFLOW_ID = Your-Workflow-Id
```
