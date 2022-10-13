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

In the example above the workflow updates the protected value. Main workflow coroutine waits for such value to change using
`Workflow::await` function.

To send signal to workflow use `WorkflowClient`->`newWorkflowStub` or `WorkflowClient`->`newUntypedWorkflowStub`:

```php
$workflow = $workflowClient->newWorkflowStub(YourWorkflow::class);

$run = $workflowClient->start($workflow);

// do something

$workflow->setValue(true);

assert($run->getValue() === true);
```

Use `WorkflowClient`->`newRunningWorkflowStub` or `WorkflowClient->newUntypedRunningWorkflowStub` with workflow id to send
signals to already running workflows.

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
