# Class: HistoryEvent

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).HistoryEvent

Represents a HistoryEvent.

## Implements

* [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md)

## Table of contents

### Constructors

- [constructor](proto.temporal.api.history.v1.historyevent.md#constructor)

### Properties

- [activityTaskCancelRequestedEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytaskcancelrequestedeventattributes)
- [activityTaskCanceledEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytaskcanceledeventattributes)
- [activityTaskCompletedEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytaskcompletedeventattributes)
- [activityTaskFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytaskfailedeventattributes)
- [activityTaskScheduledEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytaskscheduledeventattributes)
- [activityTaskStartedEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytaskstartedeventattributes)
- [activityTaskTimedOutEventAttributes](proto.temporal.api.history.v1.historyevent.md#activitytasktimedouteventattributes)
- [attributes](proto.temporal.api.history.v1.historyevent.md#attributes)
- [childWorkflowExecutionCanceledEventAttributes](proto.temporal.api.history.v1.historyevent.md#childworkflowexecutioncanceledeventattributes)
- [childWorkflowExecutionCompletedEventAttributes](proto.temporal.api.history.v1.historyevent.md#childworkflowexecutioncompletedeventattributes)
- [childWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#childworkflowexecutionfailedeventattributes)
- [childWorkflowExecutionStartedEventAttributes](proto.temporal.api.history.v1.historyevent.md#childworkflowexecutionstartedeventattributes)
- [childWorkflowExecutionTerminatedEventAttributes](proto.temporal.api.history.v1.historyevent.md#childworkflowexecutionterminatedeventattributes)
- [childWorkflowExecutionTimedOutEventAttributes](proto.temporal.api.history.v1.historyevent.md#childworkflowexecutiontimedouteventattributes)
- [eventId](proto.temporal.api.history.v1.historyevent.md#eventid)
- [eventTime](proto.temporal.api.history.v1.historyevent.md#eventtime)
- [eventType](proto.temporal.api.history.v1.historyevent.md#eventtype)
- [externalWorkflowExecutionCancelRequestedEventAttributes](proto.temporal.api.history.v1.historyevent.md#externalworkflowexecutioncancelrequestedeventattributes)
- [externalWorkflowExecutionSignaledEventAttributes](proto.temporal.api.history.v1.historyevent.md#externalworkflowexecutionsignaledeventattributes)
- [markerRecordedEventAttributes](proto.temporal.api.history.v1.historyevent.md#markerrecordedeventattributes)
- [requestCancelExternalWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#requestcancelexternalworkflowexecutionfailedeventattributes)
- [requestCancelExternalWorkflowExecutionInitiatedEventAttributes](proto.temporal.api.history.v1.historyevent.md#requestcancelexternalworkflowexecutioninitiatedeventattributes)
- [signalExternalWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#signalexternalworkflowexecutionfailedeventattributes)
- [signalExternalWorkflowExecutionInitiatedEventAttributes](proto.temporal.api.history.v1.historyevent.md#signalexternalworkflowexecutioninitiatedeventattributes)
- [startChildWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#startchildworkflowexecutionfailedeventattributes)
- [startChildWorkflowExecutionInitiatedEventAttributes](proto.temporal.api.history.v1.historyevent.md#startchildworkflowexecutioninitiatedeventattributes)
- [taskId](proto.temporal.api.history.v1.historyevent.md#taskid)
- [timerCanceledEventAttributes](proto.temporal.api.history.v1.historyevent.md#timercanceledeventattributes)
- [timerFiredEventAttributes](proto.temporal.api.history.v1.historyevent.md#timerfiredeventattributes)
- [timerStartedEventAttributes](proto.temporal.api.history.v1.historyevent.md#timerstartedeventattributes)
- [upsertWorkflowSearchAttributesEventAttributes](proto.temporal.api.history.v1.historyevent.md#upsertworkflowsearchattributeseventattributes)
- [version](proto.temporal.api.history.v1.historyevent.md#version)
- [workflowExecutionCancelRequestedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutioncancelrequestedeventattributes)
- [workflowExecutionCanceledEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutioncanceledeventattributes)
- [workflowExecutionCompletedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutioncompletedeventattributes)
- [workflowExecutionContinuedAsNewEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutioncontinuedasneweventattributes)
- [workflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutionfailedeventattributes)
- [workflowExecutionSignaledEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutionsignaledeventattributes)
- [workflowExecutionStartedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutionstartedeventattributes)
- [workflowExecutionTerminatedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutionterminatedeventattributes)
- [workflowExecutionTimedOutEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowexecutiontimedouteventattributes)
- [workflowTaskCompletedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowtaskcompletedeventattributes)
- [workflowTaskFailedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowtaskfailedeventattributes)
- [workflowTaskScheduledEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowtaskscheduledeventattributes)
- [workflowTaskStartedEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowtaskstartedeventattributes)
- [workflowTaskTimedOutEventAttributes](proto.temporal.api.history.v1.historyevent.md#workflowtasktimedouteventattributes)

### Methods

- [toJSON](proto.temporal.api.history.v1.historyevent.md#tojson)
- [create](proto.temporal.api.history.v1.historyevent.md#create)
- [decode](proto.temporal.api.history.v1.historyevent.md#decode)
- [decodeDelimited](proto.temporal.api.history.v1.historyevent.md#decodedelimited)
- [encode](proto.temporal.api.history.v1.historyevent.md#encode)
- [encodeDelimited](proto.temporal.api.history.v1.historyevent.md#encodedelimited)
- [fromObject](proto.temporal.api.history.v1.historyevent.md#fromobject)
- [toObject](proto.temporal.api.history.v1.historyevent.md#toobject)
- [verify](proto.temporal.api.history.v1.historyevent.md#verify)

## Constructors

### constructor

\+ **new HistoryEvent**(`properties?`: [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md)): [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

Constructs a new HistoryEvent.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md) |

**Returns:** [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

## Properties

### activityTaskCancelRequestedEventAttributes

• `Optional` **activityTaskCancelRequestedEventAttributes**: *null* \| [*IActivityTaskCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md)

HistoryEvent activityTaskCancelRequestedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytaskcancelrequestedeventattributes)

___

### activityTaskCanceledEventAttributes

• `Optional` **activityTaskCanceledEventAttributes**: *null* \| [*IActivityTaskCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md)

HistoryEvent activityTaskCanceledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytaskcanceledeventattributes)

___

### activityTaskCompletedEventAttributes

• `Optional` **activityTaskCompletedEventAttributes**: *null* \| [*IActivityTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md)

HistoryEvent activityTaskCompletedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytaskcompletedeventattributes)

___

### activityTaskFailedEventAttributes

• `Optional` **activityTaskFailedEventAttributes**: *null* \| [*IActivityTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md)

HistoryEvent activityTaskFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytaskfailedeventattributes)

___

### activityTaskScheduledEventAttributes

• `Optional` **activityTaskScheduledEventAttributes**: *null* \| [*IActivityTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md)

HistoryEvent activityTaskScheduledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytaskscheduledeventattributes)

___

### activityTaskStartedEventAttributes

• `Optional` **activityTaskStartedEventAttributes**: *null* \| [*IActivityTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md)

HistoryEvent activityTaskStartedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytaskstartedeventattributes)

___

### activityTaskTimedOutEventAttributes

• `Optional` **activityTaskTimedOutEventAttributes**: *null* \| [*IActivityTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md)

HistoryEvent activityTaskTimedOutEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[activityTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#activitytasktimedouteventattributes)

___

### attributes

• `Optional` **attributes**: *workflowExecutionStartedEventAttributes* \| *workflowExecutionCompletedEventAttributes* \| *workflowExecutionFailedEventAttributes* \| *workflowExecutionTimedOutEventAttributes* \| *workflowTaskScheduledEventAttributes* \| *workflowTaskStartedEventAttributes* \| *workflowTaskCompletedEventAttributes* \| *workflowTaskTimedOutEventAttributes* \| *workflowTaskFailedEventAttributes* \| *activityTaskScheduledEventAttributes* \| *activityTaskStartedEventAttributes* \| *activityTaskCompletedEventAttributes* \| *activityTaskFailedEventAttributes* \| *activityTaskTimedOutEventAttributes* \| *timerStartedEventAttributes* \| *timerFiredEventAttributes* \| *activityTaskCancelRequestedEventAttributes* \| *activityTaskCanceledEventAttributes* \| *timerCanceledEventAttributes* \| *markerRecordedEventAttributes* \| *workflowExecutionSignaledEventAttributes* \| *workflowExecutionTerminatedEventAttributes* \| *workflowExecutionCancelRequestedEventAttributes* \| *workflowExecutionCanceledEventAttributes* \| *requestCancelExternalWorkflowExecutionInitiatedEventAttributes* \| *requestCancelExternalWorkflowExecutionFailedEventAttributes* \| *externalWorkflowExecutionCancelRequestedEventAttributes* \| *workflowExecutionContinuedAsNewEventAttributes* \| *startChildWorkflowExecutionInitiatedEventAttributes* \| *startChildWorkflowExecutionFailedEventAttributes* \| *childWorkflowExecutionStartedEventAttributes* \| *childWorkflowExecutionCompletedEventAttributes* \| *childWorkflowExecutionFailedEventAttributes* \| *childWorkflowExecutionCanceledEventAttributes* \| *childWorkflowExecutionTimedOutEventAttributes* \| *childWorkflowExecutionTerminatedEventAttributes* \| *signalExternalWorkflowExecutionInitiatedEventAttributes* \| *signalExternalWorkflowExecutionFailedEventAttributes* \| *externalWorkflowExecutionSignaledEventAttributes* \| *upsertWorkflowSearchAttributesEventAttributes*

HistoryEvent attributes.

___

### childWorkflowExecutionCanceledEventAttributes

• `Optional` **childWorkflowExecutionCanceledEventAttributes**: *null* \| [*IChildWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md)

HistoryEvent childWorkflowExecutionCanceledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[childWorkflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutioncanceledeventattributes)

___

### childWorkflowExecutionCompletedEventAttributes

• `Optional` **childWorkflowExecutionCompletedEventAttributes**: *null* \| [*IChildWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md)

HistoryEvent childWorkflowExecutionCompletedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[childWorkflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutioncompletedeventattributes)

___

### childWorkflowExecutionFailedEventAttributes

• `Optional` **childWorkflowExecutionFailedEventAttributes**: *null* \| [*IChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md)

HistoryEvent childWorkflowExecutionFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[childWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutionfailedeventattributes)

___

### childWorkflowExecutionStartedEventAttributes

• `Optional` **childWorkflowExecutionStartedEventAttributes**: *null* \| [*IChildWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md)

HistoryEvent childWorkflowExecutionStartedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[childWorkflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutionstartedeventattributes)

___

### childWorkflowExecutionTerminatedEventAttributes

• `Optional` **childWorkflowExecutionTerminatedEventAttributes**: *null* \| [*IChildWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md)

HistoryEvent childWorkflowExecutionTerminatedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[childWorkflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutionterminatedeventattributes)

___

### childWorkflowExecutionTimedOutEventAttributes

• `Optional` **childWorkflowExecutionTimedOutEventAttributes**: *null* \| [*IChildWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md)

HistoryEvent childWorkflowExecutionTimedOutEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[childWorkflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutiontimedouteventattributes)

___

### eventId

• **eventId**: Long

HistoryEvent eventId.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[eventId](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#eventid)

___

### eventTime

• `Optional` **eventTime**: *null* \| [*ITimestamp*](../interfaces/proto.google.protobuf.itimestamp.md)

HistoryEvent eventTime.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[eventTime](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#eventtime)

___

### eventType

• **eventType**: [*EventType*](../enums/proto.temporal.api.enums.v1.eventtype.md)

HistoryEvent eventType.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[eventType](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#eventtype)

___

### externalWorkflowExecutionCancelRequestedEventAttributes

• `Optional` **externalWorkflowExecutionCancelRequestedEventAttributes**: *null* \| [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md)

HistoryEvent externalWorkflowExecutionCancelRequestedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[externalWorkflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#externalworkflowexecutioncancelrequestedeventattributes)

___

### externalWorkflowExecutionSignaledEventAttributes

• `Optional` **externalWorkflowExecutionSignaledEventAttributes**: *null* \| [*IExternalWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md)

HistoryEvent externalWorkflowExecutionSignaledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[externalWorkflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#externalworkflowexecutionsignaledeventattributes)

___

### markerRecordedEventAttributes

• `Optional` **markerRecordedEventAttributes**: *null* \| [*IMarkerRecordedEventAttributes*](../interfaces/proto.temporal.api.history.v1.imarkerrecordedeventattributes.md)

HistoryEvent markerRecordedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[markerRecordedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#markerrecordedeventattributes)

___

### requestCancelExternalWorkflowExecutionFailedEventAttributes

• `Optional` **requestCancelExternalWorkflowExecutionFailedEventAttributes**: *null* \| [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md)

HistoryEvent requestCancelExternalWorkflowExecutionFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[requestCancelExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#requestcancelexternalworkflowexecutionfailedeventattributes)

___

### requestCancelExternalWorkflowExecutionInitiatedEventAttributes

• `Optional` **requestCancelExternalWorkflowExecutionInitiatedEventAttributes**: *null* \| [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md)

HistoryEvent requestCancelExternalWorkflowExecutionInitiatedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[requestCancelExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#requestcancelexternalworkflowexecutioninitiatedeventattributes)

___

### signalExternalWorkflowExecutionFailedEventAttributes

• `Optional` **signalExternalWorkflowExecutionFailedEventAttributes**: *null* \| [*ISignalExternalWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md)

HistoryEvent signalExternalWorkflowExecutionFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[signalExternalWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#signalexternalworkflowexecutionfailedeventattributes)

___

### signalExternalWorkflowExecutionInitiatedEventAttributes

• `Optional` **signalExternalWorkflowExecutionInitiatedEventAttributes**: *null* \| [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md)

HistoryEvent signalExternalWorkflowExecutionInitiatedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[signalExternalWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#signalexternalworkflowexecutioninitiatedeventattributes)

___

### startChildWorkflowExecutionFailedEventAttributes

• `Optional` **startChildWorkflowExecutionFailedEventAttributes**: *null* \| [*IStartChildWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md)

HistoryEvent startChildWorkflowExecutionFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[startChildWorkflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#startchildworkflowexecutionfailedeventattributes)

___

### startChildWorkflowExecutionInitiatedEventAttributes

• `Optional` **startChildWorkflowExecutionInitiatedEventAttributes**: *null* \| [*IStartChildWorkflowExecutionInitiatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md)

HistoryEvent startChildWorkflowExecutionInitiatedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[startChildWorkflowExecutionInitiatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#startchildworkflowexecutioninitiatedeventattributes)

___

### taskId

• **taskId**: Long

HistoryEvent taskId.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[taskId](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#taskid)

___

### timerCanceledEventAttributes

• `Optional` **timerCanceledEventAttributes**: *null* \| [*ITimerCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimercanceledeventattributes.md)

HistoryEvent timerCanceledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[timerCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#timercanceledeventattributes)

___

### timerFiredEventAttributes

• `Optional` **timerFiredEventAttributes**: *null* \| [*ITimerFiredEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerfiredeventattributes.md)

HistoryEvent timerFiredEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[timerFiredEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#timerfiredeventattributes)

___

### timerStartedEventAttributes

• `Optional` **timerStartedEventAttributes**: *null* \| [*ITimerStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.itimerstartedeventattributes.md)

HistoryEvent timerStartedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[timerStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#timerstartedeventattributes)

___

### upsertWorkflowSearchAttributesEventAttributes

• `Optional` **upsertWorkflowSearchAttributesEventAttributes**: *null* \| [*IUpsertWorkflowSearchAttributesEventAttributes*](../interfaces/proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md)

HistoryEvent upsertWorkflowSearchAttributesEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[upsertWorkflowSearchAttributesEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#upsertworkflowsearchattributeseventattributes)

___

### version

• **version**: Long

HistoryEvent version.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[version](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#version)

___

### workflowExecutionCancelRequestedEventAttributes

• `Optional` **workflowExecutionCancelRequestedEventAttributes**: *null* \| [*IWorkflowExecutionCancelRequestedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md)

HistoryEvent workflowExecutionCancelRequestedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionCancelRequestedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncancelrequestedeventattributes)

___

### workflowExecutionCanceledEventAttributes

• `Optional` **workflowExecutionCanceledEventAttributes**: *null* \| [*IWorkflowExecutionCanceledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md)

HistoryEvent workflowExecutionCanceledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionCanceledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncanceledeventattributes)

___

### workflowExecutionCompletedEventAttributes

• `Optional` **workflowExecutionCompletedEventAttributes**: *null* \| [*IWorkflowExecutionCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md)

HistoryEvent workflowExecutionCompletedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncompletedeventattributes)

___

### workflowExecutionContinuedAsNewEventAttributes

• `Optional` **workflowExecutionContinuedAsNewEventAttributes**: *null* \| [*IWorkflowExecutionContinuedAsNewEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md)

HistoryEvent workflowExecutionContinuedAsNewEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionContinuedAsNewEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncontinuedasneweventattributes)

___

### workflowExecutionFailedEventAttributes

• `Optional` **workflowExecutionFailedEventAttributes**: *null* \| [*IWorkflowExecutionFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md)

HistoryEvent workflowExecutionFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionfailedeventattributes)

___

### workflowExecutionSignaledEventAttributes

• `Optional` **workflowExecutionSignaledEventAttributes**: *null* \| [*IWorkflowExecutionSignaledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md)

HistoryEvent workflowExecutionSignaledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionSignaledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionsignaledeventattributes)

___

### workflowExecutionStartedEventAttributes

• `Optional` **workflowExecutionStartedEventAttributes**: *null* \| [*IWorkflowExecutionStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md)

HistoryEvent workflowExecutionStartedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionstartedeventattributes)

___

### workflowExecutionTerminatedEventAttributes

• `Optional` **workflowExecutionTerminatedEventAttributes**: *null* \| [*IWorkflowExecutionTerminatedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md)

HistoryEvent workflowExecutionTerminatedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionTerminatedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionterminatedeventattributes)

___

### workflowExecutionTimedOutEventAttributes

• `Optional` **workflowExecutionTimedOutEventAttributes**: *null* \| [*IWorkflowExecutionTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md)

HistoryEvent workflowExecutionTimedOutEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowExecutionTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutiontimedouteventattributes)

___

### workflowTaskCompletedEventAttributes

• `Optional` **workflowTaskCompletedEventAttributes**: *null* \| [*IWorkflowTaskCompletedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md)

HistoryEvent workflowTaskCompletedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowTaskCompletedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskcompletedeventattributes)

___

### workflowTaskFailedEventAttributes

• `Optional` **workflowTaskFailedEventAttributes**: *null* \| [*IWorkflowTaskFailedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md)

HistoryEvent workflowTaskFailedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowTaskFailedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskfailedeventattributes)

___

### workflowTaskScheduledEventAttributes

• `Optional` **workflowTaskScheduledEventAttributes**: *null* \| [*IWorkflowTaskScheduledEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md)

HistoryEvent workflowTaskScheduledEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowTaskScheduledEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskscheduledeventattributes)

___

### workflowTaskStartedEventAttributes

• `Optional` **workflowTaskStartedEventAttributes**: *null* \| [*IWorkflowTaskStartedEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md)

HistoryEvent workflowTaskStartedEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowTaskStartedEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskstartedeventattributes)

___

### workflowTaskTimedOutEventAttributes

• `Optional` **workflowTaskTimedOutEventAttributes**: *null* \| [*IWorkflowTaskTimedOutEventAttributes*](../interfaces/proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md)

HistoryEvent workflowTaskTimedOutEventAttributes.

Implementation of: [IHistoryEvent](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md).[workflowTaskTimedOutEventAttributes](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md#workflowtasktimedouteventattributes)

## Methods

### toJSON

▸ **toJSON**(): *object*

Converts this HistoryEvent to JSON.

**Returns:** *object*

JSON object

___

### create

▸ `Static`**create**(`properties?`: [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md)): [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

Creates a new HistoryEvent instance using the specified properties.

#### Parameters:

Name | Type |
:------ | :------ |
`properties?` | [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md) |

**Returns:** [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

HistoryEvent instance

___

### decode

▸ `Static`**decode**(`reader`: *Uint8Array* \| *Reader*, `length?`: *number*): [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

Decodes a HistoryEvent message from the specified reader or buffer.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |
`length?` | *number* | - |

**Returns:** [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

HistoryEvent

___

### decodeDelimited

▸ `Static`**decodeDelimited**(`reader`: *Uint8Array* \| *Reader*): [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

Decodes a HistoryEvent message from the specified reader or buffer, length delimited.

**`throws`** {Error} If the payload is not a reader or valid buffer

**`throws`** {$protobuf.util.ProtocolError} If required fields are missing

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`reader` | *Uint8Array* \| *Reader* | Reader or buffer to decode from   |

**Returns:** [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

HistoryEvent

___

### encode

▸ `Static`**encode**(`message`: [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md), `writer?`: *Writer*): *Writer*

Encodes the specified HistoryEvent message. Does not implicitly [verify](proto.temporal.api.history.v1.historyevent.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md) | HistoryEvent message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### encodeDelimited

▸ `Static`**encodeDelimited**(`message`: [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md), `writer?`: *Writer*): *Writer*

Encodes the specified HistoryEvent message, length delimited. Does not implicitly [verify](proto.temporal.api.history.v1.historyevent.md#verify) messages.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*IHistoryEvent*](../interfaces/proto.temporal.api.history.v1.ihistoryevent.md) | HistoryEvent message or plain object to encode   |
`writer?` | *Writer* | - |

**Returns:** *Writer*

Writer

___

### fromObject

▸ `Static`**fromObject**(`object`: { [k: string]: *any*;  }): [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

Creates a HistoryEvent message from a plain object. Also converts values to their respective internal types.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`object` | *object* | Plain object   |

**Returns:** [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md)

HistoryEvent

___

### toObject

▸ `Static`**toObject**(`message`: [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md), `options?`: IConversionOptions): *object*

Creates a plain object from a HistoryEvent message. Also converts values to other types if specified.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | [*HistoryEvent*](proto.temporal.api.history.v1.historyevent.md) | HistoryEvent   |
`options?` | IConversionOptions | - |

**Returns:** *object*

Plain object

___

### verify

▸ `Static`**verify**(`message`: { [k: string]: *any*;  }): *null* \| *string*

Verifies a HistoryEvent message.

#### Parameters:

Name | Type | Description |
:------ | :------ | :------ |
`message` | *object* | Plain object to verify   |

**Returns:** *null* \| *string*

`null` if valid, otherwise the reason why it is not
