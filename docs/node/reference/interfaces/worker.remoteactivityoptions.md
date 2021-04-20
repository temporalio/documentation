# Interface: RemoteActivityOptions

[worker](../modules/worker.md).RemoteActivityOptions

Options for remote activity invocation - will be processed from a task queue.

**`see`** https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/activity/ActivityOptions.Builder.html

## Table of contents

### Properties

- [heartbeatTimeout](worker.remoteactivityoptions.md#heartbeattimeout)
- [namespace](worker.remoteactivityoptions.md#namespace)
- [retry](worker.remoteactivityoptions.md#retry)
- [scheduleToCloseTimeout](worker.remoteactivityoptions.md#scheduletoclosetimeout)
- [scheduleToStartTimeout](worker.remoteactivityoptions.md#scheduletostarttimeout)
- [startToCloseTimeout](worker.remoteactivityoptions.md#starttoclosetimeout)
- [taskQueue](worker.remoteactivityoptions.md#taskqueue)
- [type](worker.remoteactivityoptions.md#type)

## Properties

### heartbeatTimeout

• `Optional` **heartbeatTimeout**: *string*

Heartbeat interval. Activity must heartbeat before this interval passes after a last heartbeat or activity start.

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### namespace

• `Optional` **namespace**: *string*

Namespace to schedule this activity in.

**`default`** current worker namespace

___

### retry

• `Optional` **retry**: [*RetryOptions*](worker.retryoptions.md)

RetryOptions that define how activity is retried in case of failure. If this is not set, then the server-defined default activity retry policy will be used. To ensure zero retries, set maximum attempts to 1.

___

### scheduleToCloseTimeout

• `Optional` **scheduleToCloseTimeout**: *string*

Total time that a workflow is willing to wait for Activity to complete.
`scheduleToCloseTimeout` limits the total time of an Activity's execution including retries (use [startToCloseTimeout](worker.remoteactivityoptions.md#starttoclosetimeout) to limit the time of a single attempt).

Either this option or [startToCloseTimeout](worker.remoteactivityoptions.md#starttoclosetimeout) is required

**`default`** unlimited

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### scheduleToStartTimeout

• `Optional` **scheduleToStartTimeout**: *string*

Time that the Activity Task can stay in the Task Queue before it is picked up by a Worker. Do not specify this timeout unless using host specific Task Queues for Activity Tasks are being used for routing.
`scheduleToStartTimeout` is always non-retryable. Retrying after this timeout doesn't make sense as it would just put the Activity Task back into the same Task Queue.

**`default`** unlimited

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### startToCloseTimeout

• `Optional` **startToCloseTimeout**: *string*

Maximum time of a single Activity execution attempt.
Note that the Temporal Server doesn't detect Worker process failures directly. It relies on this timeout to detect that an Activity that didn't complete on time. So this timeout should be as short as the longest possible execution of the Activity body. Potentially long running Activities must specify [heartbeatTimeout](worker.remoteactivityoptions.md#heartbeattimeout) and call [activity.Context.heartbeat](../classes/activity.context.md#heartbeat) periodically for timely failure detection.

Either this option or [scheduleToCloseTimeout](worker.remoteactivityoptions.md#scheduletoclosetimeout) is required.

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### taskQueue

• `Optional` **taskQueue**: *string*

Task queue name.

**`default`** current worker task queue

___

### type

• **type**: *remote*

Indicates this is a remote activity invocation.
