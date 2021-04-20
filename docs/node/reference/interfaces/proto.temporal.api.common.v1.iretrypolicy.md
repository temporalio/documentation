# Interface: IRetryPolicy

[common](../modules/proto.temporal.api.common.md).[v1](../modules/proto.temporal.api.common.v1.md).IRetryPolicy

Properties of a RetryPolicy.

## Implemented by

* [*RetryPolicy*](../classes/proto.temporal.api.common.v1.retrypolicy.md)

## Table of contents

### Properties

- [backoffCoefficient](proto.temporal.api.common.v1.iretrypolicy.md#backoffcoefficient)
- [initialInterval](proto.temporal.api.common.v1.iretrypolicy.md#initialinterval)
- [maximumAttempts](proto.temporal.api.common.v1.iretrypolicy.md#maximumattempts)
- [maximumInterval](proto.temporal.api.common.v1.iretrypolicy.md#maximuminterval)
- [nonRetryableErrorTypes](proto.temporal.api.common.v1.iretrypolicy.md#nonretryableerrortypes)

## Properties

### backoffCoefficient

• `Optional` **backoffCoefficient**: *null* \| *number*

RetryPolicy backoffCoefficient

___

### initialInterval

• `Optional` **initialInterval**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

RetryPolicy initialInterval

___

### maximumAttempts

• `Optional` **maximumAttempts**: *null* \| *number*

RetryPolicy maximumAttempts

___

### maximumInterval

• `Optional` **maximumInterval**: *null* \| [*IDuration*](proto.google.protobuf.iduration.md)

RetryPolicy maximumInterval

___

### nonRetryableErrorTypes

• `Optional` **nonRetryableErrorTypes**: *null* \| *string*[]

RetryPolicy nonRetryableErrorTypes
