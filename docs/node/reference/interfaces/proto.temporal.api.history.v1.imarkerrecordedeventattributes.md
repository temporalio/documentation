# Interface: IMarkerRecordedEventAttributes

[history](../modules/proto.temporal.api.history.md).[v1](../modules/proto.temporal.api.history.v1.md).IMarkerRecordedEventAttributes

Properties of a MarkerRecordedEventAttributes.

## Implemented by

* [*MarkerRecordedEventAttributes*](../classes/proto.temporal.api.history.v1.markerrecordedeventattributes.md)

## Table of contents

### Properties

- [details](proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#details)
- [failure](proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#failure)
- [header](proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#header)
- [markerName](proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#markername)
- [workflowTaskCompletedEventId](proto.temporal.api.history.v1.imarkerrecordedeventattributes.md#workflowtaskcompletedeventid)

## Properties

### details

• `Optional` **details**: *null* \| { [k: string]: [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md);  }

MarkerRecordedEventAttributes details

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

MarkerRecordedEventAttributes failure

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

MarkerRecordedEventAttributes header

___

### markerName

• `Optional` **markerName**: *null* \| *string*

MarkerRecordedEventAttributes markerName

___

### workflowTaskCompletedEventId

• `Optional` **workflowTaskCompletedEventId**: *null* \| Long

MarkerRecordedEventAttributes workflowTaskCompletedEventId
