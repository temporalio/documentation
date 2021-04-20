# Class: Connection

[client](../modules/client.md).Connection

Client connection to the Temporal Service

## Table of contents

### Constructors

- [constructor](client.connection.md#constructor)

### Properties

- [client](client.connection.md#client)
- [options](client.connection.md#options)
- [service](client.connection.md#service)
- [Client](client.connection.md#client)

### Methods

- [startWorkflowExecution](client.connection.md#startworkflowexecution)
- [untilComplete](client.connection.md#untilcomplete)
- [workflow](client.connection.md#workflow)

## Constructors

### constructor

\+ **new Connection**(`svcOpts?`: [*ServiceOptions*](../interfaces/client.serviceoptions.md), `connOpts?`: [*ConnectionOptions*](../interfaces/client.connectionoptions.md)): [*Connection*](client.connection.md)

#### Parameters:

Name | Type |
:------ | :------ |
`svcOpts?` | [*ServiceOptions*](../interfaces/client.serviceoptions.md) |
`connOpts?` | [*ConnectionOptions*](../interfaces/client.connectionoptions.md) |

**Returns:** [*Connection*](client.connection.md)

## Properties

### client

• `Readonly` **client**: *Client*

___

### options

• `Readonly` **options**: *Required*<[*ConnectionOptions*](../interfaces/client.connectionoptions.md)\>

___

### service

• `Readonly` **service**: [*WorkflowService*](proto.temporal.api.workflowservice.v1.workflowservice-1.md)

___

### Client

▪ `Static` `Readonly` **Client**: ServiceClientConstructor

## Methods

### startWorkflowExecution

▸ **startWorkflowExecution**(`opts`: [*CompiledWorkflowOptionsWithDefaults*](../modules/client.md#compiledworkflowoptionswithdefaults), `name`: *string*, ...`args`: *any*[]): *Promise*<string\>

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*CompiledWorkflowOptionsWithDefaults*](../modules/client.md#compiledworkflowoptionswithdefaults) |
`name` | *string* |
`...args` | *any*[] |

**Returns:** *Promise*<string\>

___

### untilComplete

▸ **untilComplete**(`workflowId`: *string*, `runId`: *string*): *Promise*<unknown\>

#### Parameters:

Name | Type |
:------ | :------ |
`workflowId` | *string* |
`runId` | *string* |

**Returns:** *Promise*<unknown\>

___

### workflow

▸ **workflow**<T\>(`name`: *string*, `options`: [*WorkflowOptions*](../modules/client.md#workflowoptions)): [*WorkflowClient*](../interfaces/client.workflowclient.md)<T\>

#### Type parameters:

Name | Type |
:------ | :------ |
`T` | [*Workflow*](../interfaces/workflow.workflow-1.md) |

#### Parameters:

Name | Type |
:------ | :------ |
`name` | *string* |
`options` | [*WorkflowOptions*](../modules/client.md#workflowoptions) |

**Returns:** [*WorkflowClient*](../interfaces/client.workflowclient.md)<T\>
