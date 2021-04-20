# Class: CancellationError

[activity](../modules/activity.md).CancellationError

Thrown in an activity when the activity is cancelled while awaiting [Context.cancelled](activity.context.md#cancelled).

The activity must [send heartbeats](activity.context.md#heartbeat) in order to be cancellable.

## Hierarchy

* *Error*

  ↳ **CancellationError**

## Table of contents

### Constructors

- [constructor](activity.cancellationerror.md#constructor)

### Properties

- [message](activity.cancellationerror.md#message)
- [name](activity.cancellationerror.md#name)
- [stack](activity.cancellationerror.md#stack)
- [prepareStackTrace](activity.cancellationerror.md#preparestacktrace)
- [stackTraceLimit](activity.cancellationerror.md#stacktracelimit)

### Methods

- [captureStackTrace](activity.cancellationerror.md#capturestacktrace)

## Constructors

### constructor

\+ **new CancellationError**(`message?`: *string*): [*CancellationError*](activity.cancellationerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |

**Returns:** [*CancellationError*](activity.cancellationerror.md)

Inherited from: Error.constructor

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
