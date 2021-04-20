# Namespace: worker

The temporal worker connects to the service and runs workflows and activities.

### Usage

<!--SNIPSTART nodejs-hello-worker-->
<!--SNIPEND-->

## Table of contents

### Classes

- [DefaultLogger](../classes/worker.defaultlogger.md)
- [Worker](../classes/worker.worker-1.md)

### Interfaces

- [DataConverter](../interfaces/worker.dataconverter.md)
- [LocalActivityOptions](../interfaces/worker.localactivityoptions.md)
- [Logger](../interfaces/worker.logger.md)
- [RemoteActivityOptions](../interfaces/worker.remoteactivityoptions.md)
- [RetryOptions](../interfaces/worker.retryoptions.md)
- [ServerOptions](../interfaces/worker.serveroptions.md)
- [WorkerOptions](../interfaces/worker.workeroptions.md)

### Type aliases

- [ActivityOptions](worker.md#activityoptions)
- [LogLevel](worker.md#loglevel)
- [State](worker.md#state)

## Type aliases

### ActivityOptions

Ƭ **ActivityOptions**: [*RemoteActivityOptions*](../interfaces/worker.remoteactivityoptions.md) \| [*LocalActivityOptions*](../interfaces/worker.localactivityoptions.md)

Used to configure the way activities are run

___

### LogLevel

Ƭ **LogLevel**: *DEBUG* \| *INFO* \| *WARNING* \| *ERROR*

___

### State

Ƭ **State**: *INITIALIZED* \| *RUNNING* \| *STOPPED* \| *STOPPING* \| *FAILED* \| *SUSPENDED*

The worker's possible states
