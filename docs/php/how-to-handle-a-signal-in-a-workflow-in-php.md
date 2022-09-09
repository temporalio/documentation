---
id: how-to-handle-a-signal-in-a-workflow-in-php
title: How to handle Signals in an Workflow in PHP
sidebar_label: Handle Signals
description: Use the `#[SignalMethod]` annotation to handle Signals within the Workflow interface.
tags:
  - php
  - developer-guide
---

Use the `#[SignalMethod]` annotation to handle Signals in the Workflow interface:

```php
use Temporal\Workflow;

#[Workflow\WorkflowInterface]
class YourWorkflow
{
    private bool $value;

    #[Workflow\WorkflowMethod]
    public function run()
    {
        yield Workflow::await(fn()=> $this->value);
        return 'OK';
    }

    #[Workflow\SignalMethod]
    public function setValue(bool $value)
    {
        $this->value = $value;
    }
}
```

In the example above the workflow updates the protected value. Main workflow coroutine waits for such value to change using
`Workflow::await()` function.
