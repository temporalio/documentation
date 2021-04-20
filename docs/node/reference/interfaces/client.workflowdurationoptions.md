# Interface: WorkflowDurationOptions

[client](../modules/client.md).WorkflowDurationOptions

## Table of contents

### Properties

- [workflowExecutionTimeout](client.workflowdurationoptions.md#workflowexecutiontimeout)
- [workflowRunTimeout](client.workflowdurationoptions.md#workflowruntimeout)
- [workflowTaskTimeout](client.workflowdurationoptions.md#workflowtasktimeout)

## Properties

### workflowExecutionTimeout

• `Optional` **workflowExecutionTimeout**: *string*

The time after which workflow execution (which includes run retries and continue as new) is
automatically terminated by Temporal service. Do not rely on execution timeout for business
level timeouts. It is preferred to use in workflow timers for this purpose.

**`format`** ms formatted string

___

### workflowRunTimeout

• `Optional` **workflowRunTimeout**: *string*

The time after which workflow run is automatically terminated by Temporal service. Do not
rely on run timeout for business level timeouts. It is preferred to use in workflow timers
for this purpose.

**`format`** ms formatted string

___

### workflowTaskTimeout

• `Optional` **workflowTaskTimeout**: *string*

Maximum execution time of a single workflow task. Default is 10 seconds.

**`format`** ms formatted string
