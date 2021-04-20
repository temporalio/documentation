# Class: CancellationError

[workflow](../modules/workflow.md).CancellationError

Thrown in workflow when it is requested to be cancelled either externally or internally.

**`see`** [CancellationSource](../modules/workflow.md#cancellationsource)

## Hierarchy

* *Error*

  ↳ **CancellationError**

## Table of contents

### Constructors

- [constructor](workflow.cancellationerror.md#constructor)

### Properties

- [message](workflow.cancellationerror.md#message)
- [name](workflow.cancellationerror.md#name)
- [source](workflow.cancellationerror.md#source)
- [stack](workflow.cancellationerror.md#stack)
- [prepareStackTrace](workflow.cancellationerror.md#preparestacktrace)
- [stackTraceLimit](workflow.cancellationerror.md#stacktracelimit)

### Methods

- [captureStackTrace](workflow.cancellationerror.md#capturestacktrace)

## Constructors

### constructor

\+ **new CancellationError**(`message`: *string*, `source`: [*CancellationSource*](../modules/workflow.md#cancellationsource)): [*CancellationError*](workflow.cancellationerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message` | *string* |
`source` | [*CancellationSource*](../modules/workflow.md#cancellationsource) |

**Returns:** [*CancellationError*](workflow.cancellationerror.md)

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

### source

• `Readonly` **source**: [*CancellationSource*](../modules/workflow.md#cancellationsource)

___

### stack

• `Optional` **stack**: *string*

Inherited from: Error.stack

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
