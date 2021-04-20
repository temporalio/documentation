# Enumeration: EventType

[enums](../modules/proto.temporal.api.enums.md).[v1](../modules/proto.temporal.api.enums.v1.md).EventType

EventType enum.

## Table of contents

### Enumeration members

- [EVENT\_TYPE\_ACTIVITY\_TASK\_CANCELED](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_canceled)
- [EVENT\_TYPE\_ACTIVITY\_TASK\_CANCEL\_REQUESTED](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_cancel_requested)
- [EVENT\_TYPE\_ACTIVITY\_TASK\_COMPLETED](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_completed)
- [EVENT\_TYPE\_ACTIVITY\_TASK\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_failed)
- [EVENT\_TYPE\_ACTIVITY\_TASK\_SCHEDULED](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_scheduled)
- [EVENT\_TYPE\_ACTIVITY\_TASK\_STARTED](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_started)
- [EVENT\_TYPE\_ACTIVITY\_TASK\_TIMED\_OUT](proto.temporal.api.enums.v1.eventtype.md#event_type_activity_task_timed_out)
- [EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_CANCELED](proto.temporal.api.enums.v1.eventtype.md#event_type_child_workflow_execution_canceled)
- [EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_COMPLETED](proto.temporal.api.enums.v1.eventtype.md#event_type_child_workflow_execution_completed)
- [EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_child_workflow_execution_failed)
- [EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_STARTED](proto.temporal.api.enums.v1.eventtype.md#event_type_child_workflow_execution_started)
- [EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_TERMINATED](proto.temporal.api.enums.v1.eventtype.md#event_type_child_workflow_execution_terminated)
- [EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_TIMED\_OUT](proto.temporal.api.enums.v1.eventtype.md#event_type_child_workflow_execution_timed_out)
- [EVENT\_TYPE\_EXTERNAL\_WORKFLOW\_EXECUTION\_CANCEL\_REQUESTED](proto.temporal.api.enums.v1.eventtype.md#event_type_external_workflow_execution_cancel_requested)
- [EVENT\_TYPE\_EXTERNAL\_WORKFLOW\_EXECUTION\_SIGNALED](proto.temporal.api.enums.v1.eventtype.md#event_type_external_workflow_execution_signaled)
- [EVENT\_TYPE\_MARKER\_RECORDED](proto.temporal.api.enums.v1.eventtype.md#event_type_marker_recorded)
- [EVENT\_TYPE\_REQUEST\_CANCEL\_EXTERNAL\_WORKFLOW\_EXECUTION\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_request_cancel_external_workflow_execution_failed)
- [EVENT\_TYPE\_REQUEST\_CANCEL\_EXTERNAL\_WORKFLOW\_EXECUTION\_INITIATED](proto.temporal.api.enums.v1.eventtype.md#event_type_request_cancel_external_workflow_execution_initiated)
- [EVENT\_TYPE\_SIGNAL\_EXTERNAL\_WORKFLOW\_EXECUTION\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_signal_external_workflow_execution_failed)
- [EVENT\_TYPE\_SIGNAL\_EXTERNAL\_WORKFLOW\_EXECUTION\_INITIATED](proto.temporal.api.enums.v1.eventtype.md#event_type_signal_external_workflow_execution_initiated)
- [EVENT\_TYPE\_START\_CHILD\_WORKFLOW\_EXECUTION\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_start_child_workflow_execution_failed)
- [EVENT\_TYPE\_START\_CHILD\_WORKFLOW\_EXECUTION\_INITIATED](proto.temporal.api.enums.v1.eventtype.md#event_type_start_child_workflow_execution_initiated)
- [EVENT\_TYPE\_TIMER\_CANCELED](proto.temporal.api.enums.v1.eventtype.md#event_type_timer_canceled)
- [EVENT\_TYPE\_TIMER\_FIRED](proto.temporal.api.enums.v1.eventtype.md#event_type_timer_fired)
- [EVENT\_TYPE\_TIMER\_STARTED](proto.temporal.api.enums.v1.eventtype.md#event_type_timer_started)
- [EVENT\_TYPE\_UNSPECIFIED](proto.temporal.api.enums.v1.eventtype.md#event_type_unspecified)
- [EVENT\_TYPE\_UPSERT\_WORKFLOW\_SEARCH\_ATTRIBUTES](proto.temporal.api.enums.v1.eventtype.md#event_type_upsert_workflow_search_attributes)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CANCELED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_canceled)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CANCEL\_REQUESTED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_cancel_requested)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_COMPLETED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_completed)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CONTINUED\_AS\_NEW](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_continued_as_new)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_failed)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_SIGNALED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_signaled)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_STARTED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_started)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_TERMINATED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_terminated)
- [EVENT\_TYPE\_WORKFLOW\_EXECUTION\_TIMED\_OUT](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_execution_timed_out)
- [EVENT\_TYPE\_WORKFLOW\_TASK\_COMPLETED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_task_completed)
- [EVENT\_TYPE\_WORKFLOW\_TASK\_FAILED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_task_failed)
- [EVENT\_TYPE\_WORKFLOW\_TASK\_SCHEDULED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_task_scheduled)
- [EVENT\_TYPE\_WORKFLOW\_TASK\_STARTED](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_task_started)
- [EVENT\_TYPE\_WORKFLOW\_TASK\_TIMED\_OUT](proto.temporal.api.enums.v1.eventtype.md#event_type_workflow_task_timed_out)

## Enumeration members

### EVENT\_TYPE\_ACTIVITY\_TASK\_CANCELED

• **EVENT\_TYPE\_ACTIVITY\_TASK\_CANCELED**: = 16

___

### EVENT\_TYPE\_ACTIVITY\_TASK\_CANCEL\_REQUESTED

• **EVENT\_TYPE\_ACTIVITY\_TASK\_CANCEL\_REQUESTED**: = 15

___

### EVENT\_TYPE\_ACTIVITY\_TASK\_COMPLETED

• **EVENT\_TYPE\_ACTIVITY\_TASK\_COMPLETED**: = 12

___

### EVENT\_TYPE\_ACTIVITY\_TASK\_FAILED

• **EVENT\_TYPE\_ACTIVITY\_TASK\_FAILED**: = 13

___

### EVENT\_TYPE\_ACTIVITY\_TASK\_SCHEDULED

• **EVENT\_TYPE\_ACTIVITY\_TASK\_SCHEDULED**: = 10

___

### EVENT\_TYPE\_ACTIVITY\_TASK\_STARTED

• **EVENT\_TYPE\_ACTIVITY\_TASK\_STARTED**: = 11

___

### EVENT\_TYPE\_ACTIVITY\_TASK\_TIMED\_OUT

• **EVENT\_TYPE\_ACTIVITY\_TASK\_TIMED\_OUT**: = 14

___

### EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_CANCELED

• **EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_CANCELED**: = 34

___

### EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_COMPLETED

• **EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_COMPLETED**: = 32

___

### EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_FAILED

• **EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_FAILED**: = 33

___

### EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_STARTED

• **EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_STARTED**: = 31

___

### EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_TERMINATED

• **EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_TERMINATED**: = 36

___

### EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_TIMED\_OUT

• **EVENT\_TYPE\_CHILD\_WORKFLOW\_EXECUTION\_TIMED\_OUT**: = 35

___

### EVENT\_TYPE\_EXTERNAL\_WORKFLOW\_EXECUTION\_CANCEL\_REQUESTED

• **EVENT\_TYPE\_EXTERNAL\_WORKFLOW\_EXECUTION\_CANCEL\_REQUESTED**: = 24

___

### EVENT\_TYPE\_EXTERNAL\_WORKFLOW\_EXECUTION\_SIGNALED

• **EVENT\_TYPE\_EXTERNAL\_WORKFLOW\_EXECUTION\_SIGNALED**: = 39

___

### EVENT\_TYPE\_MARKER\_RECORDED

• **EVENT\_TYPE\_MARKER\_RECORDED**: = 25

___

### EVENT\_TYPE\_REQUEST\_CANCEL\_EXTERNAL\_WORKFLOW\_EXECUTION\_FAILED

• **EVENT\_TYPE\_REQUEST\_CANCEL\_EXTERNAL\_WORKFLOW\_EXECUTION\_FAILED**: = 23

___

### EVENT\_TYPE\_REQUEST\_CANCEL\_EXTERNAL\_WORKFLOW\_EXECUTION\_INITIATED

• **EVENT\_TYPE\_REQUEST\_CANCEL\_EXTERNAL\_WORKFLOW\_EXECUTION\_INITIATED**: = 22

___

### EVENT\_TYPE\_SIGNAL\_EXTERNAL\_WORKFLOW\_EXECUTION\_FAILED

• **EVENT\_TYPE\_SIGNAL\_EXTERNAL\_WORKFLOW\_EXECUTION\_FAILED**: = 38

___

### EVENT\_TYPE\_SIGNAL\_EXTERNAL\_WORKFLOW\_EXECUTION\_INITIATED

• **EVENT\_TYPE\_SIGNAL\_EXTERNAL\_WORKFLOW\_EXECUTION\_INITIATED**: = 37

___

### EVENT\_TYPE\_START\_CHILD\_WORKFLOW\_EXECUTION\_FAILED

• **EVENT\_TYPE\_START\_CHILD\_WORKFLOW\_EXECUTION\_FAILED**: = 30

___

### EVENT\_TYPE\_START\_CHILD\_WORKFLOW\_EXECUTION\_INITIATED

• **EVENT\_TYPE\_START\_CHILD\_WORKFLOW\_EXECUTION\_INITIATED**: = 29

___

### EVENT\_TYPE\_TIMER\_CANCELED

• **EVENT\_TYPE\_TIMER\_CANCELED**: = 19

___

### EVENT\_TYPE\_TIMER\_FIRED

• **EVENT\_TYPE\_TIMER\_FIRED**: = 18

___

### EVENT\_TYPE\_TIMER\_STARTED

• **EVENT\_TYPE\_TIMER\_STARTED**: = 17

___

### EVENT\_TYPE\_UNSPECIFIED

• **EVENT\_TYPE\_UNSPECIFIED**: = 0

___

### EVENT\_TYPE\_UPSERT\_WORKFLOW\_SEARCH\_ATTRIBUTES

• **EVENT\_TYPE\_UPSERT\_WORKFLOW\_SEARCH\_ATTRIBUTES**: = 40

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CANCELED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CANCELED**: = 21

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CANCEL\_REQUESTED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CANCEL\_REQUESTED**: = 20

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_COMPLETED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_COMPLETED**: = 2

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CONTINUED\_AS\_NEW

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_CONTINUED\_AS\_NEW**: = 28

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_FAILED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_FAILED**: = 3

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_SIGNALED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_SIGNALED**: = 26

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_STARTED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_STARTED**: = 1

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_TERMINATED

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_TERMINATED**: = 27

___

### EVENT\_TYPE\_WORKFLOW\_EXECUTION\_TIMED\_OUT

• **EVENT\_TYPE\_WORKFLOW\_EXECUTION\_TIMED\_OUT**: = 4

___

### EVENT\_TYPE\_WORKFLOW\_TASK\_COMPLETED

• **EVENT\_TYPE\_WORKFLOW\_TASK\_COMPLETED**: = 7

___

### EVENT\_TYPE\_WORKFLOW\_TASK\_FAILED

• **EVENT\_TYPE\_WORKFLOW\_TASK\_FAILED**: = 9

___

### EVENT\_TYPE\_WORKFLOW\_TASK\_SCHEDULED

• **EVENT\_TYPE\_WORKFLOW\_TASK\_SCHEDULED**: = 5

___

### EVENT\_TYPE\_WORKFLOW\_TASK\_STARTED

• **EVENT\_TYPE\_WORKFLOW\_TASK\_STARTED**: = 6

___

### EVENT\_TYPE\_WORKFLOW\_TASK\_TIMED\_OUT

• **EVENT\_TYPE\_WORKFLOW\_TASK\_TIMED\_OUT**: = 8
