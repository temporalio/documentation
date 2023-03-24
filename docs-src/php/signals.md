---
id: signals
title: Signals in PHP
sidebar_label: Signals
tags:
  - php
---

:::info Try the Developer's guide

The majority of this information has moved into the [Developer's guide](/application-development/?lang=php).

However, if you can't find what you are looking for there, we recommend checking this doc set as well.

:::

import {RelatedReadContainer, RelatedReadItem} from '../components/RelatedReadList.js'

<!-- prettier-ignore -->

import * as WhatIsASignal from '../concepts/what-is-a-signal.md'

<RelatedReadContainer>
  <RelatedReadItem page={WhatIsASignal} />
</RelatedReadContainer>

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

In the preceding example, the Workflow updates the protected value.
The Main Workflow coroutine waits for the value to change by using the `Workflow::await` function.

To send a Signal to a Workflow, use `WorkflowClient->newWorkflowStub` or `WorkflowClient->newUntypedWorkflowStub`:

```php
$workflow = $workflowClient->newWorkflowStub(YourWorkflow::class);

$run = $workflowClient->start($workflow);

// do something

$workflow->setValue(true);

assert($run->getValue() === true);
```

Use `WorkflowClient->newRunningWorkflowStub` or `WorkflowClient->newUntypedRunningWorkflowStub` with Workflow Id to send Signals to already running Workflows.

```php
$workflow = $workflowClient->newRunningWorkflowStub(YourWorkflow::class, 'workflowID');
$workflow->setValue(true);
```

## SignalWithStart

You may not know if a Workflow is running and can accept a signal. The
`WorkflowClient`->`startWithSignal` API
allows you to send a signal to the current Workflow instance if one exists or to create a new
run and then send the signal.

```php
$workflow = $workflowClient->newWorkflowStub(YourWorkflow::class);

$run = $workflowClient->startWithSignal(
    $workflow,
    'setValue',
    [true], // signal arguments
    [] // start arguments
);
```
