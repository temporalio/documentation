# Interface: IVersionInfo

[version](../modules/proto.temporal.api.version.md).[v1](../modules/proto.temporal.api.version.v1.md).IVersionInfo

Properties of a VersionInfo.

## Implemented by

* [*VersionInfo*](../classes/proto.temporal.api.version.v1.versioninfo.md)

## Table of contents

### Properties

- [alerts](proto.temporal.api.version.v1.iversioninfo.md#alerts)
- [current](proto.temporal.api.version.v1.iversioninfo.md#current)
- [instructions](proto.temporal.api.version.v1.iversioninfo.md#instructions)
- [lastUpdateTime](proto.temporal.api.version.v1.iversioninfo.md#lastupdatetime)
- [recommended](proto.temporal.api.version.v1.iversioninfo.md#recommended)

## Properties

### alerts

• `Optional` **alerts**: *null* \| [*IAlert*](proto.temporal.api.version.v1.ialert.md)[]

VersionInfo alerts

___

### current

• `Optional` **current**: *null* \| [*IReleaseInfo*](proto.temporal.api.version.v1.ireleaseinfo.md)

VersionInfo current

___

### instructions

• `Optional` **instructions**: *null* \| *string*

VersionInfo instructions

___

### lastUpdateTime

• `Optional` **lastUpdateTime**: *null* \| [*ITimestamp*](proto.google.protobuf.itimestamp.md)

VersionInfo lastUpdateTime

___

### recommended

• `Optional` **recommended**: *null* \| [*IReleaseInfo*](proto.temporal.api.version.v1.ireleaseinfo.md)

VersionInfo recommended
