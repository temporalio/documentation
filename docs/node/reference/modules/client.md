# Namespace: client

Client for communicating with the Temporal service.

Interact with workflows using [WorkflowClient](../interfaces/client.workflowclient.md) or call GRPC methods directly using [Connection.service](../classes/client.connection.md#service).

### Usage
<!--SNIPSTART nodejs-hello-client-->
<!--SNIPEND-->

## Table of contents

### Classes

- [Connection](../classes/client.connection.md)
- [QueryRejectedError](../classes/client.queryrejectederror.md)

### Interfaces

- [BaseWorkflowOptions](../interfaces/client.baseworkflowoptions.md)
- [ConnectionOptions](../interfaces/client.connectionoptions.md)
- [ServiceOptions](../interfaces/client.serviceoptions.md)
- [WorkflowClient](../interfaces/client.workflowclient.md)
- [WorkflowDurationOptions](../interfaces/client.workflowdurationoptions.md)

### Type aliases

- [CompiledWorkflowOptionsWithDefaults](client.md#compiledworkflowoptionswithdefaults)
- [ConnectionOptionsWithDefaults](client.md#connectionoptionswithdefaults)
- [DescribeWorkflowExecutionResponse](client.md#describeworkflowexecutionresponse)
- [RequestCancelWorkflowExecutionResponse](client.md#requestcancelworkflowexecutionresponse)
- [RequiredWorkflowOptions](client.md#requiredworkflowoptions)
- [ServiceOptionsWithDefaults](client.md#serviceoptionswithdefaults)
- [TerminateWorkflowExecutionResponse](client.md#terminateworkflowexecutionresponse)
- [WorkflowOptions](client.md#workflowoptions)
- [WorkflowOptionsWithDefaults](client.md#workflowoptionswithdefaults)
- [WorkflowService](client.md#workflowservice)

### Variables

- [WorkflowService](client.md#workflowservice)

### Functions

- [addDefaults](client.md#adddefaults)
- [compileWorkflowOptions](client.md#compileworkflowoptions)
- [defaultConnectionOpts](client.md#defaultconnectionopts)
- [defaultServiceOptions](client.md#defaultserviceoptions)

## Type aliases

### CompiledWorkflowOptionsWithDefaults

Ƭ **CompiledWorkflowOptionsWithDefaults**: [*BaseWorkflowOptions*](../interfaces/client.baseworkflowoptions.md) & [*RequiredWorkflowOptions*](client.md#requiredworkflowoptions) & { `workflowExecutionTimeout?`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md) ; `workflowRunTimeout?`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md) ; `workflowTaskTimeout?`: [*IDuration*](../interfaces/proto.google.protobuf.iduration.md)  }

___

### ConnectionOptionsWithDefaults

Ƭ **ConnectionOptionsWithDefaults**: *Required*<[*ConnectionOptions*](../interfaces/client.connectionoptions.md)\>

___

### DescribeWorkflowExecutionResponse

Ƭ **DescribeWorkflowExecutionResponse**: [*IDescribeWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.idescribeworkflowexecutionresponse.md)

___

### RequestCancelWorkflowExecutionResponse

Ƭ **RequestCancelWorkflowExecutionResponse**: [*IRequestCancelWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.irequestcancelworkflowexecutionresponse.md)

___

### RequiredWorkflowOptions

Ƭ **RequiredWorkflowOptions**: *Required*<Pick<[*BaseWorkflowOptions*](../interfaces/client.baseworkflowoptions.md), *workflowId* \| *workflowIdReusePolicy* \| *taskQueue*\>\>

___

### ServiceOptionsWithDefaults

Ƭ **ServiceOptionsWithDefaults**: *Required*<[*ServiceOptions*](../interfaces/client.serviceoptions.md)\>

___

### TerminateWorkflowExecutionResponse

Ƭ **TerminateWorkflowExecutionResponse**: [*ITerminateWorkflowExecutionResponse*](../interfaces/proto.temporal.api.workflowservice.v1.iterminateworkflowexecutionresponse.md)

___

### WorkflowOptions

Ƭ **WorkflowOptions**: [*BaseWorkflowOptions*](../interfaces/client.baseworkflowoptions.md) & [*WorkflowDurationOptions*](../interfaces/client.workflowdurationoptions.md)

___

### WorkflowOptionsWithDefaults

Ƭ **WorkflowOptionsWithDefaults**: [*WorkflowOptions*](client.md#workflowoptions) & [*RequiredWorkflowOptions*](client.md#requiredworkflowoptions)

___

### WorkflowService

Ƭ **WorkflowService**: [*WorkflowService*](../classes/proto.temporal.api.workflowservice.v1.workflowservice-1.md)

## Variables

### WorkflowService

• **WorkflowService**: *typeof* [*WorkflowService*](../classes/proto.temporal.api.workflowservice.v1.workflowservice-1.md)

## Functions

### addDefaults

▸ **addDefaults**(`opts`: [*WorkflowOptions*](client.md#workflowoptions)): [*WorkflowOptionsWithDefaults*](client.md#workflowoptionswithdefaults)

Adds default values to `workflowId` and `workflowIdReusePolicy` to given workflow options.

#### Parameters:

Name | Type |
:------ | :------ |
`opts` | [*WorkflowOptions*](client.md#workflowoptions) |

**Returns:** [*WorkflowOptionsWithDefaults*](client.md#workflowoptionswithdefaults)

___

### compileWorkflowOptions

▸ **compileWorkflowOptions**(`__namedParameters`: [*WorkflowOptionsWithDefaults*](client.md#workflowoptionswithdefaults)): [*CompiledWorkflowOptionsWithDefaults*](client.md#compiledworkflowoptionswithdefaults)

#### Parameters:

Name | Type |
:------ | :------ |
`__namedParameters` | [*WorkflowOptionsWithDefaults*](client.md#workflowoptionswithdefaults) |

**Returns:** [*CompiledWorkflowOptionsWithDefaults*](client.md#compiledworkflowoptionswithdefaults)

___

### defaultConnectionOpts

▸ **defaultConnectionOpts**(): [*ConnectionOptionsWithDefaults*](client.md#connectionoptionswithdefaults)

**Returns:** [*ConnectionOptionsWithDefaults*](client.md#connectionoptionswithdefaults)

___

### defaultServiceOptions

▸ **defaultServiceOptions**(): [*ServiceOptionsWithDefaults*](client.md#serviceoptionswithdefaults)

**Returns:** [*ServiceOptionsWithDefaults*](client.md#serviceoptionswithdefaults)
