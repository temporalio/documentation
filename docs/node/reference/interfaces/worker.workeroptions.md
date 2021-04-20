# Interface: WorkerOptions

[worker](../modules/worker.md).WorkerOptions

## Table of contents

### Properties

- [activitiesPath](worker.workeroptions.md#activitiespath)
- [activityDefaults](worker.workeroptions.md#activitydefaults)
- [dataConverter](worker.workeroptions.md#dataconverter)
- [isLocalActivityWorkerOnly](worker.workeroptions.md#islocalactivityworkeronly)
- [logger](worker.workeroptions.md#logger)
- [maxConcurrentActivityExecutions](worker.workeroptions.md#maxconcurrentactivityexecutions)
- [maxConcurrentLocalActivityExecutions](worker.workeroptions.md#maxconcurrentlocalactivityexecutions)
- [maxConcurrentWorkflowTaskExecutions](worker.workeroptions.md#maxconcurrentworkflowtaskexecutions)
- [maxTaskQueueActivitiesPerSecond](worker.workeroptions.md#maxtaskqueueactivitiespersecond)
- [maxWorkerActivitiesPerSecond](worker.workeroptions.md#maxworkeractivitiespersecond)
- [serverOptions](worker.workeroptions.md#serveroptions)
- [shutdownGraceTime](worker.workeroptions.md#shutdowngracetime)
- [shutdownSignals](worker.workeroptions.md#shutdownsignals)
- [workflowsPath](worker.workeroptions.md#workflowspath)

## Properties

### activitiesPath

• `Optional` **activitiesPath**: *null* \| *string*

Path to look up activities in.
Use as alias for the `@activities` import.
pass `null` to manually register activities.

**`default`** ../activities

___

### activityDefaults

• `Optional` **activityDefaults**: [*ActivityOptions*](../modules/worker.md#activityoptions)

Activities created in workflows will default to having these options

**`default`** 
```ts
{ type: 'remote', startToCloseTimeout: '10m' }
```

___

### dataConverter

• `Optional` **dataConverter**: [*DataConverter*](worker.dataconverter.md)

TODO: document, figure out how to propagate this to the workflow isolate

___

### isLocalActivityWorkerOnly

• `Optional` **isLocalActivityWorkerOnly**: *boolean*

___

### logger

• `Optional` **logger**: [*Logger*](worker.logger.md)

Custom logger for the worker, by default we log everything to stderr

___

### maxConcurrentActivityExecutions

• `Optional` **maxConcurrentActivityExecutions**: *number*

___

### maxConcurrentLocalActivityExecutions

• `Optional` **maxConcurrentLocalActivityExecutions**: *number*

___

### maxConcurrentWorkflowTaskExecutions

• `Optional` **maxConcurrentWorkflowTaskExecutions**: *number*

___

### maxTaskQueueActivitiesPerSecond

• `Optional` **maxTaskQueueActivitiesPerSecond**: *number*

___

### maxWorkerActivitiesPerSecond

• `Optional` **maxWorkerActivitiesPerSecond**: *number*

___

### serverOptions

• `Optional` **serverOptions**: [*ServerOptions*](worker.serveroptions.md)

Options for communicating with the Tempral server

___

### shutdownGraceTime

• `Optional` **shutdownGraceTime**: *string*

Time to wait for pending tasks to drain after shutdown was requested.

**`format`** [ms](https://www.npmjs.com/package/ms) formatted string

___

### shutdownSignals

• `Optional` **shutdownSignals**: Signals[]

Automatically shut down worker on any of these signals.

**`default`** 
```ts
['SIGINT', 'SIGTERM', 'SIGQUIT']
```

___

### workflowsPath

• `Optional` **workflowsPath**: *null* \| *string*

Path to look up workflows in.
pass `null` to manually register workflows

**`default`** ../workflows
