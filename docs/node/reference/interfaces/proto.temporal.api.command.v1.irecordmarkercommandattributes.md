# Interface: IRecordMarkerCommandAttributes

[command](../modules/proto.temporal.api.command.md).[v1](../modules/proto.temporal.api.command.v1.md).IRecordMarkerCommandAttributes

Properties of a RecordMarkerCommandAttributes.

## Implemented by

* [*RecordMarkerCommandAttributes*](../classes/proto.temporal.api.command.v1.recordmarkercommandattributes.md)

## Table of contents

### Properties

- [details](proto.temporal.api.command.v1.irecordmarkercommandattributes.md#details)
- [failure](proto.temporal.api.command.v1.irecordmarkercommandattributes.md#failure)
- [header](proto.temporal.api.command.v1.irecordmarkercommandattributes.md#header)
- [markerName](proto.temporal.api.command.v1.irecordmarkercommandattributes.md#markername)

## Properties

### details

• `Optional` **details**: *null* \| { [k: string]: [*IPayloads*](proto.temporal.api.common.v1.ipayloads.md);  }

RecordMarkerCommandAttributes details

___

### failure

• `Optional` **failure**: *null* \| [*IFailure*](proto.temporal.api.failure.v1.ifailure.md)

RecordMarkerCommandAttributes failure

___

### header

• `Optional` **header**: *null* \| [*IHeader*](proto.temporal.api.common.v1.iheader.md)

RecordMarkerCommandAttributes header

___

### markerName

• `Optional` **markerName**: *null* \| *string*

RecordMarkerCommandAttributes markerName
