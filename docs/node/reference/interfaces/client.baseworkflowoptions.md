# Interface: BaseWorkflowOptions

[client](../modules/client.md).BaseWorkflowOptions

## Table of contents

### Properties

- [cronSchedule](client.baseworkflowoptions.md#cronschedule)
- [memo](client.baseworkflowoptions.md#memo)
- [retryPolicy](client.baseworkflowoptions.md#retrypolicy)
- [searchAttributes](client.baseworkflowoptions.md#searchattributes)
- [taskQueue](client.baseworkflowoptions.md#taskqueue)
- [workflowId](client.baseworkflowoptions.md#workflowid)
- [workflowIdReusePolicy](client.baseworkflowoptions.md#workflowidreusepolicy)

## Properties

### cronSchedule

• `Optional` **cronSchedule**: *string*

Optional cron schedule for Workflow. If a cron schedule is specified, the Workflow will run
as a cron based on the schedule. The scheduling will be based on UTC time. The schedule for the next run only happens
after the current run is completed/failed/timeout. If a RetryPolicy is also supplied, and the Workflow failed
or timed out, the Workflow will be retried based on the retry policy. While the Workflow is retrying, it won't
schedule its next run. If the next schedule is due while the Workflow is running (or retrying), then it will skip that
schedule. Cron Workflow will not stop until it is terminated or cancelled (by returning temporal.CanceledError).
https://crontab.guru/ is useful for testing your cron expressions.

___

### memo

• `Optional` **memo**: *Record*<string, any\>

Specifies additional non-indexed information in result of list workflow. The type of value
can be any object that are serializable by `DataConverter`.

___

### retryPolicy

• `Optional` **retryPolicy**: [*IRetryPolicy*](proto.temporal.api.common.v1.iretrypolicy.md)

___

### searchAttributes

• `Optional` **searchAttributes**: *Record*<string, string \| number \| boolean\>

Specifies additional indexed information in result of list workflow. The type of value should
be a primitive (e.g. string, number, boolean), for dates use Date.toISOString();

___

### taskQueue

• **taskQueue**: *string*

Task queue to use for workflow tasks. It should match a task queue specified when creating a
`Worker` that hosts the workflow code.

___

### workflowId

• `Optional` **workflowId**: *string*

Workflow id to use when starting. If not specified a UUID is generated. Note that it is
dangerous as in case of client side retries no deduplication will happen based on the
generated id. So prefer assigning business meaningful ids if possible.

___

### workflowIdReusePolicy

• `Optional` **workflowIdReusePolicy**: [*WorkflowIdReusePolicy*](../enums/proto.temporal.api.enums.v1.workflowidreusepolicy.md)

Specifies server behavior if a completed workflow with the same id exists. Note that under no
conditions Temporal allows two workflows with the same namespace and workflow id run
simultaneously.
  ALLOW_DUPLICATE_FAILED_ONLY is a default value. It means that workflow can start if
  previous run failed or was canceled or terminated.
  ALLOW_DUPLICATE allows new run independently of the previous run closure status.
  REJECT_DUPLICATE doesn't allow new run independently of the previous run closure status.
