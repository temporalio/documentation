# Interface: IFailure

[failure](../modules/proto.temporal.api.failure.md).[v1](../modules/proto.temporal.api.failure.v1.md).IFailure

Properties of a Failure.

## Implemented by

* [*Failure*](../classes/proto.temporal.api.failure.v1.failure.md)

## Table of contents

### Properties

- [activityFailureInfo](proto.temporal.api.failure.v1.ifailure.md#activityfailureinfo)
- [applicationFailureInfo](proto.temporal.api.failure.v1.ifailure.md#applicationfailureinfo)
- [canceledFailureInfo](proto.temporal.api.failure.v1.ifailure.md#canceledfailureinfo)
- [cause](proto.temporal.api.failure.v1.ifailure.md#cause)
- [childWorkflowExecutionFailureInfo](proto.temporal.api.failure.v1.ifailure.md#childworkflowexecutionfailureinfo)
- [message](proto.temporal.api.failure.v1.ifailure.md#message)
- [resetWorkflowFailureInfo](proto.temporal.api.failure.v1.ifailure.md#resetworkflowfailureinfo)
- [serverFailureInfo](proto.temporal.api.failure.v1.ifailure.md#serverfailureinfo)
- [source](proto.temporal.api.failure.v1.ifailure.md#source)
- [stackTrace](proto.temporal.api.failure.v1.ifailure.md#stacktrace)
- [terminatedFailureInfo](proto.temporal.api.failure.v1.ifailure.md#terminatedfailureinfo)
- [timeoutFailureInfo](proto.temporal.api.failure.v1.ifailure.md#timeoutfailureinfo)

## Properties

### activityFailureInfo

• `Optional` **activityFailureInfo**: *null* \| [*IActivityFailureInfo*](proto.temporal.api.failure.v1.iactivityfailureinfo.md)

Failure activityFailureInfo

___

### applicationFailureInfo

• `Optional` **applicationFailureInfo**: *null* \| [*IApplicationFailureInfo*](proto.temporal.api.failure.v1.iapplicationfailureinfo.md)

Failure applicationFailureInfo

___

### canceledFailureInfo

• `Optional` **canceledFailureInfo**: *null* \| [*ICanceledFailureInfo*](proto.temporal.api.failure.v1.icanceledfailureinfo.md)

Failure canceledFailureInfo

___

### cause

• `Optional` **cause**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

Failure cause

___

### childWorkflowExecutionFailureInfo

• `Optional` **childWorkflowExecutionFailureInfo**: *null* \| [*IChildWorkflowExecutionFailureInfo*](proto.temporal.api.failure.v1.ichildworkflowexecutionfailureinfo.md)

Failure childWorkflowExecutionFailureInfo

___

### message

• `Optional` **message**: *null* \| *string*

Failure message

___

### resetWorkflowFailureInfo

• `Optional` **resetWorkflowFailureInfo**: *null* \| [*IResetWorkflowFailureInfo*](proto.temporal.api.failure.v1.iresetworkflowfailureinfo.md)

Failure resetWorkflowFailureInfo

___

### serverFailureInfo

• `Optional` **serverFailureInfo**: *null* \| [*IServerFailureInfo*](proto.temporal.api.failure.v1.iserverfailureinfo.md)

Failure serverFailureInfo

___

### source

• `Optional` **source**: *null* \| *string*

Failure source

___

### stackTrace

• `Optional` **stackTrace**: *null* \| *string*

Failure stackTrace

___

### terminatedFailureInfo

• `Optional` **terminatedFailureInfo**: *null* \| [*ITerminatedFailureInfo*](proto.temporal.api.failure.v1.iterminatedfailureinfo.md)

Failure terminatedFailureInfo

___

### timeoutFailureInfo

• `Optional` **timeoutFailureInfo**: *null* \| [*ITimeoutFailureInfo*](proto.temporal.api.failure.v1.itimeoutfailureinfo.md)

Failure timeoutFailureInfo
