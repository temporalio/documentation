# Class: QueryRejectedError

[client](../modules/client.md).QueryRejectedError

## Hierarchy

* *Error*

  ↳ **QueryRejectedError**

## Table of contents

### Constructors

- [constructor](client.queryrejectederror.md#constructor)

### Properties

- [message](client.queryrejectederror.md#message)
- [name](client.queryrejectederror.md#name)
- [stack](client.queryrejectederror.md#stack)
- [status](client.queryrejectederror.md#status)
- [prepareStackTrace](client.queryrejectederror.md#preparestacktrace)
- [stackTraceLimit](client.queryrejectederror.md#stacktracelimit)

### Methods

- [captureStackTrace](client.queryrejectederror.md#capturestacktrace)

## Constructors

### constructor

\+ **new QueryRejectedError**(`status`: [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md)): [*QueryRejectedError*](client.queryrejectederror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`status` | [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md) |

**Returns:** [*QueryRejectedError*](client.queryrejectederror.md)

Overrides: Error.constructor

## Properties

### message

• **message**: *string*

Inherited from: Error.message

___

### name

• `Readonly` **name**: *string*

Overrides: Error.name

___

### stack

• `Optional` **stack**: *string*

Inherited from: Error.stack

___

### status

• `Readonly` **status**: [*WorkflowExecutionStatus*](../enums/proto.temporal.api.enums.v1.workflowexecutionstatus.md)

___

### prepareStackTrace

▪ `Static` `Optional` **prepareStackTrace**: (`err`: Error, `stackTraces`: CallSite[]) => *any*

Optional override for formatting stack traces

**`see`** https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces

#### Type declaration:

▸ (`err`: Error, `stackTraces`: CallSite[]): *any*

#### Parameters:

Name | Type |
:------ | :------ |
`err` | Error |
`stackTraces` | CallSite[] |

**Returns:** *any*

Inherited from: Error.prepareStackTrace

___

### stackTraceLimit

▪ `Static` **stackTraceLimit**: *number*

Inherited from: Error.stackTraceLimit

## Methods

### captureStackTrace

▸ `Static`**captureStackTrace**(`targetObject`: Object, `constructorOpt?`: Function): *void*

Create .stack property on a target object

#### Parameters:

Name | Type |
:------ | :------ |
`targetObject` | Object |
`constructorOpt?` | Function |

**Returns:** *void*

Inherited from: Error.captureStackTrace
