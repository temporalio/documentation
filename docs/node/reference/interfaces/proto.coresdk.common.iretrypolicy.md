# Interface: IRetryPolicy

[coresdk](../modules/proto.coresdk.md).[common](../modules/proto.coresdk.common.md).IRetryPolicy

Properties of a RetryPolicy.

## Implemented by

* [*RetryPolicy*](../classes/proto.coresdk.common.retrypolicy.md)

## Table of contents

### Properties

- [backoffCoefficient](proto.coresdk.common.iretrypolicy.md#backoffcoefficient)
- [initialInterval](proto.coresdk.common.iretrypolicy.md#initialinterval)
- [maximumAttempts](proto.coresdk.common.iretrypolicy.md#maximumattempts)
- [maximumInterval](proto.coresdk.common.iretrypolicy.md#maximuminterval)
- [nonRetryableErrorTypes](proto.coresdk.common.iretrypolicy.md#nonretryableerrortypes)

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
