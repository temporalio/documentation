# Class: Worker

[worker](../modules/worker.md).Worker

The temporal worker connects to the service and runs workflows and activities.

## Table of contents

### Properties

- [options](worker.worker-1.md#options)
- [pwd](worker.worker-1.md#pwd)

### Methods

- [getState](worker.worker-1.md#getstate)
- [isSuspended](worker.worker-1.md#issuspended)
- [registerActivities](worker.worker-1.md#registeractivities)
- [registerWorkflows](worker.worker-1.md#registerworkflows)
- [resumePolling](worker.worker-1.md#resumepolling)
- [run](worker.worker-1.md#run)
- [shutdown](worker.worker-1.md#shutdown)
- [suspendPolling](worker.worker-1.md#suspendpolling)
- [create](worker.worker-1.md#create)

## Properties

### options

• `Readonly` **options**: *CompiledWorkerOptionsWithDefaults*

___

### pwd

• `Readonly` **pwd**: *string*

## Methods

### getState

▸ **getState**(): [*State*](../modules/worker.md#state)

Get the poll state of this worker

**Returns:** [*State*](../modules/worker.md#state)

___

### isSuspended

▸ **isSuspended**(): *boolean*

**Returns:** *boolean*

___

### registerActivities

▸ **registerActivities**(`importPathToImplementation`: *Record*<string, Record<string, () => *any*\>\>): *Promise*<void\>

Manually register activities, e.g. for when using a non-standard directory structure.

#### Parameters:

Name | Type |
:------ | :------ |
`importPathToImplementation` | *Record*<string, Record<string, () => *any*\>\> |

**Returns:** *Promise*<void\>

___

### registerWorkflows

▸ **registerWorkflows**(`nameToPath`: *Record*<string, string\>): *Promise*<void\>

Manually register workflows, e.g. for when using a non-standard directory structure.

#### Parameters:

Name | Type |
:------ | :------ |
`nameToPath` | *Record*<string, string\> |

**Returns:** *Promise*<void\>

___

### resumePolling

▸ **resumePolling**(): *void*

Allow new poll requests.

**Returns:** *void*

___

### run

▸ **run**(`queueName`: *string*): *Promise*<void\>

Start polling on tasks, completes after graceful shutdown due to receiving a shutdown signal
or call to [shutdown](worker.worker-1.md#shutdown).

#### Parameters:

Name | Type |
:------ | :------ |
`queueName` | *string* |

**Returns:** *Promise*<void\>

___

### shutdown

▸ **shutdown**(): *void*

**Returns:** *void*

___

### suspendPolling

▸ **suspendPolling**(): *void*

Do not make new poll requests, current poll request is not cancelled and may complete.

**Returns:** *void*

___

### create

▸ `Static`**create**(`pwd`: *string*, `options?`: [*WorkerOptions*](../interfaces/worker.workeroptions.md)): *Promise*<[*Worker*](worker.worker-1.md)\>

Create a new Worker.
This method initiates a connection to the server and will throw (asynchronously) on connection failure.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`pwd` | *string* | Used to resolve relative paths for locating and importing activities and workflows.    |
`options?` | [*WorkerOptions*](../interfaces/worker.workeroptions.md) | - |

**Returns:** *Promise*<[*Worker*](worker.worker-1.md)\>
