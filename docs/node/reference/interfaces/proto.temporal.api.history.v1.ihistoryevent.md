# Interface: IHistoryEvent

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IHistoryEvent

Properties of a HistoryEvent.

## Implemented by

* [*HistoryEvent*](../classes/proto.temporal.api.history.v1.historyevent.md)

## Table of contents

### Properties

- [activityTaskCancelRequestedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytaskcancelrequestedeventattributes)
- [activityTaskCanceledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytaskcanceledeventattributes)
- [activityTaskCompletedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytaskcompletedeventattributes)
- [activityTaskFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytaskfailedeventattributes)
- [activityTaskScheduledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytaskscheduledeventattributes)
- [activityTaskStartedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytaskstartedeventattributes)
- [activityTaskTimedOutEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#activitytasktimedouteventattributes)
- [childWorkflowExecutionCanceledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutioncanceledeventattributes)
- [childWorkflowExecutionCompletedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutioncompletedeventattributes)
- [childWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutionfailedeventattributes)
- [childWorkflowExecutionStartedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutionstartedeventattributes)
- [childWorkflowExecutionTerminatedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutionterminatedeventattributes)
- [childWorkflowExecutionTimedOutEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#childworkflowexecutiontimedouteventattributes)
- [eventId](proto.temporal.api.history.v1.ihistoryevent.md#eventid)
- [eventTime](proto.temporal.api.history.v1.ihistoryevent.md#eventtime)
- [eventType](proto.temporal.api.history.v1.ihistoryevent.md#eventtype)
- [externalWorkflowExecutionCancelRequestedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#externalworkflowexecutioncancelrequestedeventattributes)
- [externalWorkflowExecutionSignaledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#externalworkflowexecutionsignaledeventattributes)
- [markerRecordedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#markerrecordedeventattributes)
- [requestCancelExternalWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#requestcancelexternalworkflowexecutionfailedeventattributes)
- [requestCancelExternalWorkflowExecutionInitiatedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#requestcancelexternalworkflowexecutioninitiatedeventattributes)
- [signalExternalWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#signalexternalworkflowexecutionfailedeventattributes)
- [signalExternalWorkflowExecutionInitiatedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#signalexternalworkflowexecutioninitiatedeventattributes)
- [startChildWorkflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#startchildworkflowexecutionfailedeventattributes)
- [startChildWorkflowExecutionInitiatedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#startchildworkflowexecutioninitiatedeventattributes)
- [taskId](proto.temporal.api.history.v1.ihistoryevent.md#taskid)
- [timerCanceledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#timercanceledeventattributes)
- [timerFiredEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#timerfiredeventattributes)
- [timerStartedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#timerstartedeventattributes)
- [upsertWorkflowSearchAttributesEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#upsertworkflowsearchattributeseventattributes)
- [version](proto.temporal.api.history.v1.ihistoryevent.md#version)
- [workflowExecutionCancelRequestedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncancelrequestedeventattributes)
- [workflowExecutionCanceledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncanceledeventattributes)
- [workflowExecutionCompletedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncompletedeventattributes)
- [workflowExecutionContinuedAsNewEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutioncontinuedasneweventattributes)
- [workflowExecutionFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionfailedeventattributes)
- [workflowExecutionSignaledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionsignaledeventattributes)
- [workflowExecutionStartedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionstartedeventattributes)
- [workflowExecutionTerminatedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutionterminatedeventattributes)
- [workflowExecutionTimedOutEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowexecutiontimedouteventattributes)
- [workflowTaskCompletedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskcompletedeventattributes)
- [workflowTaskFailedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskfailedeventattributes)
- [workflowTaskScheduledEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskscheduledeventattributes)
- [workflowTaskStartedEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowtaskstartedeventattributes)
- [workflowTaskTimedOutEventAttributes](proto.temporal.api.history.v1.ihistoryevent.md#workflowtasktimedouteventattributes)

## Properties

### activityTaskCancelRequestedEventAttributes

• `Optional` **activityTaskCancelRequestedEventAttributes**: *null* \| [*IActivityTaskCancelRequestedEventAttributes*](proto.temporal.api.history.v1.iactivitytaskcancelrequestedeventattributes.md)

HistoryEvent activityTaskCancelRequestedEventAttributes

___

### activityTaskCanceledEventAttributes

• `Optional` **activityTaskCanceledEventAttributes**: *null* \| [*IActivityTaskCanceledEventAttributes*](proto.temporal.api.history.v1.iactivitytaskcanceledeventattributes.md)

HistoryEvent activityTaskCanceledEventAttributes

___

### activityTaskCompletedEventAttributes

• `Optional` **activityTaskCompletedEventAttributes**: *null* \| [*IActivityTaskCompletedEventAttributes*](proto.temporal.api.history.v1.iactivitytaskcompletedeventattributes.md)

HistoryEvent activityTaskCompletedEventAttributes

___

### activityTaskFailedEventAttributes

• `Optional` **activityTaskFailedEventAttributes**: *null* \| [*IActivityTaskFailedEventAttributes*](proto.temporal.api.history.v1.iactivitytaskfailedeventattributes.md)

HistoryEvent activityTaskFailedEventAttributes

___

### activityTaskScheduledEventAttributes

• `Optional` **activityTaskScheduledEventAttributes**: *null* \| [*IActivityTaskScheduledEventAttributes*](proto.temporal.api.history.v1.iactivitytaskscheduledeventattributes.md)

HistoryEvent activityTaskScheduledEventAttributes

___

### activityTaskStartedEventAttributes

• `Optional` **activityTaskStartedEventAttributes**: *null* \| [*IActivityTaskStartedEventAttributes*](proto.temporal.api.history.v1.iactivitytaskstartedeventattributes.md)

HistoryEvent activityTaskStartedEventAttributes

___

### activityTaskTimedOutEventAttributes

• `Optional` **activityTaskTimedOutEventAttributes**: *null* \| [*IActivityTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.iactivitytasktimedouteventattributes.md)

HistoryEvent activityTaskTimedOutEventAttributes

___

### childWorkflowExecutionCanceledEventAttributes

• `Optional` **childWorkflowExecutionCanceledEventAttributes**: *null* \| [*IChildWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.ichildworkflowexecutioncanceledeventattributes.md)

HistoryEvent childWorkflowExecutionCanceledEventAttributes

___

### childWorkflowExecutionCompletedEventAttributes

• `Optional` **childWorkflowExecutionCompletedEventAttributes**: *null* \| [*IChildWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.ichildworkflowexecutioncompletedeventattributes.md)

HistoryEvent childWorkflowExecutionCompletedEventAttributes

___

### childWorkflowExecutionFailedEventAttributes

• `Optional` **childWorkflowExecutionFailedEventAttributes**: *null* \| [*IChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.ichildworkflowexecutionfailedeventattributes.md)

HistoryEvent childWorkflowExecutionFailedEventAttributes

___

### childWorkflowExecutionStartedEventAttributes

• `Optional` **childWorkflowExecutionStartedEventAttributes**: *null* \| [*IChildWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.ichildworkflowexecutionstartedeventattributes.md)

HistoryEvent childWorkflowExecutionStartedEventAttributes

___

### childWorkflowExecutionTerminatedEventAttributes

• `Optional` **childWorkflowExecutionTerminatedEventAttributes**: *null* \| [*IChildWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.ichildworkflowexecutionterminatedeventattributes.md)

HistoryEvent childWorkflowExecutionTerminatedEventAttributes

___

### childWorkflowExecutionTimedOutEventAttributes

• `Optional` **childWorkflowExecutionTimedOutEventAttributes**: *null* \| [*IChildWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.ichildworkflowexecutiontimedouteventattributes.md)

HistoryEvent childWorkflowExecutionTimedOutEventAttributes

___

### eventId

• `Optional` **eventId**: *null* \| Long

HistoryEvent eventId

___

### eventTime

• `Optional` **eventTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

HistoryEvent eventTime

___

### eventType

• `Optional` **eventType**: *null* \| [*EventType*](../enums/proto.temporal.api.enums.v1.eventtype.md)

HistoryEvent eventType

___

### externalWorkflowExecutionCancelRequestedEventAttributes

• `Optional` **externalWorkflowExecutionCancelRequestedEventAttributes**: *null* \| [*IExternalWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.iexternalworkflowexecutioncancelrequestedeventattributes.md)

HistoryEvent externalWorkflowExecutionCancelRequestedEventAttributes

___

### externalWorkflowExecutionSignaledEventAttributes

• `Optional` **externalWorkflowExecutionSignaledEventAttributes**: *null* \| [*IExternalWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.iexternalworkflowexecutionsignaledeventattributes.md)

HistoryEvent externalWorkflowExecutionSignaledEventAttributes

___

### markerRecordedEventAttributes

• `Optional` **markerRecordedEventAttributes**: *null* \| [*IMarkerRecordedEventAttributes*](proto.temporal.api.history.v1.imarkerrecordedeventattributes.md)

HistoryEvent markerRecordedEventAttributes

___

### requestCancelExternalWorkflowExecutionFailedEventAttributes

• `Optional` **requestCancelExternalWorkflowExecutionFailedEventAttributes**: *null* \| [*IRequestCancelExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutionfailedeventattributes.md)

HistoryEvent requestCancelExternalWorkflowExecutionFailedEventAttributes

___

### requestCancelExternalWorkflowExecutionInitiatedEventAttributes

• `Optional` **requestCancelExternalWorkflowExecutionInitiatedEventAttributes**: *null* \| [*IRequestCancelExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.irequestcancelexternalworkflowexecutioninitiatedeventattributes.md)

HistoryEvent requestCancelExternalWorkflowExecutionInitiatedEventAttributes

___

### signalExternalWorkflowExecutionFailedEventAttributes

• `Optional` **signalExternalWorkflowExecutionFailedEventAttributes**: *null* \| [*ISignalExternalWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.isignalexternalworkflowexecutionfailedeventattributes.md)

HistoryEvent signalExternalWorkflowExecutionFailedEventAttributes

___

### signalExternalWorkflowExecutionInitiatedEventAttributes

• `Optional` **signalExternalWorkflowExecutionInitiatedEventAttributes**: *null* \| [*ISignalExternalWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.isignalexternalworkflowexecutioninitiatedeventattributes.md)

HistoryEvent signalExternalWorkflowExecutionInitiatedEventAttributes

___

### startChildWorkflowExecutionFailedEventAttributes

• `Optional` **startChildWorkflowExecutionFailedEventAttributes**: *null* \| [*IStartChildWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.istartchildworkflowexecutionfailedeventattributes.md)

HistoryEvent startChildWorkflowExecutionFailedEventAttributes

___

### startChildWorkflowExecutionInitiatedEventAttributes

• `Optional` **startChildWorkflowExecutionInitiatedEventAttributes**: *null* \| [*IStartChildWorkflowExecutionInitiatedEventAttributes*](proto.temporal.api.history.v1.istartchildworkflowexecutioninitiatedeventattributes.md)

HistoryEvent startChildWorkflowExecutionInitiatedEventAttributes

___

### taskId

• `Optional` **taskId**: *null* \| Long

HistoryEvent taskId

___

### timerCanceledEventAttributes

• `Optional` **timerCanceledEventAttributes**: *null* \| [*ITimerCanceledEventAttributes*](proto.temporal.api.history.v1.itimercanceledeventattributes.md)

HistoryEvent timerCanceledEventAttributes

___

### timerFiredEventAttributes

• `Optional` **timerFiredEventAttributes**: *null* \| [*ITimerFiredEventAttributes*](proto.temporal.api.history.v1.itimerfiredeventattributes.md)

HistoryEvent timerFiredEventAttributes

___

### timerStartedEventAttributes

• `Optional` **timerStartedEventAttributes**: *null* \| [*ITimerStartedEventAttributes*](proto.temporal.api.history.v1.itimerstartedeventattributes.md)

HistoryEvent timerStartedEventAttributes

___

### upsertWorkflowSearchAttributesEventAttributes

• `Optional` **upsertWorkflowSearchAttributesEventAttributes**: *null* \| [*IUpsertWorkflowSearchAttributesEventAttributes*](proto.temporal.api.history.v1.iupsertworkflowsearchattributeseventattributes.md)

HistoryEvent upsertWorkflowSearchAttributesEventAttributes

___

### version

• `Optional` **version**: *null* \| Long

HistoryEvent version

___

### workflowExecutionCancelRequestedEventAttributes

• `Optional` **workflowExecutionCancelRequestedEventAttributes**: *null* \| [*IWorkflowExecutionCancelRequestedEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutioncancelrequestedeventattributes.md)

HistoryEvent workflowExecutionCancelRequestedEventAttributes

___

### workflowExecutionCanceledEventAttributes

• `Optional` **workflowExecutionCanceledEventAttributes**: *null* \| [*IWorkflowExecutionCanceledEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutioncanceledeventattributes.md)

HistoryEvent workflowExecutionCanceledEventAttributes

___

### workflowExecutionCompletedEventAttributes

• `Optional` **workflowExecutionCompletedEventAttributes**: *null* \| [*IWorkflowExecutionCompletedEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutioncompletedeventattributes.md)

HistoryEvent workflowExecutionCompletedEventAttributes

___

### workflowExecutionContinuedAsNewEventAttributes

• `Optional` **workflowExecutionContinuedAsNewEventAttributes**: *null* \| [*IWorkflowExecutionContinuedAsNewEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutioncontinuedasneweventattributes.md)

HistoryEvent workflowExecutionContinuedAsNewEventAttributes

___

### workflowExecutionFailedEventAttributes

• `Optional` **workflowExecutionFailedEventAttributes**: *null* \| [*IWorkflowExecutionFailedEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutionfailedeventattributes.md)

HistoryEvent workflowExecutionFailedEventAttributes

___

### workflowExecutionSignaledEventAttributes

• `Optional` **workflowExecutionSignaledEventAttributes**: *null* \| [*IWorkflowExecutionSignaledEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutionsignaledeventattributes.md)

HistoryEvent workflowExecutionSignaledEventAttributes

___

### workflowExecutionStartedEventAttributes

• `Optional` **workflowExecutionStartedEventAttributes**: *null* \| [*IWorkflowExecutionStartedEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutionstartedeventattributes.md)

HistoryEvent workflowExecutionStartedEventAttributes

___

### workflowExecutionTerminatedEventAttributes

• `Optional` **workflowExecutionTerminatedEventAttributes**: *null* \| [*IWorkflowExecutionTerminatedEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutionterminatedeventattributes.md)

HistoryEvent workflowExecutionTerminatedEventAttributes

___

### workflowExecutionTimedOutEventAttributes

• `Optional` **workflowExecutionTimedOutEventAttributes**: *null* \| [*IWorkflowExecutionTimedOutEventAttributes*](proto.temporal.api.history.v1.iworkflowexecutiontimedouteventattributes.md)

HistoryEvent workflowExecutionTimedOutEventAttributes

___

### workflowTaskCompletedEventAttributes

• `Optional` **workflowTaskCompletedEventAttributes**: *null* \| [*IWorkflowTaskCompletedEventAttributes*](proto.temporal.api.history.v1.iworkflowtaskcompletedeventattributes.md)

HistoryEvent workflowTaskCompletedEventAttributes

___

### workflowTaskFailedEventAttributes

• `Optional` **workflowTaskFailedEventAttributes**: *null* \| [*IWorkflowTaskFailedEventAttributes*](proto.temporal.api.history.v1.iworkflowtaskfailedeventattributes.md)

HistoryEvent workflowTaskFailedEventAttributes

___

### workflowTaskScheduledEventAttributes

• `Optional` **workflowTaskScheduledEventAttributes**: *null* \| [*IWorkflowTaskScheduledEventAttributes*](proto.temporal.api.history.v1.iworkflowtaskscheduledeventattributes.md)

HistoryEvent workflowTaskScheduledEventAttributes

___

### workflowTaskStartedEventAttributes

• `Optional` **workflowTaskStartedEventAttributes**: *null* \| [*IWorkflowTaskStartedEventAttributes*](proto.temporal.api.history.v1.iworkflowtaskstartedeventattributes.md)

HistoryEvent workflowTaskStartedEventAttributes

___

### workflowTaskTimedOutEventAttributes

• `Optional` **workflowTaskTimedOutEventAttributes**: *null* \| [*IWorkflowTaskTimedOutEventAttributes*](proto.temporal.api.history.v1.iworkflowtasktimedouteventattributes.md)

HistoryEvent workflowTaskTimedOutEventAttributes
