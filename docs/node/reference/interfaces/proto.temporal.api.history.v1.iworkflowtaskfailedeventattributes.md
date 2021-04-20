# Interface: IWorkflowTaskFailedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IWorkflowTaskFailedEventAttributes

Properties of a WorkflowTaskFailedEventAttributes.

## Implemented by

* [*WorkflowTaskFailedEventAttributes*](../classes/proto.temporal.api.history.v1.workflowtaskfailedeventattributes.md)

## Table of contents

### Properties

- [baseRunId](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#baserunid)
- [binaryChecksum](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#binarychecksum)
- [cause](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#cause)
- [failure](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#failure)
- [forkEventVersion](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#forkeventversion)
- [identity](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#identity)
- [newRunId](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#newrunid)
- [scheduledEventId](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#scheduledeventid)
- [startedEventId](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md#startedeventid)

## Properties

### baseRunId

• `Optional` **baseRunId**: *null* \| *string*

WorkflowTaskFailedEventAttributes baseRunId

___

### binaryChecksum

• `Optional` **binaryChecksum**: *null* \| *string*

WorkflowTaskFailedEventAttributes binaryChecksum

___

### cause

• `Optional` **cause**: *null* \| [*WorkflowTaskFailedCause*](../enums/proto.temporal.api.enums.v1.workflowtaskfailedcause.md)

WorkflowTaskFailedEventAttributes cause

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

WorkflowTaskFailedEventAttributes failure

___

### forkEventVersion

• `Optional` **forkEventVersion**: *null* \| Long

WorkflowTaskFailedEventAttributes forkEventVersion

___

### identity

• `Optional` **identity**: *null* \| *string*

WorkflowTaskFailedEventAttributes identity

___

### newRunId

• `Optional` **newRunId**: *null* \| *string*

WorkflowTaskFailedEventAttributes newRunId

___

### scheduledEventId

• `Optional` **scheduledEventId**: *null* \| Long

WorkflowTaskFailedEventAttributes scheduledEventId

___

### startedEventId

• `Optional` **startedEventId**: *null* \| Long

WorkflowTaskFailedEventAttributes startedEventId
