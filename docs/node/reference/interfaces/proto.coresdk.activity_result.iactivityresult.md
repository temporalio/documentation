# Interface: IActivityResult

[coresdk](../modules/proto.coresdk.md).[activity_result](../modules/proto.coresdk.activity_result.md).IActivityResult

Properties of an ActivityResult.

## Implemented by

* [*ActivityResult*](../classes/proto.coresdk.activity_result.activityresult.md)

## Table of contents

### Properties

- [canceled](proto.coresdk.activity_result.iactivityresult.md#canceled)
- [completed](proto.coresdk.activity_result.iactivityresult.md#completed)
- [failed](proto.coresdk.activity_result.iactivityresult.md#failed)

## Properties

### canceled

• `Optional` **canceled**: *null* \| [*ICancelation*](proto.coresdk.activity_result.icancelation.md)

ActivityResult canceled

___

### completed

• `Optional` **completed**: *null* \| [*ISuccess*](proto.coresdk.activity_result.isuccess.md)

ActivityResult completed

___

### failed

• `Optional` **failed**: *null* \| [*IFailure*](proto.coresdk.activity_result.ifailure.md)

ActivityResult failed
