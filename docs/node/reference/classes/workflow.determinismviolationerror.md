# Class: DeterminismViolationError

[workflow](../modules/workflow.md).DeterminismViolationError

Thrown in workflow when it trys to do something that non-deterministic such as construct a WeakMap()

## Hierarchy

* *Error*

  ↳ **DeterminismViolationError**

## Table of contents

### Constructors

- [constructor](workflow.determinismviolationerror.md#constructor)

### Properties

- [message](workflow.determinismviolationerror.md#message)
- [name](workflow.determinismviolationerror.md#name)
- [stack](workflow.determinismviolationerror.md#stack)
- [prepareStackTrace](workflow.determinismviolationerror.md#preparestacktrace)
- [stackTraceLimit](workflow.determinismviolationerror.md#stacktracelimit)

### Methods

- [captureStackTrace](workflow.determinismviolationerror.md#capturestacktrace)

## Constructors

### constructor

\+ **new DeterminismViolationError**(`message?`: *string*): [*DeterminismViolationError*](workflow.determinismviolationerror.md)

#### Parameters:

Name | Type |
:------ | :------ |
`message?` | *string* |

**Returns:** [*DeterminismViolationError*](workflow.determinismviolationerror.md)

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
